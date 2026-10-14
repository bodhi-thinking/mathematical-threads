# Journey template

To create a new journey:

1. Copy this folder to `course/NNN-your-slug/` (for example `002-calendar`).
2. In `index.ts`, change `meta.id` to the same slug as the folder name.
3. Fill in `story.ts`, `playground.ts`, `puzzles.ts` and `worksheet.ts`.
4. Put images in `public/course/NNN-your-slug/assets/` and refer to them as
   `/course/NNN-your-slug/assets/file.png` (Next.js can only serve static files from `public/`).
5. Register the journey in `course/index.ts`.
6. Run `npm run build`. It validates every journey and tells you exactly what is wrong.

The worksheet's clue is stored in `worksheet.ts`. The `secret` must match what
the challenge answers decode to; the build checks this for you.

This folder is not registered, so it never appears on the site.
