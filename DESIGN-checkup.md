---
version: alpha
name: CHECKUP-design-system
description: |
  A dark-mode-first operations tool for contact center supervisors and directors,
  built by fusing three references: the NVIDIA system's disciplined token structure
  and one-color-CTA discipline, Spotify's soft rounded warmth and confident dark
  canvas (used as the tone reference — "clean, premium, easy to live inside for
  long sessions"), and the functional vocabulary already proven in the Check Up
  Figma mocks (waveform + flag markers, star scoring, list-based agent queues,
  a two-pane CarPlay layout). The result is a single, calm dark-navy canvas with
  one confident brand green carrying every primary action and active state,
  moderate corner rounding (softer than NVIDIA's engineering-grade 2px, calmer
  than Spotify's very round cards) so the app reads as premium and trustworthy
  rather than playful, and a semantic color layer purpose-built for contact
  center monitoring: live-call status, sentiment, and — new for this system —
  a three-way authorship treatment that visually separates AI-suggested notes,
  supervisor notes, and director notes at a glance.

colors:
  primary: "#34C759"
  on-primary: "#FFFFFF"
  primary-dark: "#248A3D"
  primary-pale: "#1F3A28"
  ink: "#F5F7FA"
  canvas-dark: "#151920"
  surface: "#1B1F29"
  surface-elevated: "#242938"
  surface-sunken: "#10131A"
  hairline: "#323847"
  hairline-strong: "#454C5E"
  body: "#E4E7EC"
  mute: "#8B93A3"
  stone: "#6B7280"
  ash: "#4B5160"
  on-dark: "#FFFFFF"
  on-dark-mute: "rgba(245,247,250,0.68)"
  canvas-light: "#FFFFFF"
  ink-on-light: "#151920"
  status-live: "#34C759"
  status-hold: "#F2B705"
  status-escalation: "#FF453A"
  status-silence: "#5C6373"
  sentiment-positive: "#34C759"
  sentiment-neutral: "#8B93A3"
  sentiment-negative: "#FF6B57"
  note-ai: "#A78BFA"
  note-ai-pale: "#2A2440"
  note-supervisor: "#34C759"
  note-supervisor-pale: "#1F3A28"
  note-director: "#4EA1FF"
  note-director-pale: "#1B2F45"
  error: "#FF453A"
  warning: "#F2B705"

typography:
  display-lg:
    fontFamily: SF-Pro-Display
    fontSize: 34px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.3px
  heading-xl:
    fontFamily: SF-Pro-Display
    fontSize: 26px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: -0.2px
  heading-lg:
    fontFamily: SF-Pro-Display
    fontSize: 22px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: 0
  heading-md:
    fontFamily: SF-Pro-Text
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: 0
  card-title:
    fontFamily: SF-Pro-Text
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0
  body-md:
    fontFamily: SF-Pro-Text
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  body-strong:
    fontFamily: SF-Pro-Text
    fontSize: 15px
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: 0
  body-sm:
    fontFamily: SF-Pro-Text
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: 0
  button-md:
    fontFamily: SF-Pro-Text
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0
  button-sm:
    fontFamily: SF-Pro-Text
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0.1px
  caption-md:
    fontFamily: SF-Pro-Text
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: 0.2px
    textTransform: uppercase
  caption-sm:
    fontFamily: SF-Pro-Text
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: 0
  carplay-lg:
    fontFamily: SF-Pro-Display
    fontSize: 28px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0
  carplay-md:
    fontFamily: SF-Pro-Text
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: 0

rounded:
  none: 0px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 20px
  full: 9999px

spacing:
  xxs: 2px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  xxl: 32px
  section: 40px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    padding: 14px 28px
    height: 48px
  button-primary-active:
    backgroundColor: "{colors.primary-dark}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
  button-secondary:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    padding: 14px 28px
    height: 48px
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    border: "1.5px solid {colors.primary}"
    padding: 12px 26px
    height: 48px
  button-icon-round:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    size: 44px
  button-transport-primary:
    backgroundColor: "{colors.on-dark}"
    textColor: "{colors.canvas-dark}"
    rounded: "{rounded.full}"
    size: 56px
  button-disabled:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.ash}"
    rounded: "{rounded.full}"
  pill-tab:
    backgroundColor: "transparent"
    textColor: "{colors.mute}"
    typography: "{typography.button-sm}"
    rounded: "{rounded.full}"
    padding: 8px 16px
  pill-tab-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-sm}"
    rounded: "{rounded.full}"
    padding: 8px 16px
  chip-filter:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.full}"
    padding: 6px 14px
  status-badge:
    backgroundColor: "transparent"
    typography: "{typography.caption-md}"
    rounded: "{rounded.full}"
    padding: 3px 10px
  note-badge-ai:
    backgroundColor: "{colors.note-ai-pale}"
    textColor: "{colors.note-ai}"
    border: "1px dashed {colors.note-ai}"
    typography: "{typography.caption-md}"
    rounded: "{rounded.sm}"
    padding: 3px 8px
  note-badge-supervisor:
    backgroundColor: "{colors.note-supervisor-pale}"
    textColor: "{colors.note-supervisor}"
    border: "1px solid {colors.note-supervisor}"
    typography: "{typography.caption-md}"
    rounded: "{rounded.sm}"
    padding: 3px 8px
  note-badge-director:
    backgroundColor: "{colors.note-director-pale}"
    textColor: "{colors.note-director}"
    border: "1px solid {colors.note-director}"
    typography: "{typography.caption-md}"
    rounded: "{rounded.sm}"
    padding: 3px 8px
  text-input:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 12px 16px
    height: 48px
  text-input-focused:
    backgroundColor: "{colors.surface-elevated}"
    border: "2px solid {colors.primary}"
    rounded: "{rounded.md}"
  agent-row:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.card-title}"
    rounded: "{rounded.lg}"
    padding: 14px 16px
  agent-row-selected:
    backgroundColor: "{colors.surface-elevated}"
    border: "1px solid {colors.primary}"
    rounded: "{rounded.lg}"
  data-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.card-title}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  now-playing-card:
    backgroundColor: "{colors.surface-elevated}"
    rounded: "{rounded.xl}"
    padding: "{spacing.xl}"
  waveform-panel:
    backgroundColor: "{colors.surface-sunken}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  bottom-tab-bar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.mute}"
    activeColor: "{colors.primary}"
    height: 64px
    rounded: "{rounded.none}"
  top-header:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.heading-lg}"
    height: 56px
    rounded: "{rounded.none}"
  carplay-sidebar:
    backgroundColor: "{colors.surface-sunken}"
    iconColor: "{colors.mute}"
    activeIconColor: "{colors.primary}"
    width: 88px
  carplay-list-row:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.carplay-md}"
    rounded: "{rounded.md}"
    height: 56px
