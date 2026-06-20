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
timeSpent: "~25 hours so far"
parts:
  - name: "ESP32 DevKitC"
    qty: 1
    cost: 8.50
    link: "https://www.espressif.com/en/products/devkits"
  - name: "WS2812B addressable LEDs (reel of 300)"
    qty: 1
    cost: 22.00
  - name: "5V 4A power supply"
    qty: 1
    cost: 12.99
  - name: "Photoresistor (light sensor)"
    qty: 1
    cost: 0.75
  - name: "Laser-cut letter mask (acrylic)"
    qty: 1
  - name: "Oak for the bezel"
    qty: 1
    cost: 9.00
gallery:
  - src: "/images/projects/placeholder-1.svg"
    alt: "Breadboard prototype lit up"
    caption: "First light on the breadboard"
  - src: "/images/projects/led-matrix-clock.svg"
    alt: "LED grid spelling the time"
    caption: "Word layout test"
learnings:
  - "Serpentine LED layouts need an (x, y) → index mapping or the text comes out mirrored on every other row."
  - "256 LEDs at full white pull far more current than a USB port can supply — size the PSU for worst case, not typical."
---

A word clock that tells the time in glowing words on a 16×16 grid of addressable
LEDs. It syncs over WiFi via NTP, auto-dims at night with a light sensor, and
hides the electronics behind a laser-cut letter mask and an oak bezel.

This page is the overview — the bench-level play-by-play lives in the **build log**
at the bottom, posted as I make progress.
