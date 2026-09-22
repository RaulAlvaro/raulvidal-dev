# Raul Vidal — Personal CV Site

Personal professional website for Raul Alvaro Vidal Trujillo, Software Engineer. Built as a single-page site styled as a technical RFC/ADR document — bilingual (EN/ES), with an interactive terminal in the hero.

## Stack

- [Astro](https://astro.build) (static output)
- Content collections for CV data (profile, experience, impact cases, tech stack, education, certifications), one JSON array per locale
- No CMS, no backend — content lives in `src/content/`

## Project Structure

```text
/
├── public/                  # static assets (favicon, og-image, robots.txt)
├── src/
│   ├── components/          # Hero, HeroTerminal, section components
│   ├── content/              # CV data as JSON, one file per collection per locale
│   ├── content.config.ts    # content collection schemas + loader
│   ├── i18n/                 # locale strings and content helpers
│   ├── layouts/              # BaseLayout (head, theme script, reveal-on-scroll)
│   ├── pages/                # index.astro (EN, default) and es/index.astro
│   └── styles/                # design tokens (color, type, spacing) incl. light/dark theme
├── CONTEXT.md                # domain glossary for the content model
└── PRODUCT.md                 # product context for design/iteration work
```

## Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`              | Installs dependencies                            |
| `npm run dev`               | Starts local dev server at `localhost:4321`      |
| `npm run build`             | Build production site to `./dist/`               |
| `npm run preview`           | Preview the build locally before deploying       |

## Content

To update CV content (experience, impact cases, tech stack, etc.), edit the corresponding JSON array in `src/content/<collection>/<locale>.json`. Both `en.json` and `es.json` must stay in sync — see `CONTEXT.md` for the full content domain model.
