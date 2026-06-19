import { defineCollection, z } from "astro:content";
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

/**
 * Project logs — build journals for electronics, woodworking, etc.
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
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, projects };
