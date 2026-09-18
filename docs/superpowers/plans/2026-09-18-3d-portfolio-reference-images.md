# 3D Portfolio Reference Images Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce five polished 1920×1080 Monolithic Chrome portfolio reference images, plus motion, prompt, and responsive handoffs that Gemini can use to build Omer Salem's responsive 3D website.

**Architecture:** Use real client-site screenshots as factual project references, generate identity-safe 3D chrome scene art with the built-in image-generation tool, and composite both into deterministic HTML/CSS layouts so required copy renders accurately. Capture each layout at exactly 1920×1080 with headless Chrome, then verify file dimensions, content, safety, and visual consistency.

**Tech Stack:** Built-in image generation (`@imagegen`), browser inspection (`@computer-use`), semantic HTML/CSS, headless Google Chrome, PowerShell validation, PNG/sRGB output.

---

## File Map

- `output/portfolio-reference-images/references/2026-09-18/` — dated captures of the five supplied live client sites.
- `output/portfolio-reference-images/assets/raw/` — untouched built-in image-generation outputs before framing normalization.
- `output/portfolio-reference-images/assets/` — normalized 1920×1080 chrome/3D scene art used by the layouts.
- `output/portfolio-reference-images/layouts/` — deterministic 1920×1080 HTML/CSS composition sources.
- `output/portfolio-reference-images/01-hero.png` — final hero reference.
- `output/portfolio-reference-images/02-client-work.png` — final sold-project reference.
- `output/portfolio-reference-images/03-engineering-core.png` — final hardware/infrastructure reference.
- `output/portfolio-reference-images/04-visual-cv.png` — final capability-based CV reference.
- `output/portfolio-reference-images/05-contact.png` — final conversion/contact reference.
- `output/portfolio-reference-images/prompts.md` — exact structured prompts used for generated scene art.
- `output/portfolio-reference-images/motion-notes.md` — animation guidance keyed to the five PNG filenames.
- `output/portfolio-reference-images/responsive-notes.md` — responsive rules for mobile, tablet, desktop, reduced motion, and no-WebGL fallback.
- `scripts/ensure-srgb-png.ps1` — metadata fallback that inserts a standards-compliant PNG `sRGB` chunk when Chrome omits one.

## Task 1: Prepare Output Structure and Capture Source Websites

**Files:**
- Create: `output/portfolio-reference-images/references/2026-09-18/almalaki-store.png`
- Create: `output/portfolio-reference-images/references/2026-09-18/bazaria-council.png`
- Create: `output/portfolio-reference-images/references/2026-09-18/handmade-ps.png`
- Create: `output/portfolio-reference-images/references/2026-09-18/pistachio.png`
- Create: `output/portfolio-reference-images/references/2026-09-18/lama-home.png`

- [ ] **Step 1: Create the output directories**

Run:

```powershell
$root = 'D:\projects\Microtik\output\portfolio-reference-images'
New-Item -ItemType Directory -Force -Path "$root\references\2026-09-18", "$root\assets\raw", "$root\layouts" | Out-Null
```

Expected: the three directories exist and contain no final deliverables yet.

- [ ] **Step 2: Confirm the five public URLs and page titles in the browser**

Inspect these exact pages with `@computer-use` and do not open admin routes:

```text
https://almalakistore.ps/
https://bazariacouncil.pages.dev/
https://handmade.ps/
https://postachio.pages.dev/
https://lamastorev2.pages.dev/
```

Expected: the pages identify Almalaki Store, Bazaria Council, H&M HandMade, Pistachio, and Lama Home.

- [ ] **Step 3: Capture dated 1440×900 source screenshots**

Use installed Chrome in headless mode, one URL at a time, so files have stable names. Example for the first capture:

```powershell
& 'C:\Program Files\Google\Chrome\Application\chrome.exe' --headless=new --hide-scrollbars --window-size=1440,900 --screenshot='D:\projects\Microtik\output\portfolio-reference-images\references\2026-09-18\almalaki-store.png' 'https://almalakistore.ps/'
```

