---
name: Syed Hammad
description: An AI engineer's portfolio set as a dark, chaptered editorial feature.
colors:
  night-ground: "#080808"
  warm-ink: "#f1ebe5"
  stone-muted: "#a6a39d"
  ash-faint: "#817e79"
  hairline: "rgb(241 235 229 / 0.14)"
  hairline-strong: "rgb(241 235 229 / 0.28)"
  live-signal: "#ec8838"
typography:
  hero:
    fontFamily: "Instrument Serif, Times New Roman, serif"
    fontSize: "clamp(64px, 19vw, 150px); calc(128 * 100vw / 1280) from 1024px"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-0.02em"
  display-xl:
    fontFamily: "Instrument Serif, Times New Roman, serif"
    fontSize: "clamp(52px, calc(132 * 100vw / 1280), 190px)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-0.02em"
  display:
    fontFamily: "Instrument Serif, Times New Roman, serif"
    fontSize: "clamp(42px, calc(84 * 100vw / 1280), 120px)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Instrument Serif, Times New Roman, serif"
    fontSize: "clamp(30px, calc(46 * 100vw / 1280), 66px)"
    fontWeight: 400
    lineHeight: 1.02
  lede:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "clamp(17px, calc(19 * 100vw / 1280), 25px)"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "clamp(15px, calc(16 * 100vw / 1280), 20px)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "DM Mono, ui-monospace, monospace"
    fontSize: "max(11px, calc(12 * 100vw / 1280))"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "0.14em"
rounded:
  hairline: "2px"
  pill: "999px"
spacing:
  unit: "calc(100vw / 1280)"
  gutter: "clamp(20px, calc(28 * 100vw / 1280), 56px)"
  header: "clamp(60px, calc(68 * 100vw / 1280), 84px)"
  block: "clamp(56px, calc(88 * 100vw / 1280), 128px)"
  chapter: "clamp(88px, calc(140 * 100vw / 1280), 210px)"
components:
  button-primary:
    backgroundColor: "{colors.warm-ink}"
    textColor: "{colors.night-ground}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 1.6em"
    height: "3.5em"
  button-primary-hover:
    backgroundColor: "#ffffff"
    textColor: "{colors.night-ground}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.warm-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 1.6em"
    height: "3.5em"
  link-rolling:
    textColor: "{colors.warm-ink}"
    typography: "{typography.label}"
  chip-tag:
    textColor: "{colors.stone-muted}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  tab:
    textColor: "{colors.ash-faint}"
    typography: "{typography.label}"
    height: "44px"
  tab-selected:
    textColor: "{colors.warm-ink}"
  disclosure-trigger:
    textColor: "{colors.warm-ink}"
    typography: "{typography.title}"
    height: "64px"
  chapter-marker:
    textColor: "{colors.stone-muted}"
    typography: "{typography.label}"
---

# Design System: Syed Hammad

## Overview

**Creative North Star: "The Night Feature"**

The site reads like a long magazine feature printed on black: one subject, told in numbered chapters, with a serif voice large enough to carry the page on its own. Density is low and deliberate. Each chapter opens on a very large Instrument Serif heading whose second clause turns italic, and everything around it (running heads, metadata, buttons) drops to small, tracked DM Mono so the serif never competes with itself.

Structure comes from hairline rules at low ink opacity, not from boxes, fills, or shadows. Featured work is laid out as ruled editorial rows rather than a grid of equal cards. The only colour with a temperature beyond the warm off-white ink is a single orange, and it is reserved for the hero's italic last name and for things that are live: the lit path through the hero's retrieval graph, text selection, the focus ring, and the caret.

The one moving image is the live retrieval graph in the hero: ink nodes and edges whose weight fades toward the field's rim, with an orange route that draws itself on load and a second ink route that links as the visitor scrolls. Motion elsewhere is quiet: a staggered blur-rise for the first viewport, opacity-and-lift reveals below the fold, and labels that roll on hover. All of it switches off under prefers-reduced-motion.

**Key Characteristics:**
- Near-black ground, warm off-white ink, two stepped greys; one orange for the hero last name and live signals only.
- Instrument Serif at a single weight (400) for every heading, with one italic clause per headline.
- DM Mono, uppercase and tracked, for every label, folio, nav item, and button.
- Hairline rules and pill outlines carry all structure; no shadows, no filled cards.
- A margin rail on wide screens holds chapter running heads, aligned with the header nav.
- Layout measured in comp units (1 unit = 1px of a 1280-wide comp), fluid with the viewport.

## Colors

A warm monochrome on near-black, with one orange held back for live state.

### Primary
- **Live Signal** (live-signal): The lit route in the hero retrieval graph and its travelling pulse, the `::selection` background (with night-ground text), the 1px focus-visible outline, `accent-color`, the text caret, and the italic last name in the hero headline. Nothing else.

