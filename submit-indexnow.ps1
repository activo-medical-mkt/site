param(
  [string]$SitemapPath = "./sitemap.xml",
  [string]$KeyPath = "./d3e26d3fa7e2443d8724a878a6929b6a.txt",
  [string]$Endpoint = "https://api.indexnow.org/indexnow",
  [switch]$RegenerateSitemap,
  [string]$CmsPublicToken = $env:NEXT_PUBLIC_CMS_PUBLIC_TOKEN
)

$ErrorActionPreference = "Stop"

if ($RegenerateSitemap) {
  $generator = Join-Path (Split-Path -Parent $MyInvocation.MyCommand.Path) "generate-sitemap.ps1"
  if (-not (Test-Path $generator)) {
    throw "Sitemap generator not found: $generator"
  }

  Write-Host "Regenerating sitemap from CMS..."
  & $generator -SitemapPath $SitemapPath -PublicToken $CmsPublicToken
}

if (-not (Test-Path $SitemapPath)) {
  throw "Sitemap file not found: $SitemapPath"
}
if (-not (Test-Path $KeyPath)) {
  throw "IndexNow key file not found: $KeyPath"
}

$key = (Get-Content -Path $KeyPath -Raw).Trim()
if ([string]::IsNullOrWhiteSpace($key)) {
  throw "IndexNow key file is empty: $KeyPath"
}

[xml]$sitemap = Get-Content -Path $SitemapPath -Raw
$ns = New-Object System.Xml.XmlNamespaceManager($sitemap.NameTable)
$ns.AddNamespace("sm", "http://www.sitemaps.org/schemas/sitemap/0.9")
$urlNodes = $sitemap.SelectNodes("//sm:url/sm:loc", $ns)
$urls = @($urlNodes | ForEach-Object { $_.InnerText.Trim() } | Where-Object { -not [string]::IsNullOrWhiteSpace($_) })

if ($urls.Count -eq 0) {
  throw "No URLs found in sitemap: $SitemapPath"
}

$firstUri = [Uri]$urls[0]
$siteHost = $firstUri.Host
$keyLocation = "https://$siteHost/$([IO.Path]::GetFileName($KeyPath))"

Write-Host "Submitting $($urls.Count) URL(s) to IndexNow for host: $siteHost"
Write-Host "Key location: $keyLocation"

$ok = 0
$failed = 0

foreach ($url in $urls) {
  try {
    $builder = [System.UriBuilder]$Endpoint
    $builder.Query = "url=$([uri]::EscapeDataString($url))&key=$([uri]::EscapeDataString($key))&keyLocation=$([uri]::EscapeDataString($keyLocation))"
    $submitUrl = $builder.Uri.AbsoluteUri
    $response = Invoke-WebRequest -Uri $submitUrl -Method Get -UseBasicParsing -TimeoutSec 20

    if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 300) {
      Write-Host "[OK] $($response.StatusCode) $url"
      $ok++
    } else {
      Write-Host "[FAIL] $($response.StatusCode) $url"
      $failed++
    }
  } catch {
    Write-Host "[FAIL] $_ $url"
    $failed++
  }
}

Write-Host "Done. Success: $ok | Failed: $failed"
if ($failed -gt 0) {
  exit 1
}
