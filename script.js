// ========================================
// CRYMSON GAMING PLATFORM - Enhanced Animations
// ========================================

// API Base URL
const API_BASE = '/api';

// Animation configuration
const ANIMATION_CONFIG = {
    duration: 600,
    stagger: 50,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
};

// ========================================
// ENHANCED ANIMATION UTILITIES
// ========================================
const Animations = {
    // Smooth easing functions
    easeInOut: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    easeOut: (t) => t * (2 - t),
    easeIn: (t) => t * t,
    
    // Animate element with custom properties
    animate(element, props, duration = 600) {
        return new Promise((resolve) => {
            const start = {};
            const change = {};
            const propertyMap = {
                opacity: 'opacity',
                translateY: 'transform',
                translateX: 'transform',
                scale: 'transform',
                rotateY: 'transform',
                transform: 'transform'
            };
            
            Object.keys(props).forEach(key => {
                if (key === 'opacity') {
                    start[key] = parseFloat(getComputedStyle(element).opacity) || 0;
                } else if (key === 'transform') {
                    start[key] = 1;
                } else {
                    start[key] = 0;
                }
                change[key] = props[key] - start[key];
            });
            
            const startTime = performance.now();
            
            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = this.easeInOut(progress);
                
                let transform = '';
                let opacity = element.style.opacity;
                
                Object.keys(props).forEach(key => {
                    const value = start[key] + change[key] * eased;
                    
                    if (key === 'opacity') {
                        opacity = value;
                    } else if (key === 'translateY') {
                        transform += ` translateY(${value}px)`;
                    } else if (key === 'translateX') {
                        transform += ` translateX(${value}px)`;
                    } else if (key === 'scale') {
                        transform += ` scale(${value})`;
                    } else if (key === 'rotateY') {
                        transform += ` rotateY(${value}deg)`;
                    } else if (key === 'transform') {
                        transform = `scale(${value})`;
                    }
                });
                
                if (opacity !== undefined) element.style.opacity = opacity;
                if (transform) element.style.transform = transform;
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    resolve();
                }
            };
            
            requestAnimationFrame(animate);
        });
    },
    
    // Stagger animation for multiple elements
    stagger(elements, animationFn, delay = 50) {
        elements.forEach((el, index) => {
            setTimeout(() => animationFn(el, index), index * delay);
        });
    }
};

// ========================================
// INITIALIZATION
// ========================================
function initSite() {
    // Enhanced page load animation
    animatePageLoad();
    
    // Load games from API
    loadGames();
    
    // Load stats
    loadStats();
    
    // Start online user updates
    startOnlineUpdates();
    
    // Initialize UI features with enhanced animations
    initSmoothScrolling();
    initNavbarScroll();
    initActiveNavLink();
    initEnhancedFadeIn();
    initStatsObserver();
    initLoadMore();
    initParallax();
    initHoverEffects();
    initGradientAnimations();
    initParticleEffects();
    
    console.log('🎮 Crymson Gaming Platform initialized with enhanced animations');
}

// ========================================
// ENHANCED PAGE LOAD ANIMATION
// ========================================
function animatePageLoad() {
    document.body.style.opacity = '0';
    document.body.style.transform = 'scale(0.98)';
    
    requestAnimationFrame(() => {
        Animations.animate(document.body, {
            opacity: 1,
            transform: 1
        }, 800).then(() => {
            document.body.style.transform = '';
        });
    });
}

// ========================================
// GAMES LOADING WITH ENHANCED ANIMATIONS
// ========================================
let currentPage = 1;
let isLoadingGames = false;
let totalGamesLoaded = 0;

