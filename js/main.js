document.addEventListener('DOMContentLoaded', function () {
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Skip if it's a link that shouldn't scroll (like tabs or accordion toggles)
            if (this.classList.contains('no-scroll')) return;

            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Add some offset for the sticky header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle
    const menuToggle = getMenuToggle();

    menuToggle.addEventListener('click', function () {
        document.body.classList.toggle('menu-open');
    });

    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });

    

    // Form validation for contact form
    validateContactForm();


    function validateContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function (e) {
                e.preventDefault();

                // Get form values
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const message = document.getElementById('message').value;

                // Simple validation
                if (!name || !email || !message) {
                    alert('Please fill in all required fields.');
                    return;
                }

                // Email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    alert('Please enter a valid email address.');
                    return;
                }

                // In a real application, you would send this data to a server
                // For this demo, we'll just show a success message
                alert(`Thank you, ${name}! Your message has been sent. We'll get back to you soon.`);

                // Reset the form
                this.reset();
            });
        }
    }

    function getMenuToggle() {
        let menuToggle = document.querySelector('.menu-toggle');
        if (menuToggle) return menuToggle;

        menuToggle = document.createElement('button');
        menuToggle.classList.add('menu-toggle');
        menuToggle.innerHTML = '<span></span><span></span><span></span>';

        const nav = document.querySelector('header nav');
        if (nav) nav.appendChild(menuToggle);

        return menuToggle;
    }

    // Animate elements when they come into view
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };

    // Add animate-on-scroll class to elements that should animate
    function addAnimationClasses() {
        const elementsToAnimate = [
            '.feature-card',
            '.article-card',
            '.feature-detail',
            '.contact-card'
        ];

        elementsToAnimate.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((element, index) => {
                element.classList.add('animate-on-scroll');
                // Add delay to stagger animations
                element.style.transitionDelay = `${index * 0.1}s`;
            });
        });
    };

    addAnimationClasses();
    animateOnScroll(); // Run once on page load
    window.addEventListener('scroll', animateOnScroll);
});