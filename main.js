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
    initThemeSwitcher();
    initProgramComparison();
    initProgramVisualization();
    initFormInteractions();
    initLazyLoading();
    initMotionPreferences();
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

// Theme Switcher
function initThemeSwitcher() {
    const themeBtns = document.querySelectorAll('.theme-btn');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if(localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && prefersDark)) {
        document.documentElement.classList.add('dark-theme');
    }
    
    themeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if(this.classList.contains('light')) {
                document.documentElement.classList.remove('dark-theme');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark');
            }
        });
    });
}

// Program Comparison
function initProgramComparison() {
    const program1Select = document.getElementById('compare-program-1');
    const program2Select = document.getElementById('compare-program-2');
    const comparisonResults = document.querySelector('.comparison-results');
    
    if (!program1Select || !program2Select || !comparisonResults) return;
    
    const programData = {
        cybersecurity: {
            duration: '12 weeks',
            difficulty: 'Advanced',
            skills: ['Ethical Hacking', 'Network Security', 'Pen Testing'],
            projects: 5,
            hours: '20-25/week'
        },
        fullstack: {
            duration: '10 weeks',
            difficulty: 'Intermediate',
            skills: ['React', 'Node.js', 'Database Design'],
            projects: 4,
            hours: '15-20/week'
        },
        datascience: {
            duration: '14 weeks',
            difficulty: 'Advanced',
            skills: ['Machine Learning', 'Data Visualization', 'Statistical Analysis'],
            projects: 6,
            hours: '20-25/week'
        },
        dataanalysis: {
            duration: '8 weeks',
            difficulty: 'Beginner',
            skills: ['SQL', 'Python', 'Business Intelligence'],
            projects: 3,
            hours: '10-15/week'
        }
    };
    
    function updateComparison() {
        const program1 = program1Select.value;
        const program2 = program2Select.value;
        
        if (program1 && program2) {
            const p1 = programData[program1];
            const p2 = programData[program2];
            
            let html = `
                <div class="comparison-grid">
                    <div class="comparison-feature">Feature</div>
                    <div class="comparison-program">${program1.charAt(0).toUpperCase() + program1.slice(1)}</div>
                    <div class="comparison-program">${program2.charAt(0).toUpperCase() + program2.slice(1)}</div>
                    
                    <div class="comparison-feature">Duration</div>
                    <div>${p1.duration}</div>
                    <div>${p2.duration}</div>
                    
                    <div class="comparison-feature">Difficulty</div>
                    <div>${p1.difficulty}</div>
                    <div>${p2.difficulty}</div>
                    
                    <div class="comparison-feature">Key Skills</div>
                    <div><ul>${p1.skills.map(skill => `<li>${skill}</li>`).join('')}</ul></div>
                    <div><ul>${p2.skills.map(skill => `<li>${skill}</li>`).join('')}</ul></div>
                    
                    <div class="comparison-feature">Projects</div>
                    <div>${p1.projects}</div>
                    <div>${p2.projects}</div>
                    
                    <div class="comparison-feature">Time Commitment</div>
                    <div>${p1.hours}</div>
                    <div>${p2.hours}</div>
                </div>
            `;
            
            comparisonResults.innerHTML = html;
        } else {
            comparisonResults.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-exchange-alt"></i>
                    <p>Select two programs to compare</p>
                </div>
            `;
        }
    }
    
    program1Select.addEventListener('change', updateComparison);
    program2Select.addEventListener('change', updateComparison);
    
    // Initialize empty state
    updateComparison();
}

// Program Visualization
function initProgramVisualization() {
    const canvas = document.getElementById('program-3d');
    
    if (!canvas) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        canvas, 
        antialias: true,
        alpha: true
    });
    
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    
    // Create program-specific 3D objects
    const geometry = new THREE.IcosahedronGeometry(2, 1);
    const material = new THREE.MeshPhongMaterial({ 
        color: 0x3a0ca3,
        emissive: 0x4cc9f0,
        specular: 0xffffff,
        shininess: 30,
        wireframe: false 
    });
    
    const programMesh = new THREE.Mesh(geometry, material);
    scene.add(programMesh);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    camera.position.z = 5;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        programMesh.rotation.x += 0.005;
        programMesh.rotation.y += 0.005;
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    });
    
    // Interactive controls
    document.querySelectorAll('.control-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.dataset.action;
            if(action === 'rotate') {
                gsap.to(programMesh.rotation, { 
                    y: programMesh.rotation.y + Math.PI*2, 
                    duration: 3,
                    ease: "power2.inOut"
                });
            } else if(action === 'zoom') {
                gsap.to(camera.position, { 
                    z: camera.position.z === 5 ? 3 : 5, 
                    duration: 1,
                    ease: "power2.inOut"
                });
            }
        });
    });
}

// Form Interactions
function initFormInteractions() {
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        const parent = input.parentElement;
        
        input.addEventListener('focus', function() {
            parent.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if(this.value === '') {
                parent.classList.remove('focused');
            }
        });
        
        // Add floating label effect
        if(input.value !== '') {
            parent.classList.add('focused');
        }
    });
}

// Lazy Loading
function initLazyLoading() {
    const lazyElements = document.querySelectorAll('[data-src], [data-background]');
    
    if (!lazyElements.length) return;
    
    const lazyObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const element = entry.target;
                
                if(element.dataset.src) {
                    element.src = element.dataset.src;
                    element.removeAttribute('data-src');
                }
                
                if(element.dataset.background) {
                    element.style.backgroundImage = `url(${element.dataset.background})`;
                    element.removeAttribute('data-background');
                }
                
                observer.unobserve(element);
            }
        });
    }, { rootMargin: '200px' });
    
    lazyElements.forEach(element => {
        lazyObserver.observe(element);
    });
}

// Reduced Motion Preference
function initMotionPreferences() {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if(motionQuery.matches) {
        gsap.globalTimeline.timeScale(0.5);
        document.documentElement.style.setProperty('--transition', 'all 0.2s ease');
    }
    
    motionQuery.addEventListener('change', () => {
        if(motionQuery.matches) {
            gsap.globalTimeline.timeScale(0.5);
            document.documentElement.style.setProperty('--transition', 'all 0.2s ease');
        } else {
            gsap.globalTimeline.timeScale(1);
            document.documentElement.style.setProperty('--transition', 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)');
        }
    });
}