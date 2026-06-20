import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Blog posts — general writing.
 * Add a new post by dropping a `.md` (or `.mdx`) file into src/content/blog/.
 */
const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    /** Optional hero image — a path under /public, e.g. "/images/blog/foo.jpg" */
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    /** Set to true to hide a post from the live site (still builds in dev). */
    draft: z.boolean().default(false),
  }),
});

/** A single line item in a project's parts list / bill of materials. */
const partSchema = z.object({
  name: z.string(),
  qty: z.number().default(1),
  /** Unit cost (just the number). The page multiplies by qty and totals it up. */
  cost: z.number().optional(),
  /** Optional URL to where the part can be bought. */
  link: z.string().optional(),
});

/** A photo in the project gallery. */
const galleryItemSchema = z.object({
  /** Path under /public, e.g. "/images/projects/clock/final-1.jpg" */
  src: z.string(),
  alt: z.string().default(""),
  caption: z.string().optional(),
});

/**
 * PROJECTS = the polished summary / showcase page for a build.
 * Lives under /projects. Holds structured data (parts, cost, gallery,
 * learnings) plus a Markdown overview in the body. Each project also
 * aggregates its build-log updates (see the `logs` collection below).
 */
const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    /** Where the build is at. */
    status: z.enum(["planned", "in-progress", "complete"]).default("in-progress"),
    /** e.g. "Electronics", "Woodworking" — used for grouping/filtering. */
    category: z.string().default("Project"),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),

    /* ---- summary / showcase fields ---- */
    /** Bill of materials. The page renders a table and auto-totals the cost. */
    parts: z.array(partSchema).default([]),
    /** Currency symbol used for the parts table + total. */
    currency: z.string().default("$"),
    /** Free-form, e.g. "~30 hours over 6 weekends". */
    timeSpent: z.string().optional(),
    /** Key takeaways — rendered as a bulleted list. */
    learnings: z.array(z.string()).default([]),
    /** Finished-photo gallery. */
    gallery: z.array(galleryItemSchema).default([]),

    draft: z.boolean().default(false),
  }),
});

/**
 * LOGS = individual build-log updates (one file per update).
 * Lives under /logs. Each update belongs to exactly one project via the
 * validated `project` reference — if the slug doesn't match a real project,
 * the build fails instead of silently orphaning the update.
 *
 * Suggested file path: src/content/logs/<project-slug>/<date-or-title>.md
 */
const logs = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/logs" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    /** Slug of the parent project (its filename without extension). */
    project: reference("projects"),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, projects, logs };
