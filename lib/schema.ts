import { z } from "zod";

/*
 * Build-time schema for data.json.
 *
 * Uses Zod 4 stable APIs:
 *   - z.object / z.array / z.literal for shape validation
 *   - .url() for project & social links (raises clear errors at build time)
 *   - .meta() attaches human-readable titles → surfaces in JSON Schema output
 *
 * If validation fails during `next build`, the import below throws and the
 * build aborts with a readable error, so authors fix content before deploying.
 */
export const SocialKind = z.literal("github").or(
  z.literal("x"),
).or(
  z.literal("linkedin"),
).or(
  z.literal("email"),
).or(
  z.literal("website"),
);

export const ProjectSchema = z.object({
  title: z.string().min(1).meta({ title: "Project title", description: "One short, punchy line." }),
  description: z.string().min(1).max(280),
  url: z.string().url(),
  tags: z.array(z.string().min(1)).max(6).default([]),
});

export const SocialSchema = z.object({
  kind: SocialKind,
  url: z.string().url(),
  label: z.string().min(1).max(24),
});

export const ThemeName = z.literal("apple-dark").or(z.literal("apple-light")).or(z.literal("midnight")).or(z.literal("sunset"));

export const PortfolioSchema = z.object({
  name: z.string().min(1).max(60),
  tagline: z.string().min(1).max(160),
  bio: z.string().min(1).max(400),
  theme: ThemeName.default("apple-dark"),
  projects: z.array(ProjectSchema).min(1).max(12),
  socials: z.array(SocialSchema).min(0).max(8),
});

export type Portfolio = z.infer<typeof PortfolioSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Social = z.infer<typeof SocialSchema>;

/* Runtime entrypoint consumed by the App Router page. */
export function loadPortfolio(json: unknown): Portfolio {
  return PortfolioSchema.parse(json);
}
