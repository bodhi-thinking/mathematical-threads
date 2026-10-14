# Refactor notes

## Adding a journey
1. Copy `course/_template/` to `course/NNN-slug/`; set `meta.id` to the slug.
2. Fill in `story.ts`, `playground.ts`, `puzzles.ts`, `worksheet.ts` (clue lives in the worksheet).
3. Put images in `public/course/NNN-slug/assets/`.
4. Register it in `course/index.ts`.
5. `npm run build` validates all content and lists any problems.

## Structure
- `course/index.ts` registry → homepage, `/lesson/[id]`, `/lesson/[id]/worksheet`
- `lib/*-types.ts` contracts; `lib/validate-journey.ts` build-time checks; `lib/clue.ts` code-key decoding
- CSS: `app/globals.css` (foundation), `styles/tokens.css`, one CSS Module per component.
  `styles/_unused-legacy.css` holds rules no component referenced (not imported; safe to delete).

## Deliberate differences from the original
- `/course` redirects to `/`; "Course home" links to `/`.
- Homepage card subtitle is now real data (the "placeholder" string hack is gone).
- Puzzle heading/intro moved from the component into `puzzles.ts` (`puzzleSet`).
- ClueCard is new-styled (the original had no CSS) and links to the worksheet route.
- Alt/Ctrl/Meta/Shift + arrow keys no longer trigger story navigation.
- Added `eslint.config.mjs`.
- README.md, COMPONENTS.md and DESIGN.md predate this refactor and were not updated.