async function loadGames(append = false) {
    if (isLoadingGames) return;
    isLoadingGames = true;
    
    const gamesGrid = document.getElementById('games-grid');
    const loadMoreBtn = document.getElementById('load-more-games');
    
    if (!append) {
        currentPage = 1;
        totalGamesLoaded = 0;
    }
    
    try {
        const response = await fetch(`${API_BASE}/games?page=${currentPage}&limit=8`);
        const data = await response.json();
        
        if (!append) {
            gamesGrid.innerHTML = '';
        } else {
            gamesGrid.querySelectorAll('.skeleton').forEach(el => el.remove());
        }
        
        if (data.games && data.games.length > 0) {
            const cards = [];
            data.games.forEach((game, index) => {
                const gameNumber = totalGamesLoaded + index + 1;
                const card = createGameCard(game, gameNumber);
                gamesGrid.appendChild(card);
                cards.push(card);
            });
            
            totalGamesLoaded += data.games.length;
            updateGamesCounter(data.shown, data.total);
            
            // Enhanced stagger animation
            animateGameCards(cards);
        }
        
        if (loadMoreBtn) {
            loadMoreBtn.style.display = data.has_more ? 'inline-flex' : 'none';
        }
        
    } catch (error) {
        console.error('Error loading games:', error);
        gamesGrid.innerHTML = '<p class="error-message">Unable to load games. Please try again later.</p>';
    }
    
    isLoadingGames = false;
}

function createGameCard(game, number) {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px) scale(0.95)';
    card.style.transition = 'none';
    
    const imageUrl = game.image || `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="150"%3E%3Crect fill="%231f1f1f" width="300" height="150"/%3E%3Ctext fill="%233b82f6" font-family="sans-serif" font-size="40" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3E${number}%3C/text%3E%3C/svg%3E`;
    
    card.innerHTML = `
        <div class="game-image-container">
            <span class="game-number">#${number}</span>
            <img class="game-image" src="${imageUrl}" alt="${game.name}" loading="lazy" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22150%22%3E%3Crect fill=%22%231f1f1f%22 width=%22300%22 height=%22150%22/%3E%3Ctext fill=%22%233b82f6%22 font-family=%22sans-serif%22 font-size=%2240%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3E${number}%3C/text%3E%3C/svg%3E'">
        </div>
        <div class="game-info">
            <h3 class="game-title">${game.name}</h3>
            <div class="game-meta">
                <span class="game-available">✓ Available with Crymson</span>
            </div>
        </div>
    `;
    
    // Enhanced hover effects
    card.addEventListener('mouseenter', function() {
        Animations.animate(this, {
            transform: 1.05,
            rotateY: 5
        }, 300);
    });
    
    card.addEventListener('mouseleave', function() {
        Animations.animate(this, {
            transform: 1,
            rotateY: 0
        }, 300);
    });
    
    card.addEventListener('click', () => {
        document.getElementById('buy').scrollIntoView({ behavior: 'smooth' });
    });
    
    return card;
}

function animateGameCards(cards) {
    Animations.stagger(cards, (card, index) => {
        requestAnimationFrame(() => {
            Animations.animate(card, {
                opacity: 1,
                translateY: 0,
                scale: 1
            }, 600).then(() => {
                card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });
        });
    }, 80);
}

function updateGamesCounter(shown, total) {
    const shownEl = document.getElementById('games-shown');
    const totalEl = document.getElementById('games-total');
    const countEl = document.getElementById('total-games-count');
    
    if (shownEl) animateNumber(shownEl, shown, 500);
    if (totalEl) totalEl.textContent = total;
    if (countEl) countEl.textContent = total + '+';
}

// ========================================
// ENHANCED STATS ANIMATIONS
// ========================================
async function loadStats() {
    try {
        const response = await fetch(`${API_BASE}/stats`);
        const data = await response.json();
        
        const activePlayersEl = document.getElementById('active-players');
        if (activePlayersEl) {
            animateNumber(activePlayersEl, data.total_players, 2000);
        }
        
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

async function loadOnlineUsers() {
    try {
        const response = await fetch(`${API_BASE}/online`);
        const data = await response.json();
        
        const onlineEl = document.getElementById('online-users');
        if (onlineEl) {
            animateNumber(onlineEl, data.online, 800);
        }
        
    } catch (error) {
        console.error('Error loading online users:', error);
    }
}

function animateNumber(element, target, duration = 2000) {
    const start = parseFloat(element.textContent) || 0;
    const increment = (target - start) / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return Math.floor(num / 1000) + 'K';
    }
    return num.toString();
}

// ========================================
// ENHANCED FADE IN ANIMATIONS
// ========================================
function initEnhancedFadeIn() {
    const fadeElements = document.querySelectorAll('.feature-card, .faq-item, .about-card, .stat-card, .pricing-card-large');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.style.opacity = '0';
                element.style.transform = 'translateY(40px) scale(0.95)';
                
                requestAnimationFrame(() => {
                    Animations.animate(element, {
                        opacity: 1,
                        translateY: 0,
                        scale: 1
                    }, 800).then(() => {
                        element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                    });
                });
                
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px) scale(0.95)';
        observer.observe(el);
    });
}

