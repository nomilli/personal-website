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

## Projects vs. project logs

Projects work in **two linked pieces**:

- **A project summary** (`src/content/projects/`) — the polished showcase page at
  `/projects/<slug>`: photos, parts list with auto-totaled cost, learnings, and an
  aggregated list of that project's updates.
- **Build-log updates** (`src/content/logs/`) — one file per update, shown in the
  feed at `/logs` and linked from the project. Each update points at its project
  via the `project:` field (the project file's name without `.md`). A wrong slug
  fails the build, so you can't orphan an update.

### 1. Create the project summary

Save as `src/content/projects/led-matrix-clock.md`:

```markdown
---
title: "LED Matrix Clock"
description: "One-line summary."
pubDate: 2026-05-02
updatedDate: 2026-06-10        # optional
status: "in-progress"          # planned | in-progress | complete
category: "Electronics"        # e.g. Electronics, Woodworking
tags: ["esp32", "leds"]
cover: "/images/projects/clock.jpg"
coverAlt: "Description"
timeSpent: "~25 hours so far"  # optional, free-form
currency: "$"                  # optional, default "$"
parts:                         # optional — renders a table + auto total
  - name: "ESP32 DevKitC"
    qty: 1
    cost: 8.50                 # unit cost; leave off if unknown
    link: "https://..."        # optional
  - name: "WS2812B LEDs (reel)"
    qty: 1
    cost: 22.00
gallery:                       # optional finished-photo grid
  - src: "/images/projects/clock/final-1.jpg"
    alt: "Front view"
    caption: "Finished and mounted"
learnings:                     # optional bulleted takeaways
  - "Size the power supply for worst-case LED current."
---

A Markdown **overview** of the build goes here.
```

`led-matrix-clock.md` → `/projects/led-matrix-clock/`.

### 2. Add build-log updates as you go

Each update is its own file under `src/content/logs/`. Group them in a folder per
project, e.g. `src/content/logs/led-matrix-clock/2026-05-02-first-light.md`:

```markdown
---
title: "First light on the matrix"
description: "One-line summary (shown on the feed card)."
pubDate: 2026-05-02
project: led-matrix-clock      # must match the project filename
tags: ["leds"]
cover: "/images/projects/clock/breadboard.jpg"   # optional
coverAlt: "Description"
draft: false
---

The update write-up, with images: ![alt](/images/projects/clock/breadboard.jpg)
```

The update appears in the `/logs` feed and in the project's "Build log" timeline
automatically. Its URL follows the file path, e.g.
`/logs/led-matrix-clock/2026-05-02-first-light/`.

## Tech notes

- Astro 5 with Markdown/MDX content collections (`src/content.config.ts`)
- Zero client-side JavaScript by default — very fast
- Auto-generated `sitemap-index.xml` and `/rss.xml`
- Light/dark aware (follows the visitor's system setting)
