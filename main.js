// ===================================
// GSAP ANIMATIONS & INTERACTIONS
// ===================================

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class when scrolling down
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===================================
// MOBILE HAMBURGER MENU
// ===================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navLinkItems = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = hamburger.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking on a link
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===================================
// ACTIVE NAV LINK ON SCROLL
// ===================================
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinkItems.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// HERO SECTION ANIMATIONS (GSAP)
// ===================================

// Create a timeline for hero animations
const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

// Set initial states for animation (hidden)
gsap.set('.navbar', { y: -100, opacity: 0 });
gsap.set('.intro-text', { y: 30, opacity: 0 });
gsap.set('.hero-headline .line', { y: 50, opacity: 0 });
gsap.set('.hero-description', { y: 30, opacity: 0 });
gsap.set('.btn', { scale: 0.8, opacity: 0 });
gsap.set('.social-links-mobile', { y: 20, opacity: 0 });
gsap.set('.hero-image', { x: 100, opacity: 0 });
gsap.set('.social-links-desktop a', { x: -50, opacity: 0 });

// Animate navbar on load
heroTimeline.to('.navbar', {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: 'power2.out'
});

// Animate intro text
heroTimeline.to('.intro-text', {
    y: 0,
    opacity: 1,
    duration: 0.8
}, '-=0.5');

// Animate headline lines with stagger
heroTimeline.to('.hero-headline .line', {
    y: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.2
}, '-=0.4');

// Animate description
heroTimeline.to('.hero-description', {
    y: 0,
    opacity: 1,
    duration: 0.8
}, '-=0.5');

// Animate buttons with pop effect
heroTimeline.to('.btn', {
    scale: 1,
    opacity: 1,
    duration: 0.6,
    stagger: 0.15,
    ease: 'back.out(1.7)'
}, '-=0.4');

// Animate mobile social links
heroTimeline.to('.social-links-mobile', {
    y: 0,
    opacity: 1,
    duration: 0.6
}, '-=0.3');

// Animate hero image
heroTimeline.to('.hero-image', {
    x: 0,
    opacity: 1,
    duration: 1.2,
    ease: 'power2.out'
}, '-=1.5');

// Animate desktop social links
heroTimeline.to('.social-links-desktop a', {
    x: 0,
    opacity: 1,
    duration: 0.6,
    stagger: 0.1
}, '-=1');

// ===================================
// FLOATING ANIMATION FOR HERO IMAGE
// ===================================
gsap.to('.hero-image', {
    y: -20,
    duration: 2.5,
    ease: 'power1.inOut',
    yoyo: true,
    repeat: -1
});

// Subtle rotation animation
gsap.to('.hero-image', {
    rotation: 2,
    duration: 3,
    ease: 'power1.inOut',
    yoyo: true,
    repeat: -1
});

// ===================================
// MOUSE PARALLAX EFFECT ON HERO IMAGE
// ===================================
const heroImage = document.getElementById('heroImage');
const heroSection = document.querySelector('.hero');

heroSection.addEventListener('mousemove', (e) => {
    // Only apply on desktop
    if (window.innerWidth > 768) {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        // Calculate movement based on mouse position
        const xMove = (clientX - innerWidth / 2) / innerWidth * 30;
        const yMove = (clientY - innerHeight / 2) / innerHeight * 30;
        
        // Apply smooth parallax movement
        gsap.to(heroImage, {
            x: xMove,
            y: yMove,
            duration: 0.5,
            ease: 'power2.out'
        });
    }
});

// Reset position when mouse leaves
heroSection.addEventListener('mouseleave', () => {
    if (window.innerWidth > 768) {
        gsap.to(heroImage, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'power2.out'
        });
    }
});

// ===================================
// BUTTON MAGNETIC EFFECT
// ===================================
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        gsap.to(this, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    button.addEventListener('mouseleave', function() {
        gsap.to(this, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    // Magnetic effect on mouse move
    button.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(this, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    button.addEventListener('mouseleave', function() {
        gsap.to(this, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.3)'
        });
    });
});

// ===================================
// SCROLL REVEAL ANIMATIONS
// ===================================

// Animate sections on scroll
gsap.utils.toArray('section:not(.hero)').forEach(section => {
    gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
            toggleActions: 'play none none reverse'
        }
    });
});

// ===================================
// PARTICLE ANIMATION ENHANCEMENT
// ===================================
const particles = document.querySelectorAll('.particle');

particles.forEach((particle, index) => {
    // Random size variation
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Add pulsing animation
    gsap.to(particle, {
        opacity: Math.random() * 0.5 + 0.2,
        duration: Math.random() * 2 + 1,
        yoyo: true,
        repeat: -1,
        ease: 'power1.inOut'
    });
});

