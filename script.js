/* ============================================
   CINEMAHUB - JAVASCRIPT OTIMIZADO
   Script modular e acessível para gerenciar filmes
   ============================================ */

/**
 * Dados dos filmes
 * Formato: id, título, ano, gênero, rating, descrição, poster
 */
const movies = [
    {
        id: 1,
        title: "Interstellar",
        year: 2014,
        genre: "ficção",
        rating: 8.6,
        description: "Um grupo de astronautas viaja através de um buraco de minhoca no espaço para garantir a sobrevivência da humanidade.",
        poster: "https://via.placeholder.com/300x450?text=Interstellar"
    },
    {
        id: 2,
        title: "Homem de Ferro",
        year: 2008,
        genre: "acao",
        rating: 7.9,
        description: "Um bilionário constrói uma armadura tecnológica avançada para salvar o mundo.",
        poster: "https://via.placeholder.com/300x450?text=Homem+de+Ferro"
    },
    {
        id: 3,
        title: "À Procura da Felicidade",
        year: 2006,
        genre: "drama",
        rating: 8.2,
        description: "Um homem luta para superar a pobreza e reconstruir sua vida com seu filho.",
        poster: "https://via.placeholder.com/300x450?text=Procura+Felicidade"
    },
    {
        id: 4,
        title: "Forrest Gump",
        year: 1994,
        genre: "drama",
        rating: 8.8,
        description: "A vida de um homem com deficiência intelectual leve que realiza façanhas extraordinárias.",
        poster: "https://via.placeholder.com/300x450?text=Forrest+Gump"
    },
    {
        id: 5,
        title: "Toy Story",
        year: 1995,
        genre: "comedia",
        rating: 8.3,
        description: "Dois brinquedos embarcam em uma aventura para voltarem para casa de seu dono.",
        poster: "https://via.placeholder.com/300x450?text=Toy+Story"
    },
    {
        id: 6,
        title: "Homem-Aranha: Sem Volta para Casa",
        year: 2021,
        genre: "acao",
        rating: 8.0,
        description: "O Homem-Aranha enfrenta ameaças de múltiplos universos enquanto tenta proteger sua identidade.",
        poster: "https://via.placeholder.com/300x450?text=Homem-Aranha"
    },
    {
        id: 7,
        title: "Interestelar",
        year: 2014,
        genre: "ficção",
        rating: 8.7,
        description: "Uma épica jornada através do espaço e do tempo para salvar a humanidade.",
        poster: "https://via.placeholder.com/300x450?text=Interestelar"
    },
    {
        id: 8,
        title: "Se Beber, Não Case!",
        year: 2009,
        genre: "comedia",
        rating: 7.7,
        description: "Três amigos acordam em Las Vegas após uma noite de bebedeira sem lembrança do que aconteceu.",
        poster: "https://via.placeholder.com/300x450?text=Se+Beber"
    },
    {
        id: 9,
        title: "Vingadores: Ultimato",
        year: 2019,
        genre: "acao",
        rating: 8.4,
        description: "Os Vingadores se reúnem para uma última batalha épica contra Thanos.",
        poster: "https://via.placeholder.com/300x450?text=Vengadores"
    },
    {
        id: 10,
        title: "Titanic",
        year: 1997,
        genre: "drama",
        rating: 7.8,
        description: "Um drama de amor e desastre quando o navio Titanic colide com um iceberg.",
        poster: "https://via.placeholder.com/300x450?text=Titanic"
    },
    {
        id: 11,
        title: "A Bela e a Fera",
        year: 2017,
        genre: "ficção",
        rating: 7.1,
        description: "Um conto clássico de amor verdadeiro e redenção entre uma jovem mulher e uma fera encantada.",
        poster: "https://via.placeholder.com/300x450?text=Bela+Fera"
    },
    {
        id: 12,
        title: "Rápidos & Furiosos",
        year: 2009,
        genre: "acao",
        rating: 6.5,
        description: "Pilotos de rua participam de corridas ilegais em carros modificados.",
        poster: "https://via.placeholder.com/300x450?text=Rapidos+Furiosos"
    }
];

/**
 * Estado da aplicação
 */
const appState = {
    currentFilter: 'todos',
    filteredMovies: [...movies]
};

/**
 * DOM Elements
 */
