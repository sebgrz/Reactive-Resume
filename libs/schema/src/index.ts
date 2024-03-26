import { z } from "zod";

import { basicsSchema, defaultBasics } from "./basics";
import { defaultMetadata, metadataSchema } from "./metadata";
import { ALLOWED_LOCALE, AllowedLocale, defaultSections, sectionsSchema } from "./sections";

// Schema
export const resumeDataSchema = z.object({
  basics: basicsSchema,
  sections: sectionsSchema,
  metadata: metadataSchema,
});

// Type
export type ResumeData = z.infer<typeof resumeDataSchema>;

// Defaults
export const defaultResumeData = (locale: string): ResumeData => {
  const localeOrigin = locale.slice(0, 2) as AllowedLocale; // en-EN -> en
  return {
    basics: defaultBasics,
    sections: defaultSections(ALLOWED_LOCALE.includes(localeOrigin) ? localeOrigin : "en"),
    metadata: defaultMetadata,
  };
};

export * from "./basics";
export * from "./metadata";
export * from "./sample";
export * from "./sections";
export * from "./shared";
