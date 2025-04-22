// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const header = document.querySelector('header');
    
    // Add background color to header on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Package buttons - WhatsApp redirect
    const packageButtons = document.querySelectorAll('.btn-package');
    
    packageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const packageName = this.getAttribute('data-package');
            const phoneNumber = '573228531047';
            const message = encodeURIComponent(`Hola, estoy interesado en adquirir el ${packageName}. ¿Podría proporcionarme más información?`);
            
            // Redirect to WhatsApp with predefined message
            window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
        });
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Here you would normally send the form data to a server
            // For now, we'll just simulate a successful submission
            
            // Display success message
            alert(`¡Gracias ${name}! Tu mensaje ha sido enviado correctamente. Te contactaremos pronto.`);
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Animation on scroll - Reveal elements as they enter viewport
    const revealElements = document.querySelectorAll('.service-card, .package-card, .contact-card');
    
    function checkReveal() {
        const triggerBottom = window.innerHeight * 0.8;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('revealed');
            }
        });
    }
    
    // Check on load
    checkReveal();
    
    // Check on scroll
    window.addEventListener('scroll', checkReveal);
    
    // Add CSS class for animation
    const style = document.createElement('style');
    style.textContent = `
        .service-card, .package-card, .contact-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .service-card.revealed, .package-card.revealed, .contact-card.revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Initialize testimonial carousel if it exists
    if (document.querySelector('.testimonial-carousel')) {
        new TestimonialCarousel('.testimonial-carousel');
    }
});

// Testimonials carousel functionality
class TestimonialCarousel {
    constructor(selector) {
        this.carousel = document.querySelector(selector);
        if (!this.carousel) return;
        
        this.testimonials = this.carousel.querySelectorAll('.testimonial');
        this.currentIndex = 0;
        this.totalItems = this.testimonials.length;
        
        this.init();
    }
    
    init() {
        // Create navigation dots
        this.createNavDots();
        
        // Set initial state
        this.showTestimonial(0);
        
        // Auto-rotate every 5 seconds
        setInterval(() => {
            this.next();
        }, 5000);
    }
    
    createNavDots() {
        // Create dots container
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'carousel-dots';
        
        // Create a dot for each testimonial
        for (let i = 0; i < this.totalItems; i++) {
            const dot = document.createElement('span');
            dot.className = 'carousel-dot';
            dot.setAttribute('data-index', i);
            
            // Add click event to each dot
            dot.addEventListener('click', () => {
                this.showTestimonial(i);
            });
            
            dotsContainer.appendChild(dot);
        }
        
        // Append dots container to carousel
        this.carousel.appendChild(dotsContainer);
        
        // Store dots for later use
        this.dots = dotsContainer.querySelectorAll('.carousel-dot');
    }
    
    showTestimonial(index) {
        // Hide all testimonials
        this.testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        // Remove active class from all dots
        this.dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the selected testimonial
        this.testimonials[index].classList.add('active');
        
        // Highlight the corresponding dot
        this.dots[index].classList.add('active');
        
        // Update current index
        this.currentIndex = index;
    }
    
    next() {
        // Calculate next index
        let nextIndex = this.currentIndex + 1;
        
        // Loop back to the first item if needed
        if (nextIndex >= this.totalItems) {
            nextIndex = 0;
        }
        
        this.showTestimonial(nextIndex);
    }
    
    prev() {
        // Calculate previous index
        let prevIndex = this.currentIndex - 1;
        
        // Loop to the last item if needed
        if (prevIndex < 0) {
            prevIndex = this.totalItems - 1;
        }
        
        this.showTestimonial(prevIndex);
    }
}

// Implement dark mode toggle if exists
const darkModeToggle = document.getElementById('darkModeToggle');
if (darkModeToggle) {
    // Check for saved user preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // Apply initial mode
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }
    
    // Toggle dark mode
    darkModeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'true');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'false');
        }
    });
}

// Add typing effect to hero headline if it exists
const heroHeadline = document.querySelector('.hero-content h1');
if (heroHeadline) {
    const text = heroHeadline.textContent;
    heroHeadline.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            heroHeadline.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

// Add counter animation to numbers
const counters = document.querySelectorAll('.counter');
if (counters.length > 0) {
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 20); // Update every 20ms
        
        let current = 0;
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start counter when element comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}