// ========================================
// STATS SECTION OBSERVER
// ========================================
function initStatsObserver() {
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number[data-target]');
                Animations.stagger(Array.from(statNumbers), (stat, index) => {
                    if (!stat.classList.contains('animated')) {
                        stat.classList.add('animated');
                        const target = parseInt(stat.getAttribute('data-target'));
                        animateStatNumber(stat, target, 2000 + index * 200);
                    }
                }, 150);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
}

function animateStatNumber(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatLargeNumber(target);
            clearInterval(timer);
            
            // Pulse animation on complete
            element.style.transform = 'scale(1.2)';
            setTimeout(() => {
                element.style.transition = 'transform 0.3s ease';
                element.style.transform = 'scale(1)';
            }, 100);
        } else {
            element.textContent = formatLargeNumber(Math.floor(current));
        }
    }, 16);
}

function formatLargeNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K';
    }
    return num.toLocaleString();
}

// ========================================
// ENHANCED SMOOTH SCROLLING
// ========================================
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;
                
                smoothScrollTo(targetPosition, 1000);
            }
        });
    });
}

function smoothScrollTo(target, duration) {
    const start = window.pageYOffset;
    const distance = target - start;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = Animations.easeInOut(progress);
        
        window.scrollTo(0, start + distance * ease);
        
        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
}

// ========================================
// ENHANCED NAVBAR SCROLL
// ========================================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.8)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = 'none';
        }
        
        // Hide/show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
    
    navbar.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
}

// ========================================
// ACTIVE NAV LINK
// ========================================
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const navHeight = document.querySelector('.navbar').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
                // Animate active link
                link.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    link.style.transform = '';
                }, 200);
            }
        });
    }, { passive: true });
}

// ========================================
// ENHANCED HOVER EFFECTS
// ========================================
function initHoverEffects() {
    // Buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Cards
    document.querySelectorAll('.feature-card, .pricing-card-large, .faq-item').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
}

// ========================================
// GRADIENT ANIMATIONS
// ========================================
function initGradientAnimations() {
    const gradientElements = document.querySelectorAll('.hero-bg, .pricing-glow');
    
    gradientElements.forEach(el => {
        let angle = 0;
        setInterval(() => {
            angle = (angle + 0.5) % 360;
            el.style.background = `radial-gradient(ellipse at ${50 + Math.sin(angle * Math.PI / 180) * 10}% ${50 + Math.cos(angle * Math.PI / 180) * 10}%, rgba(59, 130, 246, 0.15) 0%, transparent 70%)`;
        }, 50);
    });
}

// ========================================
// PARTICLE EFFECTS
// ========================================
function initParticleEffects() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.3';
    canvas.style.zIndex = '1';
    hero.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
    
    const particles = [];
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.5 + 0.2
        });
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
            ctx.fill();
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
    
    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    });
}

// ========================================
// ENHANCED PARALLAX
// ========================================
function initParallax() {
    const heroBg = document.querySelector('.hero-bg');
    if (!heroBg) return;
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                if (scrolled < window.innerHeight) {
                    const rate = scrolled * 0.3;
                    heroBg.style.transform = `translateY(${rate}px) scale(${1 + scrolled * 0.0001})`;
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// ========================================
// LOAD MORE GAMES
// ========================================
function initLoadMore() {
    const loadMoreBtn = document.getElementById('load-more-games');
    if (!loadMoreBtn) return;
    
    loadMoreBtn.addEventListener('click', () => {
        loadMoreBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            loadMoreBtn.style.transform = '';
            currentPage++;
            loadGames(true);
        }, 150);
    });
}

// ========================================
// ONLINE UPDATES
// ========================================
function startOnlineUpdates() {
    loadOnlineUsers();
    setInterval(loadOnlineUsers, 30000);
}

