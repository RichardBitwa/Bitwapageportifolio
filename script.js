// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            
            // Toggle hamburger animation
            const bars = document.querySelectorAll('.bar');
            bars.forEach(bar => bar.classList.toggle('active'));
        });
    }
    
    // Services accordion functionality
    const serviceHeaders = document.querySelectorAll('.service-header');
    
    serviceHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const serviceItem = this.parentElement;
            const isActive = serviceItem.classList.contains('active');
            
            // Close all accordions
            document.querySelectorAll('.service-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // If the clicked one wasn't active, open it
            if (!isActive) {
                serviceItem.classList.add('active');
            }
        });
    });
    
    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-button');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Activate first service accordion by default
    const firstServiceItem = document.querySelector('.service-item');
    if (firstServiceItem) {
        firstServiceItem.classList.add('active');
    }
    
    // Scroll animation for elements
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.stat-item, .project-item, .service-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
        .stat-item, .project-item, .service-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .stat-item.animate, .project-item.animate, .service-item.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .project-item:nth-child(2), .stat-item:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .project-item:nth-child(3), .stat-item:nth-child(3) {
            transition-delay: 0.4s;
        }
        
        .project-item:nth-child(4) {
            transition-delay: 0.6s;
        }
        
        .bar.active:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        
        .bar.active:nth-child(2) {
            opacity: 0;
        }
        
        .bar.active:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
    `;
    document.head.appendChild(style);
});
