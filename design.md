# Medical Marketing Site - Design Direction

## Objective
Replicate the visual language of the reference landing page with a clean, premium, medical-tech feel using the local assets in the Assets folder and the approved color palette.

This document is the design source of truth for UI build, component styling, and content tone.

## Style DNA (What defines her look)
- Soft, trust-driven healthcare aesthetic with modern product-design polish.
- Bold typography in the hero, then highly structured information blocks.
- Light blue atmospheric backgrounds, glassy cards, and gentle depth.
- Strong glassmorphism language: translucent layers, blur, soft highlights.
- Liquid glass accents on hero chips, stat pills, and featured panels.
- Rounded geometry everywhere: cards, buttons, chips, input fields.
- High contrast for key actions and KPIs, low-noise surfaces for readability.
- Dense but organized layout: many sections, each clearly segmented.

## Brand Assets To Use
- Logos:
  - Assets/Logos/logo-white.png
  - Assets/Logos/activo-logo-white.png
- Icon:
  - Assets/icon-white.png
- Fonts:
  - Assets/Fonts/MavenPro-Regular.ttf
  - Assets/Fonts/MavenPro-Medium.ttf
  - Assets/Fonts/MavenPro-SemiBold.ttf
  - Assets/Fonts/MavenPro-Bold.ttf
  - Assets/Fonts/MavenPro-ExtraBold.ttf
  - Assets/Fonts/MavenPro-Black.ttf
  - Assets/Fonts/ff-mark-pro-black.otf

## Core Color System (From Assets/color-palette.png)
Exact sampled swatches:
- Teal: #007F97
- Soft Sage: #A4BCBC
- Mauve: #7C587F
- Indigo: #4C3F77
- Deep Navy: #051126

Recommended UI mapping:
- Primary action: #007F97
- Primary hover: #0A6D82
- Primary soft background: #E7F4F6
- Headline text: #051126
- Body text: #324A63
- Card background: #F4F8FC
- Section background alt: #EAF1F8
- Accent 1 (premium): #4C3F77
- Accent 2 (editorial/feature): #7C587F
- Borders/dividers: #D5E1ED
- Success/medical highlight: #2BCB74

## Typography System
Use Maven Pro for most UI text and ff-mark-pro-black only for occasional hero emphasis.

### Type Scale
- Display XL: 72/0.95/800 (desktop hero headline)
- Display L: 56/1.0/800
- H1: 44/1.1/800
- H2: 36/1.15/800
- H3: 28/1.2/700
- H4: 22/1.25/700
- Body L: 18/1.6/500
- Body: 16/1.6/500
- Body S: 14/1.5/500
- Label/Meta: 12/1.4/600

### Typographic Behavior
- Headlines use uppercase selectively (hero and section labels) to mimic the bold editorial tone.
- Keep paragraph width between 50 and 70 characters for readability.
- Tight headline tracking (-1% to -2%) and normal body tracking.

## Layout & Grid Rules
### Breakpoints
- Mobile: 360-767
- Tablet: 768-1023
- Desktop: 1024-1439
- Wide: 1440+

### Container
- Max width: 1200px
- Desktop side padding: 24px
- Tablet side padding: 20px
- Mobile side padding: 16px

### Spacing Scale
Use an 8px rhythm:
- 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96

### Radius Scale
- Small UI controls: 10px
- Cards: 18px
- Large feature blocks: 24px
- Pills/chips: 999px

## Visual Treatment Tokens
### Shadows
- Shadow 1 (cards): 0 8px 24px rgba(5, 17, 38, 0.08)
- Shadow 2 (featured cards): 0 16px 40px rgba(5, 17, 38, 0.14)

### Transparency & Glass Surfaces
- Glass base: rgba(255, 255, 255, 0.42)
- Glass strong: rgba(255, 255, 255, 0.58)
- Glass border: 1px solid rgba(255, 255, 255, 0.46)
- Glass highlight stroke: inset 0 1px 0 rgba(255, 255, 255, 0.62)
- Backdrop blur:
  - Soft: blur(10px) saturate(125%)
  - Strong: blur(16px) saturate(145%)

