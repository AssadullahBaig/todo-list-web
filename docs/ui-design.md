//UI CODES FOR TASKS PAGE
---
name: Obsidian Precision
colors:
  surface: '#131315'
  surface-dim: '#131315'
  surface-bright: '#39393b'
  surface-container-lowest: '#0e0e10'
  surface-container-low: '#1c1b1d'
  surface-container: '#201f22'
  surface-container-high: '#2a2a2c'
  surface-container-highest: '#353437'
  on-surface: '#e5e1e4'
  on-surface-variant: '#c4c7c9'
  inverse-surface: '#e5e1e4'
  inverse-on-surface: '#313032'
  outline: '#8e9193'
  outline-variant: '#444749'
  surface-tint: '#c4c7c9'
  primary: '#ffffff'
  on-primary: '#2d3133'
  primary-container: '#e0e3e5'
  on-primary-container: '#626567'
  inverse-primary: '#5c5f61'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#ffffff'
  on-tertiary: '#472a00'
  tertiary-container: '#ffddb8'
  on-tertiary-container: '#8d5900'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e0e3e5'
  primary-fixed-dim: '#c4c7c9'
  on-primary-fixed: '#191c1e'
  on-primary-fixed-variant: '#444749'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#131315'
  on-background: '#e5e1e4'
  surface-variant: '#353437'
typography:
  headline-xl:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.025em
  headline-xl-mobile:
    fontFamily: Geist
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.015em
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: -0.006em
  body-sm:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: -0.004em
  label-md:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0em
  label-code:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: -0.02em
  label-kbd:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style

This design system delivers a high-craft, technical dark aesthetic engineered for power users, developers, and product teams. It prioritizes spatial density, extreme clarity, and tactile keyboard-first efficiency. 

The aesthetic is built on precision minimalism and utilitarian elegance, drawing inspiration from technical workspaces where the interface recedes to let user content lead. Depth is communicated not through aggressive drop shadows, but via disciplined tonal stepping, laser-thin 1px borders, and deliberate optical contrast. Every state transition is instant and purposeful, creating an atmosphere of speed, calculated focus, and industrial rigor.

## Colors

The palette operates on a calibrated neutral spectrum spanning pitch zinc and deep slate, balanced by high-contrast typographic whites and sparse, highly functional indicators.

### Base & Surfaces
- **Canvas / Root Background:** `#09090b` (Deep Zinc Black)
- **Sub-surface / Structural Panels:** `#0f172a` (Deep Slate Slate)
- **Elevated Surface / Cards / Flyouts:** `#18181b` (Zinc 900)
- **Interactive Hover Surface:** `#27272a` (Zinc 800)

### Borders & Dividers
- **Hairline Structural Border:** `#27272a` (Default 1px stroke for cards, dividers, tables)
- **Subtle Surface Outline:** `#1e293b` (Cool slate stroke for internal panels)
- **Active / Focused Border:** `#f8fafc` (High-contrast focus ring and active indicator)

### Typography
- **Primary Text:** `#f8fafc` (High-contrast off-white for headlines, active states, values)
- **Secondary Text:** `#a1a1aa` (Zinc 400 for structural labels, secondary metadata)
- **Tertiary / Dimmed Text:** `#64748b` (Slate 500 for shortcuts, placeholders, inactive icons)

### Functional Signals
- **Success / Completed:** `#10b981` (Emerald 500)
- **Priority / Warning:** `#f59e0b` (Amber 500)
- **Critical / Danger:** `#ef4444` (Rose 500)

## Typography

The type hierarchy is optimized for dense operational views and information scanning. 

- **Geist** serves as the primary driver for both headlines and running text, providing neutral geometric balance with slightly compressed tracking at larger scales for a cohesive, technical feel.
- **JetBrains Mono** handles code snippets, commit hashes, technical timestamps, keyboard shortcut keys (`<kbd>`), and tabular numbers in numeric tables.
- Letter spacing is intentionally negative on larger headlines (`-0.025em`) to maintain tightness, while small labels preserve neutral tracking (`0em`) to ensure legibility on dark backdrops.

## Layout & Spacing

The layout is built around a flexible, dense workspace with a standard 8-point spatial rhythm subdivided into 4px micro-increments.

