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

// 1. MODAL 1: 'No me presiones' (#acercaModal)
// ¡CORREGIDO! Declaración de la variable 'modal' faltante
const modal = document.getElementById('acercaModal'); 
const btn = document.querySelector('.nav-btn[href="#acerca"]'); 
const closeBtnAcerca = modal.querySelector('.close-btn'); // Selector específico para el botón cerrar

// 2. MODAL 2: 'Algo bonito' (#cartaModal)
const cartaModal = document.getElementById('cartaModal');
const cartaBtn = document.querySelector('.nav-btn[href="#favoritos"]'); 
const closeBtnCarta = cartaModal.querySelector('.close-btn');

// --- ASIGNACIÓN DE EVENTOS ---

// Evento para abrir el Modal 1 ('No me presiones')
btn.onclick = function(e) {
  e.preventDefault(); 
  modal.style.display = 'block';
}

// Evento para cerrar el Modal 1 (al hacer clic en la X)
closeBtnAcerca.onclick = function() {
  modal.style.display = 'none';
}

// Evento para abrir el Modal 2 ('Algo bonito')
cartaBtn.onclick = function(e) {
  e.preventDefault();
  cartaModal.style.display = 'block';
}

// Evento para cerrar el Modal 2 (al hacer clic en la X)
closeBtnCarta.onclick = function() {
  cartaModal.style.display = 'none';
}

// Evento para cerrar cualquier modal al hacer clic fuera (CORREGIDO Y CONSOLIDADO)
window.onclick = function(event) {
  // Cierra el Modal 1 si el clic es en el fondo del modal
  if (event.target == modal) {
    modal.style.display = 'none';
  }
  // Cierra el Modal 2 si el clic es en el fondo del modal
  if (event.target == cartaModal) {
    cartaModal.style.display = 'none';
  }
}