// ========================================
// CHECKOUT BUTTON
// ========================================
function initCheckoutButton() {
    // Checkout button now goes to /payment page
}

// ========================================
// LOGIN FUNCTIONALITY
// ========================================
function initLogin() {
    const loginBtn = document.getElementById('login-btn');
    const loginModal = document.getElementById('login-modal');
    const loginForm = document.getElementById('login-form');
    const loginClose = document.querySelector('.login-close');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            loginModal.classList.add('show');
        });
    }
    
    if (loginClose) {
        loginClose.addEventListener('click', closeLoginModal);
    }
    
    if (loginModal) {
        loginModal.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                closeLoginModal();
            }
        });
    }
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            // Simulate login (replace with actual API call)
            console.log('Login attempt:', email);
            
            // Store login state
            localStorage.setItem('crymson_logged_in', 'true');
            localStorage.setItem('crymson_user_email', email);
            
            // Update UI
            if (loginBtn) {
                loginBtn.textContent = email.split('@')[0];
                loginBtn.style.background = 'var(--gradient-primary)';
            }
            
            closeLoginModal();
            
            // Show success message
            showNotification('Successfully signed in!', 'success');
        });
    }
    
    // Check if already logged in
    if (localStorage.getItem('crymson_logged_in') === 'true') {
        const email = localStorage.getItem('crymson_user_email');
        if (email && loginBtn) {
            loginBtn.textContent = email.split('@')[0];
            loginBtn.style.background = 'var(--gradient-primary)';
        }
    }
}

function closeLoginModal() {
    const loginModal = document.getElementById('login-modal');
    if (loginModal) {
        loginModal.classList.remove('show');
    }
}

// ========================================
// THEME CHANGER
// ========================================
function initThemeChanger() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    // Load saved theme
    const savedTheme = localStorage.getItem('crymson_theme') || 'dark';
    applyTheme(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('crymson_theme', newTheme);
    });
}

function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    const themeToggle = document.getElementById('theme-toggle');
    
    if (theme === 'light') {
        document.documentElement.style.setProperty('--bg-darkest', '#ffffff');
        document.documentElement.style.setProperty('--bg-dark', '#f5f5f5');
        document.documentElement.style.setProperty('--bg-card', '#ffffff');
        document.documentElement.style.setProperty('--bg-elevated', '#f9f9f9');
        document.documentElement.style.setProperty('--text-primary', '#000000');
        document.documentElement.style.setProperty('--text-secondary', '#4a4a4a');
        document.documentElement.style.setProperty('--text-muted', '#737373');
        document.documentElement.style.setProperty('--border', '#e5e5e5');
        if (themeToggle) themeToggle.textContent = '🌙';
    } else {
        document.documentElement.style.setProperty('--bg-darkest', '#000000');
        document.documentElement.style.setProperty('--bg-dark', '#050505');
        document.documentElement.style.setProperty('--bg-card', '#0a0a0a');
        document.documentElement.style.setProperty('--bg-elevated', '#161616');
        document.documentElement.style.setProperty('--text-primary', '#ffffff');
        document.documentElement.style.setProperty('--text-secondary', '#a3a3a3');
        document.documentElement.style.setProperty('--text-muted', '#737373');
        document.documentElement.style.setProperty('--border', '#1a1a1a');
        if (themeToggle) themeToggle.textContent = '🌓';
    }
}

// ========================================
// NOTIFICATION SYSTEM
// ========================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 2rem;
        background: var(--bg-card);
        border: 2px solid var(--primary);
        border-radius: 0.75rem;
        padding: 1rem 1.5rem;
        color: var(--text-primary);
        font-weight: 600;
        z-index: 10001;
        box-shadow: var(--shadow-lg);
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========================================
// INITIALIZE
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initSite();
    initLogin();
    initThemeChanger();
});

// Page load animation
window.addEventListener('load', () => {
    // Additional load animations
    document.querySelectorAll('.hero-title, .hero-subtitle').forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            requestAnimationFrame(() => {
                Animations.animate(el, {
                    opacity: 1,
                    translateY: 0
                }, 800);
            });
        }, index * 200);
    });
});
