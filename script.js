// Menu hamburguesa
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Cerrar menu al hacer click en un link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth scroll para anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Efecto de revelado al scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animación
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.process-card, .germinario-card, .cta-card, .curso-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Círculos integrados en imágenes
    setTimeout(agregarCirculosIntegrados, 500);
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 246, 240, 0.98)';
        header.style.backdropFilter = 'blur(20px)';
    } else {
        header.style.background = 'rgba(255, 246, 240, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    }
});

// ===== CÍRCULOS INTEGRADOS EN IMÁGENES =====
function agregarCirculosIntegrados() {
    console.log('🎨 Buscando contenedores de imágenes...');
    
    // Contenedores específicos donde van los círculos
    const contenedores = document.querySelectorAll('.image-container, .hero-visual, .cta-image, .historia-visual, .curso-imagen, .visual-container');
    
    console.log(`📷 Encontrados ${contenedores.length} contenedores`);
    
    contenedores.forEach((contenedor, index) => {
        // Verificar que tenga una imagen
        const img = contenedor.querySelector('img');
        if (!img) {
            console.log(`❌ Contenedor ${index} no tiene imagen`);
            return;
        }
        
        // Esperar a que la imagen cargue
        if (img.complete) {
            crearCirculosEnContenedor(contenedor, index);
        } else {
            img.addEventListener('load', () => {
                crearCirculosEnContenedor(contenedor, index);
            });
        }
    });
}

function crearCirculosEnContenedor(contenedor, index) {
    console.log(`✨ Creando círculos en contenedor ${index}`);
    
    // Limpiar círculos existentes
    const circulosExistentes = contenedor.querySelectorAll('.circulo-formahub');
    circulosExistentes.forEach(circulo => circulo.remove());
    
    // Círculos de FormaHub - integrados y sutiles
    const circulos = [
        {
            color: 'rgba(229, 52, 4, 0.18)',
            size: 70,
            position: { top: '20%', left: '8%' },
            animation: 'flotarSuave1 20s infinite ease-in-out'
        },
        {
            color: 'rgba(154, 170, 25, 0.15)',
            size: 50,
            position: { bottom: '25%', right: '10%' },
            animation: 'flotarSuave2 25s infinite ease-in-out 7s'
        },
        {
            color: 'rgba(64, 79, 84, 0.12)',
            size: 60,
            position: { top: '60%', left: '5%' },
            animation: 'flotarSuave3 30s infinite ease-in-out 12s'
        }
    ];
    
    circulos.forEach((circulo, i) => {
        const circleEl = document.createElement('div');
        circleEl.className = 'circulo-formahub';
        
        circleEl.style.cssText = `
            position: absolute;
            width: ${circulo.size}px;
            height: ${circulo.size}px;
            background: ${circulo.color};
            border-radius: 50%;
            z-index: 2;
            animation: ${circulo.animation};
            pointer-events: none;
            opacity: 0.5;
            mix-blend-mode: multiply;
            filter: blur(0.3px);
        `;
        
        // Posicionamiento dentro del contenedor
        Object.assign(circleEl.style, circulo.position);
        
        // Configurar el contenedor
        contenedor.style.position = 'relative';
        contenedor.style.overflow = 'hidden';
        
        contenedor.appendChild(circleEl);
    });
    
    console.log(`✅ ${circulos.length} círculos agregados al contenedor ${index}`);
}

// Inyectar estilos de animación
const estilosAnimaciones = `
    @keyframes flotarSuave1 {
        0%, 100% { 
            transform: translate(0, 0) scale(1) rotate(0deg);
        }
        25% { 
            transform: translate(12px, -8px) scale(1.08) rotate(90deg);
        }
        50% { 
            transform: translate(-6px, 10px) scale(0.95) rotate(180deg);
        }
        75% { 
            transform: translate(8px, 6px) scale(1.03) rotate(270deg);
        }
    }
    
    @keyframes flotarSuave2 {
        0%, 100% { 
            transform: translate(0, 0) scale(1);
        }
        33% { 
            transform: translate(-10px, 8px) scale(1.1);
        }
        66% { 
            transform: translate(5px, -6px) scale(0.92);
        }
    }
    
    @keyframes flotarSuave3 {
        0%, 100% { 
            transform: translate(0, 0) rotate(0deg);
        }
        50% { 
            transform: translate(8px, -5px) rotate(180deg) scale(1.05);
        }
    }
    
    .circulo-formahub {
        animation-timing-function: ease-in-out;
        transition: opacity 0.3s ease;
    }
    
    .circulo-formahub:hover {
        opacity: 0.7;
    }
    
    /* Asegurar que los contenedores tengan posición relativa */
    .image-container,
    .hero-visual,
    .cta-image,
    .historia-visual,
    .curso-imagen,
    .visual-container {
        position: relative !important;
        overflow: hidden !important;
    }
`;

// Agregar estilos al documento
if (!document.getElementById('estilos-formahub')) {
    const styleEl = document.createElement('style');
    styleEl.id = 'estilos-formahub';
    styleEl.textContent = estilosAnimaciones;
    document.head.appendChild(styleEl);
}

// Reintentar después de que todo cargue
window.addEventListener('load', () => {
    setTimeout(agregarCirculosIntegrados, 1000);
});