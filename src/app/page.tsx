import Link from "next/link";
import {
  siteConfig,
  projects,
  aboutLab,
  // researchOverview,
} from "@/lib/data";

export default function HomePage() {
  const featuredProjects = projects.filter((p) => p.status === "Active").slice(0, 4);
  

  return (
    <>
      {/* Hero Section - 2 Columns */}
      <section className="py-12 md:py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 md:grid-cols-[2fr_3fr] md:items-center">
            {/* Left Column */}
            <div className="flex flex-col justify-center">
              <div className="mb-6 flex items-center gap-3">
                <span className="text-5xl" role="img" aria-label="Puffin">
                  🐧
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-puffin-navy">
                {siteConfig.name}
              </h1>
              <p className="mt-3 text-lg text-puffin-gray leading-relaxed">
                {siteConfig.tagline}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/people"
                  className="inline-flex items-center rounded-lg bg-puffin-navy px-6 py-3 text-sm font-medium text-white hover:bg-puffin-blue transition-colors"
                >
                  Meet the Team
                </Link>
                <Link
                  href="/get-involved"
                  className="inline-flex items-center rounded-lg border border-puffin-navy px-6 py-3 text-sm font-medium text-puffin-navy hover:bg-puffin-navy hover:text-white transition-colors"
                >
                  Get Involved
                </Link>
              </div>
            </div>

            {/* Right Column - Introduction */}
            <div className="space-y-4 text-puffin-gray leading-relaxed">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-puffin-navy mb-2">
                  What
                </h2>
                <p>{aboutLab.what}</p>
              </div>
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-puffin-navy mb-2">
                  Why
                </h2>
                <p>{aboutLab.why}</p>
              </div>
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-puffin-navy mb-2">
                  How
                </h2>
                <p>{aboutLab.approach}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Themes Section - 3 Columns */}
      {/* <section className="py-6 md:py-6 bg-puffin-cream/50">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-2 text-base font-semibold uppercase tracking-wide text-puffin-navy">
            Research Themes
          </h2>
          <p className="mb-8 text-puffin-gray">
            Our work focuses on these interconnected research areas.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {researchOverview.themes.map((theme, index) => (
              <div
                key={`theme-${index}`}
                className="rounded-lg border border-puffin-blue/15 bg-white p-6"
              >
                <h3 className="text-lg font-semibold text-puffin-navy">
                  {theme}
                </h3>
                <p className="mt-2 text-sm text-puffin-gray">
                  Research and development in this area.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Featured Projects Section */}
      <section className="py-6 md:py-6">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-2 text-base font-semibold uppercase tracking-wide text-puffin-navy">
            Projects
                <Link
                  href="/research"
                  className="mt-4 text-sm font-medium text-puffin-sky hover:underline pl-3"
                >
                  Learn more →
                </Link>
          </h2>
          <p className="mb-8 text-puffin-gray">
            Current research projects going on (under construction - we are still filling in the cool things we do!)
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="rounded-lg border border-puffin-blue/15 bg-white p-6 flex flex-col"
              >
                <h3 className="text-lg font-semibold text-puffin-navy">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-puffin-gray grow">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