### Layout Mechanics
- **Grid Structure:** Desktop layouts utilize a multi-pane split view (fixed 240px sidebar, optional 320px contextual inspector, fluid central feed) conforming to a fluid-column canvas with a 1440px max readability cap for editorial panes.
- **Micro Rhythms:** Component interiors leverage compact vertical gaps (`space-xs` to `space-sm`) to maximize visible surface information.
- **Responsive Adaptations:**
  - **Desktop (>= 1024px):** Fixed navigation sidebars, dual-pane split content, `margin-desktop` (2rem), and `gutter-desktop` (1.5rem).
  - **Tablet (768px - 1023px):** Collapsible sidebar drawer, unified list/detail transition views, `1rem` margins.
  - **Mobile (< 768px):** Single-column flow, bottom-sheet overlays for modal contexts, zero horizontal margin on full-bleed data lists with internal `space-md` edge padding.

## Elevation & Depth

Visual hierarchy rejects exaggerated blurred shadows in favor of **Tonal Layering** and **Hairline Stroke Boundaries**.

1. **Surface 0 (Base):** `#09090b` canvas. No elevation, no border.
2. **Surface 1 (Cards, Groups, Sidebars):** `#0f172a` or `#18181b` with a continuous `1px solid #27272a` boundary.
3. **Surface 2 (Popovers, Flyouts, Menus):** `#18181b` with `1px solid #3f3f46` hairline border and an ambient directional shadow: `0 10px 30px -10px rgba(0, 0, 0, 0.7)`.
4. **Surface 3 (Command Palettes, Modals):** `#18181b` centered layer with a 1px composite outline (`#3f3f46` top edge light simulation, `#27272a` bottom) backed by an ultra-soft backlight glow: `0 0 0 1px #27272a, 0 20px 50px -12px rgba(0, 0, 0, 0.9)`.
5. **Backdrop Blurs:** Modals and fixed headers use `backdrop-filter: blur(12px)` over a 70% transparent base (`rgba(9, 9, 11, 0.7)`) to maintain context through ambient occlusion.

## Shapes

The geometric signature uses tight, architectural corner radii (`roundedness: 1`). 

- Standard inputs, buttons, chips, and command line list elements use `4px` (`0.25rem`) to `6px` radii.
- Medium containers, cards, and modal sheets scale to `8px` (`0.5rem`).
- Pills and circular shapes are restricted strictly to status badges, dot indicators, and user avatars. Avoid fully rounded pill buttons to maintain the industrial, technical posture of the system.

## Components

### Buttons
- **Primary:** High-contrast solid pure white background (`#f8fafc`) with deep zinc text (`#09090b`), weight `500`, 4px radius. On hover: `#f1f5f9` with subtle inner specular highlight.
- **Secondary / Slate:** Deep solid slate surface (`#0f172a`) with a 1px `#27272a` border and `#f8fafc` text. Hover: border color transitions to `#3f3f46`, background to `#18181b`.
- **Ghost:** Transparent background, `#a1a1aa` text. Hover: `#18181b` background, `#f8fafc` text.

### Inputs & Search Bars
- Background: `#09090b` inset into `#18181b` containers.
- Border: 1px `#27272a`. Focus: 1px solid `#f8fafc`, outline none (no fuzzy colored focus rings).
- Placeholders: `#64748b`. Text: `#f8fafc`.
- Height: 32px (compact) or 36px (default).

### Cards & Panels
- Background: `#18181b`.
- Border: 1px `#27272a`.
- Padding: 16px (`space-lg`).
- Interactive Cards: Transition border from `#27272a` to `#3f3f46` on pointer hover with no positional translation.

### Chips & Badges
- Background: `#09090b` or subtle tinted washes (`rgba(16, 185, 129, 0.1)` for success).
- Border: 1px hairline matching the content tone (e.g., `rgba(16, 185, 129, 0.2)`).
- Typography: `label-code` or `label-md`.

### Command Palette (K-Bar) & Context Menus
- Background: `#18181b` with a 1px border (`#27272a`).
- Selection Row: Active row is `#27272a` with an inset 2px high-contrast vertical white pill on the left margin or full soft zinc background highlight.
- Keyboard Shortcuts: Contained inside `<kbd>` elements: `#09090b` background, 1px border `#27272a`, font `label-kbd`, color `#a1a1aa`.

### Checkboxes & Radios
- Size: 14px x 14px.
- Unchecked: `#09090b` background with 1px `#27272a` border.
- Checked: `#f8fafc` background with `#09090b` checkmark icon for immediate visual confirmation.