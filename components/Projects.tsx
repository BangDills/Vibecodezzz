"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Project } from "@/lib/schema";

/*
 * Projects section.
 * - Desktop: 2-column grid (md+).
 * - Mobile: horizontal scroll-snap rail (defined in globals.css).
 * - Hover treatment: ring + accent-tinted glow (Apple-ish).
 */
export function Projects({ projects }: { projects: Project[] }) {
  const reduceMotion = useReducedMotion();

  return (
    <section id="projects" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          className="font-display text-3xl font-semibold tracking-tight md:text-4xl"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Selected work
        </motion.h2>

        {/* Mobile: snap rail / Desktop: 2-col grid (grid starts at md). */}
        <div
          className="snap-rail mt-10 flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:pb-0"
          role="list"
        >
          {projects.map((p, i) => (
            <ProjectCard key={p.url} project={p} index={i} reduceMotion={!!reduceMotion} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  reduceMotion,
}: {
  project: Project;
  index: number;
  reduceMotion: boolean;
}) {
  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noreferrer noopener"
      role="listitem"
      className="group relative block min-w-[78%] rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-colors hover:bg-[var(--color-accent-soft)] md:min-w-0"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={
        reduceMotion ? undefined : { opacity: 1, y: 0 }
      }
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, ease: "easeOut", delay: reduceMotion ? 0 : index * 0.06 }}
      whileHover={
        reduceMotion
          ? undefined
          : { y: -3, boxShadow: "0 30px 80px -30px rgba(41,151,255,0.5)" }
      }
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">
          {project.title}
        </h3>
        <span
          aria-hidden
          className="shrink-0 translate-x-0 text-[var(--color-accent)] opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
        >
          →
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)] md:text-base">
        {project.description}
      </p>
      {project.tags.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-[var(--color-border)] px-2.5 py-1 text-xs text-[var(--color-text-tertiary)]"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </motion.a>
  );
}
