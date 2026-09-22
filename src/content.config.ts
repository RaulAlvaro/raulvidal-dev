import { defineCollection, z } from 'astro:content';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const locale = z.enum(['en', 'es']);

function localizedArrayLoader(base: string) {
  return {
    name: 'localized-array-loader',
    load: async ({ store, config }: { store: any; config: any }) => {
      store.clear();
      for (const loc of ['en', 'es'] as const) {
        const filePath = fileURLToPath(new URL(`${base}/${loc}.json`, config.root));
        const items = JSON.parse(readFileSync(filePath, 'utf-8')) as Array<{ id: string }>;
        for (const item of items) {
          store.set({ id: `${loc}/${item.id}`, data: item });
        }
      }
    },
  };
}

const profile = defineCollection({
  loader: localizedArrayLoader('./src/content/profile'),
  schema: z.object({
    id: z.string(),
    locale,
    name: z.string(),
    headline: z.string(),
    positioning: z.string(),
    location: z.string(),
    remote: z.boolean(),
    email: z.string().email(),
    phone: z.string(),
    linkedin: z.string().url(),
    github: z.string().url(),
    languages: z.array(
      z.object({
        name: z.string(),
        level: z.string(),
      }),
    ),
  }),
});

const experience = defineCollection({
  loader: localizedArrayLoader('./src/content/experience'),
  schema: z.object({
    id: z.string(),
    locale,
    company: z.string(),
    role: z.string(),
    startDate: z.string(),
    endDate: z.string().nullable(),
    remote: z.boolean(),
    description: z.string(),
    stack: z.array(z.string()),
    order: z.number(),
  }),
});

const impactCases = defineCollection({
  loader: localizedArrayLoader('./src/content/impact-cases'),
  schema: z.object({
    id: z.string(),
    locale,
    experienceId: z.string(),
    title: z.string(),
    problem: z.string(),
    decision: z.string(),
    result: z.string(),
    order: z.number(),
  }),
});

const techStack = defineCollection({
  loader: localizedArrayLoader('./src/content/tech-stack'),
  schema: z.object({
    id: z.string(),
    locale,
    name: z.string(),
    category: z.enum(['core', 'infrastructure', 'cloud', 'as-needed']),
    order: z.number(),
  }),
});

const education = defineCollection({
  loader: localizedArrayLoader('./src/content/education'),
  schema: z.object({
    id: z.string(),
    locale,
    institution: z.string(),
    program: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    order: z.number(),
  }),
});

const certifications = defineCollection({
  loader: localizedArrayLoader('./src/content/certifications'),
  schema: z.object({
    id: z.string(),
    locale,
    name: z.string(),
    issuer: z.string(),
    date: z.string(),
    order: z.number(),
  }),
});

export const collections = {
  profile,
  experience,
  'impact-cases': impactCases,
  'tech-stack': techStack,
  education,
  certifications,
};
