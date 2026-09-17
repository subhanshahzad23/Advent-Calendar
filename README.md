# The Light of the Piazza — An Advent Journey

An interactive 24-day Advent calendar set in an illustrated European town square at
winter dusk. Visitors explore the piazza, open one moment a day, and watch the square
grow brighter, warmer and more populated as the journey unfolds.

This is a **visual prototype**. Every illustration, animation and piece of content is
built in code so the project runs with no assets, no API keys and no backend.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000. `npm run build` produces the production build;
`npm run lint` and `npm run typecheck` both run clean.

## What is in the box

- **Next.js (App Router) + TypeScript. No other runtime dependencies.**
  No Tailwind, no animation library, no component kit, no canvas or WebGL.
- Illustration: hand-built inline SVG in five parallax planes.
- Motion: CSS transitions and keyframes on `transform` / `opacity` only.
- Audio: one locally hosted `<audio>` element. No autoplay, no audio library.
- State: React + `localStorage`. Nothing is sent anywhere.

## Architecture

```
app/
  layout.tsx            document shell, metadata, viewport
  page.tsx              thin server shell around the experience
  globals.css           the whole design system, in 14 labelled sections
components/
  AdventExperience.tsx  orchestrator: intro, scene, menu, overlay, toasts
  IntroSequence.tsx     the ~2s cinematic opening
  TopBar.tsx            glass bar: progress ring, sound, menu
  MenuSheet.tsx         journey overview, 24-day list, about, language,
                        accessibility, demo controls
  DayOverlay.tsx        the daily chapter (modal on desktop, sheet on mobile)
  DayMarker.tsx         one activation zone: medallion / star / lantern / …
  DemoChip.tsx          the discreet preview marker on the scene
  Toasts.tsx            toasts + the placeholder "Go deeper" panel
  Icons.tsx             interface icons and 24 day icons
  piazza/               the illustration, one file per parallax plane
  vignettes/            the 24 daily illustrated moments
data/
  adventDays.ts         all 24 day records — the single content source
  sceneConfig.ts        viewBoxes, parallax depths, the four scene stages
hooks/
  useAdventProgress.ts  progress, unlocking and demo modes
  useAmbientAudio.ts    playback, fades and the sound preference
  useLocalStorage.ts    hydration-safe persistence
  useMediaQuery.ts      reduced motion + compact breakpoint
  useDialog.ts          focus trap, Escape, focus restoration
lib/
  progress.ts           date gating and day resolution
  seed.ts               deterministic randomness (no hydration drift)
types/
  advent.ts             domain types
```

## Ambient sound

`public/audio/snowfall-scott-buckley.mp3` — “Snowfall” by Scott Buckley, CC BY 4.0
(see `CREDITS.md`).

- Nothing plays until the visitor presses the sound button. The element carries
  no `autoplay` attribute and `preload="none"`, so the file is not fetched at all
  until it is asked for.
- Loops, sits at volume `0.16`, and fades in and out over 650ms.
- The preference persists. A returning visitor who left sound on gets it back on
  their first interaction with the page — still a gesture, still never unprompted.

## The four scene stages

The piazza is never rebuilt — elements are tagged `rv1`–`rv4` and fade in as the
journey passes each threshold.

| Stage | Days  | The square |
|-------|-------|------------|
| 1 | 1–6   | Quiet anticipation: blue dusk, a few warm windows, light snow |
| 2 | 7–12  | The square awakens: string lights, first stall, lanterns crossing |
| 3 | 13–18 | A gathering community: the choir, the market, the rose window |
| 4 | 19–24 | Christmas Eve radiance: the tree lit, the star bright, the town out |

Opening an individual day also lights that day's own corner of the illustration
(`zoneLit` in the layer components), so progress is visible object by object.

## Date gating and the demo controls

Real behaviour: during December, days 1…today are unlocked and later days stay
locked; opened and completed days persist on the device.

The scene itself carries only a small, low-contrast **Preview** chip in the corner
showing which mode is running. Pressing it opens the journey menu at the controls:

- **Today** — true date-gated behaviour.
- **Preview all days** — all 24 unlocked. This is the default so the calendar can
  be explored immediately.
- **Simulated date** — pick any day 1–24 and the whole piazza moves to the state it
  would be in on that date.
- **Reset** — clears `localStorage` and restores defaults.

These controls are tagged "Prototype only" and would not ship to the public build.

Overlay navigation only ever offers days that are genuinely open: at the newest
unlocked day the "next" control is absent rather than pointing at a locked day.

## Accessibility

Semantic `<button>` activation zones with descriptive labels, visible circular focus
rings, keyboard navigation (Tab moves between days and pans the scene to them; arrow
keys pan; Escape closes), focus trapped in and returned from every dialog, locked and
completed states carried by an icon as well as colour, a Calm motion option, a higher
contrast option, and full respect for `prefers-reduced-motion`.

Every day is reachable from the menu's day list, so nothing depends on a drag gesture.

## Where the real assets go

Search the codebase for `Production asset slot` — the comments mark every place
supplied artwork would replace demo work:

- `components/piazza/*Layer.tsx` — the five illustration planes.
- `components/vignettes/*` — the 24 daily animations (SVG, Lottie-equivalent CSS or
  video all drop into the same slot).
- `components/DayOverlay.tsx` — the per-day media slot inside the chapter.
- `data/adventDays.ts` — all copy, scripture references, activities and deep links.
- `public/audio/` — the ambient bed, if the church would rather use their own.
