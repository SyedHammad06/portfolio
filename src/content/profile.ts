import type { Discipline, Stat } from "./types";

export const hero = {
  roles: "AI Engineer. Data Scientist. Builder.",
  location: "Based in Bengaluru",
  firstName: "Syed",
  lastName: "Hammad",
  thesis:
    "I build AI that understands enterprise data, from the model to the product people use.",
  primaryCta: { label: "Explore my work", href: "#work" },
  secondaryCta: { label: "Start a conversation", href: "#contact" },
  graphLabels: [
    "Knowledge graph",
    "Agentic RAG",
    "Multimodal\ndata",
    "NL2SQL",
    "Forecasting",
    "Insight",
  ],
};

export const loader = {
  words: [
    "Tokenizing",
    "Embedding",
    "Indexing",
    "Retrieving",
    "Querying",
    "Reasoning",
    "Grounding",
    "Ready",
  ],
};

export const stats: Stat[] = [
  { value: "2019", label: "Building since", labelFirst: true },
  { value: "25+", label: "Projects shipped" },
  { value: "3", label: "Core disciplines" },
  { value: "14+", label: "Cloud and AI certifications" },
];

export const about = {
  title: "The engineer behind the work",
  aside: "Model. Data. Product.",
  headline: { lead: "Models are the starting point.", emphasis: "Decisions are the point." },
  body: [
    "I build AI systems that sit on top of real enterprise data and answer the questions people actually ask.",
    "Since 2019 I have shipped websites for clients, earned an MSc in Big Data Analytics, built NL2SQL and Graph RAG pipelines at NuMinds AI, and now build enterprise AI applications at Eurofins.",
  ],
  disciplinesKicker: "Three disciplines. One perspective.",
};

export const work = {
  title: "Selected work",
  aside: "Questions, answered.",
  headline: { lead: "Systems that turn data", emphasis: "into answers." },
  intro:
    "Three projects that show the range: language models on enterprise data, NLP for public good, and machine learning that works from the first visit.",
  moreLabel: "More ways I build",
};

export const approach = {
  title: "How I work",
  aside: "Problem first.",
  headline: { lead: "From a question", emphasis: "to a deployed system." },
  intro: "The same discipline in every project, tuned to what the problem needs.",
};

export const journey = {
  title: "Journey",
  aside: "Since 2019.",
  headline: { lead: "From websites", emphasis: "to language models." },
  certificationsLabel: "Certified",
};

export const contact = {
  title: "Contact",
  headline: { lead: "Something great starts with", emphasis: "a hello." },
  body: "Have an interesting idea, a question, or just want to connect? I'd love to hear from you.",
};

export const disciplines: Discipline[] = [
  {
    id: "model",
    label: "Model",
    area: "AI & LLM systems",
    headline: "Give a question a path to the answer.",
    body: "LLM applications that reason over enterprise data: NL2SQL that turns plain language into correct queries, Graph RAG that retrieves context with structure, and chatbots people trust.",
    tools: ["LLMs", "NL2SQL", "Graph RAG", "RAG", "Generative AI", "TensorFlow"],
    steps: [
      {
        title: "Frame the question",
        body: "Start from the decision a user needs to make and the data that can support it.",
      },
      {
        title: "Ground the model",
        body: "Connect the LLM to schemas, graphs, and retrieval so answers are traceable, not invented.",
      },
      {
        title: "Evaluate and ship",
        body: "Measure accuracy on real queries, then deploy behind APIs the business already uses.",
      },
    ],
  },
  {
    id: "data",
    label: "Data",
    area: "Data science & ML",
    headline: "Find the signal before building on it.",
    body: "Forecasting, recommendation, and analytics grounded in statistics: ARIMA sales forecasts, cold-start recommenders, and big data pipelines on Spark and Databricks.",
    tools: ["Python", "SQL", "Pandas", "Scikit-learn", "Statsmodels", "Spark", "Databricks"],
    steps: [
      {
        title: "Understand the data",
        body: "Profile sources, clean what is broken, and name what the data cannot tell us.",
      },
      {
        title: "Model the pattern",
        body: "Pick the simplest model that captures it, from time series to CNNs.",
      },
      {
        title: "Prove the lift",
        body: "Report results in the units the business uses: accuracy, precision, stockouts avoided.",
      },
    ],
  },
  {
    id: "ship",
    label: "Ship",
    area: "Product & web",
    headline: "Put the model where people work.",
    body: "Five years of client websites taught me that AI only matters once it ships: Python backends, Flask and Streamlit apps, Next.js frontends, dashboards, and cloud deployment.",
    tools: ["Next.js", "React", "Flask", "Streamlit", "JavaScript", "AWS"],
    steps: [
      {
        title: "Shape the experience",
        body: "Design the interface around the user's task, not around the model.",
      },
      {
        title: "Build the product",
        body: "Backends, APIs, and responsive frontends that are fast and maintainable.",
      },
      {
        title: "Deploy and improve",
        body: "Ship to the cloud, watch real usage, and iterate.",
      },
    ],
  },
];
