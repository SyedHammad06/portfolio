export type SocialLink = {
  label: string;
  href: string;
};

export type SiteConfig = {
  name: string;
  title: string;
  description: string;
  /** Canonical origin, no trailing slash. Used for metadata, sitemap, robots. */
  url: string;
  email: string;
  location: string;
  socials: SocialLink[];
};

// Single source of truth for site-wide identity.
// Open decisions (see PRODUCT.md): public email, final domain.
export const siteConfig: SiteConfig = {
  name: "Syed Hammad",
  title: "Syed Hammad | AI Engineer",
  description:
    "AI Engineer in Bengaluru building LLM systems on enterprise data: NL2SQL, Graph RAG, forecasting, and the products around them.",
  url: "https://syedhammad.vercel.app",
  email: "syedhammad@myyahoo.com",
  location: "Bengaluru, India",
  socials: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/syed-hammad-8ab98a194/",
    },
    { label: "GitHub", href: "https://github.com/SyedHammad06" },
    { label: "Kaggle", href: "https://www.kaggle.com/starcoder06" },
  ],
};
