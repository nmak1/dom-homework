import './css/style.css';

console.log('Главная страница загружена');

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM полностью загружен');

  const links = document.querySelectorAll('a');
  links.forEach((link) => {
    link.addEventListener('mouseenter', () => {
      link.style.opacity = '0.8';
    });
    link.addEventListener('mouseleave', () => {
      link.style.opacity = '1';
    });
  });
});
