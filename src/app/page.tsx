import { about, approach, contact, disciplines, hero, journey, stats, work } from "@/content/profile";
import { projects } from "@/content/projects";
import { certifications, milestones } from "@/content/journey";
import { siteConfig } from "@/lib/site";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { SelectedWork } from "@/components/sections/selected-work";
import { Process } from "@/components/sections/process";
import { Journey } from "@/components/sections/journey";
import { Contact } from "@/components/sections/contact";
import { ScrollReveals } from "@/components/motion/scroll-reveals";

export default function Home() {
  return (
    <>
      <Hero {...hero} stats={stats} />
      <About {...about} disciplines={disciplines} />
      <Journey {...journey} milestones={milestones} certifications={certifications} />
      <SelectedWork {...work} projects={projects} />
      <Process {...approach} disciplines={disciplines} />
      <Contact {...contact} email={siteConfig.email} socials={siteConfig.socials} />
      <ScrollReveals />
    </>
  );
}
