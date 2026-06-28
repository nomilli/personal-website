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
| **Project summaries** | `src/content/projects/*.md` |
| **Build-log updates** | `src/content/logs/<project-slug>/*.md` |
| **Post templates** | `templates/` |
| **Images** | `public/images/...` |

> ⚠️ Set your real domain in `src/config.ts` (`url`) before deploying — the
> sitemap and RSS feed use it to build absolute links. The contact email is
> currently set to `hello@nolanmilleson.com`; change it there if needed.

## The three content types

| Type | Lives in | Template | URL |
| --- | --- | --- | --- |
| **Blog post** | `src/content/blog/` | `templates/blog-post.md` | `/blog/<slug>/` |
| **Project summary** | `src/content/projects/` | `templates/project-summary.md` | `/projects/<slug>/` |
| **Build-log update** | `src/content/logs/<project>/` | `templates/build-log-update.md` | `/logs/<project>/<slug>/` |

**Projects and build logs are linked.** A *project summary* is the polished
showcase page (photos, parts list with auto-totaled cost, learnings). *Build-log
updates* are one-file-per-update progress notes that appear in the `/logs` feed
**and** in their project's "Build log" timeline. Each update points at its
project via the `project:` field (the project filename without `.md`) — a wrong
slug fails the build, so an update can't be orphaned.

The ready-to-use **templates** in `templates/` contain every field, with inline
comments explaining each one. The fastest way to add a post is to copy the
matching template into the right folder, rename it, and fill it in. To draft in
Notion instead, see below.

## Drafting in Notion → publishing

Two routes: a quick **manual export** (recommended to start) and an **automated
sync** (more setup — see the next section).

### One-time: load the templates into Notion

1. In Notion, go to where you want your drafts to live.
2. Import each template: top-right **•••  →  Import  →  Markdown**, then pick a
   file from `templates/` (`blog-post.md`, `project-summary.md`,
   `build-log-update.md`). Each becomes a Notion page you can duplicate for every
   new post.
3. In the imported page, the frontmatter (the `--- … ---` block) arrives as plain
   text. Select those lines and turn them into a **code block** (type ```` ``` ````
   or use the block menu) so they stay together and export cleanly. Everything
   below is your writing area. Keep this page as your reusable template.

### Each time you write a post

1. **Duplicate** the matching template page and write your post. Fill in the
   frontmatter values (title, description, pubDate, tags, …) inside the code block.
2. **Export:** **•••  →  Export  →  Markdown & CSV  →  Export**.
3. **Unzip** the download — you'll get a `.md` file plus a folder of any images
   you embedded.
4. **Clean up the `.md`:**
   - **Frontmatter:** Notion wraps your code block in a ```` ``` ```` fence. Delete
     the opening and closing ```` ``` ```` lines so the `--- … ---` block sits at the
     very top as real frontmatter.
   - **Title line:** Notion adds a `# Page Title` heading (and sometimes a
     property table) at the top of the body — delete those. Your title lives in
     the frontmatter.
   - **Images:** Notion writes links like `![](My%20Page%20abc/photo.png)`. Move
     those image files into `public/images/<section>/<slug>/` and rewrite each
     link to an absolute path, e.g.
     `![alt](/images/projects/led-matrix-clock/photo.png)`.
5. **Save** to the right folder with a clean slug filename:
   - Blog → `src/content/blog/<slug>.md`
   - Project summary → `src/content/projects/<slug>.md`
   - Build-log update → `src/content/logs/<project-slug>/<date>-<slug>.md`
6. **Preview:** `npm run dev`, open the page, confirm it looks right.
7. **Publish:** `git add -A && git commit -m "Add post: <title>" && git push`.
   GitHub Actions redeploys in ~40 seconds.

> Why the cleanup? Notion has no concept of frontmatter or `/public` image paths,
> so a couple of manual fixes per post are unavoidable with the manual route. If
> you post often and want to skip them, set up the automated sync below.

## Advanced: automating Notion → GitHub

Notion can't push to GitHub on its own, but you can wire up a pipeline so posts
written in a Notion **database** publish automatically. The reliable pattern:

**How it works**

1. Create a **Notion integration** (<https://www.notion.so/my-integrations>) and
   copy its secret token.
2. Make a Notion **database** for posts with properties that map to frontmatter:
   `Title`, `Type` (blog / project / log), `Slug`, `Date`, `Status`, `Category`,
   `Tags`, `Project` (for logs), `Draft`. Share the database with the integration.
3. A small Node script uses the Notion API +
   [`notion-to-md`](https://github.com/souvikinator/notion-to-md) to convert each
   "ready" page into a Markdown file with the correct frontmatter, downloads its
   images into `public/images/…`, and writes the file into the right
   `src/content/` folder.
4. A **GitHub Action** runs that script (on a schedule and/or a manual button),
   commits the generated files, and pushes — the existing deploy workflow then
   publishes them.

**What it needs from you**

- The Notion token stored as a GitHub **Actions secret** (`NOTION_TOKEN`) —
  never commit it.
- The database set up with the properties above.
- A decision on image handling (Notion image URLs expire, so the script
  downloads them at sync time).

**Sample GitHub Action** (`.github/workflows/notion-sync.yml`):

```yaml
name: Sync from Notion
on:
  workflow_dispatch:        # manual "Run workflow" button
  schedule:
    - cron: "0 12 * * *"    # and once a day at noon UTC
jobs:
  sync:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: node scripts/notion-sync.mjs
        env:
          NOTION_TOKEN: ${{ secrets.NOTION_TOKEN }}
          NOTION_DATABASE_ID: ${{ secrets.NOTION_DATABASE_ID }}
      - name: Commit any new or changed posts
        run: |
          git config user.name "notion-sync"
          git config user.email "actions@github.com"
          git add -A
          git diff --cached --quiet || git commit -m "Sync posts from Notion"
          git push
```

The `scripts/notion-sync.mjs` script — which maps your database to the content
collections and handles images — is project-specific and **not included yet**.
Ask and I'll build it to match your Notion database.

**Trade-offs**

- ✅ Write entirely in Notion; publish with no local steps.
- ❌ More moving parts: an integration token, a database schema, and
  image-download logic. A malformed entry can fail the build.
- For a handful of posts a month, the **manual export is simpler and more
  robust**. Automation pays off when you post frequently.

## Tech notes

- Astro 5 with Markdown/MDX content collections (`src/content.config.ts`)
- Zero client-side JavaScript by default — very fast
- Native `<details>` expand/collapse for build-log entries (no JS)
- Auto-generated `sitemap-index.xml` and `/rss.xml`
- Light/dark aware (follows the visitor's system setting)
- Ready-to-use post templates in `templates/`
