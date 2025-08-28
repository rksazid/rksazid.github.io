// Modern Performance and UX Enhancements for Rezaul Karim Portfolio
(function() {
    'use strict';

    // Intersection Observer for animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Page Loading Animation
    const showPageLoader = () => {
        const loader = document.createElement('div');
        loader.id = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-spinner"></div>
                <h4>Loading Portfolio...</h4>
                <p>MD. Rezaul Karim</p>
            </div>
        `;
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #F85C70, #79A9F5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            transition: opacity 0.5s ease;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            .loader-content {
                text-align: center;
                color: white;
            }
            .loader-spinner {
                width: 60px;
                height: 60px;
                border: 4px solid rgba(255,255,255,0.3);
                border-top: 4px solid white;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 20px;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            .loader-content h4 {
                margin: 0 0 10px 0;
                font-weight: 600;
            }
            .loader-content p {
                margin: 0;
                opacity: 0.8;
                font-size: 0.9rem;
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(loader);
        
        // Hide loader after page loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.remove();
                    style.remove();
                }, 500);
            }, 1000);
        });
    };

    // Show loader immediately
    showPageLoader();

    // Initialize animations when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Add animation classes to elements
        const animatedElements = document.querySelectorAll('.card, .about-card, .portfolio-item, .blog-card');
        animatedElements.forEach(el => {
            el.classList.add('animate-on-scroll');
            animateOnScroll.observe(el);
        });

        // Lazy loading for images
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('loading');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));

        // Smooth scrolling for navigation links
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
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

        // Active navigation highlighting
        const sections = document.querySelectorAll('section[id], div[id]');
        const navLinksForHighlight = document.querySelectorAll('.navbar .nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                if (scrollY >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            navLinksForHighlight.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });

        // Typing animation for header subtitle
        const headerSubtitle = document.querySelector('.header-mono');
        if (headerSubtitle) {
            const text = headerSubtitle.textContent;
            headerSubtitle.textContent = '';
            let i = 0;
            
            function typeWriter() {
                if (i < text.length) {
                    headerSubtitle.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                }
            }
            
            setTimeout(typeWriter, 1000);
        }

        // Progress bar animation
        const progressBars = document.querySelectorAll('.progress-bar');
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const width = progressBar.style.width;
                    progressBar.style.width = '0%';
                    setTimeout(() => {
                        progressBar.style.width = width;
                    }, 300);
                    progressObserver.unobserve(progressBar);
                }
            });
        });

        progressBars.forEach(bar => progressObserver.observe(bar));

        // Contact form enhancements
        const contactForm = document.querySelector('#contact form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const formData = new FormData(this);
                const submitButton = this.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                
                // Show loading state
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
                
                // Simulate form submission (replace with actual endpoint)
                setTimeout(() => {
                    submitButton.textContent = 'Message Sent!';
                    setTimeout(() => {
                        submitButton.textContent = originalText;
                        submitButton.disabled = false;
                        this.reset();
                    }, 2000);
                }, 1000);
            });
        }

        // Portfolio filter improvements
        const filterButtons = document.querySelectorAll('.filters a');
        filterButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Add loading state to portfolio items
                const portfolioItems = document.querySelectorAll('.portfolio-item');
                portfolioItems.forEach(item => {
                    item.classList.add('loading');
                    setTimeout(() => {
                        item.classList.remove('loading');
                    }, 500);
                });
            });
        });

        // Back to top button
        const backToTop = document.createElement('button');
        backToTop.innerHTML = '<i class="ti-angle-up"></i>';
        backToTop.className = 'back-to-top';
        backToTop.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #F85C70, #79A9F5);
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 20px rgba(248, 92, 112, 0.3);
        `;
        
        document.body.appendChild(backToTop);
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.style.opacity = '1';
                backToTop.style.visibility = 'visible';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.visibility = 'hidden';
            }
        });

        // Performance monitoring
        if (window.performance && window.performance.navigation) {
            const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
            console.log('Page load time:', loadTime + 'ms');
        }

        // Preload next sections on hover
        const navLinksPreload = document.querySelectorAll('.nav-link[href^="#"]');
        navLinksPreload.forEach(link => {
            link.addEventListener('mouseenter', function() {
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    const images = targetSection.querySelectorAll('img[data-src]');
                    images.forEach(img => {
                        if (!img.src) {
                            img.src = img.dataset.src;
                        }
                    });
                }
            });
        });

        // Enhanced skill progress bars with numbers
        const progressBarsWithNumbers = document.querySelectorAll('.progress-bar');
        progressBarsWithNumbers.forEach(bar => {
            const percentage = bar.style.width;
            const progressContainer = bar.parentElement;
            
            // Create percentage display
            const percentageDisplay = document.createElement('span');
            percentageDisplay.textContent = percentage;
            percentageDisplay.style.cssText = `
                position: absolute;
                right: 0;
                top: -25px;
                font-size: 0.8rem;
                color: #6c757d;
                font-weight: 600;
            `;
            progressContainer.style.position = 'relative';
            progressContainer.appendChild(percentageDisplay);
        });

        // Add hover effects to social icons
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.1)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Enhanced portfolio item interactions
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
                this.style.zIndex = '10';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.zIndex = '1';
            });
        });
    });

    // Service Worker registration feedback
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
            console.log('Service Worker is ready:', registration);
            
            // Show update notification if available
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        // Show update notification
                        const notification = document.createElement('div');
                        notification.innerHTML = `
                            <div style="
                                position: fixed;
                                top: 20px;
                                right: 20px;
                                background: linear-gradient(135deg, #F85C70, #79A9F5);
                                color: white;
                                padding: 1rem;
                                border-radius: 8px;
                                box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                                z-index: 10000;
                                max-width: 300px;
                            ">
                                <strong>Update Available!</strong><br>
                                New content is available. 
                                <button onclick="window.location.reload()" style="
                                    background: rgba(255,255,255,0.2);
                                    border: none;
                                    color: white;
                                    padding: 0.5rem;
                                    border-radius: 4px;
                                    margin-top: 0.5rem;
                                    cursor: pointer;
                                ">Refresh</button>
                            </div>
                        `;
                        document.body.appendChild(notification);
                        
                        setTimeout(() => {
                            notification.remove();
                        }, 10000);
                    }
                });
            });
        });
    }

    // Error handling
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
    });

    // Unhandled promise rejections
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Unhandled promise rejection:', e.reason);
    });

})();
