const canvas = document.getElementById('canvas');
const colorPicker = document.getElementById('colorPicker');
const cooldownLabel = document.getElementById('cooldownLabel');

const db = firebase.database();
const gridSize = 50;
const cooldownMs = 5000; // 5 seconds
let canPlace = true;

// Create 2500 pixels (50x50)
for (let i = 0; i < gridSize * gridSize; i++) {
  const pixel = document.createElement('div');
  pixel.className = 'pixel';
  pixel.dataset.index = i;
  pixel.tabIndex = -1;

  // Prevent blinking cursor
  pixel.addEventListener('mousedown', (e) => e.preventDefault());

  // Pixel click
  pixel.addEventListener('click', () => {
    if (!canPlace) return;

    const color = colorPicker.value;
    db.ref('pixels/' + i).set(color);

    const now = Date.now();
    localStorage.setItem('lastPlaceTime', now.toString());

    startCooldown(now);
  });

  canvas.appendChild(pixel);
}

// Load pixels from Firebase
db.ref('pixels').on('value', (snapshot) => {
  const pixels = snapshot.val() || {};
  document.querySelectorAll('.pixel').forEach(pixel => {
    const i = pixel.dataset.index;
    pixel.style.backgroundColor = pixels[i] || '#ffffff';
  });
});

// Start the cooldown countdown
function startCooldown(lastTime) {
  canPlace = false;
  colorPicker.disabled = true;

  let secondsLeft = Math.ceil((lastTime + cooldownMs - Date.now()) / 1000);
  cooldownLabel.textContent = `Wait: ${secondsLeft}s...`;

  const interval = setInterval(() => {
    secondsLeft--;
    if (secondsLeft > 0) {
      cooldownLabel.textContent = `Wait: ${secondsLeft}s...`;
    } else {
      clearInterval(interval);
      canPlace = true;
      colorPicker.disabled = false;
      cooldownLabel.textContent = `You can place again!`;
    }
  }, 1000);
}

// If tab loads and cooldown still running
const lastPlaceTime = localStorage.getItem('lastPlaceTime');
if (lastPlaceTime) {
  const timeDiff = Date.now() - parseInt(lastPlaceTime);
  if (timeDiff < cooldownMs) {
    startCooldown(parseInt(lastPlaceTime));
  }
}
