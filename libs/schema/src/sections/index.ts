import { FilterKeys } from "@reactive-resume/utils";
import { z } from "zod";

import { idSchema } from "../shared";
import { awardSchema } from "./award";
import { certificationSchema } from "./certification";
import { customSectionSchema } from "./custom-section";
import { educationSchema } from "./education";
import { experienceSchema } from "./experience";
import { interestSchema } from "./interest";
import { languageSchema } from "./language";
import { profileSchema } from "./profile";
import { projectSchema } from "./project";
import { publicationSchema } from "./publication";
import { referenceSchema } from "./reference";
import { skillSchema } from "./skill";
import { volunteerSchema } from "./volunteer";

// Schema
export const sectionSchema = z.object({
  name: z.string(),
  columns: z.number().min(1).max(5).default(1),
  visible: z.boolean().default(true),
});

// Schema
export const customSchema = sectionSchema.extend({
  id: idSchema,
  items: z.array(customSectionSchema),
});

export const sectionsSchema = z.object({
  summary: sectionSchema.extend({
    id: z.literal("summary"),
    content: z.string().default(""),
  }),
  awards: sectionSchema.extend({
    id: z.literal("awards"),
    items: z.array(awardSchema),
  }),
  certifications: sectionSchema.extend({
    id: z.literal("certifications"),
    items: z.array(certificationSchema),
  }),
  education: sectionSchema.extend({
    id: z.literal("education"),
    items: z.array(educationSchema),
  }),
  experience: sectionSchema.extend({
    id: z.literal("experience"),
    items: z.array(experienceSchema),
  }),
  volunteer: sectionSchema.extend({
    id: z.literal("volunteer"),
    items: z.array(volunteerSchema),
  }),
  interests: sectionSchema.extend({
    id: z.literal("interests"),
    items: z.array(interestSchema),
  }),
  languages: sectionSchema.extend({
    id: z.literal("languages"),
    items: z.array(languageSchema),
  }),
  profiles: sectionSchema.extend({
    id: z.literal("profiles"),
    items: z.array(profileSchema),
  }),
  projects: sectionSchema.extend({
    id: z.literal("projects"),
    items: z.array(projectSchema),
  }),
  publications: sectionSchema.extend({
    id: z.literal("publications"),
    items: z.array(publicationSchema),
  }),
  references: sectionSchema.extend({
    id: z.literal("references"),
    items: z.array(referenceSchema),
  }),
  skills: sectionSchema.extend({
    id: z.literal("skills"),
    items: z.array(skillSchema),
  }),
  custom: z.record(z.string(), customSchema),
});

// Detailed Types
export type Section = z.infer<typeof sectionSchema>;
export type Sections = z.infer<typeof sectionsSchema>;

export type SectionKey = "basics" | keyof Sections | `custom.${string}`;
export type SectionWithItem<T = unknown> = Sections[FilterKeys<Sections, { items: T[] }>];
export type SectionItem = SectionWithItem["items"][number];
export type CustomSectionGroup = z.infer<typeof customSchema>;

// Defaults
export const ALLOWED_LOCALE = ["en", "pl"] as const;
export type AllowedLocale = (typeof ALLOWED_LOCALE)[number];

const sectionsNames = {
  summary: {
    en: "Summary",
    pl: "Podsumowanie",
  },
  awards: {
    en: "Awards",
    pl: "Nagrody",
  },
  certifications: {
    en: "Certifications",
    pl: "Certyfikaty",
  },
  education: {
    en: "Education",
    pl: "Edukacja",
  },
  experience: {
    en: "Experience",
    pl: "Doświadczenie",
  },
  volunteer: {
    en: "Volunteering",
    pl: "Wolontariat",
  },
  interests: {
    en: "Interests",
    pl: "Zainteresowania",
  },
  languages: {
    en: "Languages",
    pl: "Języki",
  },
  profiles: {
    en: "Profiles",
    pl: "Profile",
  },
  projects: {
    en: "Projects",
    pl: "Projekty",
  },
  publications: {
    en: "Publications",
    pl: "Publikacje",
  },
  references: {
    en: "References",
    pl: "Referencje",
  },
  skills: {
    en: "Skills",
    pl: "Umiejętności",
  },
};

export const defaultSection: Section = {
  name: "",
  columns: 1,
  visible: true,
};

export const defaultSections = (locale: AllowedLocale = "en"): Sections => {
  return {
    summary: { ...defaultSection, id: "summary", name: sectionsNames.summary[locale], content: "" },
    awards: { ...defaultSection, id: "awards", name: sectionsNames.awards[locale], items: [] },
    certifications: {
      ...defaultSection,
      id: "certifications",
      name: sectionsNames.certifications[locale],
      items: [],
    },
    education: {
      ...defaultSection,
      id: "education",
      name: sectionsNames.education[locale],
      items: [],
    },
    experience: {
      ...defaultSection,
      id: "experience",
      name: sectionsNames.experience[locale],
      items: [],
    },
    volunteer: {
      ...defaultSection,
      id: "volunteer",
      name: sectionsNames.volunteer[locale],
      items: [],
    },
    interests: {
      ...defaultSection,
      id: "interests",
      name: sectionsNames.interests[locale],
      items: [],
    },
    languages: {
      ...defaultSection,
      id: "languages",
      name: sectionsNames.languages[locale],
      items: [],
    },
    profiles: {
      ...defaultSection,
      id: "profiles",
      name: sectionsNames.profiles[locale],
      items: [],
    },
    projects: {
      ...defaultSection,
      id: "projects",
      name: sectionsNames.projects[locale],
      items: [],
    },
    publications: {
      ...defaultSection,
      id: "publications",
      name: sectionsNames.publications[locale],
      items: [],
    },
    references: {
      ...defaultSection,
      id: "references",
      name: sectionsNames.references[locale],
      items: [],
    },
    skills: { ...defaultSection, id: "skills", name: sectionsNames.skills[locale], items: [] },
    custom: {},
  };
};

export * from "./award";
export * from "./certification";
export * from "./custom-section";
export * from "./education";
export * from "./experience";
export * from "./interest";
export * from "./language";
export * from "./profile";
export * from "./project";
export * from "./publication";
export * from "./reference";
export * from "./skill";
export * from "./volunteer";
