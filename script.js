// Professional Portfolio JavaScript
// HR/Recruiter Focused with All Fixes

document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio loaded - Professional version');
    
    // Initialize all modules
    initNavigation();
    initScrollAnimations();
    initSkillAnimations();
    initProjectFiltering();
    initCertificationTabs();
    initContactForm();
    initBackToTop();
    initCounters();
    initCurrentYear();
    initImageLoading();
    initSoftSkillsInteractions();
    initFormValidation();
    
    initPerformanceMonitoring();
});

// ===== NAVIGATION MODULE =====
function initNavigation() {
    const header = document.querySelector('.header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (!header || !hamburger || !navLinks) return;
    
    // Header scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
            
            // Hide/show on scroll direction
            if (currentScroll > lastScroll && currentScroll > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        } else {
            header.classList.remove('scrolled');
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
        updateActiveNavLink();
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', !isExpanded);
        
        // Toggle body scroll
        document.body.style.overflow = !isExpanded ? 'hidden' : '';
    });
    
    // Close menu on link click (mobile)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPosition = window.scrollY + 100;
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Special animations
                if (entry.target.id === 'skills') {
                    animateSkillProgress();
                }
                
                if (entry.target.id === 'home') {
                    animateStats();
                }
                
                if (entry.target.id === 'projects') {
                    animateProjectCards();
                }
            }
        });
    }, observerOptions);
    
    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Hero animations
    setTimeout(() => {
        document.querySelector('.hero-text')?.classList.add('animated');
        document.querySelector('.hero-visual')?.classList.add('animated');
    }, 300);
}

// ===== SKILL ANIMATIONS =====
function initSkillAnimations() {
    // Setup circular progress bars
    document.querySelectorAll('.circular-progress').forEach(progress => {
        const percentage = progress.getAttribute('data-percentage');
        const circle = progress.querySelector('.progress-ring-circle:nth-child(2)');
        
        if (circle) {
            const radius = 36;
            const circumference = 2 * Math.PI * radius;
            const offset = circumference - (percentage / 100) * circumference;
            
            circle.style.strokeDasharray = `${circumference} ${circumference}`;
            circle.style.strokeDashoffset = offset;
        }
    });
}

function animateSkillProgress() {
    document.querySelectorAll('.circular-progress').forEach((progress, index) => {
        setTimeout(() => {
            progress.classList.add('animated');
            const circle = progress.querySelector('.progress-ring-circle:nth-child(2)');
            if (circle) {
                circle.style.transition = 'stroke-dashoffset 1.5s ease-in-out';
                circle.style.strokeDashoffset = '0';
            }
        }, index * 200);
    });
}

// ===== SOFT SKILLS INTERACTIONS =====
function initSoftSkillsInteractions() {
    const softSkillCards = document.querySelectorAll('.soft-skill-card');
    
    softSkillCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('expanded');
        });
        
        // Touch support for mobile
        card.addEventListener('touchstart', function(e) {
            if (!this.classList.contains('expanded')) {
                e.preventDefault();
                this.classList.add('expanded');
            }
        });
    });
}

// ===== PROJECT FILTERING =====
function initProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach((card, index) => {
                const categories = card.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    setTimeout(() => {
                        card.style.display = 'flex';
                        card.style.animation = 'fadeInUp 0.5s ease forwards';
                    }, index * 100);
                } else {
                    card.style.animation = 'fadeOut 0.3s ease forwards';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

function animateProjectCards() {
    document.querySelectorAll('.project-card').forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// ===== CERTIFICATION TABS =====
function initCertificationTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const certificationCards = document.querySelectorAll('.certification-card');
    
    if (!tabButtons.length || !tabPanes.length) return;
    
    // Function to filter certifications by category
    function filterCertifications(category) {
        const targetPane = document.getElementById(`tab-${category}`);
        const targetGrid = targetPane.querySelector('.certifications-grid');
        
        if (!targetPane || !targetGrid) return;
        
        // Clear the target grid
        targetGrid.innerHTML = '';
        
        // Filter and clone cards for the selected category
        certificationCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                const clone = card.cloneNode(true);
                // Ensure the cloned card is visible
                clone.style.display = 'flex';
                targetGrid.appendChild(clone);
            }
        });
    }
    
    // Function to switch tabs
    function switchTab(tabId) {
        // Remove active class from all buttons and panes
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to clicked button
        const activeBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
        
        // Show corresponding pane
        const activePane = document.getElementById(`tab-${tabId}`);
        if (activePane) {
            activePane.classList.add('active');
        }
        
        // Filter certifications for the selected tab
        filterCertifications(tabId);
    }
    
    // Initialize all certifications in the "all" tab
    filterCertifications('all');
    
    // Add click event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab;
            switchTab(tabId);
        });
    });
    
    // Initialize tabs properly
    const activeTab = document.querySelector('.tab-btn.active');
    if (activeTab) {
        switchTab(activeTab.dataset.tab);
    }
}

