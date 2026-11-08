// Shapes for portfolio content. Content lives as typed TS data in this folder
// so it is versioned, type-checked, and needs no CMS or runtime fetch.

export type Project = {
  slug: string;
  title: string;
  /** Short label shown above the title, e.g. "LLM systems". */
  category: string;
  summary: string;
  stack: string[];
  /** Where the work happened, e.g. "NuMinds AI" or "Personal". */
  context: string;
  featured: boolean;
  /** A verified, measured result. Leave unset unless the number is accurate. */
  result?: string;
  /** Live URL, if the project is deployed. */
  href?: string;
  /** Source repository URL. */
  repo?: string;
};

export type ExperienceEntry = {
  company: string;
  role: string;
  /** "YYYY-MM" */
  start: string;
  /** "YYYY-MM", or null when this is the current role. */
  end: string | null;
  highlights: string[];
};

export type Stat = {
  value: string;
  label: string;
  /** Read the label before the value, e.g. "Building since / 2019". */
  labelFirst?: boolean;
};

export type ProcessStep = {
  title: string;
  body: string;
};

export type Discipline = {
  id: "model" | "data" | "ship";
  /** Tab label, e.g. "Model". */
  label: string;
  /** Kicker shown in the How I work section, e.g. "AI & LLM systems". */
  area: string;
  headline: string;
  body: string;
  tools: string[];
  steps: ProcessStep[];
};

export type Milestone = {
  /** Display year or label, e.g. "2023" or "Today". */
  when: string;
  title: string;
  body: string;
};

export type Certification = {
  name: string;
  issuer: string;
  year: number;
};
