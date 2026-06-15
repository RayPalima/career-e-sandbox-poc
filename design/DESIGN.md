---
name: Cognitive Blueprint
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#494455'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#7a7486'
  outline-variant: '#cac3d8'
  surface-tint: '#663adf'
  primary: '#4000ae'
  on-primary: '#ffffff'
  primary-container: '#5826d1'
  on-primary-container: '#c9b9ff'
  inverse-primary: '#cdbdff'
  secondary: '#006591'
  on-secondary: '#ffffff'
  secondary-container: '#39b8fd'
  on-secondary-container: '#004666'
  tertiary: '#1e18b2'
  on-tertiary: '#ffffff'
  tertiary-container: '#393ac8'
  on-tertiary-container: '#bcbdff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e7deff'
  primary-fixed-dim: '#cdbdff'
  on-primary-fixed: '#1f005f'
  on-primary-fixed-variant: '#4e13c8'
  secondary-fixed: '#c9e6ff'
  secondary-fixed-dim: '#89ceff'
  on-secondary-fixed: '#001e2f'
  on-secondary-fixed-variant: '#004c6e'
  tertiary-fixed: '#e1e0ff'
  tertiary-fixed-dim: '#c0c1ff'
  on-tertiary-fixed: '#07006c'
  on-tertiary-fixed-variant: '#2f2ebe'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
  surface-background: '#F8FAFC'
  surface-canvas: '#ffffff'
  accent-success: '#006591'
  accent-error: '#ba1a1a'
  border-subtle: '#e2e8f0'
  scrollbar-thumb: '#cbd5e1'
typography:
  display:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
  caption:
    fontFamily: Geist
    fontSize: 10px
    fontWeight: '400'
    lineHeight: '1.2'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  xs: 4px
  base: 8px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 24px
  margin: 32px
---

## Brand & Style
The brand identity is rooted in the concept of a "Career Sandbox"—a precise, analytical, yet exploratory environment for professional discovery. The target audience includes high-achieving professionals and researchers who value data-driven insights over generic advice.

The visual style is **Corporate Modern with a Technical Edge**. It utilizes a clean, systematic layout inspired by developer tools, characterized by structured information density, high-quality typography, and a "fidelity" color approach. The UI evokes a sense of clarity, intelligence, and professional rigor, balancing the seriousness of career planning with the fluidity of a "sandbox" simulation.

## Colors
The palette is dominated by a deep "Fidelity Purple" (#5826d1) which serves as the primary anchor for actions and branding. This is supported by a range of functional blues and indigos for secondary data visualization and tertiary highlights. 

The background strategy uses a very light Slate (#F8FAFC) to differentiate the global background from the pure white (#ffffff) used for primary content cards and input areas. Neutral tones are strictly derived from the Slate/Blue-Grey family to maintain a cool, professional temperature. High-contrast red is reserved specifically for "Flagged Avoidance" or error states to ensure immediate cognitive recognition of friction points.

## Typography
The system relies exclusively on **Geist**, a typeface designed for precision and technical readability. 

- **Display & Headlines:** Use tighter letter spacing and heavier weights (600-700) to create a strong information hierarchy.
- **Body Text:** Maintains a generous line height (1.6) to facilitate the reading of complex career data and analytical descriptions.
- **Labels:** Small labels use increased font weight (600) and occasional uppercase styling with tracking to distinguish metadata from content.
- **Mobile Scaling:** Large headlines scale down significantly on mobile to maintain vertical rhythm without overwhelming the viewport.

## Layout & Spacing
The layout follows a **Hybrid Fixed-Fluid Grid** model. 

- **Desktop (1280px+):** A 3-column architecture is used. Column 1 (Left Sidebar) is fixed at 320px for persistent controls. Column 2 (Main Canvas) is fluid.
- **Main Canvas:** Content is organized using a Bento-style grid with a standard 24px gutter. Primary recommendations span the full width of the canvas, while secondary items split into a 2-column layout.
- **Rhythm:** An 8px base unit drives all padding and margin increments. Page margins are set to a generous 32px to ensure the interface feels airy despite high information density.
- **Breakpoints:** On tablet and mobile, the sidebar collapses into a top-level drawer or flows into a single-column vertical stack.

## Elevation & Depth
Depth is primarily communicated through **Tonal Layering** and **Low-Contrast Outlines** rather than heavy shadows.

- **Level 0 (Background):** #F8FAFC — The global page container.
- **Level 1 (Surface):** #FFFFFF — Main cards and navigation bars. These use a very subtle `0 1px 3px rgba(0, 0, 0, 0.05)` shadow and a 1px border (#e2e8f0).
- **Interactive States:** Hovering over cards increases the shadow spread slightly to `0 4px 20px rgba(15, 23, 42, 0.05)` to suggest clickability without breaking the flat aesthetic.
- **Accents:** Active selection states (like the MBTI accordion) use a tinted border (Primary-Container) to draw the eye.

## Shapes
The shape language is **Soft and Precise**. 

- **Standard Elements:** Buttons, input fields, and small containers use a 0.25rem (4px) radius.
- **Large Containers:** Content cards and sections use a 0.75rem (12px) radius for a more modern, approachable feel.
- **Pill Elements:** Tags, chips, and segment controllers use a 'full' (999px) radius to distinguish them as discrete, interactive metadata units.

## Components
- **Buttons:** Primary buttons are high-saturation (Primary-Container) with white text. Secondary buttons use a subtle outline or Ghost style.
- **Accordion:** Active accordions should have a distinct border color and a subtle interior shadow to denote an "open" container state.
- **Progress/Confidence Bars:** Use a dual-layered approach with a neutral track and a vibrant primary fill. Add a subtle pulse animation to the fill to indicate "live" calculation.
- **Bento Cards:** Cards are the primary container. They must include a clear header area for tags and a footer area separated by a subtle 1px divider for "Pros/Cons" or metadata.
- **Inputs & Sliders:** Range sliders should have a high-contrast thumb (White with Primary border) and a neutral track. Select menus should use the standard body-md font size for high legibility.
- **Chips:** Categorization chips use a background-tinted version of the primary or secondary color with bolded label-sm text.