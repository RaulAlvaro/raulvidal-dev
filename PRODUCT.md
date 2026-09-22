# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro 7, TypeScript strict, static output. Content modeled as Astro content
collections (see `CONTEXT.md` for the content domain glossary). Native i18n
routing: `en` as default locale with no URL prefix, `es` under `/es/`.

## Users

Technical recruiters and hiring managers at remote-first, international
companies, evaluating Raul Vidal (Software Engineer, ~7 years experience,
Lima, Peru) for senior/mid-senior remote roles. They are scanning quickly —
often the first touchpoint before a resume or interview — to judge whether
this candidate is a genuine product-ownership engineer or an interchangeable
consultancy hire.

## Product Purpose

A single-page personal site that functions as Raul's professional
positioning artifact: it must convince a recruiter, in a fast scan, that he
owns problems end-to-end (architecture → decision → shipped impact) rather
than executing tickets inside someone else's fixed stack. Success is a
recruiter walking away with the correct mental model of his seniority and
decision-making, and taking the next step (contact, LinkedIn, interview).

## Positioning

"Software Engineer with real product ownership" — explicitly not "Full Stack
Engineer" (reads junior/generic) and not "Senior Backend Engineer" (reads as
an interchangeable specialist for a staffing consultancy). The differentiator
is *how he thinks and decides*, not a technology list. Secondary but real
differentiator: AI as a working method, not a buzzword — Claude Code and a
Plan-Review-Execute workflow used as an actual production practice.

## Operating Context

Single-page site with anchor-based sections (no multi-page routing beyond
the `en`/`es` locale split). Content is fully static, sourced from Astro
content collections populated in both locales — see `CONTEXT.md` for the
entity model (`Profile`, `Experience`, `ImpactCase`, `TechStackItem`,
`Education`, `Certification`). No CMS; content changes happen via editing
the collection files directly.

## Capabilities and Constraints

- Bilingual EN/ES via Astro native i18n, `en` default without prefix, `es`
  under `/es/`. Content is fully duplicated per locale, not partially
  translated.
- No CMS — static content only, single author.
- CV PDF download: a UI affordance (download button) must exist, but is
  wired to a placeholder — no real PDF file exists yet. This does not block
  visual design.
- Analytics: a lightweight, privacy-respecting analytics script (e.g.
  Plausible-style) will be added later; it has no visual footprint and does
  not affect design decisions now.
- No custom domain yet — deploys to a free hosting subdomain
  (Vercel/Netlify/Cloudflare Pages class of host).
- Truthfulness constraints on content (what may and may not be claimed about
  specific roles/projects) are enforced editorially in the content itself,
  not as a product-level constraint on design.

## Brand Commitments

None. No existing logo, established color palette, or typographic identity
to preserve — the visual world is being created from scratch by this
project.

## Evidence on Hand

Real, populated content already exists in `src/content/` (both locales):
one `Profile`, four `Experience` entries (Relink, Continuum HQ, Aynitech
Group, Prodequa/Freelance), four `ImpactCase` entries (problem → decision →
result format, pre-ordered by strength), ~27 `TechStackItem` entries grouped
by real-use category (core / infrastructure / cloud / as-needed, no
seniority hierarchy implied), two `Education` entries, one `Certification`.
No testimonials, press, or third-party proof exist and none should be
fabricated.

## Product Principles

1. Architecture and decision-making are the headline — the tech stack list
   is supporting evidence, never the lead.
2. Never read as an interchangeable consultancy hire; every section should
   reinforce ownership and independent judgment.
3. AI-as-multiplier (Claude Code, Plan-Review-Execute) is presented as a
   real, current working method, not a trend mention.
4. Content parity between locales is non-negotiable — neither locale is a
   degraded afterthought.
5. Recruiters scan fast: the design must reward a 10-second skim as much as
   a full read.

## Accessibility & Inclusion

Standard good practice (adequate contrast, keyboard navigation, correct
semantic structure) — no formal WCAG level was mandated, this being a
personal, non-regulated site.
