document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Animate the hamburger icon
            const spans = this.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
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
                    top: targetPosition - headerHeight - 20, // Extra 20px padding
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Tab functionality for use cases section
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding tab pane
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Gather form data
            const formData = new FormData(this);
            const formDataObj = {};
            
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            // In a real implementation, you would send this data to your backend
            // For now, we'll just show a success message
            
            // Replace form with success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for contacting us. We'll get back to you shortly.</p>
            `;
            
            this.style.opacity = '0';
            setTimeout(() => {
                this.style.display = 'none';
                contactForm.parentNode.appendChild(successMessage);
                setTimeout(() => {
                    successMessage.style.opacity = '1';
                }, 10);
            }, 300);
            
            // In a real scenario, reset the form after sending data
            // this.reset();
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Show/hide header on scroll direction
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down, hide header
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up, show header
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add animation class to elements when they come into view
    const animateElements = document.querySelectorAll('.feature-card, .pricing-card, .about-image, .about-text');
    
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
        .feature-card, .pricing-card, .about-image, .about-text {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .feature-card.animate, .pricing-card.animate, .about-image.animate, .about-text.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .feature-card:nth-child(2), .pricing-card:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .feature-card:nth-child(3), .pricing-card:nth-child(3) {
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
        
        .form-success {
            text-align: center;
            opacity: 0;
            transition: opacity 0.3s ease;
            padding: 40px 0;
        }
        
        .form-success i {
            font-size: 4rem;
            color: var(--success-color);
            margin-bottom: 20px;
        }
        
        .form-success h3 {
            font-size: 1.8rem;
            margin-bottom: 15px;
        }
        
        .form-success p {
            color: var(--gray-color);
        }
    `;
    
    document.head.appendChild(style);
}); 