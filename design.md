# Medical Marketing Site - Design System (Homepage Canon)

## Objective
The homepage is now the single source of visual truth. Any new page must look like a direct sibling of the homepage, not a separate template.

Use this document to keep style, spacing, tone, and component behavior consistent across Services, About, Case Studies, FAQ, and Contact pages.

## Master Reference
- Visual north star: current homepage in index.html.
- CSS authority: css/style.css and css/sections.css.
- Rule: if this document conflicts with implementation, match homepage implementation.

## Core Style DNA (Must Keep)
- Dark, cinematic hero with cool gradient atmosphere and premium depth.
- Teal-indigo-mauve accents over deep navy base.
- High-contrast typography with bold headlines and clean body copy.
- Rounded components (buttons, chips, cards, form fields).
- Selective glass effects only for hero and highlight surfaces.
- Dense but easy-to-scan section rhythm with clear content blocks.

## Brand Assets
- Logos (prefer SVG over PNG):
  - Assets/Logos/activo-logo-white.svg ← canonical white logo (SVG, preferred)
  - Assets/Logos/logo-white.png
  - Assets/Logos/activo-logo-white.png
- Favicon set:
  - Assets/Logos/favicon.ico
  - Assets/Logos/favicon-32x32.png
  - Assets/Logos/favicon-48x48.png
  - Assets/Logos/favicon-96x96.png
- Icons (inline SVG sprites):
  - Assets/Icons/social-sprite.svg
  - Assets/Icons/icon-email.svg
  - Assets/Icons/icon-whatsapp.svg
  - Assets/Icons/icon-globe.svg
- Photography (original / EXIF-tagged, not stock):
  - Assets/Images/Untitled-1.jpg — team meeting / hero brand overlay
  - Assets/Images/agencia de marketing para profesionales de la salud.jpg — agency hero
  - Assets/Images/google-ads-hero.jpg — Google Ads landing pages
  - Assets/Images/google-ads-interface-6078ab3859a0f-scaled.webp — Google Ads UI
- Fonts:
  - Assets/Fonts/MavenPro-Regular.ttf
  - Assets/Fonts/MavenPro-Medium.ttf
  - Assets/Fonts/MavenPro-SemiBold.ttf
  - Assets/Fonts/MavenPro-Bold.ttf
  - Assets/Fonts/MavenPro-ExtraBold.ttf
  - Assets/Fonts/MavenPro-Black.ttf
  - Assets/Fonts/ff-mark-pro-black.otf

## Color System (Locked)

CSS custom properties (defined in css/style.css `:root`):

```
--c-teal:        #007f97   ← primary brand / CTA base
--c-teal-hover:  #0a6d82
--c-teal-soft:   #e7f4f6   ← teal tint for light surfaces
--c-navy:        #051126   ← darkest background / hero
--c-navy-mid:    #0c1f3d   ← mid-dark section backgrounds
--c-indigo:      #4c3f77
--c-indigo-deep: #3a2f60
--c-violet:      #5533ff   ← electric accent; gradient endpoints, kicker text
--c-violet-soft: rgba(85,51,255,0.12)
--c-mauve:       #7c587f
--c-sage:        #a4bcbc
--c-green:       #2bcb74   ← positive metric / success state
--c-text:        #324a63   ← body copy
--c-text-light:  #5e7a96   ← secondary / muted text
--c-surface-warm: #f7f5f2  ← warm off-white sections
--c-surface-sage: #edf4f4  ← cool sage-tinted sections
--c-border:       #d5e1ed
```

Gradient recipes in active use:
- Hero kicker text: `linear-gradient(90deg, #007f97 0%, #5533ff 100%)` (teal → violet, clip-text)
- btn-primary: `linear-gradient(130deg, #007f97 0%, #00c4d4 100%)` (teal → cyan)
- btn-accent: `linear-gradient(130deg, #007f97 0%, #5533ff 100%)` (teal → violet) ← primary hero CTA
- CTA section background: `linear-gradient(135deg, #007f97 0%, #4c3f77 100%)`

## Typography
- Primary family: Maven Pro.
- Display accent only: ff-mark-pro-black.

Scale baseline:
- H1: 44/1.1/800
- H2: 36/1.15/800
- H3: 28/1.2/700
- Body: 16/1.6/500
- Small: 14/1.5/500
- Label: 12/1.4/600

Usage rules:
- Headlines are short and direct.
- Paragraph width should remain readable (about 50 to 70 chars on desktop).
- Preserve strong contrast in dark sections.