// ===================================
// IMAGE GLOW PULSE ANIMATION
// ===================================
gsap.to('.image-glow', {
    opacity: 0.8,
    scale: 1.1,
    duration: 3,
    ease: 'power1.inOut',
    yoyo: true,
    repeat: -1
});

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll listeners
const optimizedScroll = debounce(() => {
    updateActiveLink();
}, 10);

window.addEventListener('scroll', optimizedScroll);

// ===================================
// RESPONSIVE ADJUSTMENTS
// ===================================
function handleResize() {
    // Reset animations on resize
    if (window.innerWidth <= 768) {
        // Mobile adjustments
        gsap.set('.hero-image', { x: 0, y: 0 });
    }
}

window.addEventListener('resize', debounce(handleResize, 250));

// ===================================
// ACCESSIBILITY ENHANCEMENTS
// ===================================

// Pause animations on reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.globalTimeline.timeScale(0);
}

// Keyboard navigation for buttons
buttons.forEach(button => {
    button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            button.click();
        }
    });
});

// ===================================
// ABOUT SECTION - TAB SWITCHING
// ===================================
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
        
        // GSAP animation for tab content - ensure opacity goes to 1
        gsap.fromTo(`#${targetTab}`, 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
        );
        
        // Animate skill bars if Skills tab is clicked
        if (targetTab === 'skills') {
            animateSkillBars();
        }
        
        // Animate stats if About Me tab is clicked
        if (targetTab === 'about-me') {
            animateStats();
        }
    });
});

// ===================================
// ABOUT SECTION - GSAP ANIMATIONS
// ===================================

// Set initial states for about section elements
gsap.set('.about-image', { x: -100, opacity: 0 });
gsap.set('.about-decoration', { scale: 0, rotation: -45, opacity: 0 });
gsap.set('.about .section-title', { y: 30, opacity: 0 });
gsap.set('.about .title-underline', { width: 0 });
gsap.set('.tab-btn', { scale: 0, opacity: 0 });
gsap.set('#about-me.tab-content.active', { opacity: 0, y: 30 });

// Animate about section on scroll
ScrollTrigger.create({
    trigger: '.about',
    start: 'top 70%',
    onEnter: () => {
        // Animate image
        gsap.to('.about-image', {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out'
        });
        
        // Animate decoration
        gsap.to('.about-decoration', {
            scale: 1,
            rotation: 0,
            opacity: 0.3,
            duration: 1.2,
            ease: 'back.out(1.7)',
            delay: 0.3
        });
        
        // Animate section title
        gsap.to('.about .section-title', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.2
        });
        
        // Animate title underline
        gsap.to('.about .title-underline', {
            width: 80,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.5
        });
        
        // Animate tab buttons
        gsap.to('.tab-btn', {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            delay: 0.6
        });
        
        // Animate initial tab content
        gsap.to('#about-me.tab-content.active', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.9
        });
        
        // Animate stats on initial load
        setTimeout(() => {
            animateStats();
        }, 1200);
    }
});

// ===================================
// FLOATING ANIMATION FOR ABOUT IMAGE
// ===================================
gsap.to('.about-image', {
    y: -15,
    duration: 2.5,
    ease: 'power1.inOut',
    yoyo: true,
    repeat: -1,
    delay: 1
});

// Rotate decoration
gsap.to('.about-decoration', {
    rotation: 360,
    duration: 20,
    ease: 'none',
    repeat: -1
});

// Pulse glow effect
gsap.to('.about-image-glow', {
    opacity: 0.7,
    scale: 1.2,
    duration: 3,
    ease: 'power1.inOut',
    yoyo: true,
    repeat: -1
});

// ===================================
// ANIMATE SKILL BARS
// ===================================
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        gsap.to(bar, {
            width: `${progress}%`,
            duration: 1.5,
            ease: 'power3.out',
            delay: 0.2
        });
    });
    
    // Animate skill tags
    gsap.from('.skill-tag', {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: 'back.out(1.7)',
        delay: 0.3
    });
}

// ===================================
// ANIMATE STATS COUNTER
// ===================================
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const text = stat.textContent;
        const number = parseInt(text);
        
        if (!isNaN(number)) {
            gsap.from(stat, {
                textContent: 0,
                duration: 2,
                ease: 'power1.out',
                snap: { textContent: 1 },
                onUpdate: function() {
                    stat.textContent = Math.ceil(this.targets()[0].textContent) + text.replace(/[0-9]/g, '');
                }
            });
        }
    });
    
    // Animate stat items
    gsap.from('.stat-item', {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(1.7)'
    });
}