### Gradients
- Hero atmosphere:
  - linear-gradient(135deg, #EAF4FF 0%, #D8E9FA 45%, #C8DDF5 100%)
- CTA tint:
  - linear-gradient(135deg, #007F97 0%, #4C3F77 100%)
- Liquid glass panel:
  - linear-gradient(140deg, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0.24) 45%, rgba(255,255,255,0.08) 100%)
- Cool ambient wash:
  - radial-gradient(120% 120% at 0% 0%, rgba(0,127,151,0.20) 0%, rgba(76,63,119,0.10) 38%, rgba(234,244,255,0.00) 72%)

### Stroke/Border
- Default border: 1px solid #D5E1ED
- Active border: 1px solid #007F97

## Glassmorphism & Liquid Glass Rules
### Where to apply
- Hero floating chips and micro stat badges.
- Service cards and feature side cards.
- Appointment form container and selected inputs.
- Top navigation CTA container on desktop.

### Where not to apply
- Long paragraph backgrounds (reduce readability).
- Dense table/data blocks.
- Footer link columns.

### Layer recipe
Use this order in glass components:
1. Background gradient wash.
2. Translucent fill.
3. Backdrop blur.
4. Inner top highlight.
5. Soft outer shadow.

### Opacity discipline
- Default glass opacity between 0.36 and 0.62.
- Do not stack more than 2 glass layers over each other.
- Keep text over glass at deep navy (#051126) or white with high contrast.

### CSS utility pattern
```css
.glass {
  background: linear-gradient(140deg, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0.24) 45%, rgba(255,255,255,0.08) 100%);
  border: 1px solid rgba(255, 255, 255, 0.46);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.62),
    0 10px 30px rgba(5, 17, 38, 0.12);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
  backdrop-filter: blur(14px) saturate(140%);
}
```

## Page Blueprint (Section by Section)
Follow this architecture to stay faithful to the reference style:

1. Sticky header with compact nav and rounded CTA button.
2. Hero split layout:
   - Left: large stacked headline + short paragraph + primary CTA.
   - Right: doctor or healthcare visual in a soft circular frame.
   - Floating info chips for trust metrics and availability.
3. Service quick cards row (3-4 cards), one featured in stronger color.
4. Intro split section with image/media card + text + dual CTA actions.
5. KPI band with 4 numbers (funding, patients, satisfaction, specialists).
6. Feature/story section with large media panel and side stat card.
7. Doctor carousel/cards section.
8. Department grid (8 cards), concise copy and icon per card.
9. Blog/news card trio.
10. Appointment form panel.
11. Footer with logo, newsletter input, social icons, and link columns.

## Component Library Spec
### Buttons
- Primary:
  - Background: #051126 or #007F97
  - Text: #FFFFFF
  - Radius: 999px
  - Height: 44px
  - Padding X: 20-24px
- Secondary:
  - Background: #FFFFFF
  - Border: 1px solid #D5E1ED
  - Text: #051126
- Icon button:
  - 36x36 circle, centered icon

### Cards
- Default card background: #F4F8FC
- Featured card background: gradient or #4C3F77 / #007F97
- Glass variant card: translucent white gradient + blur + subtle border glow
- Title + 1-2 lines body max to preserve density and scanability

### Chips/Badges
- Green status chip for labels like DOCTORS, APPOINTMENT, BLOG
- Chip background: #DDFBEA
- Chip text: #0F8A43
- Radius: 999px, height: 24px

### Form Fields
- Height: 42-46px
- Border radius: 10px
- Border default: #D5E1ED
- Focus ring: 0 0 0 3px rgba(0, 127, 151, 0.18)

## Image & Illustration Direction
- Prioritize medical imagery with cool temperature and high brightness.
- Use soft masks (rounded rectangles, circles) instead of hard crops.
- Maintain realistic photos, mixed with clinical-tech visuals (DNA, organs, scans).
- Keep image overlays subtle and avoid heavy dark filters.

## Motion Principles
Keep motion minimal, premium, and informative:
- Section reveal: fade + 16px rise, 350ms, ease-out.
- Card hover: translateY(-4px) + shadow increase.
- Glass hover: +2 blur and +6% brightness, max 220ms.
- Button hover: slight darken + icon nudge (2px).
- Avoid playful bounce effects.

## Accessibility & UX Constraints
- Body text contrast minimum WCAG AA.
- Interactive controls minimum touch target 44x44.
- Never use color alone to convey medical status.
- Form labels always visible, not placeholder-only.
- Keyboard focus must be clearly visible.

## CSS Variable Starter Tokens
Use these tokens as implementation baseline:

```css
:root {
  --color-primary: #007F97;
  --color-primary-hover: #0A6D82;
  --color-primary-soft: #E7F4F6;
  --color-navy: #051126;
  --color-indigo: #4C3F77;
  --color-mauve: #7C587F;
  --color-sage: #A4BCBC;
  --color-text: #324A63;
  --color-surface: #F4F8FC;
  --color-surface-alt: #EAF1F8;
  --color-border: #D5E1ED;
  --color-success: #2BCB74;

  --glass-fill: rgba(255, 255, 255, 0.42);
  --glass-fill-strong: rgba(255, 255, 255, 0.58);
  --glass-border: rgba(255, 255, 255, 0.46);
  --glass-highlight: rgba(255, 255, 255, 0.62);

  --radius-sm: 10px;
  --radius-md: 18px;
  --radius-lg: 24px;
  --radius-pill: 999px;

  --shadow-card: 0 8px 24px rgba(5, 17, 38, 0.08);
  --shadow-feature: 0 16px 40px rgba(5, 17, 38, 0.14);
  --shadow-glass: 0 10px 30px rgba(5, 17, 38, 0.12);

  --blur-glass-soft: blur(10px) saturate(125%);
  --blur-glass-strong: blur(16px) saturate(145%);
}
```

## Content Voice Guide
- Tone: expert, reassuring, clear, not promotional hype.
- Sentence style: concise benefit-first messaging.
- Prioritize trust signals: experience years, patient outcomes, specialist count.
- Use action labels that sound clinical and helpful: Explore Care, Book Appointment, Meet Specialists.

## Build Order Recommendation
1. Define tokens (colors, type, spacing, radius, shadows).
2. Build shell (header, footer, container, section spacing).
3. Build reusable components (buttons, cards, chips, form controls).
4. Implement hero and KPI sections first.
5. Implement departments, doctors, and blog grids.
6. Finish appointment form and responsive tuning.

## Final Quality Checklist
- Visual hierarchy matches reference (strong hero + structured sections).
- Palette usage is consistent and not oversaturated.
- Glassmorphism appears intentional: hero chips, cards, and form panel only.
- Transparency always preserves contrast and legibility.
- Components share consistent radius, spacing, and shadows.
- Desktop and mobile both keep the premium clinical look.
- Typography remains clean, bold, and highly readable.
