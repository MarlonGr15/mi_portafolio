
"use strict";

// 1. MENÚ DE NAVEGACIÓN MÓVIL

const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelector("#nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Cerrar menú" : "Abrir menú"
  );
});

// Cerrar el menú al seleccionar una sección.

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
  });
});

// 2. FILTRAR PROYECTOS POR CATEGORÍA

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    // Actualizar el botón seleccionado.
    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;

      filterButton.classList.toggle("active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });

    // Mostrar solamente los proyectos de la categoría.
    projectCards.forEach((card) => {
      const category = card.dataset.category;
      const shouldShow =
        selectedFilter === "todos" || category === selectedFilter;

      card.hidden = !shouldShow;
    });
  });
});

// 3. ANIMACIONES AL DESPLAZARSE POR LA PÁGINA

const revealElements = document.querySelectorAll(".reveal");

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
} else {
  // Mostrar el contenido si las animaciones están desactivadas
  // o el navegador no admite IntersectionObserver.
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}

// 4. ACTUALIZAR EL AÑO DEL PIE DE PÁGINA

document.querySelector("#year").textContent =
  new Date().getFullYear();
