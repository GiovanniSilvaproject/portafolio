// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // Navegación suave para los enlaces del menú
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Cambiar enlace activo según la sección visible
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
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
    });
    
    // Slider de testimonios
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    
    function showSlide(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // Auto-slide cada 5 segundos
    setInterval(() => {
        currentSlide = (currentSlide + 1) % testimonials.length;
        showSlide(currentSlide);
    }, 5000);
    
    // Formulario de contacto
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener los valores del formulario
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Validación básica
        if (!name || !email || !subject || !message) {
            showNotification('Por favor, completa todos los campos', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Por favor, ingresa un email válido', 'error');
            return;
        }
        
        // Simular envío del formulario
        showNotification('Enviando mensaje...', 'info');
        
        setTimeout(() => {
            showNotification('¡Mensaje enviado con éxito! Te responderé pronto.', 'success');
            this.reset();
        }, 2000);
    });
    
    // Validación de email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Sistema de notificaciones
    function showNotification(message, type = 'info') {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Agregar estilos
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#00ff00' : type === 'error' ? '#ff4444' : '#00aaff'};
            color: ${type === 'success' ? '#000' : '#fff'};
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        // Agregar al DOM
        document.body.appendChild(notification);
        
        // Mostrar notificación
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Botón de cerrar
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            hideNotification(notification);
        });
        
        // Auto-ocultar después de 5 segundos
        setTimeout(() => {
            hideNotification(notification);
        }, 5000);
    }
    
    function hideNotification(notification) {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
    
    // Botón "Contrátame" del header
    const ctaButton = document.querySelector('.cta-button');
    ctaButton.addEventListener('click', function() {
        const contactSection = document.querySelector('#contact');
        contactSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
    
    // Botón "Descargar CV"
    const downloadCVButton = document.querySelector('.download-cv');
    downloadCVButton.addEventListener('click', function() {
        showNotification('Descargando CV...', 'info');
        
        // Simular descarga (en un proyecto real, aquí iría el enlace al archivo)
        setTimeout(() => {
            showNotification('CV descargado exitosamente', 'success');
        }, 1500);
    });
    
    // Efectos de scroll para las tarjetas de servicios y proyectos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar tarjetas de servicios
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Observar tarjetas de proyectos
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Efecto de escritura para el nombre
    const nameElement = document.querySelector('.name');
    const originalText = nameElement.textContent;
    nameElement.textContent = '';
    
    let charIndex = 0;
    const typeWriter = () => {
        if (charIndex < originalText.length) {
            nameElement.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 150);
        }
    };
    
    // Iniciar efecto de escritura cuando la sección hero esté visible
    const heroObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(typeWriter, 500);
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    heroObserver.observe(document.querySelector('.hero'));
    
    // Contador animado para las estadísticas
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNumber = parseInt(target.textContent);
                let currentNumber = 0;
                const increment = finalNumber / 50;
                
                const counter = setInterval(() => {
                    currentNumber += increment;
                    if (currentNumber >= finalNumber) {
                        target.textContent = finalNumber;
                        clearInterval(counter);
                    } else {
                        target.textContent = Math.floor(currentNumber);
                    }
                }, 30);
                
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Efecto parallax sutil para el header
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const header = document.querySelector('.header');
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Agregar clase 'scrolled' al header cuando se hace scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Preloader (opcional)
    window.addEventListener('load', () => {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    });
    
    // Agregar estilos CSS adicionales para las notificaciones
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        .notification-close {
            background: none;
            border: none;
            color: inherit;
            font-size: 20px;
            cursor: pointer;
            margin-left: 15px;
            padding: 0;
            line-height: 1;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .notification-message {
            flex: 1;
        }
        
        .header.scrolled {
            background-color: rgba(10, 10, 10, 0.98);
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
        }
    `;
    
    document.head.appendChild(notificationStyles);
    
    // Inicializar el primer slide de testimonios
    showSlide(0);
    
    console.log('Portafolio cargado exitosamente! 🚀');
});
