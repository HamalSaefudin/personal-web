# DESIGN.md

Direction: claude-sonnet-5-5 — "career ledger"
Source bid: ../design-bids/cv-2026-11-19/bids/claude-sonnet-5-5.html

## Concept

An editorial ledger, not a landing page. The page reads like a printed record: oversized serif name, monospaced meta labels, hairline rules and a two-column rhythm where a sticky section label sits left and the contents sit right. Work history is drawn twice — once as a colour-coded timeline chart, once as a ruled ledger — because dates are the thing recruiters actually verify. A phone-shaped card in the hero restates the current role, tying the layout back to the subject (mobile apps). Nothing decorative: no gradients, no glass, no shadows except the phone's hard offset block.

## Color

| Token | Value (light) | Value (dark) | Use |
|---|---|---|---|
| `--bg` | `#F2EFE8` | `#12110E` | page |
| `--surface` | `#E9E5DA` | `#1C1A16` | phone screen, contact band in dark |
| `--ink` | `#16150F` | `#EDEAE0` | body text, rules, filled buttons |
| `--muted` | `#5A574D` | `#A9A599` | labels, secondary copy |
| `--line` | `#CBC5B5` | `#37342C` | 1px dividers, chart grid |
| `--accent` | `#B3300E` | `#FF8156` | one accent: section index, current role, focus ring, links |
| `--on-ink` | `#F2EFE8` | `#12110E` | text on filled ink surfaces |

Chart series (only inside `.gantt`; the one place multiple hues are allowed):

| Role | Light | Dark |
|---|---|---|
| Tiga Daya Digital (current) | `var(--accent)` | `var(--accent)` |
| Danamas | `#A8883F` | `#C9A961` |
| Mandala Multifinance | `#5F7A62` | `#93B096` |
| KODEGIRI | `#4F6480` | `#90A7C4` |
| Quadrant Synergy | `#7A5B70` | `#B08CA6` |

## Typography

| Role | Family | Size / line-height | Weight | Notes |
|---|---|---|---|---|
| display (name) | serif stack | `clamp(3.5rem,13vw,10.5rem)` / .88 | 400 | second line italic, accent period |
| h2 (section) | serif stack | `clamp(2rem,4vw,2.9rem)` / 1 | 400 | tracking −.02em |
| h3 (card/job) | serif stack | `clamp(1.55rem,3vw,2.15rem)` / 1.1 and `clamp(1.3rem,2.4vw,1.65rem)` / 1.15 | 400 | |
| contact h2 | serif stack | `clamp(2.2rem,6vw,4.6rem)` / .98 | 400 | |
| body | system sans | `1.0625rem` / 1.55 | 400 | pitch rises to `clamp(1.15rem,2.2vw,1.45rem)` |
| label / meta | mono | `.68–.85rem`, uppercase, tracking `.03–.06em` | 400/600 | dates, indices, legend |

- Serif: `"Iowan Old Style","Palatino Linotype",Palatino,"Book Antiqua",Georgia,serif`.
- Sans: `system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif`.
- Mono: `"IBM Plex Mono",ui-monospace,"SF Mono",SFMono-Regular,Menlo,Consolas,monospace`.
- No third family. No display weight above 400 except mono labels at 600.

## Space and shape

- Spacing scale: 4, 6, 10, 14, 18, 22, 26, 32, 40, 56, 64, 88, 120 px. Section padding `clamp(64px,9vw,120px)` top only.
- Container: `max-width:1240px`, padding `clamp(20px,5vw,56px)`. Section grid `230px minmax(0,1fr)` with 56px gap at ≥960px; single column below.
- Radii: 2px on buttons, chart bars, swatches. Phone card 38px outer / 27px screen. Nothing else is rounded.
- Border weights: 2px ink for section-opening rules (facts, work list, ledger, chart, stack, education); 1px line for row dividers and chart grid. No mid weights.
- Shadow policy: none, except the hero phone: `12px 12px 0 var(--line)`.

## Layout rules

- Section rhythm: label column left (`01 / Selected work` in accent mono, h2 serif below, sticky at `top:92px`), content right. Every section opens with a 2px rule.
- Alignment/asymmetry: left-aligned throughout; the only centred element is the phone's home indicator. Numbers and dates are mono so columns line up optically.
- Graphic treatment: one chart (timeline) and one illustrated phone — both pure CSS, no images. The phone is a real device mock with three snap panels: Profile (live Jakarta clock, current role), Selected work (three app rows linking to Play Store), Contact (email, GitHub, LinkedIn). 24px dots below act as the indicator and the controls.
- Phone interaction: native `scroll-snap-type: x mandatory` track (touch and trackpad get real momentum); mice get pointer-drag with capture, and a flick above `0.25 px/ms` advances exactly one panel from where the drag started, so drag distance and flick never add up to two panels. `tabIndex=0` makes arrow keys scroll the track.
- Responsive at 390px: chart drops its row labels (`2019…2026` axis + coloured bars only) and grows a colour legend under the chart; desktop keeps row labels and hides the legend. Job rows collapse from `170px 1fr` to stacked. Nav wraps under the mark. Phone card is hidden below 960px.

## Motion

- Reveal: opacity 0→1 with `translateY(14px)→0`, 600ms, `cubic-bezier(.2,.7,.2,1)`, once per element at 12% visibility.
- Chart bars: `scaleX(0)→1` transform, 900ms same easing, staggered 80ms per row, origin left.
- Press: `scale(0.97)` at 140ms `cubic-bezier(0.23,1,0.32,1)` on buttons, theme toggle and copy button; colour/border transitions stay 180ms `ease`.
- Hover: colour/border 150–180ms, all hover rules gated behind `@media (hover: hover) and (pointer: fine)` so touch taps do not leave stuck states.
- Implementation: CSS transitions toggled by an `IntersectionObserver` adding `.in`. The hidden state is gated behind `html[data-reveal="on"]`, which a pre-paint script sets only when JS runs and `prefers-reduced-motion: no-preference` matches — so no-JS and reduced-motion users see the final state, never a blank page.
- Theme switch: `html.theme-switching` crossfades background/colour/border for 220ms (all-or-nothing; partial transitions look broken), class removed after 260ms.
- Copy feedback: button label swaps through a stacked grid crossfade, 160ms with `filter: blur(2px)` on the outgoing label; button width is stable, no layout shift.
- Phone: panel snap is delegated to the browser scroll engine (no JS animation); dot indicator colour 180ms, press `scaleX(0.85)` on the dash; `goTo` uses `behavior: auto` under reduced motion so panels jump instead of gliding.
- Status dot: `s-heartbeat`, two scale beats (7px → 10px) inside 38% of a 2.4s cycle, then rest — a live indicator rather than a blinking cursor. Static under reduced motion.
- Reduced motion: no reveal, no bar grow, no smooth scroll, no theme crossfade, no blur on the copy swap — content appears in its final state.

## Banned

- Gradients, glows, glassmorphism, 3D blobs, emoji icons.
- Cards with rounded corners and drop shadows; badge walls; skill progress bars.
- More than one accent colour outside the chart series.
- Centred hero text, stock photos, fake logos or invented metrics.

## Acceptance checks

- [x] No horizontal overflow at 390px and 1440px (`scrollWidth` measured)
- [x] One accent colour outside the chart; series colours confined to `.gantt`
- [x] Type scale matches the table
- [x] No generic hero + three cards + CTA structure
- [x] All visuals are CSS/SVG, no external assets
- [ ] CV PDF secondary CTA — no file in `public/` yet; hero secondary link points at GitHub instead
