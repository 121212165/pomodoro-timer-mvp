# Reconstruction Plan

## What gets deleted
- README.md (boilerplate, no value)
- .github/workflows/ci.yml (no-ops for a static file)
- FIRST-PRINCIPLES-RECONSTRUCTION.md (consumed, not needed at runtime)

## What gets created
- `index.html` — single file, ~100 lines

## Design
- `setInterval` 1-second tick
- `AudioContext` oscillator beep (no external audio files)
- Phase alternation: 25 min work → 5 min break → repeat
- Start / Pause / Reset buttons
- Time display as `MM:SS`
- localStorage: persist remaining seconds + phase across refresh
- Zero dependencies, zero build step
