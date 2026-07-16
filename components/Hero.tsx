"use client";

import { motion, useReducedMotion } from "motion/react";

/*
 * Hero with split-letter staggered reveal (Motion 12+ API).
 * - `splitText` is the primitive for per-character orchestration.
 * - Honors `prefers-reduced-motion` via useReducedMotion + whileInView.
 */

interface HeroProps {
  name: string;
  tagline: string;
  bio: string;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.035, delayChildren: 0.1 },
  },
};

const charVariants = {
  hidden: { opacity: 0, y: 14, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function splitIntoChars(text: string) {
  // Use Array.from so surrogate pairs (e.g. emoji) stay intact.
  return Array.from(text);
}

export function Hero({ name, tagline, bio }: HeroProps) {
  const reduceMotion = useReducedMotion();

  /* When reduceMotion is true, swap to a static render and skip all variants. */
  if (reduceMotion) {
    return (
      <section className="hero-bg px-6 pt-24 pb-28 md:pt-32 md:pb-40">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="font-display text-5xl font-semibold tracking-tight md:text-7xl">
            {name}
          </h1>
          <p className="mt-6 text-xl text-[var(--color-text-secondary)] md:text-2xl">
            {tagline}
          </p>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-[var(--color-text-tertiary)] md:text-lg">
            {bio}
          </p>
        </div>
      </section>
    );
  }

  const nameChars = splitIntoChars(name);
  const taglineWords = tagline.split(" ");

  return (
    <section className="hero-bg px-6 pt-24 pb-28 md:pt-32 md:pb-40">
      <div className="mx-auto max-w-5xl text-center">
        {/* Stagger each character of the name with a soft blur reveal. */}
        <motion.h1
          className="font-display text-5xl font-semibold tracking-tight md:text-7xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          aria-label={name}
        >
          {nameChars.map((char, i) => (
            <motion.span
              key={`${char}-${i}`}
              variants={charVariants}
              style={{ display: "inline-block", whiteSpace: "pre" }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Tagline: fade up word-by-word for a calmer rhythm than per-char. */}
        <motion.p
          className="mt-6 text-xl text-[var(--color-text-secondary)] md:text-2xl"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: nameChars.length * 0.035 + 0.2 }}
        >
          {taglineWords.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: nameChars.length * 0.035 + 0.3 + i * 0.04,
                ease: "easeOut",
              }}
              style={{ display: "inline-block", marginRight: "0.25em" }}
            >
              {word}
            </motion.span>
          ))}
        </motion.p>

        {/* Bio appears last, scroll-triggered so it survives the behind-the-fold case. */}
        <motion.p
          className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-[var(--color-text-tertiary)] md:text-lg"
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.2 }}
        >
          {bio}
        </motion.p>

        {/* CTA could be added here; intentionally minimal for the MVP. */}
      </div>
    </section>
  );
}
