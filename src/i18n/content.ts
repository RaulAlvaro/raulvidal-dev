import { getCollection, type CollectionEntry } from 'astro:content';

export type Locale = 'en' | 'es';

async function byLocale<C extends 'profile' | 'experience' | 'impact-cases' | 'tech-stack' | 'education' | 'certifications'>(
  collection: C,
  locale: Locale,
): Promise<CollectionEntry<C>[]> {
  const all = await getCollection(collection);
  return all.filter((entry) => entry.data.locale === locale) as CollectionEntry<C>[];
}

export async function getProfile(locale: Locale) {
  const entries = await byLocale('profile', locale);
  return entries[0].data;
}

export async function getExperience(locale: Locale) {
  const entries = await byLocale('experience', locale);
  return entries.map((e) => e.data).sort((a, b) => a.order - b.order);
}

export async function getImpactCases(locale: Locale) {
  const entries = await byLocale('impact-cases', locale);
  return entries.map((e) => e.data).sort((a, b) => a.order - b.order);
}

export async function getTechStack(locale: Locale) {
  const entries = await byLocale('tech-stack', locale);
  return entries.map((e) => e.data).sort((a, b) => a.order - b.order);
}

export async function getEducation(locale: Locale) {
  const entries = await byLocale('education', locale);
  return entries.map((e) => e.data).sort((a, b) => a.order - b.order);
}

export async function getCertifications(locale: Locale) {
  const entries = await byLocale('certifications', locale);
  return entries.map((e) => e.data).sort((a, b) => a.order - b.order);
}