Repeat with the four remaining URLs and filenames above.

Expected: five non-empty PNG files, each showing the public landing page without private data.

- [ ] **Step 4: Visually inspect all five captures**

Open each file with the local image viewer tool. Re-capture only if a screenshot is blank, still on a loading screen, or missing the recognizable site identity.

Expected: every project has a usable visual reference.

- [ ] **Step 5: Commit the source-capture checkpoint**

```powershell
git add output/portfolio-reference-images/references
git commit -m "assets: capture portfolio client references"
```

## Task 2: Write the Prompt and Handoff Documents

**Files:**
- Create: `output/portfolio-reference-images/prompts.md`
- Create: `output/portfolio-reference-images/motion-notes.md`
- Create: `output/portfolio-reference-images/responsive-notes.md`

- [ ] **Step 1: Write five structured image-generation prompts**

Use `ui-mockup` for the full-screen portfolio references and `stylized-concept` for supporting chrome scene art. Every prompt must specify:

```text
Asset: one numbered 16:9 portfolio screen
Style: Monolithic Chrome — black editorial grid, liquid chrome, electric-orange accents
Text handling: generate scene art without small text; exact copy will be composited later
Identity: no human face; hero uses a completely faceless chrome mannequin
Constraints: no watermark, no fake awards, no private infrastructure details
```

Include screen-specific composition, lighting, depth layers, and negative constraints from the approved spec.

Expected: `prompts.md` contains five numbered, implementation-ready prompts with exact screen mapping.

- [ ] **Step 2: Write the motion handoff**

Create headings matching `01-hero.png` through `05-contact.png`. Under each, define camera movement, object motion, hover response, duration/tempo, and reduced-motion behavior.

Expected: motion is restrained and supports reading; no section depends on motion to communicate essential content.

- [ ] **Step 3: Write the responsive handoff**

Define exact adaptations at 360×800, 768×1024, 1440×900, and 1920×1080:

- Use 20px side padding on mobile, 32px on tablet, and 64px on desktop.
- Use a 1440px maximum content width.
- Use a single-column project stack on mobile, a two-column grid on tablet, and 3D layered cards on desktop.
- Stack hero copy above the portrait on mobile.
- Move decorative 3D behind or below essential content when space is constrained.
- Specify 44×44px minimum touch targets, `prefers-reduced-motion`, and static-image WebGL fallback.

Expected: `responsive-notes.md` makes one unambiguous layout choice at every target size.

- [ ] **Step 4: Validate handoff completeness**

Run:

```powershell
rg -n -g "*.md" "01-hero|02-client-work|03-engineering-core|04-visual-cv|05-contact|360×800|768×1024|1440×900|1920×1080|prefers-reduced-motion" output/portfolio-reference-images
```

Expected: every image and every responsive target appears in the appropriate handoff document.

- [ ] **Step 5: Commit the written handoff**

```powershell
git add output/portfolio-reference-images/*.md
git commit -m "docs: add portfolio generation and responsive handoff"
```

## Task 3: Generate the Five 3D Scene Assets

**Files:**
- Create: `output/portfolio-reference-images/assets/01-hero-chrome.png`
- Create: `output/portfolio-reference-images/assets/02-project-stage.png`
- Create: `output/portfolio-reference-images/assets/03-infrastructure-core.png`
- Create: `output/portfolio-reference-images/assets/04-cv-object.png`
- Create: `output/portfolio-reference-images/assets/05-contact-object.png`

- [ ] **Step 1: Generate the hero chrome mannequin scene**

Use the built-in `@imagegen` tool with Prompt 01. Require a completely faceless mannequin with no anatomical facial features and enough negative space for left-side copy.

Expected: a wide dark scene with a clearly non-human placeholder that cannot be mistaken for Omer's portrait.

- [ ] **Step 2: Inspect the hero identity constraint**

