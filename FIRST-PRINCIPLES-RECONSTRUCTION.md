# First-Principles Reconstruction: pomodoro-timer-mvp

> Applied Elon Musk's first-principles thinking: break to fundamental truths, rebuild from zero.

## Core Problem

A person wants to focus for 25 minutes, then rest for 5 minutes, with a signal when each phase ends.

## First Principles Breakdown

1. Time is linear. A timer counts down from N to 0.
2. Sound exists. A beep when the timer expires is the minimum viable notification.
3. localStorage exists in every browser. No backend needed.

## Essential Features

| Priority | Feature |
|----------|---------|
| P0 | Display remaining time |
| P0 | Start / Pause / Reset controls |
| P0 | Audio notification on expiry |
| P1 | Work / Break phase alternation |

## Reconstruction Blueprint

One file: index.html. ~100 lines. setInterval, AudioContext beep, phase alternation.

## Musk\'s Razor

Delete everything. Create one file. Open and go. 3 seconds from clone to working timer.
