// ========================================
// ENGINEERING LAB - INTERACTIVE SYSTEMS
// ========================================

// Boot sequence completion
setTimeout(() => {
    document.getElementById('boot-screen').style.display = 'none';
    initializeSystems();
}, 3000);

// Initialize all interactive systems
function initializeSystems() {
    animateStats();
    initializeCodeDisplay();
    initializeSmoothScroll();
    initializeNavHighlight();
    observeSections();
}

// ========================================
// STAT COUNTER ANIMATION
// ========================================
function animateStats() {
    const stats = document.querySelectorAll('.stat-value');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target;
            }
        };
        
        setTimeout(updateCounter, 3500);
    });
}

// ========================================
// CODE TYPING ANIMATION
// ========================================
function initializeCodeDisplay() {
    const codeDisplay = document.getElementById('code-display');
    
    const code = `class SystemArchitecture:
    """
    Clean, scalable Python architecture
    following SOLID principles
    """
    
    def __init__(self):
        self.layers = {
            'presentation': APILayer(),
            'business': ServiceLayer(),
            'data': RepositoryLayer(),
        }
        self.security = SecurityMiddleware()
        self.observability = MonitoringSystem()
    
    def handle_request(self, request):
        # Validate input
        validated = self.security.validate(request)
        
        # Process through layers
        result = self.layers['presentation'] \\
            .receive(validated) \\
            .process_via(self.layers['business']) \\
            .persist_via(self.layers['data'])
        
        # Monitor performance
        self.observability.track(result)
        
        return result
    
    def scale(self, load):
        """Handle increased load gracefully"""
        return self.horizontal_scaling(load) \\
            if load > threshold else self.current_state

# Initialize system
system = SystemArchitecture()
system.deploy(environment='production')`;

    let index = 0;
    const speed = 20;
    
    function typeCode() {
        if (index < code.length) {
            codeDisplay.textContent += code.charAt(index);
            index++;
            setTimeout(typeCode, speed);
        }
    }
    
    // Start typing when section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && index === 0) {
                typeCode();
            }
        });
    });
    
    observer.observe(document.getElementById('systems'));
}

// ========================================
// SMOOTH SCROLLING
// ========================================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ========================================
// NAVIGATION HIGHLIGHT
// ========================================
function initializeNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================
function observeSections() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe all cards and sections
    document.querySelectorAll('.lab-card, .experiment-card, .contact-grid').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// ========================================
// TERMINAL CURSOR EFFECT
// ========================================
function createCursorEffect() {
    const cursor = document.createElement('span');
    cursor.className = 'cursor-effect';
    cursor.textContent = '█';
    cursor.style.cssText = `
        color: var(--accent-cyan);
        animation: blink 1s infinite;
        margin-left: 5px;
    `;
    return cursor;
}

// ========================================
// EASTER EGG: KONAMI CODE
// ========================================
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        activateMatrixMode();
    }
});

function activateMatrixMode() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '9999';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = 'PYTHON01AI'.split('');
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    function draw() {
        ctx.fillStyle = 'rgba(10, 14, 39, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00f5ff';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    const interval = setInterval(draw, 33);
    
    setTimeout(() => {
        clearInterval(interval);
        canvas.remove();
    }, 10000);
}

// ========================================
// PERFORMANCE MONITORING
// ========================================
if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.entryType === 'paint') {
                console.log(`${entry.name}: ${entry.startTime}ms`);
            }
        }
    });
    observer.observe({ entryTypes: ['paint'] });
}

// ========================================
// ACCESSIBILITY: KEYBOARD NAVIGATION
// ========================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ========================================
// PREFETCH RESOURCES ON HOVER
// ========================================
document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.addEventListener('mouseenter', function() {
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = this.href;
        document.head.appendChild(prefetchLink);
    }, { once: true });
});

// ========================================
// CONSOLE MESSAGE
// ========================================
console.log(`
%c╔══════════════════════════════════════════════════════════╗
║                                                          ║
║   ENGINEERING LAB - ADITYA NILE                          ║
║                                                          ║
║   Curious about the code? Check out the repo:            ║
║   https://github.com/nileaditya                          ║
║                                                          ║
║   Built with: Python mindset, security focus,            ║
║               clean architecture principles              ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
`, 'color: #00f5ff; font-family: monospace; font-size: 12px;');

console.log('%cLooking for the Konami Code? Try it. 😉', 'color: #a855f7; font-size: 14px;');