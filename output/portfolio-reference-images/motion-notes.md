# Motion Notes

Motion is restrained, slow, and nonessential. It may reinforce depth and focus, but all copy, links, controls, project identities, and capability information must be fully understandable in a static frame. Animate only transform and opacity where practical; do not use motion to reveal required information permanently.

Pause every continuous animation loop when its section is outside the viewport and whenever `document.hidden` is `true`. Use `IntersectionObserver` and the Page Visibility API to stop `requestAnimationFrame` work rather than merely hiding it; resume from the preserved state only after both the section and document are visible.

## 01-hero.png

- **Camera movement:** On entry, use a 900–1200ms shallow camera settle: at most 12px of lateral parallax and less than 1° of perspective change. After the settle, the camera remains essentially locked; pointer movement may drive no more than 4px of depth separation.
- **Object motion:** Rotate the orbital ring very slowly on a single axis, one revolution in 28–36 seconds. Run an occasional soft rim-light sweep across the faceless chrome mannequin over 1800–2400ms, no more than once every 10 seconds. The bust itself does not turn toward the viewer and never develops facial detail.
- **Hover response:** `VIEW SELECTED WORK` may pull 3–5px toward the pointer, brighten its orange rule, and lift 2px over 180–220ms. Navigation links receive a simple underline or color transition; no essential state is hover-only.
- **Duration/tempo:** Slow, weighted, architectural. Entry sequence completes within 1200ms; continuous motion remains almost imperceptible.
- **Reduced motion:** Under `prefers-reduced-motion: reduce`, remove camera settle, parallax, ring rotation, light sweeps, and magnetic hover. Use a static composition and immediate focus states; an optional opacity fade must be 120ms or less.

## 02-client-work.png

- **Camera movement:** On section entry, move the virtual camera forward by a very shallow amount while the browser slabs resolve into their resting Z-order. Limit the move to 800–1000ms and avoid horizontal panning that delays reading.
- **Object motion:** Stagger the five slabs by 50–70ms each, translating no more than 18px in Z-equivalent screen space. Once placed, cards stay still; there is no autoplay carousel.
- **Hover response:** A hovered desktop card may lift 6px, rotate no more than 1.5°, and bring its chrome edge to full brightness over 180–240ms. Its exact project name and URL become more visually prominent, but they remain visible and keyboard-accessible before hover. Focus uses the same state.
- **Duration/tempo:** Crisp but composed. Total entrance is 900–1100ms. Hover exits in 140–180ms so the stack never feels sluggish.
- **Reduced motion:** Under `prefers-reduced-motion: reduce`, render the cards directly in their final positions. Remove Z translation, tilt, camera movement, and stagger; use only a static border/contrast change for hover and focus.

## 03-engineering-core.png

- **Camera movement:** Keep the camera fixed after an optional 600–800ms, 6px push-in on entry. No orbit around the topology and no motion that changes label-to-node relationships.
- **Object motion:** Rotate the central core at no more than 3–4° over 8 seconds, then ease back, or use a 40–50 second full rotation if the geometry is rotationally symmetrical. Send a low-intensity orange pulse through one connection path every 3–5 seconds; never flash multiple paths rapidly.
- **Hover response:** Hover or keyboard focus on a capability label may illuminate its corresponding abstract path and increase the label rule contrast over 180–220ms. Labels remain readable and associated with the core without interaction.
- **Duration/tempo:** Mechanical, deliberate, and sparse. Entry completes in under 900ms; pulses are separated by long quiet intervals.
- **Reduced motion:** Under `prefers-reduced-motion: reduce`, freeze the core and signals. Show all paths at a stable low contrast and use an instantaneous or 120ms color change for hover/focus.

## 04-visual-cv.png

- **Camera movement:** No continuous camera motion. Use a direct editorial cut from the preceding dark screen; an optional 250–350ms crossfade may soften the background change.
- **Object motion:** Capability groups enter once with a 12px upward translation and opacity fade, staggered by 45–60ms, completing within 500–650ms. The small chrome bridge object may turn 2–3° over 10–14 seconds and ease back.
- **Hover response:** A capability group may shift its orange index rule by 4px and deepen its graphite border over 140–180ms. Do not collapse, reorder, or hide copy on hover.
- **Duration/tempo:** Precise editorial cadence, faster than the dark 3D screens but never bouncy. No spring overshoot.
- **Reduced motion:** Under `prefers-reduced-motion: reduce`, remove group translation, stagger, crossfade, and chrome-object turn. Render all capability groups immediately; retain a static contrast change for hover/focus.

## 05-contact.png

- **Camera movement:** Use a nearly static camera. A single 700–900ms, 8px pull-back on entry can reveal the closing composition, then stop completely.
- **Object motion:** Rotate the chrome torus or sphere at one revolution per 32–44 seconds, with no bobbing. A soft orange reflection may travel across its lower edge once every 10–14 seconds.
- **Hover response:** `LET'S BUILD` may use a subtle magnetic attraction capped at 5px, a 2px lift, and an orange fill/outline transition over 180–220ms; activating it scrolls to the in-page `#contact-options` region and never submits a form. The real `github.com/omersalem` link uses a simple underline or border change shared by pointer hover and keyboard focus. `WHATSAPP` and `EMAIL` remain non-interactive labeled placeholders with no hover, focus, pointer, or keyboard response until real destinations exist.
- **Duration/tempo:** Calm and confident. Entry completes within 900ms; the CTA and GitHub link respond promptly and the decorative object remains slow.
- **Reduced motion:** Under `prefers-reduced-motion: reduce`, remove pull-back, object rotation, reflection sweep, and magnetic response. Keep the object static and preserve immediate, high-contrast hover/focus states on the CTA and GitHub link; the two placeholders remain static labels. Any fade is 120ms or less.
