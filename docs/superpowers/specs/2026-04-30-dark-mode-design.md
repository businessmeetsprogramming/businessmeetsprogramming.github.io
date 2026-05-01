# Dark Mode for Personal Website — Design

**Date:** 2026-04-30
**Status:** Approved (pending implementation)
**Owner:** Dennis Zhang

## Goal

Add dark mode support to the personal website so that visitors whose operating system is set to dark appearance see the site rendered with a dark color palette automatically. Visitors with a light/default OS appearance continue to see the existing light theme unchanged.

## Non-goals

- No manual toggle button or in-page theme switcher.
- No JavaScript-driven preference persistence (`localStorage` etc.).
- No refactor of the existing stylesheet to use CSS custom properties.
- No changes to the CV PDF (viewers' PDF readers handle their own dark mode).
- No changes to images.

## Activation

Dark mode activates **purely via the CSS media query** `@media (prefers-color-scheme: dark)`. This means:

- Browsers report the OS-level appearance preference.
- Users who set their device to dark mode see the site in dark.
- Users on light/default see the site exactly as it is today.
- No HTML changes, no JS changes, no class toggling.

## Architecture

A single, self-contained `@media (prefers-color-scheme: dark) { ... }` block is appended to the end of `assets/css/main.css`. The block contains override rules that target the same selectors as the light-mode rules and adjust background colors, text colors, link colors, borders, text shadows, and the `bg.png` texture.

**Rationale for the appended-block approach** (chosen over inlining or refactoring to variables):

- The existing stylesheet is from an old HTML5UP "Miniport" template (jQuery + skel, lots of vendor prefixes, literal hex codes throughout, no custom properties). Refactoring to variables would touch hundreds of lines.
- A single appended block is additive: the existing CSS is untouched, the diff is small, and reverting is trivial (delete the block).
- All dark-mode rules live in one place, so a future maintainer can audit the entire dark theme by looking at one section of the file.

## Color palette

| Token | Light (current) | Dark |
|---|---|---|
| Page bg (`wrapper.style1`) | `#fff` | `#1a1a1a` |
| Section bg (`wrapper.style3`, used by Research / Editorial / Students / Awards) | `#f4f4f4` | `#1a1a1a` |
| Contact bg (`wrapper.style4`) | `#303030` | `#1a1a1a` (unified with body) |
| Nav bg (`#nav`) | `#282828` | `#141414` (slightly darker than body to remain distinct) |
| Body text | `#3e3e3e` / `#000` | `#d0d0d0` |
| Headings | inherits | `#f0f0f0` |
| Link / accent (`a`, `.paper`) | `#43B3E0` | `#5cc8f5` (slightly brighter for AA contrast on dark) |
| Link hover | `#43bff0` | `#7dd6ff` |
| Borders / dividers (e.g., `<hr>`, blockquote rule) | `#eee` / `#ddd` | `#2e2e2e` |

The contact section's text color (currently `#999` in light mode) becomes `#d0d0d0` in dark for legibility, matching the rest of the body text.

## Edge cases handled in the dark block

1. **White text shadows.** The light theme uses `text-shadow: 1px 1px 0px #fff` on `wrapper.style2`, `wrapper.style3`, and several nav button states. On dark backgrounds these become bright halos around text. → Set `text-shadow: none` for these selectors inside the dark block.

2. **Background grain texture (`bg.png`).** The `.wrapper` rule applies `background-image: url("images/bg.png")` for a subtle paper-grain effect. On dark backgrounds the same texture becomes visible noise. → Set `background-image: none` for `.wrapper` inside the dark block and rely on `background-color` only.

3. **Contact section dark text shadow.** The light theme already applies `text-shadow: -1px -1px 0px #181818` on `wrapper.style4`. With the unified dark body it's no longer necessary and is simpler to remove. → Set `text-shadow: none` inside the dark block.

4. **Inset / box-shadow rules.** `.wrapper` has `box-shadow: inset 0px 1px 0px 0px rgba(0,0,0,0.05), inset 0px 2px 3px 0px rgba(0,0,0,0.1)` to add a subtle highlight at the top of each section. These rgba values are barely visible on dark and can stay; no override needed.

## Testing

1. **OS toggle test.** macOS: System Settings → Appearance → toggle Light/Dark/Auto. Reload the page and verify each section (Top, Research, Editorial, Students, Awards, Contact, Nav) renders in the intended palette.
2. **Light mode regression.** Confirm light mode is byte-for-byte unchanged from the current site (the dark rules sit inside a media query, so they cannot affect light rendering).
3. **Responsive test.** Verify dark mode at the three skel breakpoints (desktop ≥1201px, tablet 737–1200px, mobile ≤736px). Check that the nav doesn't visually break at the mobile breakpoint where it switches to the slide-in style.
4. **Link contrast.** Verify the new link colors (`#5cc8f5` and `#7dd6ff`) meet WCAG AA contrast against `#1a1a1a` background. Spot-check on the publication list (which has the highest density of links).
5. **PDF link.** Click the CV link, confirm the PDF still loads (no change expected since this is a static link).

## Files modified

- `assets/css/main.css` — append the dark-mode `@media` block at the end of the file.

That is the only file changed. No new files, no HTML changes, no JS changes.

## Risks and mitigations

- **Risk:** Some text-shadow or background rule we didn't anticipate produces a visual artifact in dark mode.
  **Mitigation:** Visual regression check on every section during testing. Because dark rules are isolated in the `@media` block, fixes are localized.

- **Risk:** Future template updates to the existing CSS could conflict with the dark block.
  **Mitigation:** The dark block lives at the bottom of `main.css` clearly fenced with a comment header so future edits don't accidentally interleave with it.

## Acceptance criteria

- [ ] On a device set to OS dark mode, the entire page renders with the dark palette above with no visible white halos, no visible grain texture, and no white-on-white or black-on-black regions.
- [ ] On a device set to OS light mode (or a browser without `prefers-color-scheme` support), the page renders identically to the pre-change site.
- [ ] All link text on dark backgrounds meets WCAG AA contrast against the body background.
- [ ] No JavaScript errors introduced; site loads with no console warnings beyond what existed before.
- [ ] CV PDF download / view still works.
