document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on a link or outside the menu
        document.addEventListener('click', function(e) {
            // If menu is open and click is outside menu and not on menu button
            if (navLinks.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !mobileMenuBtn.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
        
        // Close menu when escape key is pressed
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
        
        // Close menu when window is resized past mobile breakpoint
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Don't scroll if the link is just "#"
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            
            // Close mobile menu if open
            if (mobileMenuBtn && mobileMenuBtn.classList.contains('active')) {
                mobileMenuBtn.click();
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate header height for offset
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - headerHeight, // Removed extra padding
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    let scrollTimer;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class when scrolling past threshold
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Only hide header after user has stopped scrolling for a moment
        clearTimeout(scrollTimer);
        
        // Show/hide header on scroll direction with throttling
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down, hide header (but with a slight delay)
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up, show header immediately
            header.style.transform = 'translateY(0)';
        }
        
        // This creates a small delay to prevent header from flashing
        scrollTimer = setTimeout(() => {
            lastScrollTop = scrollTop;
        }, 50);
    });
    
    // Add animation class to elements when they come into view
    const animateElements = document.querySelectorAll('.feature-card, .pricing-card, .about-image, .about-text, .use-case-card');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .feature-card, .pricing-card, .about-image, .about-text, .use-case-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .feature-card.animate, .pricing-card.animate, .about-image.animate, .about-text.animate, .use-case-card.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .feature-card:nth-child(2), .pricing-card:nth-child(2), .use-case-card:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .feature-card:nth-child(3), .pricing-card:nth-child(3), .use-case-card:nth-child(3) {
            transition-delay: 0.4s;
        }
        
        .feature-card:nth-child(4) {
            transition-delay: 0.6s;
        }
        
        header {
            transition: transform 0.3s ease, background-color 0.3s ease;
        }
        
        header.scrolled {
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .mobile-menu-btn span {
            transition: transform 0.3s ease, opacity 0.3s ease;
        }
        
        .mobile-menu-btn.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-btn.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-btn.active span:nth-child(3) {
            transform: rotate(-45deg) translate(6px, -6px);
        }
        
        .nav-links {
            transition: var(--transition);
        }
        
        @media (max-width: 768px) {
            .nav-links {
                position: fixed;
                top: 80px;
                left: 0;
                right: 0;
                background-color: #fff;
                flex-direction: column;
                padding: 0;
                height: 0;
                overflow: hidden;
                opacity: 0;
                box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
            }
            
            .nav-links.active {
                height: auto;
                padding: 20px 0;
                opacity: 1;
            }
            
            .nav-links li {
                margin: 15px 0;
                text-align: center;
                width: 100%;
            }
        }
    `;
    
    document.head.appendChild(style);
}); 