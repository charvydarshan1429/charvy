const glow = document.querySelector('.cursor-glow');
const cherries = [...document.querySelectorAll('.cherry')];

window.addEventListener('mousemove', (e) => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;

  cherries.forEach((cherry, i) => {
    const strength = 5 + (i % 3) * 3;
    const x = (e.clientX / window.innerWidth - 0.5) * strength;
    const y = (e.clientY / window.innerHeight - 0.5) * strength;
    cherry.style.transform = `translate(${x}px, ${y}px) rotate(${x * 1.2}deg)`;
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('mobile-open');
  menuBtn.textContent = navLinks.classList.contains('mobile-open') ? '×' : '☰';
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('mobile-open');
    menuBtn.textContent = '☰';
  });
});

document.querySelectorAll('.skill-card, .project, .hero-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    if (window.innerWidth > 850 && card.classList.contains('hero-card')) {
      card.style.transform = `rotate(1.4deg) perspective(900px) rotateY(${x * 2}deg) rotateX(${-y * 2}deg)`;
    }
  });
  card.addEventListener('mouseleave', () => {
    if (card.classList.contains('hero-card')) card.style.transform = 'rotate(1.4deg)';
  });
});
