# 3D Portfolio Reference Images — Design Specification

## Purpose

Create five coordinated 16:9 reference images that Omer Salem can give to Gemini Flash to recreate as a portfolio website. The portfolio is a sales tool for prospective website clients. It must prove that Omer has shipped real client websites and differentiate him through strong computer-engineering, hardware, network, security, and infrastructure expertise.

## Deliverables

- Five finished 1920×1080 PNG images, one for each major website section.
- A consistent high-fidelity visual system across all five images.
- Each image must be usable as a direct website-design reference, not as abstract mood art.
- A consolidated Markdown handoff at `output/portfolio-reference-images/motion-notes.md` containing a short motion note for each image so Gemini can translate the static composition into restrained 3D animation.
- A responsive implementation handoff at `output/portfolio-reference-images/responsive-notes.md` explaining how Gemini should adapt every screen to mobile, tablet, laptop, and wide desktop layouts.
- Final files live in the workspace under `output/portfolio-reference-images/`.
- Filenames: `01-hero.png`, `02-client-work.png`, `03-engineering-core.png`, `04-visual-cv.png`, and `05-contact.png`.

## Audience and Positioning

- Primary audience: business customers who may hire Omer to design and build a website.
- Primary title: **Computer Engineer**.
- Supporting positioning: website designer and developer with AI, automation, hardware, network, security, server, storage, and virtualization experience.
- Core promise: polished websites backed by engineering depth.

## Approved Visual Direction: Monolithic Chrome

- Predominantly black and charcoal editorial layouts.
- Oversized condensed or grotesk-style typography with tight spacing.
- Liquid-chrome 3D objects and architectural lighting.
- Electric orange used sparingly for calls to action, dividers, and signal accents.
- Off-white is used once on the CV screen to create deliberate contrast.
- Strong grid, generous negative space, sharp alignment, and minimal copy.
- Avoid green circuitry, generic neon gaming aesthetics, crowded dashboards, cartoon 3D, and excessive glassmorphism.
- No invented face. The hero uses a completely faceless polished-chrome mannequin bust with no eyes, mouth, nose, skin, hair, or identity cues. A small visible label says **YOUR PORTRAIT HERE** so it cannot be mistaken for a generated likeness. Gemini will replace it after Omer supplies his photograph.

## Screen System

### 01 — Hero / Portrait

- Main copy: **WEBSITES ENGINEERED TO SELL.**
- Identity line: **OMER SALEM — COMPUTER ENGINEER**.
- Supporting line: **Design. Development. Infrastructure.**
- Composition: left-aligned headline and copy; large, completely faceless polished-chrome mannequin bust on the right, surrounded by a thin orbital ring and visibly labeled **YOUR PORTRAIT HERE**.
- Conversion cue: **VIEW SELECTED WORK**.
- Motion note: slow 3D orbit around the portrait, soft rim-light sweep, and shallow parallax between type, portrait, and orbital ring.

### 02 — Selected Client Work

- Main copy: **SOLD. LAUNCHED. WORKING.**
- Show five real client projects as layered browser slabs or cards:
  - Almalaki Store — `https://almalakistore.ps/`
  - Bazaria Council — `https://bazariacouncil.pages.dev/`
  - handmade.ps — `https://handmade.ps/`
  - Pistachio — `https://postachio.pages.dev/`
  - Lama Home — `https://lamastorev2.pages.dev/`
- Use each site's recognizable color identity in its card while keeping the surrounding portfolio black and chrome.
- Do not invent business metrics. Communicate proof through the live-project count and accurate project names.
- Motion note: browser slabs separate along the Z axis as the camera moves; hovered cards tilt slightly and reveal the live URL.

### 03 — Engineering Core / MNE Brain v2

- Main copy: **BEYOND THE BROWSER.**
- Supporting label: **MNE BRAIN V2 — AI-NATIVE INFRASTRUCTURE BRAIN**.
- Visual: a black/chrome motherboard or infrastructure core with orange energy moving through connected systems.
- Capability labels grounded in the MNE Brain repository:
  - Networks and routing
  - Cisco, FortiGate, F5, and security
  - Windows and Linux servers
  - VMware and virtualization
  - Storage and backup
  - Infrastructure discovery and automation
- Do not expose credentials, internal addresses, or sensitive ministry configuration details.
- Motion note: controlled signal pulses travel between infrastructure nodes; the central core rotates very slowly.

### 04 — Visual CV / Capabilities

- Main copy: **ONE MIND. TWO WORLDS.**
- Background: warm off-white to interrupt the dark sequence.
- Position Omer as a Computer Engineer who bridges digital products and physical infrastructure.
- Four capability groups:
  - Website design and full-stack development
  - E-commerce and customer-facing platforms
  - AI, automation, and technical knowledge systems
  - Hardware, networking, security, servers, and virtualization
- This is a capability-based CV, not an invented chronological employment history. Do not add employers, degrees, dates, certifications, or years of experience unless Omer later provides them.
- Motion note: capability bars and labels enter with precise editorial transitions; a small chrome object turns gently in the margin.

### 05 — Contact / Conversion

