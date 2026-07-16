import { portfolio } from "@/lib/load-data";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Socials } from "@/components/Socials";
import { Footer } from "@/components/Footer";

/*
 * Root page = pure SSG. No runtime data fetching, since `portfolio` is
 * validated at build time and inlined by Next.js during the static export.
 */
export default function Page() {
  return (
    <main className="relative">
      <Hero
        name={portfolio.name}
        tagline={portfolio.tagline}
        bio={portfolio.bio}
      />
      <div className="hairline mx-auto max-w-5xl" />
      <Projects projects={portfolio.projects} />
      <div className="hairline mx-auto max-w-5xl" />
      <Socials socials={portfolio.socials} />
      <Footer name={portfolio.name} />
    </main>
  );
}