Open the generated file and reject it if it contains eyes, nose, mouth, skin, hair, or a recognizable face. Regenerate with the single correction “remove all facial and identity features.” If three successive generations fail the identity check, preserve the approved mannequin-bust composition by building the bust deterministically in a 1920×1080 HTML asset canvas from a featureless mirrored oval head, neck, and shoulder geometry with no face-like front plane. Render that canvas with headless Chrome to the required `assets/01-hero-chrome.png` path. Do not substitute another object and do not advance until the required PNG exists, remains a bust, and is identity-safe.

Expected: approved hero source art is identity-safe.

- [ ] **Step 3: Generate project, infrastructure, CV, and contact scene art**

Issue one separate built-in image-generation call for each remaining numbered prompt. Do not request text rendering inside generated art.

Expected: four stylistically consistent source images with clear negative-space regions for composited copy and cards.

- [ ] **Step 4: Save untouched generated outputs into the workspace**

Copy the chosen outputs from the built-in generation location into `output/portfolio-reference-images/assets/raw/` with the same five base filenames. Do not leave project assets only under the default generated-images directory. If the deterministic hero fallback was required, its rendered PNG already occupies the normalized `assets/01-hero-chrome.png` path and does not need a raw counterpart.

Expected: five raw generated assets exist, or four raw generated assets plus the deterministic normalized hero fallback.

- [ ] **Step 5: Normalize every scene asset to exact 16:9 without stretching**

Read each raw image's pixel dimensions. For every non-16:9 source, create a temporary 1920×1080 HTML crop canvas with the image set to `object-fit: cover`. Inspect the source and set `object-position` so cropping removes only the least important outer edge while preserving the subject and intended negative-space region. Render the canvas with headless Chrome using `--force-color-profile=srgb --force-device-scale-factor=1 --window-size=1920,1080` into the five exact normalized asset paths listed for this task. Never use width/height distortion.

Expected: all five exact normalized asset paths exist and report 1920×1080; the primary subject and copy-safe negative space remain intact.

- [ ] **Step 6: Inspect cross-image consistency**

Check the five source assets together for black/charcoal tonality, liquid-chrome material, restrained orange accents, architectural lighting, and absence of watermarks.

Expected: the set reads as one design system.

- [ ] **Step 7: Commit the generated assets**

```powershell
git add output/portfolio-reference-images/assets
git commit -m "assets: add monolithic chrome portfolio scenes"
```

## Task 4: Build Deterministic 1920×1080 Layouts

**Files:**
- Create: `output/portfolio-reference-images/layouts/base.css`
- Create: `output/portfolio-reference-images/layouts/01-hero.html`
- Create: `output/portfolio-reference-images/layouts/02-client-work.html`
- Create: `output/portfolio-reference-images/layouts/03-engineering-core.html`
- Create: `output/portfolio-reference-images/layouts/04-visual-cv.html`
- Create: `output/portfolio-reference-images/layouts/05-contact.html`

- [ ] **Step 1: Create the shared 1920×1080 composition shell**

In `base.css`, lock each page to `width: 1920px; height: 1080px; overflow: hidden`, use a 64px safe edge, define black/charcoal/off-white/orange tokens, and load only local/system fonts.

Render the shared navigation copy exactly as `WORK / ENGINEERING / PROFILE / CONTACT` on every screen.

Expected: all five layouts share identical grid, typography, navigation, and safe-area rules.

- [ ] **Step 2: Build the hero layout**

Composite the hero scene asset with exact text:

```text
OMER SALEM — COMPUTER ENGINEER
WEBSITES ENGINEERED TO SELL.
Design. Development. Infrastructure.
VIEW SELECTED WORK
YOUR PORTRAIT HERE
```

Keep the faceless mannequin and label on the right; keep all copy on the left within the safe area.

Expected: no text overlaps the mannequin or orbital ring.

- [ ] **Step 3: Build the client-work layout**

Use the five dated source captures inside browser-card frames. Include the headline `SOLD. LAUNCHED. WORKING.` and these exact display names and URLs:

```text
Almalaki Store — https://almalakistore.ps/
Bazaria Council — https://bazariacouncil.pages.dev/
handmade.ps — https://handmade.ps/
Pistachio — https://postachio.pages.dev/
Lama Home — https://lamastorev2.pages.dev/
```

