---
title: "LED Matrix Word Clock"
description: "A WiFi-synced word clock driven by an ESP32 and a 16x16 addressable LED matrix."
pubDate: 2026-05-02
updatedDate: 2026-06-10
status: "in-progress"
category: "Electronics"
tags: ["esp32", "leds", "pcb", "3d-printing"]
cover: "/images/projects/led-matrix-clock.svg"
coverAlt: "A glowing LED word clock prototype on a workbench"
---

I've wanted a word clock for years. This one tells the time in words on a 16×16
grid of addressable LEDs, syncs over WiFi via NTP, and dims itself at night.

## The plan

- **Brain:** ESP32 (WiFi + plenty of GPIO)
- **Display:** 256 WS2812B LEDs behind a laser-cut letter stencil
- **Power:** 5V/4A supply — those LEDs are hungry at full white
- **Enclosure:** 3D-printed frame, oak face

## Build log

### Driving the matrix

First milestone was getting the panel lit and addressable. The trick with a
serpentine layout is mapping (x, y) to the LED index:

```cpp
uint16_t xyToIndex(uint8_t x, uint8_t y) {
  return (y % 2 == 0) ? y * 16 + x : y * 16 + (15 - x);
}
```

![Placeholder build photo](/images/projects/led-matrix-clock.svg)

### Time sync

NTP over WiFi was painless. Next up: a light sensor for auto-dimming and a
custom PCB so I can ditch the breadboard.

## What's next

- [ ] Design the carrier PCB in KiCad
- [ ] Laser-cut the letter mask
- [ ] Finish the oak bezel
