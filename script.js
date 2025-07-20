document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Thank you for contacting us! We will get back to you soon.");
      form.reset();
    });
  }

  // Hamburger menu functionality with accessibility
  const navToggle = document.getElementById("navToggle");
  const navbar = document.getElementById("navbar");
  let lastToggle = 0;
  const DEBOUNCE_TIME = 300; // ms
  if (navToggle && navbar) {
    function closeMenu() {
      navbar.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
    function openMenu() {
      navbar.classList.add("open");
      navToggle.classList.add("open");
      navToggle.setAttribute("aria-expanded", "true");
    }
    navToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      const now = Date.now();
      if (now - lastToggle < DEBOUNCE_TIME) return;
      lastToggle = now;
      if (navbar.classList.contains("open")) {
        closeMenu();
      } else {
        openMenu();
        // Focus first link for accessibility
        const firstLink = navbar.querySelector("a");
        if (firstLink) firstLink.focus();
      }
    });
    navToggle.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        navToggle.click();
      }
    });
    // Prevent clicks inside navbar from closing it
    navbar.addEventListener("click", function (e) {
      e.stopPropagation();
    });
    // Close menu on link click (mobile)
    navbar.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 900) {
          closeMenu();
        }
      });
    });
    // Close menu on outside click or Escape
    document.addEventListener("click", function (e) {
      if (
        navbar.classList.contains("open") &&
        !navbar.contains(e.target) &&
        e.target !== navToggle
      ) {
        closeMenu();
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navbar.classList.contains("open")) {
        closeMenu();
        navToggle.focus();
      }
    });
  }
});
