# Portfolio

Personal portfolio built with Next.js (App Router), TypeScript, and Tailwind CSS. Deploys to Vercel with no extra configuration.

See [`docs/architecture.md`](docs/architecture.md) for the layout rationale.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Where things live

| Change | Edit |
| --- | --- |
| Name, URL, socials | `src/lib/site.ts` |
| Projects | `src/content/projects.ts` |
| Work history | `src/content/experience.ts` |
| Homepage composition | `src/app/page.tsx` |
| Homepage sections | `src/components/sections/` |
| Shared header and footer | `src/components/layout/` |
| Generic UI primitives | `src/components/ui/` |
| Images | `public/images/` |
| Downloads (resume) | `public/files/` |

## Deploying

Import the repository into Vercel. It detects Next.js and needs no build settings. Set the real domain in `src/lib/site.ts` before launch.

## Agent skills

Installed in `.agents/skills/`:

- `design-taste-frontend` from [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill)
- 17 animation and UI skills from [emilkowalski/skills](https://github.com/emilkowalski/skills)
