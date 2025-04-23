document.addEventListener('DOMContentLoaded', function() {
    // === Header Scroll Effect ===
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        header.classList.toggle('scrolled', window.scrollY > 100);
    });

    // === Smooth Scrolling for Anchor Links ===
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

    // === Banner Slider ===
    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.banner-dot');
    const prevButton = document.querySelector('.banner-prev');
    const nextButton = document.querySelector('.banner-next');
    let currentSlide = 0;
    let autoSlideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
            dots[i].classList.toggle('active', i === index);
        });
        currentSlide = index;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    if (slides.length > 0) {
        showSlide(0);
        startAutoSlide();

        // Pause on hover
        document.querySelector('.banner-container').addEventListener('mouseenter', stopAutoSlide);
        document.querySelector('.banner-container').addEventListener('mouseleave', startAutoSlide);

        // Dot navigation
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.getAttribute('data-index'));
                showSlide(index);
                stopAutoSlide();
                startAutoSlide();
            });
        });

        // Arrow navigation
        prevButton.addEventListener('click', () => {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        });
        nextButton.addEventListener('click', () => {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        });
    }

    // === Catalog Buttons - WhatsApp Redirect ===
    const catalogButtons = document.querySelectorAll('.btn-catalog');
    const phoneNumber = '573228531047';

    catalogButtons.forEach(button => {
        button.addEventListener('click', function() {
            const packageName = this.getAttribute('data-package');
            const message = encodeURIComponent(`Hola, estoy interesado en adquirir el ${packageName}. ¿Podría proporcionarme más información?`);
            window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
        });
    });

    // === Contact Form Handling ===
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.validity.valid) {
                    this.classList.add('valid');
                    this.classList.remove('invalid');
                } else {
                    this.classList.add('invalid');
                    this.classList.remove('valid');
                }
            });
        });

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name && email && message) {
                const whatsappMessage = encodeURIComponent(`Hola, soy ${name}. Email: ${email}. Mensaje: ${message}`);
                window.open(`https://wa.me/${phoneNumber}?text=${whatsappMessage}`, '_blank');
                alert(`¡Gracias ${name}! Tu mensaje ha sido enviado correctamente. Te contactaremos pronto.`);
                contactForm.reset();
                inputs.forEach(input => input.classList.remove('valid', 'invalid'));
            } else {
                alert('Por favor, completa todos los campos correctamente.');
            }
        });
    }

    // === Scroll Reveal Animations ===
    const revealElements = document.querySelectorAll('.service-card, .catalog-item, .contact-card, .additional-service-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    revealElements.forEach(element => observer.observe(element));

    // === Back-to-Top Button ===
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopButton.className = 'back-to-top';
    document.body.appendChild(backToTopButton);

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        backToTopButton.style.display = window.scrollY > 300 ? 'block' : 'none';
    });

    // === Lazy Loading Images ===
    const images = document.querySelectorAll('img[data-src]');
    const imgObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        img.setAttribute('data-src', img.src);
        img.src = '';
        imgObserver.observe(img);
    });

    // === Dynamic Footer Year ===
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.textContent = `© ${currentYear} DEVNIX. Todos los derechos reservados.`;
    }

    // === Page Loader ===
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = '<div class="loader-spinner"></div>';
    document.body.appendChild(loader);

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 300);
        }, 500);
    });
});

// === Inline CSS for Animations and Back-to-Top Button ===
const style = document.createElement('style');
style.textContent = `
    .service-card, .catalog-item, .contact-card, .additional-service-item {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .service-card.revealed, .catalog-item.revealed, .contact-card.revealed, .additional-service-item.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--gradient-primary);
        color: var(--white);
        border: none;
        border-radius: 50%;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: var(--neon-shadow);
        transition: all 0.3s ease;
        z-index: 1000;
    }
    .back-to-top:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 212, 255, 0.3);
    }
    .page-loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--dark);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.3s ease;
    }
    .loader-spinner {
        width: 50px;
        height: 50px;
        border: 5px solid var(--primary);
        border-top: 5px solid transparent;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    .form-group input.valid, .form-group textarea.valid {
        border-color: var(--primary);
        box-shadow: 0 0 8px rgba(0, 212, 255, 0.2);
    }
    .form-group input.invalid, .form-group textarea.invalid {
        border-color: var(--accent);
        box-shadow: 0 0 8px rgba(255, 82, 82, 0.2);
    }
`;
document.head.appendChild(style);
