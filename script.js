const canvas = document.getElementById('canvas');
const colorPicker = document.getElementById('colorPicker');

const db = firebase.database();
const gridSize = 50;

// Create the 50x50 grid
for (let i = 0; i < gridSize * gridSize; i++) {
  const pixel = document.createElement('div');
  pixel.className = 'pixel';
  pixel.dataset.index = i;

  pixel.addEventListener('click', () => {
    const color = colorPicker.value;
    db.ref('pixels/' + i).set(color);
  });

  canvas.appendChild(pixel);
}

// Sync all pixels in real time
db.ref('pixels').on('value', snapshot => {
  const pixels = snapshot.val() || {};
  document.querySelectorAll('.pixel').forEach(pixel => {
    const index = pixel.dataset.index;
    pixel.style.backgroundColor = pixels[index] || '#ffffff';
  });
});
