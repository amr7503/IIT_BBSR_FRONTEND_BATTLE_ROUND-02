// Main JavaScript File
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initPreloader();
    initNav();
    initHero();
    initProgramCardHover();
    initMagneticButtons();
    initScrollAnimations();
    initVerifyForm();
    initVideoBackground();
    initTextAnimation();
});

// Preloader
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    const progressBar = document.querySelector('.preloader-progress-bar');
    
    if (!preloader) return;
    
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Hide preloader when loading is complete
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 500);
        }
        progressBar.style.width = `${progress}%`;
    }, 100);
}

// Navigation
function initNav() {
    const nav = document.querySelector('.floating-nav');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!nav || !mobileBtn || !navLinks) return;
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    mobileBtn.addEventListener('click', () => {
        mobileBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Hero Section
function initHero() {
    // No specific JS needed for hero section beyond general animations
}

// Program Card Hover Effects
function initProgramCardHover() {
    const programCards = document.querySelectorAll('.program-card');
    
    programCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (centerY - y) / 10;
            const angleY = (x - centerX) / 10;
            
            gsap.to(card, {
                rotationX: angleX,
                rotationY: angleY,
                transformPerspective: 1000,
                transformOrigin: "center center",
                ease: "power2.out",
                duration: 0.5
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                ease: "elastic.out(1, 0.5)",
                duration: 1
            });
        });
    });
}

// Magnetic Buttons
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-magnetic');
    
    buttons.forEach(button => {
        const magneticArea = button.querySelector('.magnetic-area');
        
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const distanceX = x - centerX;
            const distanceY = y - centerY;
            
            gsap.to(button, {
                x: distanceX * 0.2,
                y: distanceY * 0.2,
                duration: 0.5,
                ease: 'power2.out'
            });
            
            gsap.to(magneticArea, {
                x: distanceX * 0.5,
                y: distanceY * 0.5,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.5)'
            });
            
            gsap.to(magneticArea, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate sections on scroll
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });
    
    // Animate hero elements
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroActions = document.querySelector('.hero-actions');
    
    if (heroTitle && heroSubtitle && heroActions) {
        gsap.from([heroTitle, heroSubtitle, heroActions], {
            duration: 1,
            y: 30,
            opacity: 0,
            stagger: 0.2,
            ease: 'power3.out'
        });
    }
    
    // Animate program cards with stagger
    const programCards = document.querySelectorAll('.program-card');
    if (programCards.length > 0) {
        gsap.from(programCards, {
            scrollTrigger: {
                trigger: '.programs-section',
                start: 'top 70%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'back.out(1.2)'
        });
    }
}

// Certificate Verification Form
function initVerifyForm() {
    const verifyForm = document.querySelector('.verify-form');
    const verifyResult = document.querySelector('.verify-result');
    
    if (verifyForm && verifyResult) {
        verifyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const certificateId = document.getElementById('certificate-id').value;
            
            // Show loading state
            verifyResult.innerHTML = `
                <div class="result-icon loading">
                    <i class="fas fa-spinner fa-spin"></i>
                </div>
                <p class="result-message">Verifying certificate...</p>
            `;
            
            // Simulate API call
            setTimeout(() => {
                // This would be replaced with actual API call
                const isValid = Math.random() > 0.5;
                
                if (isValid) {
                    verifyResult.innerHTML = `
                        <div class="result-icon valid">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <p class="result-message">Certificate <strong>${certificateId}</strong> is valid!</p>
                        <div class="result-details">
                            <p>Issued to: John Doe</p>
                            <p>Program: Cybersecurity</p>
                            <p>Date: June 15, 2025</p>
                        </div>
                    `;
                } else {
                    verifyResult.innerHTML = `
                        <div class="result-icon invalid">
                            <i class="fas fa-times-circle"></i>
                        </div>
                        <p class="result-message">Certificate <strong>${certificateId}</strong> could not be verified.</p>
                        <p>Please check the ID and try again.</p>
                    `;
                }
            }, 1500);
        });
    }
}

// Video Background
function initVideoBackground() {
    const videoBg = document.querySelector('.video-background video');
    
    if (videoBg) {
        // Check if mobile device
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
            // Use poster image on mobile for better performance
            const poster = videoBg.getAttribute('poster');
            if (poster) {
                videoBg.parentElement.style.backgroundImage = `url(${poster})`;
                videoBg.parentElement.style.backgroundSize = 'cover';
                videoBg.parentElement.style.backgroundPosition = 'center';
                videoBg.remove();
            }
        } else {
            // Play video on desktop
            videoBg.play().catch(e => {
                console.log('Video autoplay prevented:', e);
                // Fallback to poster image if autoplay is blocked
                const poster = videoBg.getAttribute('poster');
                if (poster) {
                    videoBg.parentElement.style.backgroundImage = `url(${poster})`;
                    videoBg.parentElement.style.backgroundSize = 'cover';
                    videoBg.parentElement.style.backgroundPosition = 'center';
                    videoBg.remove();
                }
            });
        }
    }
}

// Text Animation with Splitting.js
function initTextAnimation() {
    // Check if Splitting.js is loaded
    if (typeof Splitting === 'function') {
        Splitting();
        
        // Animate hero title
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const chars = heroTitle.querySelectorAll('.char');
            
            gsap.from(chars, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.03,
                ease: 'back.out(1.2)',
                delay: 0.2
            });
        }
    }
}