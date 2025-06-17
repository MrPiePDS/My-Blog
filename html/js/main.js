document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for sidebar navigation
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Add some offset for the sticky header
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update active state
                sidebarLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Highlight active section on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.main-content section');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Mobile menu toggle (for responsive design)
    const menuToggle = document.createElement('button');
    menuToggle.classList.add('menu-toggle');
    menuToggle.innerHTML = '<span></span><span></span><span></span>';
    
    const nav = document.querySelector('.main-nav');
    if (nav) nav.appendChild(menuToggle);
    
    menuToggle.addEventListener('click', function() {
        document.body.classList.toggle('menu-open');
    });
    
    // Form validation for contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
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
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
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
    const addAnimationClasses = function() {
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
    
    // Add CSS for mobile menu and animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-on-scroll.animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        @media (max-width: 768px) {
            .menu-toggle {
                display: block;
                background: none;
                border: none;
                cursor: pointer;
                padding: 10px;
                position: relative;
                z-index: 1000;
            }
            
            .menu-toggle span {
                display: block;
                width: 25px;
                height: 3px;
                margin-bottom: 5px;
                position: relative;
                background: #333;
                border-radius: 3px;
                z-index: 1;
                transform-origin: 4px 0px;
                transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                            background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                            opacity 0.55s ease;
            }
            
            .menu-toggle span:last-child {
                margin-bottom: 0;
            }
            
            .menu-open .nav-links {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 60px;
                left: 0;
                right: 0;
                background: white;
                box-shadow: 0 5px 10px rgba(0,0,0,0.1);
                padding: 20px;
            }
            
            .menu-open .menu-toggle span:nth-child(1) {
                transform: rotate(45deg) translate(2px, -1px);
            }
            
            .menu-open .menu-toggle span:nth-child(2) {
                opacity: 0;
            }
            
            .menu-open .menu-toggle span:nth-child(3) {
                transform: rotate(-45deg) translate(1px, -1px);
            }
        }
    `;
    document.head.appendChild(style);
});