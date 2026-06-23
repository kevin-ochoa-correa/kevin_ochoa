/**
 * MOTOR DE PARALAJE INTERACTIVO 3D - HOLLOW OF KANG SYSTEM
 */
document.addEventListener("DOMContentLoaded", () => {
    const magicCard = document.getElementById("hk-magic-card");
    const reflection = magicCard?.querySelector(".hk-mag-glass-reflection");
    const energyShadow = magicCard?.querySelector(".hk-mag-shadow-energy");

    if (!magicCard) return;

    window.addEventListener("mousemove", (e) => {
        const rect = magicCard.getBoundingClientRect();
        
        // Punto central de la carta mágica
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        
        // Cálculo del ángulo de rotación basado en el puntero
        const angleX = (cardCenterY - e.clientY) / 25;
        const angleY = (e.clientX - cardCenterX) / 25;
        
        // Aplicar rotación 3D física
        magicCard.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;

        // Mover el reflejo del vidrio dinámicamente
        if (reflection) {
            const percentageX = (e.clientX - rect.left) / rect.width * 100;
            const percentageY = (e.clientY - rect.top) / rect.height * 100;
            reflection.style.background = `linear-gradient(${120 + angleY * 2}deg, rgba(255,255,255,0.25) ${percentageX / 2}%, transparent 70%)`;
        }

        // Desplazar el aura de energía trasera
        if (energyShadow) {
            energyShadow.style.transform = `translate3d(${-angleY * 1.5}px, ${angleX * 1.5}px, -30px)`;
            energyShadow.style.filter = `blur(45px)`;
            energyShadow.style.opacity = "0.8";
        }
    });

    // Restaurar suavidad y posición original al salir
    magicCard.addEventListener("mouseleave", () => {
        magicCard.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
        magicCard.style.transform = "rotateX(0deg) rotateY(0deg)";
        
        if (energyShadow) {
            energyShadow.style.transition = "transform 0.6s ease, opacity 0.6s";
            energyShadow.style.transform = "translate3d(0px, 0px, -30px)";
            energyShadow.style.opacity = "0.5";
            energyShadow.style.filter = `blur(35px)`;
        }
    });

    // Eliminar transiciones durante el rastreo para que sea inmediato e interactivo
    magicCard.addEventListener("mouseenter", () => {
        magicCard.style.transition = "none";
        if (energyShadow) energyShadow.style.transition = "none";
    });
});