## Layout and Spacing
Breakpoints:
- Mobile: 360 to 767
- Tablet: 768 to 1023
- Desktop: 1024 to 1439
- Wide: 1440+

Container:
- Max width: 1200px
- Side padding: 24px desktop, 20px tablet, 16px mobile

Section vertical spacing:
- `--section-py: clamp(4rem, 6vw, 7rem)` — responsive, fluid via clamp (not a fixed px step)

Spacing rhythm (8px grid):
- 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96

Radius tokens:
- `--r-sm:   10px` — inputs, small UI elements
- `--r-md:   18px` — cards
- `--r-lg:   24px` — large panels
- `--r-xl:   32px` — extra-large panels / hero blocks
- `--r-pill: 999px` — buttons, chips, badges

## Atmosphere and Depth
Gradients:
- Hero atmosphere (dark): deep navy base (`--c-navy`) with decorative radial orbs in teal/violet
- CTA accent: `linear-gradient(135deg, #007f97 0%, #4c3f77 100%)`
- Kicker gradient text: `linear-gradient(90deg, #007f97 0%, #5533ff 100%)` with `-webkit-background-clip: text`

Shadows:
```
--sh-card:    0 8px 24px rgba(5,17,38,0.08)
--sh-feature: 0 16px 40px rgba(5,17,38,0.16)
--sh-glass:   0 10px 30px rgba(5,17,38,0.18)
```

Glass system (tokenized):
```
--glass-white-42: rgba(255,255,255,0.42)
--glass-white-58: rgba(255,255,255,0.58)
--glass-white-08: rgba(255,255,255,0.08)
--glass-white-12: rgba(255,255,255,0.12)
--glass-border:   rgba(255,255,255,0.22)
--glass-border-s: rgba(255,255,255,0.46)
--glass-hi:       rgba(255,255,255,0.60)
```

Utility classes: `.glass-dark` (heavy blur, deep overlay), `.glass-mid` (lighter blur, mid overlay)

Glass policy:
- Use glass only in hero chips, key highlight cards, and selected KPI blocks.
- Avoid glass behind long text.
- Never stack more than 2 translucent layers.

## Components (Cross-Page Consistency)
Buttons:
- `.btn-primary`: teal-to-cyan gradient (`#007f97 → #00c4d4`), white text, pill radius, 44px min height.
- `.btn-accent`: teal-to-violet gradient (`#007f97 → #5533ff`), white text. ← default hero CTA style.
- `.btn-ghost`: transparent fill, teal border (`--c-teal`), teal text. Hover: soft teal wash.
- `.btn-sm`: 38px min height, smaller padding/font.
- All buttons use `has-icon` + `.btn-icon` pattern for inline SVG icons.
- Hover: `filter: brightness(1.1)` + glow box-shadow matching gradient color. Subtle, not playful.

Cards:
- Standard cards use light surfaces with soft border and shadow.
- Feature cards may use indigo/mauve gradient accents.
- Keep copy compact and scan-friendly.

Chips and trust badges:
- Use rounded pills with small icon/dot and short claims.
- Do not overuse; 2 to 4 per section max.

Forms:
- Always visible labels.
- 42 to 46px input height.
- Focus ring: 0 0 0 3px rgba(0, 127, 151, 0.18)

## Navigation and Shared Layout
- **Single source of truth**: `js/shared-layout.js` injects the nav via `<div id="site-header-placeholder">` and handles all toggle/dropdown logic through document-level event delegation.
- **Never add inline nav scripts** to individual pages — they conflict and cause a double-toggle bug.
- Pages only need: `<script src="/js/shared-layout.js"></script>` and the placeholder div.
- Guard: `data-shared-nav-init="1"` on `<html>` prevents double-init.
- Full details in the nav architecture memory (`/memories/repo/nav-architecture.md`).

## Primary CTA Channel
- WhatsApp is the primary conversion action across all pages.
- Link: `https://api.whatsapp.com/send?phone=526647149135`
- Backup anchors: `#contacto` for on-page contact form.
- Phone number: `+52-664-714-9135`

## Content Language
- All user-facing copy is in **Spanish (Mexico)**.
- Headlines, CTAs, body copy, form labels, and legal pages are all Spanish.
- Brand name "Activo Medical Marketing" stays in English.

## Site Architecture
The site is organized around city/specialty landing pages, not generic service pages:

```
/ (index.html)                   ← homepage, single source of visual truth
/marketing-medico-tijuana/
  /google-ads-medicos/
  /paginas-web-para-medicos/
  /seo-para-medicos/
/marketing-medico-guadalajara/
  /google-ads-medicos/
  /paginas-web-para-medicos/
  /seo-para-medicos/
/marketing-dentistas-tijuana/
/marketing-cirujanos-plasticos-tijuana/
/blog/                           ← CMS-driven blog (separate CSS + JS bundle)
/politica-de-privacidad/
/terminos-de-uso/
```

Each city/specialty page is a standalone HTML file with page-scoped `<style>` for unique section layouts. Global tokens and shared components come from `css/style.css` + `css/sections.css` + `js/shared-layout.js`.

## Blog System
- Blog lives in `blog/` with its own CSS (`blog/styles/`), scripts (`blog/scripts/`), and CMS client (`blog/scripts/cms-client.js`).
- CMS integration via `lib/cms.js`.
- Blog pages share nav/footer via `shared-layout.js` but have independent visual scope.

## Page Translation Rules (How to Extend Homepage Style)
Every page should include:
1. Sticky header via `shared-layout.js` — identical behavior and CTA to homepage.
2. Hero block with strong city/specialty headline, one lead paragraph, and a clear WhatsApp CTA.
3. Trust row (metrics, badges, or proof points) near top third of page.
4. Content sections with alternating surface contrast (`--c-surface-warm` / `--c-surface-sage` / `--c-navy`).
5. Strong conversion block before footer (dark navy CTA section with orb decorations).
6. Footer via `shared-layout.js` — identical to homepage.

### City/Specialty Landing Pages
- Hero with city name + specialty in `<h1>`, surface-level proof of local results.
- Service modules mirror homepage card rhythm; use `--r-md` cards with `--sh-card`.
- Include process timeline and a clear CTA block after each major section.
- Page-scoped styles go in a `<style>` block in the `<head>` — do not modify global CSS for page-specific layouts.

### Google Ads Landing Pages (`/google-ads-medicos/`)
- Emphasize measurable ROI, cost-per-patient, and campaign transparency.
- Include metrics/KPI cards in homepage style.
- Data-first copy; avoid vague claims.

### Website Design Landing Pages (`/paginas-web-para-medicos/`)
- Lead with patient-first visual hierarchy and mobile-first messaging.
- Show device mockups where relevant.
- Emphasize credibility + conversion + SEO as unified outcome.

### SEO Landing Pages (`/seo-para-medicos/`)
- Lead with local search visibility and organic patient acquisition.
- Include process timeline and authority-building rationale.

### Legal Pages (Privacy / Terms)
- Clean, readable layout. Light surface, no decorative complexity.
- Same header/footer. Typography tokens only. No hero section needed.

### Services Page
- Hero with specialty promise and vertical-specific proof.
- Service modules should mirror homepage card rhythm.
- Include process timeline and clear CTA after each major block.

### About Page
- Hero + mission statement in homepage type style.
- Timeline and expertise blocks using same card language.
- Keep emotional tone trustworthy and clinical, not flashy.

### Case Studies Page
- Lead with outcomes and methodology.
- Use KPI cards visually aligned with homepage metric style.
- Keep before/after storytelling concise and data-first.

### FAQ Page
- Use compact accordion cards matching border/radius tokens.
- Keep hierarchy strong: category title, then short question blocks.
- End with contact CTA in same visual language as homepage.

### Contact Page
- Keep form visual style identical to homepage contact section.
- Include trust badge row plus short response-time expectation.
- Avoid decorative overload; keep focus on conversion clarity.

## Motion
- Section reveal: fade plus 16px rise, 350ms ease-out.
- Card hover: slight lift and shadow increase.
- Button hover: slight darken, optional 2px icon nudge.
- No bounce, no exaggerated elastic effects.

## Voice and Content Tone
- Expert, reassuring, concise.
- Benefit-first copy, plain language, no hype phrases.
- Prioritize proof: outcomes, retention, patient acquisition quality.

## Accessibility
- Maintain WCAG AA contrast minimum.
- Tap targets at least 44x44.
- Keep keyboard focus visible.
- Do not rely on color alone to communicate meaning.

## Implementation Guardrails
- Reuse existing tokens and components before creating new variants.
- Do not introduce new accent colors without explicit approval.
- Keep new pages responsive with same breakpoint behavior as homepage.
- Ensure mobile keeps hierarchy clear: headline, proof, CTA.

## Final Cross-Page QA Checklist
- Does it feel like the same brand as homepage at first glance?
- Are typography, spacing, and button styles consistent?
- Are glass and gradients used sparingly and intentionally?
- Is there one clear CTA path per major section?
- Does mobile preserve readability and conversion flow?