### Neutral
- **Night Ground** (night-ground): Page, header, and mobile-menu background; also the browser `theme-color`. Process step cells sit on it over a hairline gap grid.
- **Warm Ink** (warm-ink): Headings, the name mark, primary text, the solid button fill, ink graph nodes and edges, selected-tab text and underline.
- **Stone Muted** (stone-muted): Lede and body paragraphs, running-head titles, chip text, hero location line.
- **Ash Faint** (ash-faint): Third-level metadata (project context, certification issuers), unselected tabs, italic margin asides, process step numerals, future-tense journey entries, scrollbar thumb. About 4.96:1 on night-ground, so it stays legible at label size.
- **Hairline** (hairline): Section top borders, row dividers in ruled lists, tablist baseline, chip outlines.
- **Hairline Strong** (hairline-strong): Outline buttons, the disclosure toggle ring, the header rule and hero rule, running-head dash, email underline at rest.

### Named Rules
**The Live Wire Rule.** Orange means "live." It appears on the graph's active path, selection, focus, and caret, and never on headings, italics, body text, borders, or decoration. The one exception is the italic last name in the hero headline, which matches the approved comp.

**The Three Inks Rule.** Text hierarchy is carried by warm ink, stone muted, and ash faint, in that order. Do not introduce a new hue to separate levels; drop a step instead.

**The Hairline Rule.** Structure is drawn with 1px rules at 14% ink (hairline) or 28% ink (hairline-strong). The hero proof strip's vertical dividers sit between them at 20% ink.

## Typography

**Display Font:** Instrument Serif (with Times New Roman, serif), regular and italic, weight 400 only
**Body Font:** DM Sans (with system-ui, sans-serif)
**Label/Mono Font:** DM Mono (with ui-monospace, monospace), weights 400 and 500

**Character:** A literary, slightly condensed serif speaking at headline scale, against a plain grotesque for reading and a typewriter mono for every piece of metadata. The serif is the voice; the mono is the caption.

### Hierarchy
- **Hero** (400, `clamp(64px, 19vw, 150px)` stacked; 128 comp units from 1024px, 0.92 line-height, -0.02em): The name only. First name roman, last name italic, warm ink, set on one line from 1024px.
- **Display XL** (400, display-xl, 0.92): The closing contact headline only.
- **Display** (400, display, 0.98, -0.02em, balanced, about 13ch max): Every chapter heading, with an italic second clause.
- **Title** (400, title, 1.02): Featured project titles, the disciplines heading, the "more work" disclosure trigger. Smaller serif steps (roughly 22 to 46px fluid) set results, milestones, process step titles, and the email address.
- **Lede** (400, lede, 1.55, 52ch max): Chapter intros and the contact paragraph, in stone muted.
- **Body** (400, body, 1.6, 48 to 56ch max): Project summaries, milestone bodies, step bodies, in stone muted.
- **Label** (400, label, uppercase, 0.14em tracking): Running heads, tabs, project categories, disclosure meta, nav, buttons, chips, graph node labels. Chips and dense metadata drop to a fixed 11px at 0.10 to 0.12em.

### Named Rules
**The One Italic Clause Rule.** Each serif headline carries exactly one italic clause, and it closes the line. Italic also marks quoted results, margin asides, and things that have not happened yet; it is never coloured.

**The Single Weight Rule.** Instrument Serif runs at 400 only. Hierarchy comes from size and italic, never from bolding the serif.

**The Mono Is Metadata Rule.** DM Mono is always uppercase, tracked, and small. It labels; it never carries a sentence of prose. Numbers in labels and stats use tabular figures.

## Layout

**Comp units.** Sizes are written in comp units, where 1 unit is 1px of the 1280-wide approved comp (`100vw / 1280`), clamped with px floors and ceilings so the layout scales without breaking at the extremes. The page gutter and header height both follow this rule.

**The hero** stacks in normal flow below 1024px: location lines, name, thesis, two CTAs, graph, rule, and a two-column proof strip. From 1024px it switches to the comp's measured composition: text column at 33 units from the left, the graph field occupying the right (570 by 362 units from x 696), a full-bleed strong rule, and a four-column proof strip pinned to the bottom edge, its columns divided by 20% ink rules. The section is at least one small-viewport height tall.

**Chapters** are full-width sections with a hairline top border and generous vertical padding (chapter spacing). From 1024px they use a two-column grid: a margin rail `32.66vw` wide (less the gutter) that holds the sticky running head, lining up with the left edge of the header nav, and a content column to its right. Below 1024px the rail disappears and the running head sits directly under the heading. Large internal breaks use the block spacing step.

