"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Social } from "@/lib/schema";

/*
 * Socials row. Pill buttons for each platform with hover scale + accent ring.
 */
export function Socials({ socials }: { socials: Social[] }) {
  const reduceMotion = useReducedMotion();

  return (
    <section id="socials" className="px-6 py-20 md:py-24">
      <div className="mx-auto max-w-5xl text-center">
        <motion.h2
          className="font-display text-2xl font-semibold tracking-tight md:text-3xl"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Let’s build something calm together.
        </motion.h2>

        <motion.p
          className="mx-auto mt-4 max-w-xl text-[var(--color-text-secondary)]"
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={reduceMotion ? undefined : { opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: reduceMotion ? 0 : 0.1 }}
        >
          Reach out anywhere — I read everything.
        </motion.p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {socials.map((s, i) => (
            <motion.a
              key={s.url}
              href={s.url}
              target={s.kind === "email" ? undefined : "_blank"}
              rel={s.kind === "email" ? undefined : "noreferrer noopener"}
              className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-2.5 text-sm font-medium text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: reduceMotion ? 0 : i * 0.05 }}
              whileHover={reduceMotion ? undefined : { scale: 1.04 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            >
              {s.label}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
