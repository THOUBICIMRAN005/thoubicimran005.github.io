// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        // Close hamburger menu on link click (for mobile)
        if (window.innerWidth <= 768) {
            document.querySelector('.nav-links').classList.remove('active');
            document.querySelector('.hamburger').classList.remove('active');
        }
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('.nav-links li a');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        // Adjust this value to control when the section becomes active (e.g., 1/3 way into the section)
        const scrollThreshold = window.innerHeight * 0.3;
        if (pageYOffset >= (sectionTop - scrollThreshold)) {
            current = section.getAttribute('id');
        }
    });
    navLi.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
});

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Back to Top Button visibility
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) { // Show button after scrolling 300px
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

// Skill Progress Bar Animation on Scroll/Intersection
// This part assumes your CSS uses a CSS variable like --p for the percentage, and --target-width for animation
// The skill-circle has a style="--p:85;" attribute, which this JS might animate, or CSS might directly use
// If you want a smooth animation, the CSS conic-gradient needs a transition or a separate element to animate.
// For the given CSS, the `--p` value is directly rendered. If you wish to animate it on scroll, you might need
// to set the `--p` value via JS after the section is in view.
// For now, the existing CSS directly uses --p. If you want a visual animation, you'd apply a class or
// directly set the width for skill-progress if that was present.
// The provided CSS has skill-circle with conic-gradient, which doesn't animate with a simple width change.
// To animate, you'd typically have an inner element or adjust the --p dynamically.
// Let's adapt this to ensure skills are visible when the section is in view.
const skillCircles = document.querySelectorAll('.skill-circle');
const skillsSection = document.getElementById('skills');

const skillObserverOptions = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.5 // Trigger when 50% of the section is visible
};

const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Apply a class or set properties to trigger visual changes (if applicable)
            // For the current CSS, conic-gradient uses the --p directly.
            // If you want a transition, CSS needs to handle it on the --p change or another property.
            // For example, if you had a data-percentage on the circle and set --p using JS.
            // For now, let's just confirm it's observed. No direct animation trigger in this JS for the conic-gradient.
            skillCircles.forEach(circle => {
                // Example of setting a new style property if animation was based on it
                // let percentage = circle.dataset.percentage; // Assuming a data-percentage="85"
                // circle.style.setProperty('--target-percentage', percentage);
                // The current CSS directly uses '--p' from inline style, so no JS animation is implied.
            });
            observer.unobserve(entry.target); // Stop observing once animated
        }
    });
}, skillObserverOptions);

if (skillsSection) {
    skillObserver.observe(skillsSection);
}


// Projects Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.dataset.filter;

        projectCards.forEach(card => {
            if (filterValue === 'all' || card.dataset.category.includes(filterValue)) {
                card.style.display = 'flex'; // Use flex to maintain column layout for project-card
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Certifications Tabs
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const targetTab = button.dataset.tab;

        tabPanes.forEach(pane => {
            if (pane.id === targetTab) {
                pane.classList.add('active');
            } else {
                pane.classList.remove('active');
            }
        });
    });
});