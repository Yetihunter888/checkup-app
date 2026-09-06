# Claude Design — Prompt Sequence
## Contact Center Supervisor & Director App

How to use this: run these prompts in order, in the same Claude Design session, so each screen builds on the design system and decisions established earlier. Don't skip Prompt 1 — it locks the visual language everything else inherits. After each prompt, review the output before moving to the next; adjust wording in brackets [ ] to match what you actually see.

---

### Prompt 1 — Design System Foundation

```
I'm designing a mobile app (iOS + Android + Apple CarPlay) for contact center Supervisors and Directors to monitor live calls, score quality, and coach agents in real time. This is a professional, high-density operations tool — think mission-control meeting modern SaaS, not a consumer app. It will be used in fast-paced, sometimes high-stress moments, so clarity and speed of scanning matter more than decoration.

Before designing any screens, establish a design system:
- A dark-mode-first color palette (supervisors work in dim NOC-style environments) with a light-mode variant
- A clear semantic color system for status: live/active, on-hold, at-risk/escalation, silence/dead-air, positive sentiment, negative sentiment
- A distinct, consistent visual treatment for "AI-generated" content vs. "human-authored" content (badge, border, or color) — this will be reused across notes, QA scores, and call tags throughout the app, so define it clearly now
- Typography scale optimized for data density and glanceability
- Core component set: status pills/badges, data cards, list rows with live indicators, waveform component placeholder, tab bar, and a floating action button pattern

Show me the palette, type scale, and 4–5 core components as a style sheet before we move to full screens.
```

---

### Prompt 2 — Supervisor: Live Call Monitoring Feed

```
Using the design system we just established, design the Supervisor's main screen: the Live Call Monitoring Feed.

Requirements:
- A queue health strip pinned at the top: calls waiting, longest wait, agents available, SLA risk — glanceable at a single look
- Below it, a scrollable list of active calls, each row showing: agent name/avatar, team, call duration, live status (talking/hold/transferring), a sentiment indicator, and a "needs attention" flag for AI-flagged risk calls
- A filter bar above the list: filter by team, group, metric, and a "saved views" chip row (e.g., "My Team," "Escalations Only")
- Tapping a call row should visually indicate it opens a listen action — show that affordance
- Include an empty state and a state showing 2–3 rows flagged as "needs attention" with a visually distinct treatment from normal rows

Keep density high but scannable — this is a working tool a supervisor checks dozens of times a shift.
```

---

### Prompt 3 — Supervisor: Groups & Team Management

```
Now design the Groups & Team Management screen, consistent with our design system.

Requirements:
- A list/grid of existing groups (e.g., "Team East," "Billing Specialists") showing member count and a rollup mini-metric (avg QA score or CSAT)
- A clear "Create New Group" action
- A flow state showing how a supervisor would select two existing groups to merge — show this as a multi-select mode with a confirmation step
- A group detail view showing member list with an "Add Members" action
- Indicate visually which groups are "dynamic/auto" (e.g., skill-based auto-grouping) vs. manually created static groups

Match the data-density and color language from Prompt 1–2.
```

---

### Prompt 4 — Supervisor: Call Detail, Waveform & Annotations

```
Design the Call Detail screen — this is the core coaching workspace, opened after listening to or reviewing a call.

Requirements:
- A full-width waveform visualization across the top, with:
  - Color-coded markers for inline comments (use different colors per tag: Coaching Opportunity, Great Win, Compliance Risk, Escalation)
  - A visually distinct dead-air/silence overlay on the waveform itself
  - A thin sentiment gradient track directly beneath the waveform
- Below the waveform: playback controls including variable speed and a "skip silence" toggle
- A scrollable comment feed synced to the waveform, where each comment shows its timestamp, tag, author, and — critically — uses the AI-vs-human visual treatment we defined in Prompt 1 to distinguish AI-suggested annotations from supervisor-authored ones
- An "Add Comment" affordance including a voice-memo option
- A persistent header showing agent name, customer info, call duration, and current QA quota progress for this supervisor

This screen holds the most information density in the app — prioritize a clear visual hierarchy so the waveform and comments feel like one connected timeline, not two separate widgets.
```

---

### Prompt 5 — Supervisor: QA Scoring / Scorecard

```
Design the Post-Call QA Scoring screen, opened from the Call Detail view.

Requirements:
- A scorecard with weighted categories (e.g., Greeting, Issue Resolution, Compliance Disclosures, Closing) each with a scoring control (numeric or pass/fail toggle)
- Show an "AI Pre-Scored Draft" state: several categories are pre-filled by AI, using the AI visual treatment from Prompt 1 (badge/border/color), clearly distinguishable from categories the supervisor has manually scored or edited
- Show the interaction of a supervisor tapping an AI-suggested score to accept or override it — on override, the item should visually convert to the "human-authored" style
- Include a running score total and a "quota progress" indicator (e.g., "12 of 15 weekly QA reviews complete")
- Include a small trend sparkline comparing this score to the agent's last 5 scores
- A submit action and a "save as draft" action

This is a compliance-relevant screen — legibility and unambiguous states matter more than visual flourish here.
```

