# Responsive Notes

These rules translate the five 1920×1080 reference screens into a responsive website without treating the desktop compositions as fixed images. Preserve the approved Monolithic Chrome art direction, exact copy, and reading order at every size. Decorative 3D is always subordinate to content and must never cover text, navigation, links, buttons, form controls, or scrolling surfaces.

## Shared layout contract

| Target viewport | Content frame | Navigation | Type and interaction |
| --- | --- | --- | --- |
| **360×800** | 20px side padding; single column; content width 320px; section height is content-driven rather than forced to 100vh. | Replace the horizontal navigation with a clearly labeled `MENU` button. The opened menu contains the exact links `WORK / ENGINEERING / PROFILE / CONTACT` in that order. | Use fluid type with `clamp()` and deliberate line breaks. No overflow, clipping, or cropped letterforms. All controls and links have at least 44×44px touch targets. |
| **768×1024** | 32px side padding; 12-column-capable frame, generally used as two columns; section height may exceed the viewport when content requires it. | Use the clearly labeled `MENU` button rather than squeezing the full navigation. Its panel contains the exact links `WORK / ENGINEERING / PROFILE / CONTACT`. | Scale type fluidly between mobile and desktop bounds. Keep a minimum 16px body size and 44×44px touch targets; do not depend on hover. |
| **1440×900** | 64px side padding; up to 1312px available inside the viewport; use the desktop grid. | Show the full navigation exactly as `WORK / ENGINEERING / PROFILE / CONTACT`. | Enable layered 3D where specified, while maintaining readable contrast and keyboard focus. Fluid headings must fit without overflow or cropping. |
| **1920×1080** | 64px side padding; center a maximum 1440px content width, leaving additional outer breathing room; use the full wide-desktop composition. | Show the full navigation exactly as `WORK / ENGINEERING / PROFILE / CONTACT`. | Use the reference image's largest type and depth ranges, capped with `clamp()` so they do not keep growing beyond the design. Keep 44×44px minimum targets. |

Implementation-wide rules:

- The content container is `width: min(100% - 2 * side-padding, 1440px)` and centered. Side padding is exactly 20px on mobile, 32px on tablet, and 64px on desktop.
- Headings use fluid sizing such as `clamp(minimum, viewport-based value, maximum)`, with `overflow-wrap: normal`, controlled line breaks, and sufficient line height. Never hide overflow to mask cropped typography.
- Use normal document flow for essential content. Absolute positioning is reserved for decoration inside clipped, pointer-inert layers.
- Decorative 3D uses `pointer-events: none` unless the object itself is an intentional control. It never creates a scroll trap, blocks selection, or changes the reading order.
- Pointer hover is progressive enhancement. Every hover response has an equivalent visible keyboard-focus state, and required names, URLs, labels, and actions are available without hover.
- Use semantic landmarks and preserve a logical DOM order: navigation, headline/context, primary action or content, then decorative media.
- All tap/click targets are at least 44×44 CSS pixels, including the menu button, navigation entries, project links, CTA, WhatsApp placeholder, email placeholder, and GitHub link.

## 01-hero.png

### 360×800

- Use one column with hero copy first and the portrait region second: identity line, `WEBSITES ENGINEERED TO SELL.`, supporting line, `VIEW SELECTED WORK`, then the labeled faceless mannequin.
- Keep the primary CTA visible in the first viewport when practical; cap the initial copy block and spacing rather than shrinking the type below a readable size.
- Render the mannequin at roughly 260–300px wide below the copy. Crop only the outer orbital ring if necessary; the blank head, shoulders, and visible `YOUR PORTRAIT HERE` label must remain complete.
- Move the orbital ring and architectural planes behind the portrait only, never behind small copy or the CTA.

### 768×1024

- Keep copy above the portrait in a spacious stacked composition, or use a 7/5 split only if the headline remains at least two clean lines and the portrait does not intrude into it.
- Place the CTA beside the supporting line only when both retain 44px targets and comfortable spacing; otherwise stack them.
- Limit the portrait to the lower 42–48% of the section, with its label directly associated with the mannequin.

### 1440×900

- Use a left/right split: copy in approximately seven grid columns and the faceless mannequin/orbital ring in five.
- Keep headline and CTA on the foreground plane. Apply only shallow parallax between copy, ring, and bust.
- Do not allow the portrait silhouette to cross the headline's protected bounding box.

### 1920×1080

- Center the composition in the 1440px maximum content frame, with copy left and mannequin right as in the reference.
- Allow more negative space around the orbital ring rather than enlarging the type beyond its cap.
- Maintain the complete identity-safe placeholder and treat it as one replaceable layer when Omer later supplies a portrait.

## 02-client-work.png

### 360×800

- Place `SOLD. LAUNCHED. WORKING.` above a single-column vertical stack of five project cards. This is not a carousel: all projects appear in normal scroll flow.
- Each card shows its real site capture, full project name, and exact URL. Use an aspect ratio around 16:10 or 4:3 for capture legibility and allow URLs to wrap without truncating the destination.
- Remove 3D tilt and card overlap. Use modest border, shadow, and chrome-edge contrast to retain the visual system.

### 768×1024

- Use a two-column grid with consistent card heights and 24px gaps. Let the fifth card occupy the first column or span both columns when that improves capture legibility; do not center it as a tiny orphan.
- Keep names and exact URLs persistently visible. No information may require hover.
- Use negligible perspective and no overlap so touch targets remain predictable.

### 1440×900

