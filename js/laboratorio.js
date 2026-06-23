document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".sidebar-btn");
    const cardsContainer = document.getElementById("ap-db-gallery");
    const counter = document.getElementById("ap-db-counter");
    const fileInput = document.getElementById("hidden-file-input");
    const uploadBtn = document.getElementById("upload-trigger-btn");

    // Función para actualizar contador
    const updateCounter = () => {
        const visibleCards = document.querySelectorAll(".ap-db-card:not(.is-hidden)");
        if (counter) counter.textContent = visibleCards.length;
    };

    // Lógica de filtrado por botones
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            buttons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filterValue = button.getAttribute("data-filter");
            const allCards = document.querySelectorAll(".ap-db-card");

            allCards.forEach(card => {
                const cardType = card.getAttribute("data-type");
                if (filterValue === "all" || cardType === filterValue) {
                    card.classList.remove("is-hidden");
                } else {
                    card.classList.add("is-hidden");
                }
            });
            updateCounter();
        });
    });

    // Evento para abrir explorador de archivos al dar clic al botón de subir
    if (uploadBtn && fileInput) {
        uploadBtn.addEventListener("click", () => fileInput.click());

        fileInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const fileUrl = URL.createObjectURL(file);
            const isVideo = file.type.startsWith("video/") || file.name.toLowerCase().includes("edit");
            const typeAttr = isVideo ? "edits" : "designs";
            const badgeText = isVideo ? "EDIT" : "DESIGN";
            const badgeClass = isVideo ? "card-badge edit-badge" : "card-badge";
            const ext = file.name.split('.').pop().toUpperCase();
            
            const nextId = document.querySelectorAll(".ap-db-card").length + 1;
            const padId = String(nextId).padStart(2, '0');
            const cleanTitle = file.name.split('.')[0];

            const card = document.createElement("div");
            card.className = "ap-db-card";
            card.setAttribute("data-type", typeAttr);

            // Genera la tarjeta con la imagen real subida (si es imagen) o con un preview si es video
            card.innerHTML = `
                <div class="card-media-box">
                    <img src="${isVideo ? 'img/6temporada.png' : fileUrl}" alt="${cleanTitle}" class="card-img" style="${isVideo ? 'filter: hue-rotate(110deg);' : ''}">
                    <span class="${badgeClass}">${badgeText}</span>
                    ${isVideo ? '<div class="play-indicator">▶</div>' : ''}
                </div>
                <div class="card-info">
                    <div class="card-meta"><span>ID // ${padId}</span><span>FILE: .${ext}</span></div>
                    <h4 class="card-title">${cleanTitle}</h4>
                </div>
            `;

            cardsContainer.appendChild(card);

            // Verificar si debe nacer oculto por el filtro activo
            const activeFilter = document.querySelector(".sidebar-btn.active").getAttribute("data-filter");
            if (activeFilter !== "all" && activeFilter !== typeAttr) {
                card.classList.add("is-hidden");
            }

            updateCounter();
            fileInput.value = ""; // Limpiar memoria de carga
        });
    }

    updateCounter();
});