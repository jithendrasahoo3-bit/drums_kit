# Virtual Drum Kit

Hey! I am Jithendra, and this is my interactive online drum kit project built using pure HTML, CSS, and vanilla JavaScript.

**Live Demo:** [https://jithendrasahoo3-bit.github.io/drums_kit/](https://jithendrasahoo3-bit.github.io/drums_kit/)

---

## Why I Built This

I wanted to build an interactive audio project that responds instantly to keyboard inputs and screen taps. Making music right in the browser felt like a fun way to get better at handling JavaScript DOM events, working with the Web Audio / HTML5 Audio APIs, and designing responsive tactile UI elements without relying on heavy frameworks or UI libraries.

---

## How It Works

1. **Audio Engine & Preloading**:
   - Instead of creating a new `Audio()` element every time a key is pressed (which causes a delay and chokes the browser on fast drum rolls), I built a rotating pool of preloaded audio instances for each sound.
   - Whenever a pad is triggered, it rewinds the audio to the beginning (`currentTime = 0`) and plays it immediately. This allows fast snare rolls and double kick hits to overlap naturally without cutting off.

2. **Input Handling**:
   - Desktop: Listens for the `keydown` event and checks against mapped keys (`W, A, S, D, J, K, L`). Non-drum keys are silently ignored so typing isn't interrupted.
   - Mobile & Touch: Uses `pointerdown` listeners on the drum pads so there's zero mobile tap delay.

3. **Custom Volume Control**:
   - An interactive range slider lets users adjust the master volume dynamically. It updates all active sound instances in real time.

4. **Styling & Animation**:
   - I styled the drum pads to look like real drum heads with an outer rim and tactile 3D effect.
   - When a pad is triggered, a `.pressed` CSS class adds a golden glow and downward press animation for 100ms to give immediate visual feedback.

---

## Key Mapping

- **W** &rarr; Tom 1
- **A** &rarr; Tom 2
- **S** &rarr; Tom 3
- **D** &rarr; Tom 4
- **J** &rarr; Snare
- **K** &rarr; Crash Cymbal
- **L** &rarr; Kick Bass

---

## Running Locally

No build tools or node packages needed! Just clone and open:

```bash
git clone https://github.com/jithendrasahoo3-bit/drums_kit.git
cd drums_kit
# Open index.html in any modern browser
```

Feel free to test it out and let me know your thoughts!
