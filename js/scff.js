/* ============================================================
   LÓGICA INTERACTIVA REPARADA — SIN CONFLICTO DE CENTRADO
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".haven-nav");
    const navLinks = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("header, section");

    // 1. EFECTO DE BARRA FLOTANTE AL HACER SCROLL (CORREGIDO)
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("nav-scrolled");
        } else {
            navbar.classList.remove("nav-scrolled");
        }
    });

    // 2. DETECTOR DE SECCIÓN ACTIVA (SCROLL SPY)
    const changeActiveLink = () => {
        let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

        sections.forEach((section) => {
            if (
                scrollPosition >= section.offsetTop - 120 &&
                scrollPosition < section.offsetTop + section.offsetHeight - 120
            ) {
                const currentId = section.getAttribute("id");

                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${currentId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    };

    window.addEventListener("scroll", changeActiveLink);

    // 3. SCROLL SUAVE (SMOOTH SCROLL)
    document.querySelectorAll('.haven-nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});