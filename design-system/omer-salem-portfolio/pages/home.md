# Home Page Override — Soft Nebula 3D

> Overrides `MASTER.md` for the main portfolio page (`src/`). Supersedes the neon Cyberpunk style.

## Style

**Soft UI Evolution on dark** — plush, lit-from-top-left surfaces floating over an ambient nebula.
No neon centered glows, no hard section bands, no square corners.

## Palette (Tailwind token → value)

| Token | Value | Role |
|-------|-------|------|
| `chrome-black` | `#110F24` | Page base (plum-indigo, never pure black) |
| `cyber-cyan` | `#8EE3F5` | Aqua accent |
| `cyber-purple` | `#A595FF` | Lavender accent / focus |
| `cyber-pink` | `#F7A1B8` | Rose accent |
| `chrome-orange` | `#FF9E7D` | Peach accent / brand dot |
| `cyber-emerald` | `#7FE0B8` | Mint status |
| `cyber-amber` | `#F7CF86` | Butter highlight |

Body copy on surfaces: `#C9C4E3`. Text on pastel fills: `#1A1433` (never white).

## Typography

- Display: **Sora** 600–800, tracking -0.02em
- Body: **DM Sans**
- Labels / metadata: **DM Mono**
- Arabic: Cairo (display) + IBM Plex Sans Arabic (body) — unchanged

## Depth system

| Utility | Use |
|---------|-----|
| `shadow-soft-1` / `.soft-chip` | Chips, tags, small pills |
| `shadow-soft-2` / `.soft-surface` / `.chrome-panel` | Panels, rows, trays |
| `shadow-soft-3` | Hero cards, modals |
| `shadow-soft-inset` | Pressed / recessed wells (URL bars, tab tracks) |
| `.btn-plush` | Primary CTA (pastel gradient, springs up on hover, presses in on active) |
| `.btn-soft` | Secondary / nav buttons (frosted) |

Radii: chips `rounded-full`, panels `rounded-3xl`, hero cards/modals `rounded-[2rem]`.
Accent glows are soft **downward** colored lifts (`0 Ypx Bpx -Spx color`), never `0 0 Npx`.

## 3D scenes

Metals need `scene.environment` (pastel canvas gradient) or they render black.
Use pearl chrome (`#F4F0FF`, metalness ~0.9, roughness ~0.14) and lilac satin (`#3A3366`).

## Motion

Spring ease `cubic-bezier(0.34, 1.56, 0.64, 1)` for press/lift (220ms); ambient aurora drift 14–18s.
`prefers-reduced-motion` and the Reduced Effects toggle still disable tilt and drift.