- Main copy: **YOUR NEXT WEBSITE STARTS HERE.**
- Supporting copy: **Built with design clarity and an engineer's precision.**
- Primary call to action: **LET'S BUILD**.
- Show `github.com/omersalem` as the verified portfolio identity.
- Reserve clean slots for WhatsApp and email that Gemini can populate when Omer provides them; do not fabricate contact information.
- Motion note: a chrome sphere or torus slowly rotates while the orange call-to-action gains a subtle magnetic hover response.

## Composition and Image Constraints

- Aspect ratio and delivery dimensions: exactly 16:9 landscape at 1920×1080 pixels.
- Generate in the widest available landscape mode. If a generated source is not exactly 16:9, crop from the least important outer edge while preserving all safe-margin content, then resize once to 1920×1080. Do not stretch the image.
- Deliver as lossless PNG in sRGB.
- Text must be minimal, large, and legible. Exact copy above should be rendered verbatim where feasible.
- Browser mockups must look like real interface panels, not random abstract cards.
- Consistent navigation label across screens: **WORK / ENGINEERING / PROFILE / CONTACT**.
- Use safe margins so key content remains visible when Gemini adapts the composition to responsive layouts.
- No watermarks, stock-photo faces, third-party logos outside the referenced client-site previews, or fake awards/testimonials.

## Content Sources and Accuracy

- GitHub account: `https://github.com/omersalem`.
- MNE Brain v2 repository: `https://github.com/omersalem/MNE_Brain`.
- MNE Brain supports the infrastructure capability claims listed above.
- Client work is represented only by the five URLs supplied by Omer.
- The hero portrait remains a faceless mannequin placeholder labeled **YOUR PORTRAIT HERE** and must be replaced with Omer's photo by Gemini later.

## Source Capture and Handoff Files

- Preserve dated reference screenshots of the five supplied live websites under `output/portfolio-reference-images/references/2026-09-18/` before final generation.
- Use these captures only as visual references for project cards; do not expose private admin areas or customer data.
- Store motion guidance in `output/portfolio-reference-images/motion-notes.md` with headings matching the five numbered PNG filenames.
- Store the final structured image-generation prompts in `output/portfolio-reference-images/prompts.md`.

## Responsive Website Behavior

The five 1920×1080 images define the wide-desktop art direction, but the website Gemini creates from them must remain fully usable and visually intentional on all common screen sizes.

- Target checks: 360×800 mobile, 768×1024 tablet, 1440×900 laptop/desktop, and 1920×1080 wide desktop.
- Navigation: show the full horizontal navigation on desktop; collapse it into a clearly labeled menu button on mobile and narrow tablet widths.
- Typography: use fluid sizing with safe minimum and maximum values. Headings may wrap into more lines on mobile but must never overflow or become cropped.
- Hero: desktop uses a left/right split. On mobile, place the headline first and the 3D portrait below it. Keep the primary call to action visible without requiring excessive scrolling.
- Client work: desktop uses overlapping 3D browser slabs. Tablet uses a two-column grid. Mobile uses a single-column stack or accessible horizontal carousel with visible controls.
- Engineering core: desktop distributes capability labels around the central object. Mobile places the 3D core above a simple vertical capability list.
- Visual CV: desktop uses an editorial split layout. Mobile stacks the introduction followed by four clearly separated capability groups.
- Contact: desktop places the chrome object beside the call to action. Mobile prioritizes the call to action and contact links, moving the decorative 3D object below or into a non-obstructive background layer.
- Touch targets must be at least 44×44 CSS pixels, with comfortable spacing and no hover-only essential interactions.
- Decorative 3D must never block text, navigation, buttons, or scrolling.
- Respect `prefers-reduced-motion`: stop continuous rotation and parallax, remove camera drift, and replace animated transitions with short fades.
- Use a static optimized image fallback when WebGL or high-performance 3D is unavailable. The website must remain complete and navigable without 3D rendering.
- Responsive guidance for each numbered screen must be summarized in `responsive-notes.md` alongside the final images.

## Acceptance Criteria

- All five images clearly belong to the same premium Monolithic Chrome design system.
- All five final PNG files are exactly 1920×1080 pixels in sRGB.
- A prospective customer can understand within the first two images that Omer sells and builds websites.
- The project image visibly includes all five supplied client projects.
- The engineering image communicates credible hardware/infrastructure depth without exposing sensitive details.
- The CV image makes no unsupported biographical claims.
- The contact image gives a clear next action and includes the verified GitHub identity.
- Every image offers obvious depth layers that Gemini can animate with 3D motion.
- The responsive handoff defines a clear, buildable layout for all five sections at mobile, tablet, desktop, and wide-desktop sizes.
- Essential content and calls to action remain usable with reduced motion or without WebGL/3D support.

## Verification

- Visually inspect each output for composition, copy accuracy, 16:9 framing, and cross-image consistency.
- Confirm there is no invented face or unsupported CV claim.
- Confirm the hero placeholder is fully faceless and visibly labeled **YOUR PORTRAIT HERE**.
- Confirm project names and URLs match the supplied sources.
- Confirm no sensitive infrastructure details appear in the artwork.
- Review the responsive handoff against 360×800, 768×1024, 1440×900, and 1920×1080 targets, including reduced-motion and static-fallback behavior.
