const canvas = document.getElementById('canvas');
const colorPicker = document.getElementById('colorPicker');

// Create 50 × 50 = 2500 pixels
for (let i = 0; i < 50 * 50; i++) {
  const pixel = document.createElement('div');
  pixel.className = 'pixel';
  pixel.addEventListener('click', () => {
    pixel.style.backgroundColor = colorPicker.value;
  });
  canvas.appendChild(pixel);
}
