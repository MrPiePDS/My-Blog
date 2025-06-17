document.addEventListener('DOMContentLoaded', function() {
    // Set current date
    const currentDate = document.getElementById('current-date');
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDate.textContent = today.toLocaleDateString('en-US', options);
    
    // Add animations to elements
    const animatedElements = document.querySelectorAll('.featured-news, .headline-item, .newsletter');
    
    animatedElements.forEach((element, index) => {
        // Add fade-in class with delay based on index
        setTimeout(() => {
            element.classList.add('fade-in');
        }, index * 200);
    });
    
    // Add slide-up animation to headlines
    const headlines = document.querySelectorAll('.headline-item h3');
    
    headlines.forEach((headline, index) => {
        setTimeout(() => {
            headline.classList.add('slide-up');
        }, index * 300);
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search input');
    
    searchInput.addEventListener('focus', function() {
        this.style.width = '250px';
        this.style.borderColor = '#30d5c8';
    });
    
    searchInput.addEventListener('blur', function() {
        this.style.width = '200px';
        this.style.borderColor = '#ddd';
    });
    
    // View more button hover effect
    const viewMoreButtons = document.querySelectorAll('.view-more');
    
    viewMoreButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Subscribe button click effect
    const subscribeButton = document.querySelector('.subscribe-btn');
    
    subscribeButton.addEventListener('click', function() {
        const emailInput = document.querySelector('.subscribe-form input');
        if (emailInput.value) {
            this.textContent = 'THANK YOU!';
            this.style.backgroundColor = '#4CAF50';
            setTimeout(() => {
                this.textContent = 'SUBSCRIBE';
                this.style.backgroundColor = '#222';
                emailInput.value = '';
            }, 2000);
        } else {
            this.textContent = 'ENTER EMAIL!';
            this.style.backgroundColor = '#f44336';
            setTimeout(() => {
                this.textContent = 'SUBSCRIBE';
                this.style.backgroundColor = '#222';
            }, 2000);
        }
    });
    
    // Typewriter effect for featured headline
    const featuredHeadline = document.querySelector('.headline');
    const originalText = featuredHeadline.textContent;
    featuredHeadline.textContent = '';
    
    let i = 0;
    const typeWriter = setInterval(() => {
        if (i < originalText.length) {
            featuredHeadline.textContent += originalText.charAt(i);
            i++;
        } else {
            clearInterval(typeWriter);
        }
    }, 50);
});
