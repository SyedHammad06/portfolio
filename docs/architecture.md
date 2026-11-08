# Architecture

## Problem

A personal portfolio site that is hosted on Vercel with no extra configuration, and that is easy to extend once design work starts. The shape is not obvious because the site has two kinds of change that should not be coupled: content (projects, experience, bio) changes often, and layout or design changes less often. The structure has to keep them apart so editing a project never touches a component, and redesigning a section never touches the data.

## Usage (caller's view)

Adding a project is a data edit in `src/content/projects.ts`:

```ts
import type { Project } from "@/content/types";

export const projects: Project[] = [
  {
    slug: "example",
    title: "Example",
    summary: "What it does, in one sentence.",
    stack: ["Next.js", "TypeScript"],
    year: 2026,
    featured: true,
    href: "https://example.com",
    repo: "https://github.com/you/example",
  },
];
```

Rendering it happens in the page, which passes data down as props:

```tsx
// src/app/page.tsx
import { projects } from "@/content/projects";
import { Projects } from "@/components/sections/projects";

export default function Home() {
  return <Projects items={projects.filter((p) => p.featured)} />;
}
```

Site identity (name, URL, socials) is read from `siteConfig` in `src/lib/site.ts`. Nothing else hard-codes it.

## Shape

Module map:

```
src/
  app/          Routes only. layout.tsx, page.tsx, robots.ts, sitemap.ts.
                Wires content into sections. Holds no content of its own.
  components/
    layout/     Site chrome (header, footer) used by app/layout.tsx.
    sections/   One component per homepage section. Takes data as props.
    ui/         Generic presentational primitives. No knowledge of content.
  content/      Typed data. types.ts defines the shapes; projects.ts,
                experience.ts hold the entries.
  lib/          site.ts config and pure helpers. No React.
public/
  images/       Static images, referenced by absolute path.
  files/        Downloadable files, such as a resume PDF.
docs/           This document.
.agents/skills/ Installed agent skills (taste-skill, emilkowalski/skills).
```

Load-bearing decisions:

- **Data flows one way.** `content/` and `lib/` import nothing from `components/` or `app/`. Sections receive their data as props, so they are pure and can be rendered with fixture data. Only `app/` connects data to sections.
- **Content is typed TypeScript, not a CMS or runtime fetch.** `types.ts` is the boundary. A CMS can replace the data files later without touching sections.
- **Static by default.** The site is prerendered. `cacheComponents` is enabled in `next.config.ts`. Anything dynamic (a contact form, for example) must be opted in explicitly.
- **Templates are removed.** The Next.js demo page and default SVGs are gone, so nothing generic ships by accident.

Interface depth: the public surface is one type per content kind and one config object. Every section depends only on its own props, which hides the data source entirely.

## Synthesis decision

Single-perspective design. The multi-model arena pass was not run for this scaffold, since the work is a folder layout and not a contested design choice. Revisit if a feature needs a real trade-off study.

## Tradeoffs accepted

- We accept that content edits require a commit and a redeploy, in exchange for type checking and no runtime dependency. Vercel deploys in seconds, so the cost is small.
- We accept that `src/lib/site.ts` ships with placeholder values. They must be replaced before launch, and the build will not catch them.
- We accept committing about 1,600 skill asset files under `.agents/skills/`, in exchange for the same agent tooling on every clone.
- We accept that `components/layout`, `components/sections`, and `components/ui` are empty for now, with `.gitkeep` placeholders. Their contents are design work for later.

## Alternatives considered

- **Headless CMS (Sanity, Contentful).** Rejected for now. It adds an account, an API, and a second place to edit content, for a site with a few dozen entries. The typed data layer can migrate to a CMS later without changing sections.
- **MDX file per project.** Deferred. Better for long case studies, and it adds a build pipeline. Add it when a blog or detailed case studies are in scope.
- **Feature folders (`features/projects/`, `features/experience/`).** Rejected. At this size, sections already map one-to-one to homepage areas, so a second grouping adds indirection without removing coupling.

## Open questions and risks

- Is the portfolio a single page with anchor sections, or does it need separate routes such as `/projects/[slug]`? The sitemap and `app/` layout depend on this answer.
- Is a blog planned? If yes, MDX is worth adding now rather than later.
- Is there a contact form? It needs a server action or a form service, and it makes that route dynamic.
- Is a dark mode needed? The root layout currently follows the system preference through `globals.css`.

## Next implementation step

Decide the route model above, then write the first homepage section component in `src/components/sections/` against the `Project` and `ExperienceEntry` shapes.
