/* ============================================
   SKETCH P5.JS - ANIMAÇÃO HEADER
   Otimizado para performance (low impact)
   ============================================ */

let particles = [];
const particleCount = 15;
let sketchInstance;

/**
 * Função de setup do p5.js
 */
function setup() {
    const container = document.getElementById('p5-container');
    if (!container) return;

    const width = container.offsetWidth;
    const height = container.offsetHeight;

    // Criar canvas com dimensões da container
    const canvas = createCanvas(width, height);
    canvas.parent('p5-container');
    canvas.style('display', 'block');

    // Inicializar partículas
    initializeParticles();

    // Redimensionar canvas responsivamente
    window.addEventListener('resize', throttle(resizeSketch, 250));
}

/**
 * Função de desenho do p5.js (executada continuamente)
 */
function draw() {
    clear(); // Transparente
    background(0, 0); // Sem fundo (usa CSS)

    // Desenhar e atualizar partículas
    particles.forEach((particle) => {
        particle.update();
        particle.display();
    });
}

/**
 * Classe de partícula
 */
class Particle {
    constructor(x, y) {
        this.x = x || random(width);
        this.y = y || random(height);
        this.vx = random(-0.5, 0.5);
        this.vy = random(-1, -0.2); // Move para cima
        this.alpha = random(100, 200);
        this.size = random(2, 6);
        this.life = 255;
        this.decay = random(1, 3);
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
        this.alpha = map(this.life, 0, 255, 0, 200);

        // Regenerar se saiu da tela ou morreu
        if (this.life <= 0 || this.y < 0) {
            this.x = random(width);
            this.y = height;
            this.life = 255;
            this.vx = random(-0.5, 0.5);
            this.vy = random(-1, -0.2);
        }
    }

    display() {
        push();
        fill(229, 9, 20, this.alpha); // Cor vermelha do tema
        noStroke();
        ellipse(this.x, this.y, this.size);
        pop();
    }
}

/**
 * Inicializar partículas
 */
function initializeParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

/**
 * Redimensionar canvas (responsivo)
 */
function resizeSketch() {
    const container = document.getElementById('p5-container');
    if (!container) return;

    const newWidth = container.offsetWidth;
    const newHeight = container.offsetHeight;

    if (newWidth > 0 && newHeight > 0) {
        resizeCanvas(newWidth, newHeight);
    }
}

/**
 * Throttle helper (otimização)
 */
function throttle(func, delay) {
    let lastCall = 0;
    return function (...args) {
        const now = new Date().getTime();
        if (now - lastCall >= delay) {
            lastCall = now;
            func.apply(this, args);
        }
    };
}

// Inicializar quando a window carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
} else {
    setup();
}
