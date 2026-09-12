// Input Elements
const cardNumberInput = document.getElementById('card-number');
const cardNameInput = document.getElementById('card-name');
const cardExpiryInput = document.getElementById('card-expiry');
const cardCvvInput = document.getElementById('card-cvv');

// Display Elements on Card
const displayNum = document.getElementById('display-number');
const displayName = document.getElementById('display-name');
const displayExpiry = document.getElementById('display-expiry');
const displayCvv = document.getElementById('display-cvv');

// Card Object for flipping/3D effect
const card = document.getElementById('card');

// 1. Live Update Card Details
cardNumberInput.addEventListener('input', (e) => {
  let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
  value = value.replace(/(.{4})/g, '$1 ').trim(); // Add spaces every 4 digits
  e.target.value = value;
  displayNum.textContent = value || '•••• •••• •••• ••••';
});

cardNameInput.addEventListener('input', (e) => {
  displayName.textContent = e.target.value || 'YOUR NAME';
});

cardExpiryInput.addEventListener('input', (e) => {
  let value = e.target.value.replace(/\D/g, '');
  if (value.length >= 2) {
    value = value.substring(0, 2) + '/' + value.substring(2, 4);
  }
  e.target.value = value;
  displayExpiry.textContent = value || 'MM/YY';
});

cardCvvInput.addEventListener('input', (e) => {
  displayCvv.textContent = e.target.value || '•••';
});

// 2. Flip Card to Back when CVV input is focused
cardCvvInput.addEventListener('focus', () => {
  card.classList.add('flip');
});

cardCvvInput.addEventListener('blur', () => {
  card.classList.remove('flip');
});

// 3. Subtle 3D Mouse Parallax Effect on Card
const wrapper = document.querySelector('.card-wrapper');

wrapper.addEventListener('mousemove', (e) => {
  // Disable 3D tilt while flipped to prevent visual glitches
  if (card.classList.contains('flip')) return;

  const rect = wrapper.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;

  const rotateX = (-y / rect.height) * 30; // Tilt intensity
  const rotateY = (x / rect.width) * 30;

  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

wrapper.addEventListener('mouseleave', () => {
  if (!card.classList.contains('flip')) {
    card.style.transform = 'rotateX(0deg) rotateY(0deg)';
  }
});
