---
# ── PROJECT SUMMARY TEMPLATE ────────────────────────────────────────
# Save the finished file to:  src/content/projects/<your-slug>.md
# The filename (without .md) is the project SLUG and its URL:
#   led-matrix-clock.md  ->  /projects/led-matrix-clock/
# Remember the slug — your build-log updates reference it.
title: "Project name"
description: "One-line summary of the build."
pubDate: 2026-01-01              # YYYY-MM-DD the project started / was posted
# updatedDate: 2026-01-15        # optional — bump when you post updates
status: "in-progress"            # planned | in-progress | complete
category: "Electronics"          # e.g. Electronics, Woodworking
tags: ["tag1", "tag2"]
cover: "/images/projects/<slug>/cover.jpg"
coverAlt: "Describe the cover image"
timeSpent: "~10 hours"           # optional, free-form text
currency: "$"                    # optional, defaults to "$"

# Parts / bill of materials — optional. Renders a table and AUTO-TOTALS cost.
parts:
  - name: "Part name"
    qty: 1
    cost: 0.00                   # unit cost; omit the line if unknown
    link: "https://..."          # optional — adds a buy/source link (shows ↗)
  - name: "Another part"
    qty: 2
    cost: 0.00

# Finished-photo gallery — optional.
gallery:
  - src: "/images/projects/<slug>/photo-1.jpg"
    alt: "Describe the photo"
    caption: "Optional caption"
  - src: "/images/projects/<slug>/photo-2.jpg"
    alt: "Describe the photo"

# Key takeaways — optional bulleted list (shown under "Learnings").
learnings:
  - "Something you learned."
  - "Another lesson."

draft: false                     # true = hidden from the live site
---

Write a Markdown **overview** of the build here: what it is, the goal, and the
approach. Keep the play-by-play for the build-log updates — they show up
automatically at the bottom of this page in a "Build log" timeline, and the
newest one is featured above it while the project is in progress.
