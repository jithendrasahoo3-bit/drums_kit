// Sound mappings for each drum key
const soundFiles = {
  w: 'sounds/tom-1.mp3',
  a: 'sounds/tom-2.mp3',
  s: 'sounds/tom-3.mp3',
  d: 'sounds/tom-4.mp3',
  j: 'sounds/snare.mp3',
  k: 'sounds/crash.mp3',
  l: 'sounds/kick-bass.mp3',
};

// Pre-load audio elements for snappy, zero-latency playback
const audioCache = {};
Object.entries(soundFiles).forEach(([key, src]) => {
  const audio = new Audio(src);
  audio.preload = 'auto';
  audioCache[key] = audio;
});

function playSound(key) {
  const audio = audioCache[key];
  if (!audio) return;

  // Rewind and play immediately (allows rapid drumming)
  audio.currentTime = 0;
  audio.play().catch(() => {
    // Gracefully ignore autoplay restrictions or playback errors
  });
}

function animateButton(key) {
  const drumButton = document.querySelector(`.drum.${key}`);
  if (!drumButton) return;

  drumButton.classList.add('pressed');
  setTimeout(() => {
    drumButton.classList.remove('pressed');
  }, 120);
}

function handleDrumTrigger(key) {
  const normalizedKey = key.toLowerCase();
  if (normalizedKey in soundFiles) {
    playSound(normalizedKey);
    animateButton(normalizedKey);
  }
}

// Keyboard events
document.addEventListener('keydown', (event) => {
  // Ignore modifier keys or repeating keydown while holding key
  if (event.repeat || event.metaKey || event.ctrlKey || event.altKey) return;
  handleDrumTrigger(event.key);
});

// Click and touch events on drum buttons
document.querySelectorAll('.drum').forEach((button) => {
  const triggerKey = button.dataset.key || button.textContent.trim().charAt(0);

  button.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    handleDrumTrigger(triggerKey);
  });
});