---

## Design Philosophy

Check Up lives in three environments — phone in hand, phone on a desk during a full shift, and a car dashboard glanced at for two seconds at a time. All three must feel like **one calm, confident product**, not three different apps. The system borrows discipline from NVIDIA (a small token vocabulary, one precious brand color, weight-driven hierarchy) and warmth from Spotify (soft dark canvas, generous rounding, content that breathes), then adds a layer neither reference needed: **semantic color for live operational state** (a call's live status, sentiment, silence) and **authorship color** (AI vs. Supervisor vs. Director), because in this product, who said something and how urgent it is are load-bearing pieces of information, not decoration.

## Color System

### Canvas
- **Canvas Dark** (`{colors.canvas-dark}` — `#151920`): the app's base background in every screen except CarPlay's near-black transport chrome. Never pure black — a hair of blue keeps it from feeling like an OLED power-saver hack and closer to Spotify's rich near-black.
- **Surface** (`{colors.surface}` — `#1B1F29`): the default card/row surface sitting one step above canvas. Used for agent list rows, data cards, the QA scorecard.
- **Surface Elevated** (`{colors.surface-elevated}` — `#242938`): a second step up, used for the "now playing"/call-detail panel, focused inputs, and selected states — anything that should read as "currently active."
- **Surface Sunken** (`{colors.surface-sunken}` — `#10131A`): recessed surfaces — the waveform's track background and the CarPlay sidebar — so the waveform itself and its markers pop forward.

### Brand
- **Primary** (`{colors.primary}` — `#34C759`): the single brand green. Every primary CTA, active tab, "live" indicator, and the top header bar. Chosen close to iOS's system green so it reads as native, trustworthy, and instantly legible in CarPlay's high-glare context — never decorative.
- **Primary Dark** (`{colors.primary-dark}` — `#248A3D`): pressed/active state for primary buttons.
- **Primary Pale** (`{colors.primary-pale}` — `#1F3A28`): a low-opacity wash used behind positive states (e.g., a completed QA row, a "Great Win" tag chip) — never behind body text.

### Text
- **Ink** (`{colors.ink}` — `#F5F7FA`): primary text on dark surfaces — headlines, list titles, scorecard labels.
- **Body** (`{colors.body}` — `#E4E7EC`): paragraph and description text, a half-step softer than Ink.
- **Mute** (`{colors.mute}` — `#8B93A3`): metadata, timestamps, inactive tab labels.
- **Stone / Ash**: least-emphasis and disabled text, in descending order.
- **On Dark** (`{colors.on-dark}` — `#FFFFFF`): text/icons on the green header bar and on filled primary buttons.

### Operational Status (new — not in either reference system)
- **Status Live** (`{colors.status-live}` — same as primary `#34C759`): a call currently in progress. Reusing brand green here is deliberate — "live and healthy" should feel like the same color as "go."
- **Status Hold** (`{colors.status-hold}` — `#F2B705`): a call on hold or transferring.
- **Status Escalation** (`{colors.status-escalation}` — `#FF453A`): a call flagged at-risk or actively escalating — reserved exclusively for this meaning so a supervisor never has to think twice about what red means here.
- **Status Silence** (`{colors.status-silence}` — `#5C6373`): dead-air/silence indicator on the waveform and live feed.

### Sentiment
- **Sentiment Positive / Neutral / Negative**: the three-stop gradient used on the sentiment track beneath the waveform and on live-feed sentiment dots. Positive reuses brand green; negative is a warmer red-orange (`#FF6B57`) rather than the sharper escalation red, so "the customer sounds frustrated" reads as distinct from "this call needs a supervisor right now."

### Authorship (the AI vs. Human vs. Director system)
This is the most important new addition to the system and must be used identically everywhere notes, tags, or scorecard entries appear:
- **AI note** (`{colors.note-ai}` — `#A78BFA`, purple): dashed 1px border, pale purple fill. Purple is used nowhere else in the system, so it reads unambiguously as "not a person." Dashed border reinforces "draft/suggested, not yet owned."
- **Supervisor note** (`{colors.note-supervisor}` — brand green): solid 1px border, pale green fill. The moment a supervisor edits or accepts an AI-suggested item, it converts from the dashed purple treatment to this solid green one — a visible, satisfying "I own this now" state change.
- **Director note** (`{colors.note-director}` — `#4EA1FF`, blue): solid 1px border, pale blue fill. Blue is reserved exclusively for director-authored content, distinguishing oversight/tagging from hands-on coaching.

## Typography

**Font family:** SF Pro (Display for large headlines, Text for everything 20px and under) — the native Apple system font. Unlike NVIDIA's brand-locked custom typeface, Check Up deliberately uses the platform font: it renders pixel-perfect on iOS, scales automatically for Dynamic Type/accessibility, and — critically for CarPlay — is the same font Apple's own CarPlay templates use, so Check Up's screens feel native rather than like a third-party overlay. Android should substitute **Roboto** at matching weights/sizes.

Hierarchy is built the NVIDIA way — weight and size carry meaning, not color — with two dedicated CarPlay tokens (`carplay-lg`, `carplay-md`) that are always used in CarPlay contexts regardless of what the equivalent mobile screen uses, because CarPlay needs larger minimum sizes for glanceability at a distance.

| Token | Size | Weight | Use |
|---|---|---|---|
| `display-lg` | 34px / 700 | App-level headers, "Welcome Joe" |
| `heading-xl` | 26px / 700 | Screen titles |
| `heading-lg` | 22px / 600 | Top header bar title ("Check Up") |
| `heading-md` | 18px / 600 | Section headers, agent name in call detail |
| `card-title` | 16px / 600 | List row primary text |
| `body-md` / `body-strong` | 15px | Default copy / emphasis |
| `body-sm` | 13px | Metadata, secondary labels |
| `button-md` / `button-sm` | 16px / 13px | Buttons and pill tabs |
| `caption-md` | 12px / 600 uppercase | Status badges, authorship badges |
| `carplay-lg` / `carplay-md` | 28px / 20px | CarPlay-only — never used on mobile |

## Layout & Spacing

- **Base unit:** 4px, with a slightly tighter scale than NVIDIA's (8px base) because mobile screens need denser information without feeling cramped: `xxs`(2) · `xs`(4) · `sm`(8) · `md`(12) · `lg`(16) · `xl`(24) · `xxl`(32) · `section`(40).
- **List rows** (agent queue, checkup list) use `{spacing.md}` internal padding and `{spacing.sm}` gaps between rows — dense enough to see 8+ agents without scrolling, matching the existing Figma mocks.
- **Card-based screens** (dashboards, group management) use `{spacing.lg}` gutters in a 2-up grid on phone, collapsing to 1-up only on the smallest devices.
- **CarPlay:** fixed two-pane layout (sidebar list + detail pane) exactly as in the existing CarPlay mocks — this is an Apple CarPlay list-template pattern and should not be redesigned into single-column; it's already correct.

## Elevation & Depth

Like NVIDIA, Check Up avoids drop shadows as a primary depth tool — but unlike NVIDIA's hairline-only approach, Check Up uses **surface-step elevation** (canvas → surface → surface-elevated) as its main depth language, closer to how Spotify layers its now-playing sheet over the home feed.

| Level | Treatment | Use |
|---|---|---|
| 0 — Canvas | `{colors.canvas-dark}`, no border | App background |
| 1 — Surface | `{colors.surface}`, no border | List rows, standard cards |
| 2 — Surface Elevated | `{colors.surface-elevated}` | Selected rows, focused inputs, call-detail panel |
| 3 — Soft shadow | `0 4px 16px rgba(0,0,0,0.35)` | Bottom sheets and modals only (e.g., the Question flow) |

No shadows appear on standard list rows or cards — elevation is read entirely through surface color steps, keeping the UI calm during fast scrolling.

## Shapes

Check Up intentionally sits **between** its two references: rounder than NVIDIA's 2px engineering aesthetic (which would feel cold and clinical for a coaching tool), calmer than Spotify's maximal rounding (which would feel too playful for a compliance-adjacent workplace tool).

| Token | Value | Use |
|---|---|---|
| `none` | 0px | Top header bar, bottom tab bar, CarPlay chrome |
| `xs` | 4px | Authorship/status badges |
| `sm` | 8px | Note badges, small chips |
| `md` | 12px | Inputs, CarPlay list rows |
| `lg` | 16px | Standard cards, agent rows |
| `xl` | 20px | Now-playing/call-detail panel, modals |
| `full` | 9999px | All buttons, tabs, filter chips, avatars, transport controls |

The **full-round buttons and transport controls** are the most visible Spotify influence — the play/pause/skip cluster on the call-playback screen should feel exactly as tactile and confident as a music player's, because supervisors will use it just as often.

## Components

### Buttons & Controls
- **`button-primary`** — pill-shaped, brand green, white text, 48px height. Used for "Submit," "Save Question," "Start Monitoring."
- **`button-outline`** — pill-shaped, transparent fill, green border and text. Secondary actions ("Cancel" pairs with this, not with a gray fill, to keep the green as the only "this is Check Up" signal).
- **`button-transport-primary`** — the large white circular play/pause button at the center of playback controls, mirroring the Spotify reference exactly. Skip/rewind flank it as smaller ghost icon buttons.
- **`button-icon-round`** — 44px circular icon buttons (Notes, Flag, Score, Report row) — meets the 44px minimum touch target on every platform.

### Status & Authorship Badges
- **`status-badge`** — pill, no fill, colored text + a small leading dot in the matching status color (Live/Hold/Escalation/Silence). Appears on every agent row and at the top of the call-detail panel.
- **`note-badge-ai` / `note-badge-supervisor` / `note-badge-director`** — small rounded-square (not pill — deliberately distinct from status pills so the eye doesn't confuse "who said this" with "what state is this call in") badges using the dashed-purple / solid-green / solid-blue system defined above. Every comment, scorecard entry, and waveform flag carries exactly one of these three.

### Waveform & Flags
- **`waveform-panel`** — sunken dark track holding the waveform itself, directly adopted from the existing Figma mocks (white waveform bars, red-highlighted "current position forward" segment, colored flag pins along the timeline).
- Flag pin colors map onto the authorship + status systems, not arbitrary colors: a green flag = a Supervisor-tagged "Great Win," a purple flag = an AI-detected moment worth reviewing, a red flag = an escalation/compliance risk. This gives the waveform the same three-color vocabulary as the comment feed, so a supervisor scanning the timeline already knows who flagged what before tapping in.

### Lists & Cards
- **`agent-row`** — the core list component (Checkups queue, live feed). Surface-level card, rounded `lg`, avatar + name + team + time + trailing status/play affordance — matches the existing mock almost exactly, just re-skinned onto the new token set.
- **`data-card`** — general-purpose dashboard card for KPIs, group summaries, and director dashboard widgets.
- **`now-playing-card`** — the elevated call-detail/playback panel, the app's equivalent of Spotify's now-playing screen: largest padding in the system, houses the waveform, agent/customer metadata, and transport controls together as one visual unit.

### Navigation
- **Mobile:** `top-header` (solid green bar, matches the existing "Check Up" wordmark treatment exactly) + `bottom-tab-bar` (dark surface, green active icon, muted inactive icons) — a direct carry-over from the Figma mocks, just formalized into tokens.
- **CarPlay:** `carplay-sidebar` (narrow icon rail, muted icons, green active icon) + `carplay-list-row` (larger type, generous height) in a fixed two-pane template — do not attempt to port the mobile bottom-tab pattern to CarPlay; Apple's CarPlay HIG requires the list/sidebar template, and the existing mocks already follow it correctly.

## CarPlay-Specific Rules

CarPlay is not a shrunk-down phone screen — it is a **restricted, safety-critical surface** and the system treats it as its own mode:
- Minimum touch target: 60×60px (larger than the 44px mobile minimum) per Apple CarPlay HIG.
- Only two colors carry meaning on screen at once beyond ink/canvas: brand green for "go/active" and status-escalation red for "needs attention" — no purple/blue authorship badges in CarPlay, that nuance is mobile-only and would add cognitive load while driving.
- Barge and Takeover controls are never available in CarPlay — only Listen and Whisper, per the safety guardrail already defined in the feature list. Disabled controls are shown grayed with `{colors.ash}`, not hidden, so the supervisor understands the restriction rather than wondering where a feature went.
- Type never drops below `carplay-md` (20px) anywhere in CarPlay, even for secondary metadata.
- Waveform in CarPlay keeps flags and the played/unplayed color split but drops the sentiment gradient track — one fewer visual layer for a glance-and-return interaction.

## Do's and Don'ts

### Do
- Treat `{colors.primary}` the way NVIDIA treats its green: one color, reserved for CTAs, active states, and "live/positive" meaning. Resist adding a second "brand-adjacent" green.
- Use the authorship badge system (purple/green/blue) identically across comments, scorecards, and waveform flags — this consistency is the entire point of the system.
- Keep CarPlay type and touch targets larger than their mobile equivalents, never the same size scaled down.
- Use surface-step elevation (canvas → surface → surface-elevated) as the primary depth cue; reach for shadow only on true overlays (bottom sheets, modals).
- Let full-round buttons and transport controls carry the "Spotify warmth" — this is the one place maximal rounding is appropriate.

### Don't
- Don't introduce a fourth authorship color. If a new content-source type is added later (e.g., a QA-vendor integration), extend the badge system deliberately rather than picking an arbitrary new hue.
- Don't use status-escalation red for anything except calls that need supervisor attention — not for generic form-validation errors, which should use the separate `{colors.error}` token even though the hex values are related.
- Don't apply NVIDIA-style 2px sharp corners anywhere in this system — it was intentionally rejected as too clinical for a coaching-oriented product.
- Don't enable Barge/Takeover UI in CarPlay, even in a disabled-but-visible state that implies it might become available while driving.
- Don't let dashed AI-note borders appear anywhere without the accompanying purple `note-ai` text/badge — dashed border alone is not sufficient differentiation for accessibility.

## Iteration Guide

1. Reference tokens directly (`{colors.primary}`, `{component.agent-row}`, `{rounded.lg}`) when prompting Claude Design or briefing engineering — don't paraphrase hex values or pixel sizes.
2. When designing a new screen, decide its elevation level first (canvas/surface/surface-elevated), then pull typography and spacing tokens — this keeps new screens from accidentally inventing new depth language.
3. Any new comment/tag/note surface must use one of the three existing authorship badges. If it doesn't obviously map to AI/Supervisor/Director, that's a signal the content type needs product definition before it needs a design token.
4. Before adding a new color, ask whether it can be expressed as a pale/solid/dark variant of an existing token (as done with `primary` / `primary-pale` / `primary-dark`) — the system should rarely need genuinely new hues.
5. Validate every CarPlay screen against the 60px touch-target and `carplay-md` minimum type size rules before calling it final.

## Known Gaps

- **Exact brand hex values are approximated** from the Spotify/Check Up screenshots and NVIDIA's structural pattern, not sampled from a locked brand guideline — confirm final hex values (especially `{colors.primary}`) against any existing Check Up brand asset before development handoff.
- **Light-mode variant** is stubbed (`canvas-light`, `ink-on-light`) but not fully specified — this system is dark-mode-first per the product's NOC/low-light usage context; a full light-mode pass should be a deliberate follow-up, not an automatic inverse.
- **Android/Roboto metrics** are noted as a substitute but not verified against SF Pro's optical sizing the way NVIDIA's doc verified Inter against NVIDIA-EMEA — worth a dedicated typography QA pass before Android development.
- **Data-visualization chart tokens** (for the executive KPI dashboard's trend lines/sparklines) are not yet defined in this version — the dashboard screens will need a follow-up chart-color extension once real KPI chart types are finalized.