---

### Prompt 6 — Supervisor: Live Intervention (Whisper / Barge / Takeover)

```
Design the in-call live intervention controls, shown while a supervisor is actively listening to a live call.

Requirements:
- Three clearly differentiated action controls: Whisper, Barge, Takeover — these carry real risk if mis-tapped, so use size, color, and confirmation patterns that scale with the seriousness of the action (Whisper = low friction, Takeover = requires a confirmation step)
- A live state indicator showing which mode is currently active (e.g., "Whispering to Agent" banner)
- A brief context panel that appears when initiating a Takeover, showing: last 3 notes on this call, current sentiment, and a one-line issue summary — so the supervisor takes over with context
- Show this same screen in a "CarPlay-restricted" state: Barge and Takeover controls are disabled/grayed out with a short explanation, only Whisper and Listen remain active

Prioritize error-prevention in this screen above all else — the cost of an accidental Takeover is high.
```

---

### Prompt 7 — Director: Call Notes & Supervisor Tagging

```
Design the Director persona's call review screen. Directors can add notes and tag supervisors but cannot join or control live calls.

Requirements:
- A read-only call playback view (waveform, no live-call controls at all — visually make clear this is a review-only surface, not a live-monitoring one)
- A "Tag a Supervisor" action that opens a lightweight flow: select supervisor, add a note/context, set optional priority/due date
- A confirmation state showing the tag was created and will appear on the supervisor's task dashboard
- Visually differentiate Director-authored notes from Supervisor-authored ones (a third tone in our note-authorship system, alongside AI and Supervisor)
```

---

### Prompt 8 — Supervisor: Task Dashboard / Inbox

```
Design the Supervisor's daily task dashboard — the landing screen showing everything requiring their attention today.

Requirements:
- Grouped sections: "Tagged by Director," "QA Quota Status," "Flagged Calls Pending Review," "Escalations from Interventions"
- Each item shows priority, due date/SLA countdown if applicable, and source (who tagged it or what triggered it)
- A clear "all caught up" empty state
- A quick-action swipe or tap pattern to mark items complete or jump directly into the related call

This should feel like a to-do list purpose-built for this role, not a generic notification feed.
```

---

### Prompt 9 — Director/Executive: Analytics Dashboard

```
Design the Executive/Director analytics dashboard — the top-line reporting surface.

Requirements:
- KPI cards across the top: CSAT, AHT, FCR, QA average, SLA adherence, occupancy, abandon rate — each with a trend arrow/sparkline
- A filter bar: date/time range, team, group, call type, channel
- A chart area showing a trend line for a selected KPI over the chosen date range
- A "needs attention" anomaly callout card (e.g., "Team East sentiment dropped 18% this week") using our AI-flagged visual language
- Drill-down affordance: tapping any KPI should visually suggest it opens the underlying call list

This is the highest-level, most polished screen in the app — the one leadership sees most — so it should feel confident and executive while still using our established system.
```

---

### Prompt 10 — Apple CarPlay Screens

```
Now design the Apple CarPlay-specific screens, following Apple's CarPlay design guidelines (large touch targets, minimal text, high contrast, glanceable at a distance).

Requirements:
- A simplified live call list (team/group name, agent, live status only — no dense metrics)
- A "Now Monitoring" screen with oversized playback/whisper controls only — Barge and Takeover shown disabled with a brief safety note
- Voice-command entry point treatment (e.g., "Monitor Team East") shown as a Siri-style interaction
- Confirm all interactive elements meet CarPlay's minimum touch target size and the screen works with one glance, not sustained visual attention

Keep this visually consistent with our color/status system, but radically simplified in layout.
```

---

### Prompt 11 — Consistency & Polish Pass

```
Do a full consistency pass across all screens designed so far:
- Confirm the AI-vs-human-vs-director note treatment is used identically everywhere it appears (Call Detail, QA Scoring, Director notes)
- Confirm status colors (live, on-hold, at-risk, silence, positive/negative sentiment) are used identically across the Live Feed, Call Detail, and Dashboard
- Flag any screen that feels inconsistent in spacing, type scale, or component styling
- Produce a final summary component library showing every reusable component we've established across this sequence
```

---

## Notes for the PM running this sequence

- **Prompt 1 is load-bearing.** Everything downstream (especially the AI/human/director note differentiation from the QA scoring update) depends on the visual system it locks in — don't let Claude Design skip straight to screens.
- **Confirm the AI-treatment choice before Prompt 4.** If what comes out of Prompt 1 doesn't feel right (e.g., color alone isn't enough for accessibility), iterate there first rather than downstream.
- **Prompts 6 and 10 have safety/liability stakes** (Takeover mis-taps, CarPlay driver distraction) — review these outputs with legal/compliance, not just design, before treating them as final.
- Feel free to run Prompts 7–9 (Director persona + dashboards) before 4–6 if that better matches your team's review order — they don't depend on each other, only on Prompt 1.