**Ruled lists** carry most content: featured projects, more work, journey milestones. Each is a stack of rows separated by hairlines, splitting into two or three asymmetric columns from 768px (for example 1.15fr to 1fr for project rows, a fixed 130-unit year column for milestones).

**Chapter order** is About (01), Journey (02), Selected work (03), How I work (04), Contact (05); the header nav follows the same order.

**Units.** Layout is measured in comp pixels. `--x` (100vw / 1280) places things horizontally (gutters, hero columns, the graph's right edge). `--u` sizes everything else: it equals `--x` below 1024px, and from 1024px runs at 88% of `--x`, capped at 100svh / 660, so laptops keep the comp's proportions with more whitespace. The hero's content block shifts down by 40% of any spare height so it stays balanced above the proof strip.

**Breakpoints** are Tailwind's defaults: 640px, 768px, 1024px (the main structural switch), 1280px.

### Named Rules
**The Margin Rail Rule.** On wide screens, chapter running heads live in the 32.66vw margin rail and stay sticky beside the content; they never sit as a label above the heading.

## Elevation & Depth

Flat. There are no shadows anywhere. Depth comes from two things only: the hairline rules that divide the page, and the retrieval graph, whose node and edge weight fades toward the rim of its field so it reads as an atmosphere rather than a framed picture. The fixed header sits on solid night ground with a strong hairline beneath it, not a blur or shadow.

### Named Rules
**The Flat Night Rule.** Nothing casts a shadow. If an element needs separation, give it a hairline or a tonal step, never an offset or glow.

## Shapes

Two shapes. Interactive controls are full pills (pill radius): buttons, the "Menu" button, chips, the disclosure toggle ring. Everything structural is square: rows, tabs, sections, and rules have no radius, and the process grid uses a near-square 2px corner on its outer clip only. The focus ring follows the pill shape by default and tightens to a small radius on square controls (tabs, tab panels, the disclosure row). Icons are inline 16px-grid SVGs drawn with a 1.25 stroke and round caps, in currentColor.

## Components

### Buttons
Quiet, typographic pills whose label rolls up on hover.
- **Shape:** Full pill (pill radius), height 3.5em, horizontal padding 1.6em, label type.
- **Primary (solid):** Warm ink fill with night-ground text; brightens to pure white on hover. Used once per surface for the main call to action.
- **Outline:** Transparent with a hairline-strong border and warm-ink text; the border firms to warm ink on hover. Used for secondary actions, the header "Let's talk", and social links.
- **Plain:** Unboxed label-type link in warm ink (nav items, "Visit site", "Source").
- **Hover / Focus:** The label slides up and a duplicate slides in from below (500ms, ease-out-expo); the optional arrow nudges up and right by 1px. Colour changes take 300ms. Focus shows the 1px live-signal outline at 4px offset. The duplicate label is aria-hidden, and the roll is disabled under reduced motion or motion off.

### Chips
- **Style:** Hairline outline pill, 6px by 12px padding, 11px DM Mono uppercase at 0.10em, stone muted text, no fill.
- **State:** Static. Chips list a project's stack or a discipline's tools and are not interactive.

### Navigation
- **Header:** Fixed, night ground, header height, strong hairline below. Serif name mark at left; on 1024px and up, plain rolling-link nav items start at 32.66% (the margin rail's edge), followed at right by an outline "Let's talk" pill. The header elements enter with the first-viewport stagger.
- **Mobile:** A "Menu"/"Close" outline pill opens a full-height panel on night ground listing the chapters (plus "Let's talk") as large serif links in hairline-divided rows. Escape closes it and page scroll locks while open.

### Tabs
- **Style:** A three-column tablist on a hairline baseline. Each tab shows a label-type name and, from 640px, a 14px detail line beneath. Unselected tabs are ash faint (stone muted on hover); the selected tab is warm ink with a warm-ink underline replacing the baseline.
- **Behaviour:** Full ARIA tabs pattern with automatic activation: arrow keys, Home and End move focus and selection, only the selected tab is in the tab order. Tabs carry no ordinal numbers. The incoming panel rises 10px and fades in over 0.5s.

### Disclosure
- **Style:** A full-width row between two hairlines, at least 64px tall, with a title-type serif summary at left and, at right, a label-type count plus a 40px hairline-strong ring holding a plus icon.
- **Behaviour:** The plus rotates 45° into a close mark, and the panel opens by animating its grid row from 0fr to 1fr (500ms, ease-out-expo). Closed content is inert, so focus and screen readers skip it.

### Chapter Marker (signature)
A running head like a magazine folio: the chapter number in warm ink with tabular figures, a 24px strong hairline dash, and the chapter title in stone muted, all in label type. An optional italic serif aside in ash faint (about 18ch) sits under it. It lives in the margin rail on wide screens and under the heading on small ones.

### Proof Strip
A definition list of real figures at the bottom of the hero. Each stat pairs a label-type term with a serif value (40 comp units on wide screens) in tabular figures. Columns are separated by 1px rules at 20% ink.

### Retrieval Graph (signature)
A live WebGL2 canvas (2D-canvas fallback) drawn only in warm ink and live signal. Ink nodes and edges fade toward the field's rim; six anchor nodes carry DM Mono labels in 85% ink. On load, the orange primary route draws itself over about 1.6s with an ease-out cubic, then a single orange pulse travels it; a second route links in ink as the hero scrolls; nodes brighten near the pointer and drift slightly. With motion off it renders the completed state statically and still responds to scroll. It pauses when offscreen and is announced as one image with a descriptive label.

### Journey Tower (signature)
The Journey chapter is a timeline that builds from the ground up. It drops the shared chapter shell for its own two-column frame: the margin rail holds the folio, a smaller display heading (56 units), the italic aside, and, pinned to the rail's foot, the certifications as a single column of name over mono issuer. The content column holds the milestones as one semantic ordered list in date order, displayed bottom-up from 1024px so 2019 is the base and "Next" the top. Each row is a hairline-ruled, three-column line (serif year, serif title, muted body) with a 7px warm-ink node on a 1px strong-hairline spine at its left; the "Next" row is italic and faint with a hollow node.
- **Landing:** each row descends from above out of a 12px blur, its hairline draws in from the left, the node pops (back-out) with a live-signal flash that cools to warm ink, and the year, title and body fade down 28px out of a 6px blur in turn, 100ms apart.
- **Wide (1024px and 640px tall up):** the frame pins below the header for 65vh of scroll per milestone, scrubbed, so one year lands at a time and scrolling up lifts them back out the top in reverse. The spine grows up from the base while each row lands from 28vh above; the year beneath dims from warm ink to stone muted, so only the newest year is bright. Certifications fade down last. Row padding, year size and frame padding scale with viewport height so the full tower fits from 640px tall.
- **Narrow or very short:** no pin. The spine grows down with the list's scroll range; rows entering together land one after another 280ms apart, and each reverses back up when scrolled back above its trigger.
- **Sizes:** years are 44 units on wide screens (capped at 6vh), 50 units (40px minimum) on small ones. On wide screens certifications sit in hairline rows, name left and mono issuer right.
- **Reduced motion:** the complete static timeline.

### Motion Grammar
One easing everywhere: ease-out-expo, the GSAP `expo.out` equivalent. The first viewport enters with CSS so it runs from first paint: elements rise 0.35em from a 6px blur over 1.1s, staggered by 90ms after a 120ms delay, and rules draw from the left over 1.4s. Below the fold, a single GSAP ScrollTrigger orchestrator reveals `[data-reveal]` elements: content is present and visible in the server HTML, only elements still offscreen at mount are hidden (opacity and a 32px lift, never visibility), and they reveal in batches with an 80ms stagger. Focusing a hidden element reveals it. From Journey onward (Journey, Selected work, How I work, Contact) reveals use the Journey landing instead: elements descend 40px from above out of a 12px blur over 0.9s (power3.out, 120ms stagger), and lift back out the top, re-blurring, when scrolled back above their trigger; About keeps the one-time 32px rise. The Journey Tower is the one scrubbed, pinned sequence; its rows are not `[data-reveal]`, and its pin refreshes first so later reveals measure after its spacing.

## Do's and Don'ts

### Do:
- **Do** keep orange (live-signal) to the hero's italic last name, the graph's live path, selection, focus, and caret.
- **Do** give every serif headline one italic closing clause, in warm ink.
- **Do** set every label, folio, nav item, button, and chip in uppercase tracked DM Mono at label size.
- **Do** divide content with hairline rules (14% or 28% ink) and lay out work as ruled rows.
- **Do** place chapter running heads in the 32.66vw margin rail from 1024px, and under the heading below that.
- **Do** size layout in comp units (`100vw / 1280`) clamped with px floors and ceilings.
- **Do** ship content visible in the server HTML; animate only offscreen `[data-reveal]` elements, and honour `prefers-reduced-motion` on every animation.
- **Do** keep ash faint (about 4.96:1) as the lightest-contrast text; never go dimmer for readable copy.

### Don't:
- **Don't** put eyebrow kickers or small mono labels above headings. The hero's role and location lines are a one-off approved by the user from the comp, not a reusable device.
- **Don't** number tabs or prefix them with ordinals.
- **Don't** add shadows, glows, backdrop blurs, or filled cards to separate content.
- **Don't** colour italics, headings, or body text orange, apart from the hero's last name.
- **Don't** bold Instrument Serif or introduce another display face.
- **Don't** use icon fonts or glyph icons; draw icons as inline SVG with a 1.25 stroke.
- **Don't** round structural elements; radius belongs to pill controls only.