// ===== CONTACT FORM =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Get form values
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject') || 'Portfolio Inquiry';
            const message = formData.get('message');
            
            // Use mailto as fallback
            const mailtoLink = `mailto:thoubicimran005@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}%0AEmail: ${email}%0A%0AMessage:%0A${message}`)}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            showNotification('Message prepared! Please send from your email client.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Restore button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1000);
    });
}

function showNotification(message, type) {
    // Remove existing
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
        <button class="close-notification">&times;</button>
    `;
    
    // Style
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 8px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideInRight 0.3s ease;
        max-width: 350px;
        font-size: 0.9rem;
    `;
    
    document.body.appendChild(notification);
    
    // Close button
    notification.querySelector('.close-notification').addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ===== BACK TO TOP =====
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.classList.remove('visible');
            backToTopBtn.style.display = 'none';
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== COUNTERS =====
function initCounters() {
    document.querySelectorAll('.stat-number').forEach(stat => {
        const target = stat.getAttribute('data-count') || stat.textContent;
        stat.dataset.target = target;
        stat.textContent = '0';
    });
}

function animateStats() {
    document.querySelectorAll('.stat-number').forEach(stat => {
        const target = parseInt(stat.dataset.target) || 0;
        let current = 0;
        const increment = target / 30;
        const duration = 1000;
        const stepTime = duration / (target / increment);
        
        const timer = setInterval(() => {
            current += increment;
            
            if (current >= target) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, stepTime);
    });
}

// ===== FORM VALIDATION =====
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        // Real-time validation
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        // Clear errors on focus
        input.addEventListener('focus', function() {
            clearFieldError(this);
        });
    });
    
    function validateField(field) {
        clearFieldError(field);
        
        if (!field.value.trim()) {
            showFieldError(field, 'This field is required');
            return false;
        }
        
        if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                showFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }
        
        return true;
    }
    
    function showFieldError(field, message) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.add('error');
        
        let errorElement = formGroup.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }
    
    function clearFieldError(field) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.remove('error');
        
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }
}

// ===== IMAGE LOADING =====
function initImageLoading() {
    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Load image
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    if (img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                    }
                    
                    // Add loaded class
                    img.addEventListener('load', () => {
                        img.classList.add('loaded');
                    });
                    
                    imageObserver.unobserve(img);
                }
            });
        }, { rootMargin: '50px 0px' });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for older browsers
        document.querySelectorAll('img[data-src]').forEach(img => {
            if (img.dataset.src) img.src = img.dataset.src;
            if (img.dataset.srcset) img.srcset = img.dataset.srcset;
        });
    }
}

// ===== CURRENT YEAR =====
function initCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ===== PRINT OPTIMIZATION =====
function initPrintOptimization() {
    // Add print button
    const printBtn = document.createElement('button');
    printBtn.className = 'print-btn no-print';
    printBtn.innerHTML = '<i class="fas fa-print"></i> Print Resume';
    printBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: var(--primary);
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
        z-index: 1000;
        font-size: 0.9rem;
    `;
    
    printBtn.addEventListener('click', () => {
        window.print();
    });
    
    document.body.appendChild(printBtn);
}

// ===== PERFORMANCE MONITORING =====
function initPerformanceMonitoring() {
    // Log performance metrics
    window.addEventListener('load', () => {
        if (performance.timing) {
            const timing = performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            
            console.log(`Page loaded in ${loadTime}ms`);
            
            if (loadTime > 3000) {
                console.warn('Page load time is slow. Consider optimizing images and scripts.');
            }
        }
    });
}

// ===== UTILITY FUNCTIONS =====
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== ADD CSS ANIMATIONS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(20px);
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    .animated {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    .notification {
        font-family: var(--font-primary);
    }
    
    .notification i {
        font-size: 1.1em;
    }
    
    .close-notification {
        background: none;
        border: none;
        color: white;
        font-size: 1.3em;
        cursor: pointer;
        margin-left: 10px;
        padding: 0;
        line-height: 1;
    }
    
    @media print {
        .no-print {
            display: none !important;
        }
        
        .print-btn {
            display: none !important;
        }
    }
`;

document.head.appendChild(style);

// ===== INITIAL LOADING STATE =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Remove loading animation if exists
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.style.opacity = '0';
        setTimeout(() => loading.remove(), 300);
    }
    
    // Add loaded class to sections for CSS transitions
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('loaded');
    });
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Error:', e.error);
    // Could send to error tracking service
});

// ===== RESUME DOWNLOAD TRACKING =====
document.addEventListener('click', (e) => {
    const downloadLink = e.target.closest('a[download]');
    if (downloadLink && downloadLink.href.includes('Resume')) {
        console.log('Resume download initiated');
        // Could add analytics here
    }
});

// Initialize
console.log('Portfolio initialized successfully');
