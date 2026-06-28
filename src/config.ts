/**
 * Site-wide configuration.
 * ─────────────────────────
 * This is the ONE place to edit your personal details. Everything on the site
 * (header, footer, home page, SEO tags, RSS feed) reads from here.
 */
export const SITE = {
  /** Your name — shown in the header, footer, and page titles. */
  name: "Nolan Milleson",

  /** Short tagline shown under your name on the home page. */
  tagline: "Engineer & maker — electronics, woodworking, and things in between.",

  /** Default page title + meta description (used for SEO and link previews). */
  title: "Nolan Milleson",
  description:
    "Personal site of Nolan Milleson — resume, blog, and project logs covering electronics, woodworking, and more.",

  /**
   * Your live domain, including https:// and no trailing slash.
   * REQUIRED for the sitemap and RSS feed to generate correct links.
   * Replace this with your real domain before deploying.
   */
  url: "https://nolanmilleson.com",

  /** Contact email — used for the "Email me" links. */
  email: "hello@nolanmilleson.com",

  /**
   * Optional social / external links. Leave a value as "" to hide that link.
   */
  social: {
    github: "",
    linkedin: "",
    instagram: "",
    youtube: "",
    mastodon: "",
  },
} as const;

/** Top navigation links. */
export const NAV = [
  { label: "Projects", href: "/projects" },
  { label: "Project Logs", href: "/logs" },
  { label: "Blog", href: "/blog" },
  { label: "Resume", href: "/resume" },
] as const;
