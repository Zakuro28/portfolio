// ====== MOBILE MENU TOGGLE ======
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// ====== FADE-IN SCROLL EFFECT ======
const fadeElements = document.querySelectorAll(".fade-in");

const appearOnScroll = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.2 }
);

fadeElements.forEach(el => appearOnScroll.observe(el));

// ====== TYPING EFFECT ======
const typingElement = document.querySelector(".typing");
const roles = ["Web Developer", "Frontend Designer", "Freelancer", "Tech Enthusiast"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
  const currentRole = roles[roleIndex];
  if (isDeleting) {
    typingElement.textContent = currentRole.substring(0, charIndex--);
  } else {
    typingElement.textContent = currentRole.substring(0, charIndex++);
  }

  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    typingSpeed = 120;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typingSpeed = 100;
  }

  setTimeout(typeEffect, typingSpeed);
}

if (typingElement) {
  typeEffect();
}
/* ====== RGB LIGHTS MOUSE INTERACTION ====== */
(function() {
  const lights = document.querySelector('.rgb-lights');
  if (!lights) return;

  const blobs = document.querySelectorAll('.rgb');

  // Smoothly move blobs toward pointer — store target and lerp.
  let pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let targets = Array.from(blobs).map(() => ({ x: pointer.x, y: pointer.y }));

  // assign different multipliers so each blob lags differently
  const multipliers = [0.06, 0.04, 0.02];

  window.addEventListener('mousemove', (e) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
  }, { passive: true });

  // For touch, set to center on touch position
  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      pointer.x = e.touches[0].clientX;
      pointer.y = e.touches[0].clientY;
    }
  }, { passive: true });

  function animate() {
    blobs.forEach((blob, i) => {
      // Lerp target towards pointer
      targets[i].x += (pointer.x - targets[i].x) * multipliers[i];
      targets[i].y += (pointer.y - targets[i].y) * multipliers[i];

      // Slight offset so they don't overlap exactly
      const offsetX = (i - 1) * 80; // -80, 0, 80
      const offsetY = (i - 1) * 40;

      const x = targets[i].x + offsetX;
      const y = targets[i].y + offsetY;

      // place blob using transform for GPU acceleration
      blob.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    });

    requestAnimationFrame(animate);
  }

  // start on next frame
  requestAnimationFrame(animate);
})();
