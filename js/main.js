const circle = document.querySelector('.circle'),
  arrow = document.querySelector('.arrow');

circle.addEventListener('click', () => {
  arrow.classList.toggle('active');
});