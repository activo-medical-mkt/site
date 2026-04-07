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
- Logos:
  - Assets/Logos/logo-white.png
  - Assets/Logos/activo-logo-white.png
- Favicon set:
  - Assets/Logos/favicon.ico
  - Assets/Logos/favicon-32x32.png
  - Assets/Logos/favicon-48x48.png
  - Assets/Logos/favicon-96x96.png
- Fonts:
  - Assets/Fonts/MavenPro-Regular.ttf
  - Assets/Fonts/MavenPro-Medium.ttf
  - Assets/Fonts/MavenPro-SemiBold.ttf
  - Assets/Fonts/MavenPro-Bold.ttf
  - Assets/Fonts/MavenPro-ExtraBold.ttf
  - Assets/Fonts/MavenPro-Black.ttf
  - Assets/Fonts/ff-mark-pro-black.otf

## Color System (Locked)
- Primary Teal: #007F97
- Deep Navy: #051126
- Indigo: #4C3F77
- Mauve: #7C587F
- Soft Sage: #A4BCBC

UI mapping:
- Primary CTA: #007F97
- Primary CTA hover: #0A6D82
- Main heading text: #051126
- Body text: #324A63
- Surface: #F4F8FC
- Surface alt: #EAF1F8
- Divider: #D5E1ED
- Positive metric: #2BCB74

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

Spacing rhythm (8px grid):
- 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96

Radius:
- Inputs/small UI: 10px
- Cards: 18px
- Large panels: 24px
- Pills/buttons: 999px

## Atmosphere and Depth
Gradients:
- Hero atmosphere: linear-gradient(135deg, #EAF4FF 0%, #D8E9FA 45%, #C8DDF5 100%)
- CTA accent: linear-gradient(135deg, #007F97 0%, #4C3F77 100%)

Shadows:
- Card shadow: 0 8px 24px rgba(5, 17, 38, 0.08)
- Feature shadow: 0 16px 40px rgba(5, 17, 38, 0.14)

Glass policy:
- Use glass only in hero chips, key highlight cards, and selected KPI blocks.
- Avoid glass behind long text.
- Never stack more than 2 translucent layers.

## Components (Cross-Page Consistency)
Buttons:
- Primary: filled teal or dark navy, white text, pill radius, 44px minimum height.
- Secondary: white background, navy text, subtle border.
- Hover should be subtle, not playful.

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

## Page Translation Rules (How to Extend Homepage Style)
Every page should include:
1. Sticky header identical to homepage behavior and CTA style.
2. Hero block with strong headline, one lead paragraph, and clear primary action.
3. Trust row (metrics, badges, or proof points) near top third of page.
4. Content sections with alternating surface contrast.
5. Strong conversion block before footer.
6. Footer style and spacing identical to homepage.

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
