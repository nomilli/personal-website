---
title: "First light on the matrix"
description: "Got all 256 LEDs addressable and figured out the serpentine mapping."
pubDate: 2026-05-02
project: led-matrix-clock
tags: ["leds", "esp32"]
cover: "/images/projects/placeholder-1.svg"
coverAlt: "Breadboard with an LED panel lit up"
---

First milestone: get the panel lit and individually addressable. The panel is
wired in a serpentine pattern, so even rows run left-to-right and odd rows
right-to-left. Without accounting for that, text comes out mirrored on every
other row. The mapping that fixed it:

```cpp
uint16_t xyToIndex(uint8_t x, uint8_t y) {
  return (y % 2 == 0) ? y * 16 + x : y * 16 + (15 - x);
}
```

With that in place I could light arbitrary (x, y) pixels and start laying out
where each word sits on the grid.
