// Drum sound file paths
const soundSources = {
  w: 'sounds/tom-1.mp3',
  a: 'sounds/tom-2.mp3',
  s: 'sounds/tom-3.mp3',
  d: 'sounds/tom-4.mp3',
  j: 'sounds/snare.mp3',
  k: 'sounds/crash.mp3',
  l: 'sounds/kick-bass.mp3',
};

// Global volume setting (0.0 to 1.0)
let masterVolume = 0.8;

// Sound pool: keep preloaded audio clones for instant overlap on rapid drumming
const audioPool = {};
Object.entries(soundSources).forEach(([key, path]) => {
  audioPool[key] = [
    new Audio(path),
    new Audio(path),
    new Audio(path)
  ];
  audioPool[key].forEach(audio => {
    audio.preload = 'auto';
    audio.volume = masterVolume;
  });
});

// Play drum sound using rotating audio instances so rapid hits overlap naturally
const poolIndices = { w: 0, a: 0, s: 0, d: 0, j: 0, k: 0, l: 0 };

function playDrumSound(key) {
  const instances = audioPool[key];
  if (!instances) return;

  const index = poolIndices[key];
  const audio = instances[index];
  poolIndices[key] = (index + 1) % instances.length;

  audio.volume = masterVolume;
  audio.currentTime = 0;
  audio.play().catch(() => {
    // Gracefully handle browser autoplay blocks
  });
}

// Trigger tactile button press animation
function triggerAnimation(key) {
  const pad = document.querySelector(`.drum-pad.${key}`);
  if (!pad) return;

  pad.classList.add('pressed');
  setTimeout(() => {
    pad.classList.remove('pressed');
  }, 100);
}

// Unified trigger function
function handleHit(key) {
  const normalized = key.toLowerCase();
  if (normalized in soundSources) {
    playDrumSound(normalized);
    triggerAnimation(normalized);
  }
}

// Keyboard input listener
document.addEventListener('keydown', (e) => {
  if (e.repeat || e.ctrlKey || e.altKey || e.metaKey) return;
  handleHit(e.key);
});

// Click and touch listeners on pads
document.querySelectorAll('.drum-pad').forEach((pad) => {
  const key = pad.dataset.key;

  pad.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    handleHit(key);
  });
});

// Volume slider handling
const volumeSlider = document.getElementById('volume-slider');
const volumeLabel = document.getElementById('volume-label');

if (volumeSlider && volumeLabel) {
  volumeSlider.addEventListener('input', (e) => {
    masterVolume = parseFloat(e.target.value);
    volumeLabel.textContent = `${Math.round(masterVolume * 100)}%`;

    // Update volume on preloaded audio instances
    Object.values(audioPool).forEach(instances => {
      instances.forEach(audio => {
        audio.volume = masterVolume;
      });
    });
  });
}