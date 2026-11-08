import { siteConfig } from "@/lib/site";
import { RollingLink } from "@/components/ui/rolling-link";
import { currentYear } from "@/lib/year";

export async function SiteFooter() {
  const year = await currentYear();
  return (
    <footer className="border-t border-line px-(--gutter) py-8">
      <div className="flex flex-col gap-4 font-mono text-[11px] uppercase tracking-[0.14em] text-faint sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="tabular">© {year}</span> {siteConfig.name} / {siteConfig.location}
        </p>
        <RollingLink href="#top" label="Back to top" className="text-muted" />
      </div>
    </footer>
  );
}
