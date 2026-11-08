import type { Certification, Milestone } from "./types";

export const milestones: Milestone[] = [
  {
    when: "2019",
    title: "Learning by shipping.",
    body: "Started building websites for clients: UI, SEO, and backends, while still in school.",
  },
  {
    when: "2020",
    title: "Computer applications.",
    body: "BCA at Kristu Jayanti College, Bengaluru, alongside freelance web work.",
  },
  {
    when: "2023",
    title: "Into the data.",
    body: "MSc in Big Data Analytics at St. Joseph's University: statistics, ML, Spark, and forecasting.",
  },
  {
    when: "2024",
    title: "Data for the planet.",
    body: "Built carbon footprint reporting at Deepwoods Green Initiatives.",
  },
  {
    when: "2025",
    title: "LLMs on enterprise data.",
    body: "NL2SQL, domain chatbots, and Graph RAG pipelines at NuMinds AI.",
  },
  {
    when: "Today",
    title: "Enterprise AI at scale.",
    body: "Building AI-powered enterprise applications at Eurofins IT Delivery Center.",
  },
  {
    when: "Next",
    title: "More useful AI.",
    body: "Systems that let anyone ask their data a question and trust the answer.",
  },
];

export const certifications: Certification[] = [
  { name: "Generative AI Fundamentals", issuer: "Databricks", year: 2024 },
  { name: "Foundations of Prompt Engineering", issuer: "AWS", year: 2024 },
  { name: "Generative AI for Executives", issuer: "AWS", year: 2024 },
  { name: "Responsible AI", issuer: "Google", year: 2024 },
  { name: "Cloud Practitioner", issuer: "AWS", year: 2024 },
];
