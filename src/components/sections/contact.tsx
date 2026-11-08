import type { SocialLink } from "@/lib/site";
import { AmbientBeacon } from "@/components/motion/ambient";
import { DisplayHeading } from "@/components/ui/display-heading";
import { RollingLink } from "@/components/ui/rolling-link";
import { ChapterMarker } from "@/components/ui/chapter-marker";

type ContactProps = {
  title: string;
  headline: { lead: string; emphasis: string };
  body: string;
  email: string;
  socials: SocialLink[];
};

export function Contact({ title, headline, body, email, socials }: ContactProps) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative isolate overflow-clip border-t border-line px-(--gutter) pb-[clamp(72px,calc(112*var(--u)),160px)] pt-[clamp(88px,calc(140*var(--u)),210px)]"
    >
      <AmbientBeacon />
      <DisplayHeading
        id="contact-title"
        lead={headline.lead}
        emphasis={headline.emphasis}
        className="max-w-[17ch] text-display-xl leading-[0.92]"
      />
      <div data-reveal className="mt-6 lg:hidden">
        <ChapterMarker number="05" title={title} />
      </div>
      <div className="mt-[clamp(48px,calc(80*var(--u)),120px)] grid gap-10 border-t border-line pt-10 lg:grid-cols-[calc(32.66vw-var(--gutter))_minmax(0,1fr)]">
        <div data-reveal className="flex flex-col gap-6">
          <ChapterMarker number="05" title={title} className="hidden lg:flex" />
          <p className="max-w-[34ch] text-lede leading-[1.55] text-pretty text-muted">{body}</p>
        </div>
        <div data-reveal className="flex flex-col gap-10">
          <a
            href={`mailto:${email}`}
            className="inline-block self-start font-display text-[clamp(30px,calc(56*var(--u)),80px)] leading-[1.05] break-all text-ink underline decoration-line-strong decoration-1 underline-offset-[0.18em] transition-[text-decoration-color] duration-300 hover:decoration-ink sm:break-normal"
          >
            {email}
          </a>
          <ul aria-label="Elsewhere" className="flex flex-wrap gap-3">
            {socials.map((social) => (
              <li key={social.href}>
                <RollingLink href={social.href} label={social.label} variant="outline" arrow external />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