const moviesGrid = document.getElementById('movies-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('movie-modal');
const modalClose = document.querySelector('.modal-close');
const scrollFilmesBtn = document.getElementById('scroll-filmes');

/**
 * Inicializar aplicação
 */
function init() {
    console.log('🎬 CinemaHub carregado');
    renderMovies(movies);
    attachEventListeners();
    lazyLoadImages();
}

/**
 * Renderizar cards de filmes
 * @param {Array} moviesToRender - Array de filmes para renderizar
 */
function renderMovies(moviesToRender) {
    moviesGrid.innerHTML = '';

    if (moviesToRender.length === 0) {
        moviesGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #a0a0a0;">Nenhum filme encontrado.</p>';
        return;
    }

    moviesToRender.forEach((movie) => {
        const card = createMovieCard(movie);
        moviesGrid.appendChild(card);
    });
}

/**
 * Criar um card de filme
 * @param {Object} movie - Objeto do filme
 * @returns {HTMLElement} - Elemento do card
 */
function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.setAttribute('role', 'gridcell');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `${movie.title}, ${movie.year}, nota ${movie.rating}`);

    card.innerHTML = `
        <img 
            src="${movie.poster}" 
            alt="${movie.title} pôster" 
            class="movie-poster"
            loading="lazy"
            decoding="async"
        >
        <div class="movie-info">
            <h3 class="movie-title">${escapeHtml(movie.title)}</h3>
            <p class="movie-year">${movie.year}</p>
            <div class="movie-rating">
                <span>★ ${movie.rating}</span>
            </div>
        </div>
    `;

    // Event listeners
    card.addEventListener('click', () => openModal(movie));
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openModal(movie);
        }
    });

    return card;
}

/**
 * Abrir modal com detalhes do filme
 * @param {Object} movie - Objeto do filme
 */
function openModal(movie) {
    document.getElementById('modal-title').textContent = movie.title;
    document.getElementById('modal-year').textContent = movie.year;
    document.getElementById('modal-genre').textContent = capitalizeGenre(movie.genre);
    document.getElementById('modal-rating').textContent = movie.rating;
    document.getElementById('modal-description').textContent = movie.description;
    document.getElementById('modal-poster').src = movie.poster;
    document.getElementById('modal-poster').alt = `${movie.title} pôster`;

    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Previne scroll

    // Focus no botão de fechar para melhor acessibilidade
    setTimeout(() => modalClose.focus(), 100);
}

/**
 * Fechar modal
 */
function closeModal() {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto'; // Restaura scroll
}

/**
 * Filtrar filmes por gênero
 * @param {String} genre - Gênero para filtrar
 */
function filterMovies(genre) {
    appState.currentFilter = genre;

    if (genre === 'todos') {
        appState.filteredMovies = [...movies];
    } else {
        appState.filteredMovies = movies.filter((movie) => movie.genre === genre);
    }

    renderMovies(appState.filteredMovies);
    updateFilterButtons(genre);
}

/**
 * Atualizar estado dos botões de filtro
 * @param {String} activeFilter - Filtro ativo
 */
function updateFilterButtons(activeFilter) {
    filterButtons.forEach((btn) => {
        const isActive = btn.dataset.filter === activeFilter;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', isActive);
    });
}

/**
 * Lazy loading de imagens (melhora performance)
 */
function lazyLoadImages() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach((img) => imageObserver.observe(img));
    }
}

/**
 * Escape HTML para evitar XSS
 * @param {String} text - Texto para escapar
 * @returns {String} - Texto escapado
 */
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Capitalizar gênero
 * @param {String} genre - Gênero
 * @returns {String} - Gênero capitalizado
 */
function capitalizeGenre(genre) {
    const genreMap = {
        'acao': 'Ação',
        'drama': 'Drama',
        'comedia': 'Comédia',
        'ficção': 'Ficção Científica'
    };
    return genreMap[genre] || genre;
}

/**
 * Anexar event listeners
 */
function attachEventListeners() {
    // Botões de filtro
    filterButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            filterMovies(e.target.dataset.filter);
        });
    });

    // Fechar modal
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Fechar modal com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // Scroll para filmes
    scrollFilmesBtn.addEventListener('click', () => {
        document.getElementById('filmes').scrollIntoView({ behavior: 'smooth' });
    });

    // Ação do modal
    document.getElementById('modal-action').addEventListener('click', () => {
        alert('Funcionalidade de reprodução em desenvolvimento! 🎬');
        closeModal();
    });
}

/**
 * Monitoramento de performance (opcional)
 */
function logPerformance() {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⏱️ Tempo de carregamento: ${pageLoadTime}ms`);
    }
}

// Executar quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Log de performance após carregamento completo
window.addEventListener('load', logPerformance);
