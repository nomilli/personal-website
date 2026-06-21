---
# ── BUILD-LOG UPDATE TEMPLATE ───────────────────────────────────────
# One file per update. Save to a folder named after the project:
#   src/content/logs/<project-slug>/<date>-<short-title>.md
# e.g. src/content/logs/led-matrix-clock/2026-05-02-first-light.md
title: "Update title"
description: "One-line summary (shown on the /logs feed card)."
pubDate: 2026-01-01              # YYYY-MM-DD of this update
project: project-slug            # MUST match a file in src/content/projects/
                                 # (the filename without .md). A wrong slug
                                 # fails the build, so it can't be orphaned.
tags: ["tag1"]
# cover: "/images/projects/<project-slug>/<photo>.jpg"   # optional
# coverAlt: "Describe the cover image"
draft: false                     # true = hidden from the live site
---

Write the update: what you did, what worked, what didn't, what's next. Code
blocks, images, and lists all work.

![Alt text](/images/projects/<project-slug>/photo.jpg)

```cpp
// code snippets render with syntax highlighting
int example = 42;
```