// ===================================
// CONTACT ITEMS ANIMATION
// ===================================
ScrollTrigger.create({
    trigger: '.contact-info',
    start: 'top 80%',
    onEnter: () => {
        gsap.from('.contact-item', {
            x: -50,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out'
        });
    }
});

// ===================================
// TAB BUTTON MAGNETIC EFFECT
// ===================================
tabButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        if (!this.classList.contains('active')) {
            gsap.to(this, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    });
    
    button.addEventListener('mouseleave', function() {
        if (!this.classList.contains('active')) {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    });
});

// ===================================
// SERVICES SECTION - GSAP ANIMATIONS
// ===================================

// Set initial states for services section
const serviceCards = document.querySelectorAll('.service-card');
const servicesHeader = document.querySelector('.services-header');

// Services header animation
ScrollTrigger.create({
    trigger: '.services',
    start: 'top 70%',
    onEnter: () => {
        // Animate header elements
        gsap.from('.services-header .section-title', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
        
        gsap.from('.services-header .title-underline', {
            width: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.2
        });
        
        gsap.from('.services-subtitle', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.4
        });
        
        // Animate service cards with stagger
        gsap.to('.service-card', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 0.5
        });
    }
});

// Service cards hover animations
serviceCards.forEach((card, index) => {
    const icon = card.querySelector('.service-icon');
    const glow = card.querySelector('.service-glow');
    const title = card.querySelector('.service-title');
    
    // Mouse enter animation
    card.addEventListener('mouseenter', () => {
        // Card lift and glow
        gsap.to(card, {
            y: -10,
            boxShadow: '0 20px 60px rgba(255, 43, 43, 0.3)',
            duration: 0.4,
            ease: 'power2.out'
        });
        
        // Icon scale and glow
        gsap.to(icon, {
            scale: 1.2,
            rotation: 10,
            duration: 0.4,
            ease: 'power2.out'
        });
        
        // Glow effect
        gsap.to(glow, {
            opacity: 0.6,
            scale: 1.2,
            duration: 0.4,
            ease: 'power2.out'
        });
        
        // Title color change
        gsap.to(title, {
            backgroundImage: 'linear-gradient(135deg, #ff2b2b 0%, #ff7a18 50%, #ff006e 100%)',
            webkitBackgroundClip: 'text',
            webkitTextFillColor: 'transparent',
            duration: 0.3
        });
    });
    
    // Mouse leave animation
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            y: 0,
            boxShadow: '0 0 0 rgba(255, 43, 43, 0)',
            duration: 0.4,
            ease: 'power2.out'
        });
        
        gsap.to(icon, {
            scale: 1,
            rotation: 0,
            duration: 0.4,
            ease: 'power2.out'
        });
        
        gsap.to(glow, {
            opacity: 0,
            scale: 1,
            duration: 0.4,
            ease: 'power2.out'
        });
    });
    
    // Continuous floating animation for each card
    gsap.to(card, {
        y: -8,
        duration: 2 + (index * 0.2),
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        delay: index * 0.3
    });
});

// Service icon rotation on hover
const serviceIcons = document.querySelectorAll('.service-icon');
serviceIcons.forEach(icon => {
    icon.parentElement.parentElement.addEventListener('mouseenter', () => {
        gsap.to(icon, {
            rotation: 360,
            duration: 0.6,
            ease: 'power2.out'
        });
    });
});

// ===================================
// PROJECTS SECTION - GSAP ANIMATIONS
// ===================================

// Projects header animation
ScrollTrigger.create({
    trigger: '.projects',
    start: 'top 70%',
    onEnter: () => {
        // Animate header
        gsap.from('.projects-header .section-title', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
        
        gsap.from('.projects-header .title-underline', {
            width: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.2
        });
        
        gsap.from('.projects-subtitle', {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.4
        });
        
        // Animate project cards with staggered fade-up
        gsap.to('.project-card', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 0.5
        });
    }
});

// Project cards hover effects with GSAP
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach((card, index) => {
    const thumbnail = card.querySelector('.project-thumbnail');
    const img = card.querySelector('.project-thumbnail img');
    
    // Magnetic tilt effect on mouse move
    thumbnail.addEventListener('mousemove', (e) => {
        const rect = thumbnail.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / centerY * -8;
        const rotateY = (x - centerX) / centerX * 8;
        
        gsap.to(thumbnail, {
            rotateX: rotateX,
            rotateY: rotateY,
            transformPerspective: 800,
            duration: 0.4,
            ease: 'power2.out'
        });
    });
    
    // Reset on mouse leave
    thumbnail.addEventListener('mouseleave', () => {
        gsap.to(thumbnail, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.6,
            ease: 'power2.out'
        });
    });
    
    // Image parallax on scroll
    gsap.to(img, {
        y: -20,
        ease: 'none',
        scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
        }
    });
});

