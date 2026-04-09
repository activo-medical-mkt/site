param(
  [string]$SitemapPath = "./sitemap.xml",
  [string]$SiteBase = "https://activomedical.com",
  [string]$CmsApi = "https://app.seermantic.com/api/posts",
  [string]$ProjectId = "65bb6d01",
  [string]$PublicToken = $env:NEXT_PUBLIC_CMS_PUBLIC_TOKEN,
  [int]$PerPage = 100
)

$ErrorActionPreference = "Stop"

function Get-CmsHeaders {
  param([string]$Token)
  $headers = @{}
  if (-not [string]::IsNullOrWhiteSpace($Token)) {
    $headers["x-cms-public-token"] = $Token
  }
  return $headers
}

function Get-PostsFromPayload {
  param([object]$Payload)

  if ($null -eq $Payload) { return @() }

  if ($Payload -is [System.Array]) {
    return @($Payload)
  }

  if ($Payload.posts -is [System.Array]) { return @($Payload.posts) }
  if ($Payload.items -is [System.Array]) { return @($Payload.items) }

  if ($Payload.data) {
    if ($Payload.data -is [System.Array]) { return @($Payload.data) }
    if ($Payload.data.posts -is [System.Array]) { return @($Payload.data.posts) }
    if ($Payload.data.items -is [System.Array]) { return @($Payload.data.items) }
  }

  return @()
}

function Get-TotalPages {
  param(
    [object]$Payload,
    [int]$CurrentCount,
    [int]$PerPage
  )

  $total = $null
  if ($Payload.total) { $total = [int]$Payload.total }
  elseif ($Payload.meta -and $Payload.meta.total) { $total = [int]$Payload.meta.total }
  elseif ($Payload.pagination -and $Payload.pagination.total) { $total = [int]$Payload.pagination.total }

  if ($null -ne $total -and $total -gt 0 -and $PerPage -gt 0) {
    return [Math]::Ceiling($total / $PerPage)
  }

  return $null
}

if ([string]::IsNullOrWhiteSpace($PublicToken)) {
  throw "CMS public token missing. Set NEXT_PUBLIC_CMS_PUBLIC_TOKEN or pass -PublicToken."
}

$today = (Get-Date).ToString("yyyy-MM-dd")
$siteBaseNorm = $SiteBase.TrimEnd('/')

$staticUrls = @(
  @{ loc = "$siteBaseNorm/"; changefreq = "weekly"; priority = "1.0"; lastmod = $today },
  @{ loc = "$siteBaseNorm/marketing-medico-tijuana/"; changefreq = "weekly"; priority = "0.9"; lastmod = $today },
  @{ loc = "$siteBaseNorm/marketing-cirujanos-plasticos-tijuana/"; changefreq = "weekly"; priority = "0.9"; lastmod = $today },
  @{ loc = "$siteBaseNorm/blog/"; changefreq = "weekly"; priority = "0.8"; lastmod = $today }
)

$allPosts = @()
$page = 1
$totalPages = $null
$headers = Get-CmsHeaders -Token $PublicToken

while ($true) {
  $url = "$CmsApi?projectId=$([uri]::EscapeDataString($ProjectId))&page=$page&per_page=$PerPage"
  $payload = Invoke-RestMethod -Uri $url -Headers $headers -Method Get -TimeoutSec 30

  $posts = Get-PostsFromPayload -Payload $payload
  if ($posts.Count -eq 0) { break }

  $allPosts += $posts

  if ($null -eq $totalPages) {
    $totalPages = Get-TotalPages -Payload $payload -CurrentCount $posts.Count -PerPage $PerPage
  }

  if ($null -ne $totalPages) {
    if ($page -ge $totalPages) { break }
  } else {
    if ($posts.Count -lt $PerPage) { break }
  }

  $page++
}

$urlMap = @{}
foreach ($row in $staticUrls) {
  $urlMap[$row.loc] = $row
}

foreach ($post in $allPosts) {
  $slug = ""
  if ($post.slug) { $slug = [string]$post.slug }
  if ([string]::IsNullOrWhiteSpace($slug)) { continue }

  $status = ""
  if ($post.status) { $status = [string]$post.status }
  if ($status -and $status.ToLower() -notin @("published", "live", "public")) { continue }

  $lastmodRaw = $null
  if ($post.updated_at) { $lastmodRaw = $post.updated_at }
  elseif ($post.published_at) { $lastmodRaw = $post.published_at }

  $lastmod = $today
  if ($lastmodRaw) {
    try { $lastmod = (Get-Date $lastmodRaw).ToString("yyyy-MM-dd") } catch { $lastmod = $today }
  }

  $loc = "$siteBaseNorm/blog/$([uri]::EscapeDataString($slug))"
  $urlMap[$loc] = @{ loc = $loc; changefreq = "weekly"; priority = "0.7"; lastmod = $lastmod }
}

$rows = @($urlMap.Values | Sort-Object -Property loc)

$sb = New-Object System.Text.StringBuilder
[void]$sb.AppendLine('<?xml version="1.0" encoding="UTF-8"?>')
[void]$sb.AppendLine('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
foreach ($u in $rows) {
  [void]$sb.AppendLine('  <url>')
  [void]$sb.AppendLine("    <loc>$($u.loc)</loc>")
  [void]$sb.AppendLine("    <lastmod>$($u.lastmod)</lastmod>")
  [void]$sb.AppendLine("    <changefreq>$($u.changefreq)</changefreq>")
  [void]$sb.AppendLine("    <priority>$($u.priority)</priority>")
  [void]$sb.AppendLine('  </url>')
}
[void]$sb.AppendLine('</urlset>')

Set-Content -Path $SitemapPath -Value $sb.ToString() -Encoding UTF8
Write-Host "Sitemap generated at $SitemapPath with $($rows.Count) URLs."