Use CSS 3D transforms for depth while keeping every project recognizable. Do not shorten or substitute the URLs.

Expected: all five sites are visible and no card contains invented metrics.

- [ ] **Step 4: Build the engineering-core layout**

Composite the infrastructure scene with `BEYOND THE BROWSER.`, `MNE BRAIN V2 — AI-NATIVE INFRASTRUCTURE BRAIN`, and the six approved capability labels.

Expected: no IP address, hostname, credential, ministry topology, or private configuration appears.

- [ ] **Step 5: Build the visual-CV layout**

Use an off-white background and exact headline `ONE MIND. TWO WORLDS.`. List the four approved capability groups without dates, employers, degrees, certifications, or years of experience.

Expected: the CV is capability-based and contains no unsupported biography.

- [ ] **Step 6: Build the contact layout**

Composite `YOUR NEXT WEBSITE STARTS HERE.`, `Built with design clarity and an engineer's precision.`, `LET'S BUILD`, and `github.com/omersalem`. Show labeled placeholders `WHATSAPP` and `EMAIL` without invented contact details.

Expected: the primary call to action is visually dominant and the verified GitHub identity is legible.

- [ ] **Step 7: Preview all layouts locally**

Open each HTML file in Chrome at 1920×1080. Confirm images resolve from relative paths and no horizontal or vertical scrolling appears.

Expected: five complete single-frame compositions.

- [ ] **Step 8: Commit the layout sources**

```powershell
git add output/portfolio-reference-images/layouts
git commit -m "feat: compose portfolio reference layouts"
```

## Task 5: Render Final PNG Deliverables

**Files:**
- Create: `output/portfolio-reference-images/01-hero.png`
- Create: `output/portfolio-reference-images/02-client-work.png`
- Create: `output/portfolio-reference-images/03-engineering-core.png`
- Create: `output/portfolio-reference-images/04-visual-cv.png`
- Create: `output/portfolio-reference-images/05-contact.png`

- [ ] **Step 1: Render each layout with headless Chrome**

Use the absolute `file:///D:/projects/Microtik/...` URL for each HTML layout. Example:

```powershell
& 'C:\Program Files\Google\Chrome\Application\chrome.exe' --headless=new --hide-scrollbars --force-color-profile=srgb --force-device-scale-factor=1 --window-size=1920,1080 --screenshot='D:\projects\Microtik\output\portfolio-reference-images\01-hero.png' 'file:///D:/projects/Microtik/output/portfolio-reference-images/layouts/01-hero.html'
```

Repeat for all five numbered layouts.

Expected: Chrome reports five screenshots written successfully. The `--force-color-profile=srgb` flag makes the browser compositor render every output in sRGB.

- [ ] **Step 2: Verify exact pixel dimensions**

Run:

```powershell
Add-Type -AssemblyName System.Drawing
Get-ChildItem 'D:\projects\Microtik\output\portfolio-reference-images\0*.png' | ForEach-Object {
  $img = [System.Drawing.Image]::FromFile($_.FullName)
  try { [pscustomobject]@{ File=$_.Name; Width=$img.Width; Height=$img.Height } }
  finally { $img.Dispose() }
}
```

Expected: exactly five rows, each reporting Width `1920` and Height `1080`.

- [ ] **Step 3: Verify file signatures and non-empty output**

```powershell
Get-ChildItem 'D:\projects\Microtik\output\portfolio-reference-images\0*.png' | Select-Object Name,Length
```

Expected: five PNG files with non-zero sizes and no unexpected numbered files.

- [ ] **Step 4: Verify the sRGB render path and PNG color metadata**

First confirm every render command in the execution log used `--force-color-profile=srgb`. Then inspect PNG chunk types with PowerShell:

