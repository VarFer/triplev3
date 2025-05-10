document.addEventListener("DOMContentLoaded", () => {
  // Navegación entre pestañas
  document.querySelectorAll(".navbar button").forEach(btn => {
    btn.addEventListener("click", () => {
      // Ocultar todas las secciones
      document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));

      // Mostrar la pestaña seleccionada
      const tabId = btn.dataset.tab;
      const selectedTab = document.getElementById(tabId);
      if (selectedTab) selectedTab.classList.add("active");

      // Mostrar/ocultar el Temporizador si la pestaña es "cronometro"
      const temporizadorSection = document.getElementById("temporizadorSection");
      if (tabId === "cronometro") {
        temporizadorSection.classList.remove("d-none");
      } else {
        temporizadorSection.classList.add("d-none");
      }

      // Cerrar el menú colapsable si está abierto (en móviles)
      const navbarCollapse = document.getElementById("navbarTabs");
      const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
      if (bsCollapse) {
        bsCollapse.hide();
      }
    });
  });
});