- Use the layered 3D browser-card composition with all five cards visibly identifiable. Keep a safe headline zone and a stable Z-order.
- Hover/focus may bring one card forward but must not make other cards disappear or move essential controls.
- Insert the real captures without distorting them; use object-position adjustments rather than stretching.

### 1920×1080

- Expand spacing around the 3D stack inside the 1440px content maximum rather than spreading cards to the physical viewport edges.
- Preserve readable portions of every card and full persistent project labels; allow the selected card to receive the strongest chrome edge light.
- Do not add project statistics, ratings, testimonials, or metrics at this or any breakpoint.

## 03-engineering-core.png

### 360×800

- Order content as headline, MNE Brain descriptor, static core image, then a simple vertical list of the six approved capability labels.
- Keep the core within the content width at roughly 260–300px square. Remove radial callout lines that would cross labels.
- Use separators or numbered orange markers for the capability list; never reduce labels to icons.

### 768×1024

- Place the headline/descriptor above a two-part region: core image on top or left, capability labels in a two-column text grid below or right.
- If using connectors, limit them to short local rules that cannot overlap copy. All six labels stay visible without interaction.
- Use a static or minimally animated core to protect reading comfort on the taller viewport.

### 1440×900

- Place the core slightly right of center and distribute the six labels around it in stable grid-aligned positions.
- Connector lines may animate subtly but cannot be the only way to associate labels with the subject.
- Keep `BEYOND THE BROWSER.` and the MNE Brain descriptor in a protected left-side zone.

### 1920×1080

- Use the full architectural chamber and label constellation within the centered 1440px frame.
- Increase negative space and connector length modestly, not core scale, so labels remain calm and legible.
- Never expose internal addresses, hostnames, credentials, ministry topology, or private configuration in visuals, labels, accessibility text, or metadata.

## 04-visual-cv.png

### 360×800

- Retain the warm off-white background. Stack `ONE MIND. TWO WORLDS.` first, followed by the four capability groups in their approved order.
- Give each group a clear heading-like block, graphite divider, and 20–24px vertical separation. Do not convert the groups to a horizontally scrolling strip.
- Move the small chrome bridge object below the capability list or into a faint non-obstructive margin layer.

### 768×1024

- Use a two-column capability grid beneath the headline, with equal reading weight and a minimum 24px gutter.
- Position the chrome bridge object in the outer margin or between the two conceptual halves without interrupting the text grid.
- Keep the layout capability-based; do not introduce a résumé timeline to fill vertical space.

### 1440×900

- Use an editorial split: headline/introduction in the left region and four capability groups in a disciplined two-by-two or vertical modular system to the right.
- Allow the chrome bridge object to sit at a grid intersection as a small secondary accent.
- Preserve the warm off-white screen as the intentional tonal break from the dark sections.

### 1920×1080

- Center the editorial split within 1440px and increase whitespace between modules. Do not increase body text line length beyond roughly 65–75 characters.
- Keep the sculpture in the outer margin and retain a single restrained orange indexing accent.
- Do not add employers, dates, degrees, certifications, awards, or experience duration.

## 05-contact.png

### 360×800

- Order content as headline, supporting sentence, `LET'S BUILD`, then the labeled `WHATSAPP`, `EMAIL`, and `github.com/omersalem` links/slots.
- The CTA and contact targets remain above the decorative chrome object. Move the object below the links or use it as a faint, clipped background shape with sufficient contrast overlay.
- Do not render invented values beside `WHATSAPP` or `EMAIL`; the visible labels remain placeholders until Omer supplies details.

### 768×1024

- Use a stacked or 7/5 split composition with conversion copy first and the chrome object second. Keep all contact options together as one clearly labeled group.
- Allow `LET'S BUILD` to span the content column and maintain a 44px minimum height. Use generous separation between the three contact targets.
- Clip the decorative object to its own region so it cannot drift over the CTA during animation.

### 1440×900

- Use a left/right split with headline, supporting copy, CTA, and contact links on the left and the chrome torus/sphere on the right.
- Keep the orange CTA the strongest action. GitHub, WhatsApp, and email are secondary but fully visible and keyboard reachable.
- Decorative magnetic motion must not shift layout or move the pointer target away from the user.

### 1920×1080

- Center the split in the 1440px content frame, retaining ample black negative space around the closing message.
- Keep the chrome object large but behind its own clipping plane; it never overlaps the left conversion column.
- Do not add contact forms, addresses, response-time claims, social accounts, or QR codes not supplied by Omer.

## Motion and rendering fallbacks

- Respect `prefers-reduced-motion: reduce`: stop continuous object rotation, camera drift, parallax, Z-axis card movement, signal travel, light sweeps, magnetic pointer effects, and staggered entrances. Render content in its final position. If a transition is necessary for state clarity, use a simple opacity or color change of 120ms or less.
- Reduced motion must not remove focus indicators, project names, URLs, capability labels, the portrait placeholder label, navigation, or calls to action.
- Detect unavailable WebGL, renderer initialization failure, constrained hardware, and explicit data/battery-saving preferences. Replace each 3D scene with an optimized static responsive image (`<picture>`/AVIF/WebP with PNG fallback) that preserves the same crop and contrast-safe zones.
- Load the static fallback before attempting heavy 3D so the page is complete and stable immediately. Keep semantic copy and controls as HTML above the media layer; never bake essential text into the fallback image.
- If high-performance 3D is unavailable, disable related pointer listeners and animation loops, reserve the same media aspect ratio to prevent layout shift, and keep every section fully navigable and visually complete.
