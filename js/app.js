const form = document.querySelector("#imageForm");
const result = document.querySelector("#result");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const query = document.querySelector("#query").value.trim();

    if (!query) {
        alert("Por favor, ingresa un término de búsqueda");
        return;
    }

    fetchImages(query);
});

async function fetchImages(query) {
    const API_KEY = "43197830-3e378540a515ca285015731eb";
    const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&per_page=10`;

    try {
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error("Error al obtener las imágenes");
        }

        const data = await response.json();
        displayImages(data.hits);
    } catch (error) {
        console.error(error);
        alert("Hubo un error al buscar las imágenes.");
    }
}

function displayImages(images) {
    result.innerHTML = "";

    if (images.length === 0) {
        result.innerHTML = `<p class="text-center text-gray-600">No se encontraron resultados.</p>`;
        return;
    }

    images.forEach((image) => {
        const imageCard = document.createElement("div");
        imageCard.classList.add("bg-white", "rounded-lg", "shadow-md", "overflow-hidden");

        imageCard.innerHTML = `
            <div class="h-48 w-full">
            <img src="${image.webformatURL}" alt="${image.tags}" class="w-full h-full object-cover">
            </div>
        `;

        result.appendChild(imageCard);
    });
}