```powershell
Get-ChildItem 'D:\projects\Microtik\output\portfolio-reference-images\0*.png' | ForEach-Object {
  $bytes = [System.IO.File]::ReadAllBytes($_.FullName)
  $offset = 8
  $chunks = @()
  while ($offset + 12 -le $bytes.Length) {
    $length = [System.Net.IPAddress]::NetworkToHostOrder([BitConverter]::ToInt32($bytes, $offset))
    $type = [Text.Encoding]::ASCII.GetString($bytes, $offset + 4, 4)
    $chunks += $type
    $offset += 12 + $length
    if ($type -eq 'IEND') { break }
  }
  [pscustomobject]@{ File=$_.Name; ColorChunk=(($chunks | Where-Object { $_ -in @('sRGB','iCCP','gAMA') }) -join ','); HasIHDR=($chunks -contains 'IHDR'); HasIEND=($chunks -contains 'IEND') }
}
```

Expected: every file has `IHDR` and `IEND`; every file reports `sRGB` or `iCCP`. A `gAMA` chunk alone does not satisfy this check.

If any file lacks `sRGB` and `iCCP`, create `scripts/ensure-srgb-png.ps1` with `apply_patch`. The helper must parse PNG chunks, preserve the source pixels unchanged, insert a standard one-byte `sRGB` rendering-intent chunk immediately after `IHDR`, calculate its CRC32 over the literal bytes `sRGB` plus the intent byte, and replace the source only after writing and reopening a valid temporary PNG. Run it only on failing files, then rerun both the dimension and chunk checks.

Run:

```powershell
.\scripts\ensure-srgb-png.ps1 -Paths (Get-ChildItem 'D:\projects\Microtik\output\portfolio-reference-images\0*.png').FullName
```

Expected: all five files report an `sRGB` or `iCCP` chunk and remain exactly 1920×1080.

- [ ] **Step 5: Commit the rendered deliverables and metadata helper**

```powershell
git add output/portfolio-reference-images/0*.png
if (Test-Path 'scripts/ensure-srgb-png.ps1') { git add scripts/ensure-srgb-png.ps1 }
git commit -m "assets: render portfolio reference images"
```

## Task 6: Final Visual and Content Verification

**Files:**
- Verify: `output/portfolio-reference-images/01-hero.png`
- Verify: `output/portfolio-reference-images/02-client-work.png`
- Verify: `output/portfolio-reference-images/03-engineering-core.png`
- Verify: `output/portfolio-reference-images/04-visual-cv.png`
- Verify: `output/portfolio-reference-images/05-contact.png`
- Verify: `output/portfolio-reference-images/motion-notes.md`
- Verify: `output/portfolio-reference-images/responsive-notes.md`

- [ ] **Step 1: Inspect every final image at original resolution**

Check composition, copy accuracy, hierarchy, safe margins, visible 3D depth, project-card accuracy, and consistency of chrome/orange styling.

Expected: no clipped text, broken images, loading states, or inconsistent screen styling.

- [ ] **Step 2: Run factual and safety checks**

Confirm:

- Hero has no face and says `YOUR PORTRAIT HERE`.
- Client screen contains all five exact supplied project names and URLs and no fake metrics.
- MNE screen contains only approved high-level capability labels.
- CV contains no unsupported employer, date, degree, certification, or experience-duration claim.
- Contact contains no invented email or WhatsApp number.
- Every screen renders the exact shared navigation copy `WORK / ENGINEERING / PROFILE / CONTACT`.

Expected: all checks pass without exceptions.

- [ ] **Step 3: Review responsive and motion handoffs against the images**

Confirm every visible desktop composition has a corresponding mobile/tablet reflow rule and a reduced-motion/static fallback.

Expected: Gemini can recreate the design responsively without guessing core layout behavior.

- [ ] **Step 4: Run the clean-worktree check**

```powershell
git status --short
```

Expected: no uncommitted implementation files remain.

- [ ] **Step 5: Deliver the artifact set**

Provide clickable links to the five PNGs, the prompt document, motion notes, responsive notes, and the approved design spec. Mention that Omer should upload his portrait when Gemini asks and instruct Gemini to replace only the labeled mannequin layer.
