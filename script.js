const canvas = document.getElementById('canvas');
const colorPicker = document.getElementById('colorPicker');
const db = firebase.database();

let canPlace = true;
const cooldownMs = 20000; // 20 seconds

const gridSize = 50;

for (let i = 0; i < gridSize * gridSize; i++) {
  const pixel = document.createElement('div');
  pixel.className = 'pixel';
  pixel.dataset.index = i;

  // ✅ Prevent blinking text cursor (inside the loop)
  pixel.tabIndex = -1;
  pixel.addEventListener('mousedown', (e) => {
    e.preventDefault(); // Prevent focus/caret
  });

  // Color update on click
  pixel.addEventListener('click', () => {
    if (!canPlace) return;
  
    const color = colorPicker.value;
    db.ref('pixels/' + i).set(color);
  
    canPlace = false;
  
    // Optional: show cooldown indicator
    colorPicker.disabled = true;
  
    setTimeout(() => {
      canPlace = true;
      colorPicker.disabled = false;
    }, cooldownMs);
  });

  canvas.appendChild(pixel);
}

// Sync from Firebase
db.ref('pixels').on('value', snapshot => {
  const pixels = snapshot.val() || {};
  document.querySelectorAll('.pixel').forEach(pixel => {
    const i = pixel.dataset.index;
    pixel.style.backgroundColor = pixels[i] || '#ffffff';
  });
});
