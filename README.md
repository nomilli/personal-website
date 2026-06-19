# Personal Website

A fast, static personal site built with [Astro](https://astro.build) — resume,
blog, and project logs with a warm "workshop / maker" aesthetic.

## Quick start

```bash
npm install      # one time
npm run dev      # local dev server at http://localhost:4321
npm run build    # production build into dist/
npm run preview  # preview the production build locally
```

## Where to edit things

| What | File |
| --- | --- |
| **Your name, tagline, email, domain, social links** | `src/config.ts` |
| **Resume content** | `src/pages/resume.astro` (top of file) |
| **Resume PDF** (download button) | `public/resume.pdf` — replace with your real PDF |
| **Colors / fonts / look** | `src/styles/global.css` (CSS variables at the top) |
| **Blog posts** | `src/content/blog/*.md` |
| **Project logs** | `src/content/projects/*.md` |
| **Images** | `public/images/...` |

> ⚠️ Set your real domain in `src/config.ts` (`url`) before deploying — the
> sitemap and RSS feed use it to build absolute links. The contact email is
> currently set to `nomilli79@gmail.com`; change it there if needed.

## Adding a blog post

1. Draft in Notion / Google Docs, then export to **Markdown**.
2. Save it as `src/content/blog/my-post.md`.
3. Add the frontmatter block at the top:

```markdown
---
title: "My post title"
description: "One-line summary (used on cards and in link previews)."
pubDate: 2026-06-19
tags: ["esp32", "tutorial"]
cover: "/images/blog/my-post-cover.jpg"   # optional
coverAlt: "Description of the cover image" # optional
draft: false                               # set true to hide it
---

Your Markdown here. Images: ![alt text](/images/blog/photo.jpg)
```

4. Drop any images into `public/images/blog/` and reference them with a path
   that starts with `/images/...`.

## Adding a project log

Same as above, but in `src/content/projects/`. Projects have two extra fields:

```markdown
---
title: "LED Matrix Clock"
description: "..."
pubDate: 2026-05-02
status: "in-progress"      # planned | in-progress | complete
category: "Electronics"    # e.g. Electronics, Woodworking
tags: ["esp32", "leds"]
cover: "/images/projects/clock.jpg"
---
```

The filename becomes the URL, e.g. `led-matrix-clock.md` → `/projects/led-matrix-clock/`.

## Deploying (GitHub Pages)

This repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`)
that builds and deploys the site automatically on every push to `main`. The
custom domain `nolanmilleson.com` is wired up via `public/CNAME`.

### One-time setup

1. **Create an empty repo** on GitHub (no README/license) under the `nomilli`
   account, then push:

   ```bash
   git remote add origin https://github.com/nomilli/<repo-name>.git
   git push -u origin main
   ```

2. **Enable Pages:** repo **Settings → Pages → Build and deployment → Source:
   “GitHub Actions”**. The workflow runs on push and deploys the build.

3. **Custom domain:** repo **Settings → Pages → Custom domain** → enter
   `nolanmilleson.com` → Save. Tick **Enforce HTTPS** once the cert is issued.

4. **DNS at Squarespace** (Domains → `nolanmilleson.com` → DNS settings). Add:
   - Four **A** records for the apex `@` → `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`
   - One **CNAME** record: host `www` → `nomilli.github.io`
   - Remove any existing parking A records that conflict.

   DNS can take minutes to a few hours to propagate.

After that, every `git push` to `main` redeploys automatically.

## Tech notes

- Astro 5 with Markdown/MDX content collections (`src/content.config.ts`)
- Zero client-side JavaScript by default — very fast
- Auto-generated `sitemap-index.xml` and `/rss.xml`
- Light/dark aware (follows the visitor's system setting)
