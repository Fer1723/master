// La URL de tu API de Flask (debe coincidir con donde se está ejecutando el back-end)
const API_URL = 'https://canciones-solo-para-ti.onrender.com/api/canciones';
const container = document.getElementById('canciones-container');

// URL base para Spotify (debe coincidir con el formato que usa tu data.py)
const SPOTIFY_BASE_URL = 'https://open.spotify.com/track/';

// Función principal para obtener y mostrar las canciones
async function cargarCanciones() {
    try {
        // 1. Obtener los datos del backend
        const response = await fetch(API_URL);
        const canciones = await response.json();

        // 2. Limpiar el mensaje de carga
        container.innerHTML = ''; 

        // 3. Iterar y crear las tarjetas HTML
        canciones.forEach(cancion => {
            const card = document.createElement('div');
            card.className = 'cancion-card'; 

            card.innerHTML = `
                <h3>${cancion.titulo}</h3>
                <p><strong>Artista:</strong> ${cancion.artista}</p>
                <p><strong>Lo que me hace sentir:</strong> ${cancion.pensamiento}</p>
                <div class="links">
                    <a href="${cancion.youtube_url}" target="_blank" class="link-btn youtube-btn">
                        Ver en YouTube
                    </a>
                    <a href="${SPOTIFY_BASE_URL}${cancion.spotify_id}" target="_blank" class="link-btn spotify-btn">
                        Escuchar en Spotify
                    </a>
                </div>
            `;
            container.appendChild(card);
        });

    } catch (error) {
        // Manejo de errores si el backend no está corriendo
        console.error("Error al cargar las canciones:", error);
        container.innerHTML = '<h2>🚨 Error al cargar la aplicación, intentelo mas tarde</h2>';
    }
}

// Iniciar la carga de datos al cargar la página
cargarCanciones();

// Selecciona el botón 'No me presiones' usando el atributo href="#acerca"
const btn = document.querySelector('.nav-btn[href="#acerca"]'); 

// Selecciona el botón de cerrar 'X'
const span = document.getElementsByClassName('close-btn')[0];

// 2. Función para abrir el modal (al hacer clic en el botón)
btn.onclick = function(e) {
  e.preventDefault(); // Evita que el navegador salte a la ancla #acerca
  modal.style.display = 'block';
}

// 3. Función para cerrar el modal (al hacer clic en la X)
span.onclick = function() {
  modal.style.display = 'none';
}

// 4. Función para cerrar el modal (al hacer clic fuera de él)
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}

const cartaModal = document.getElementById('cartaModal');
const cartaBtn = document.querySelector('.nav-btn[href="#favoritos"]'); // Selecciona el botón 'Algo bonito'
const cartaCloseSpan = cartaModal.querySelector('.close-btn');

// 2. Función para abrir el modal de la Carta
cartaBtn.onclick = function(e) {
  e.preventDefault(); // Evita que el navegador salte a la ancla
  cartaModal.style.display = 'block';
}

// 3. Función para cerrar el modal de la Carta (al hacer clic en la X)
cartaCloseSpan.onclick = function() {
  cartaModal.style.display = 'none';
}

// Modificar la función window.onclick para que también cierre el nuevo modal
window.onclick = function(event) {
  if (event.target == modal || event.target == cartaModal) {
    modal.style.display = 'none';
    cartaModal.style.display = 'none'; // Cierra también el modal de la carta
  }
}