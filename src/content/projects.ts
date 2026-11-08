import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "nl2sql-graph-rag",
    title: "Ask the database in plain language",
    category: "LLM systems",
    context: "NuMinds AI, 2025",
    summary:
      "Fine-tuned NL2SQL models and Graph RAG pipelines that let non-technical teams question enterprise data directly, with domain chatbots for HR analytics and customer insights built on top.",
    stack: ["Python", "LLMs", "NL2SQL", "Graph RAG", "SQL"],
    featured: true,
  },
  {
    slug: "bengaluru-crime-chat",
    title: "Bengaluru Crime Chat",
    category: "LLM + NLP",
    context: "Personal project",
    summary:
      "A conversational app for Bengaluru that maps a reported crime to the relevant IPC laws in real time, giving people actionable guidance instead of legal jargon.",
    stack: ["Python", "LLMs", "NLP", "Streamlit"],
    featured: true,
  },
  {
    slug: "cold-start-recommender",
    title: "Recommendations from day one",
    category: "Machine learning",
    context: "Personal project",
    summary:
      "A movie recommender that solves the cold-start problem with content-based filtering, so new users get relevant picks before they have any history.",
    stack: ["Python", "Scikit-learn", "Pandas"],
    featured: true,
  },
  {
    slug: "store-sales-forecasting",
    title: "Store Sales Forecasting",
    category: "Time series",
    context: "Personal project",
    summary:
      "ARIMA forecasting of future sales to help optimize inventory and reduce stockouts.",
    stack: ["Python", "Statsmodels", "ARIMA"],
    featured: false,
  },
  {
    slug: "carbon-footprint-reporting",
    title: "Carbon footprint reporting",
    category: "Data product",
    context: "Deepwoods Green Initiatives",
    summary:
      "Scope 1, 2, and 3 emissions reporting with dashboards and third-party API integrations for carbon accounting.",
    stack: ["Dashboards", "APIs", "Full stack"],
    featured: false,
  },
  {
    slug: "blogging-agent",
    title: "Blogging Agent",
    category: "Agentic AI",
    context: "Personal project",
    summary: "A multi-agent writing pipeline built with crewAI.",
    stack: ["Python", "crewAI"],
    repo: "https://github.com/SyedHammad06/Blogging-Agent",
    featured: false,
  },
  {
    slug: "weather-classification",
    title: "Weather classification",
    category: "Computer vision",
    context: "Personal project",
    summary: "A CNN weather classifier served through a Streamlit app.",
    stack: ["TensorFlow", "CNN", "Streamlit"],
    repo: "https://github.com/SyedHammad06/Weather-classification",
    featured: false,
  },
  {
    slug: "client-websites",
    title: "Client websites",
    category: "Web development",
    context: "Freelance, 2019 to 2024",
    summary:
      "Responsive sites and dashboards for clients, including Urooj, Street Cars, and a healthcare management app.",
    stack: ["Next.js", "TypeScript", "React"],
    href: "https://urooj-frontend.vercel.app",
    featured: false,
  },
];