// Floating animation for project cards
projectCards.forEach((card, index) => {
    gsap.to(card, {
        y: -6,
        duration: 2.5 + (index * 0.2),
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        delay: index * 0.15
    });
});

// ===================================
// TESTIMONIALS CAROUSEL
// ===================================
const testimonialCards = document.querySelectorAll('.testimonial-card');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
const indicators = document.querySelectorAll('.indicator');
let currentIndex = 0;
let autoPlayInterval;

function showTestimonial(index) {
    // Remove active class from all cards
    testimonialCards.forEach((card, i) => {
        card.classList.remove('active', 'prev');
        if (i === index) {
            card.classList.add('active');
        } else if (i === currentIndex) {
            card.classList.add('prev');
        }
    });
    
    // Update indicators
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
    
    currentIndex = index;
}

function nextTestimonial() {
    const newIndex = (currentIndex + 1) % testimonialCards.length;
    showTestimonial(newIndex);
}

function prevTestimonial() {
    const newIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
    showTestimonial(newIndex);
}

// Event listeners for buttons
if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
        nextTestimonial();
        resetAutoPlay();
    });
    
    prevBtn.addEventListener('click', () => {
        prevTestimonial();
        resetAutoPlay();
    });
}

// Event listeners for indicators
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        showTestimonial(index);
        resetAutoPlay();
    });
});

// Auto-play functionality
function startAutoPlay() {
    autoPlayInterval = setInterval(nextTestimonial, 5000); // Change every 5 seconds
}

function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevTestimonial();
        resetAutoPlay();
    } else if (e.key === 'ArrowRight') {
        nextTestimonial();
        resetAutoPlay();
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;
const carousel = document.querySelector('.testimonials-carousel');

if (carousel) {
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next
            nextTestimonial();
        } else {
            // Swipe right - previous
            prevTestimonial();
        }
        resetAutoPlay();
    }
}

// ===================================
// TESTIMONIALS SECTION - GSAP ANIMATIONS
// ===================================
ScrollTrigger.create({
    trigger: '.testimonials',
    start: 'top 70%',
    onEnter: () => {
        // Animate header
        gsap.from('.testimonials-header .section-title', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
        
        gsap.from('.testimonials-header .title-underline', {
            width: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.2
        });
        
        gsap.from('.testimonials-subtitle', {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.4
        });
        
        // Animate carousel container
        gsap.from('.testimonials-carousel', {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            delay: 0.6
        });
        
        // Animate navigation buttons
        gsap.from('.carousel-btn', {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            delay: 0.8
        });
        
        // Animate indicators
        gsap.from('.indicator', {
            scale: 0,
            opacity: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            delay: 1
        });
        
        // Start auto-play after animation
        setTimeout(startAutoPlay, 1500);
    }
});

// ===================================
// TESTIMONIAL CARD HOVER EFFECTS
// ===================================
testimonialCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            boxShadow: '0 30px 80px rgba(255, 43, 43, 0.25)',
            borderColor: 'rgba(255, 43, 43, 0.4)',
            duration: 0.4,
            ease: 'power2.out'
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            boxShadow: 'none',
            borderColor: 'rgba(255, 43, 43, 0.2)',
            duration: 0.4,
            ease: 'power2.out'
        });
    });
});

// ===================================
// CAROUSEL BUTTON MAGNETIC EFFECT
// ===================================
const carouselBtns = document.querySelectorAll('.carousel-btn');

carouselBtns.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        gsap.to(this, {
            scale: 1.15,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    btn.addEventListener('mouseleave', function() {
        gsap.to(this, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// ===================================
// LATEST POSTS SECTION - GSAP ANIMATIONS
// ===================================
ScrollTrigger.create({
    trigger: '.latest-posts',
    start: 'top 70%',
    onEnter: () => {
        // Animate header
        gsap.from('.latest-posts-header .section-title', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
        
        gsap.from('.latest-posts-header .title-underline', {
            width: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.2
        });
        
        gsap.from('.latest-posts-subtitle', {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.4
        });
        
        // Animate post cards with stagger
        gsap.to('.post-card', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 0.5
        });
    }
});

// Post cards floating animation
const postCards = document.querySelectorAll('.post-card');

postCards.forEach((card, index) => {
    // Floating animation for each card
    gsap.to(card, {
        y: -5,
        duration: 2.5 + (index * 0.2),
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        delay: index * 0.15
    });
});

console.log('%c🎨 Portfolio Loaded Successfully! ', 'background: linear-gradient(135deg, #ff2b2b 0%, #ff7a18 50%, #ff006e 100%); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with GSAP & Modern Web Technologies', 'color: #ff7a18; font-size: 12px;');
