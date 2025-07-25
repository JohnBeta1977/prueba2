document.addEventListener('DOMContentLoaded', () => {
    // -------------------- Splash Screen --------------------
    const splashScreen = document.getElementById('splash-screen');
    setTimeout(() => {
        splashScreen.classList.add('hidden');
        document.body.style.overflow = ''; // Habilitar scroll del body
    }, 2000); // 2 segundos


    // -------------------- Header Scroll Effect --------------------
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // -------------------- Mobile Menu (Slider) --------------------
    const burgerMenu = document.getElementById('burgerMenu');
    const navLinks = document.getElementById('navLinks');
    const allNavLinks = document.querySelectorAll('.nav-links a');

    burgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burgerMenu.classList.toggle('active'); // Para la animación de la hamburguesa
        // Asegurarse de que el scroll del body se maneje correctamente
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden'; // Evitar scroll del body cuando el menú está abierto
        } else {
            document.body.style.overflow = ''; // Restaurar scroll
        }
    });

    // Cerrar el menú al hacer clic en un enlace (para móviles)
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                burgerMenu.classList.remove('active'); // Remover también la clase de animación
                document.body.style.overflow = ''; // Restaurar scroll al cerrar el menú
            }
        });
    });

    // -------------------- Product Modals with Image Slider --------------------
    const productCards = document.querySelectorAll('.product-card');
    const productModal = document.getElementById('productModal');
    const closeModalButton = document.getElementById('closeModal');
    const modalProductImage = document.getElementById('modalProductImage');
    const modalProductName = document.getElementById('modalProductName');
    const modalProductDescription = document.getElementById('modalProductDescription');
    const modalProductPrice = document.getElementById('modalProductPrice');
    const modalBuyButton = document.getElementById('modalBuyButton');
    const modalFavoriteButton = document.getElementById('modalFavoriteButton');
    const modalShareButton = document.getElementById('modalShareButton');

    // Slider elements - these will only work if products have multiple images defined by data attributes
    const prevSlideButton = productModal.querySelector('.prev-slide');
    const nextSlideButton = productModal.querySelector('.next-slide');
    let currentImageIndex = 0;
    let productImages = []; // Array para almacenar las URLs de las imágenes del producto actual

    productCards.forEach(card => {
        card.addEventListener('click', () => {
            const productName = card.dataset.name;
            const productPrice = card.dataset.price;
            const productImage = card.dataset.image;
            const productDescription = card.dataset.description; // Get description from data attribute

            modalProductName.textContent = productName;
            modalProductDescription.textContent = productDescription; // Set description
            modalProductPrice.textContent = `$${productPrice}`;
            modalProductImage.src = productImage; // Set the main image
            modalProductImage.alt = productName;

            // For slider: if you have multiple images, populate productImages array here
            // For now, it will just contain the single image
            productImages = [productImage]; // Ensure this is always an array
            currentImageIndex = 0; // Reset index for each new modal open

            // Update buy button data
            modalBuyButton.dataset.productName = productName;
            modalBuyButton.dataset.productPrice = productPrice;

            productModal.style.display = 'flex'; // Show the modal
            document.body.style.overflow = 'hidden'; // Prevent scrolling the background
        });
    });

    closeModalButton.addEventListener('click', () => {
        productModal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    });

    // Close modal if clicking outside the modal content
    window.addEventListener('click', (event) => {
        if (event.target === productModal) {
            productModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Slider navigation (currently for single image, can be expanded if multiple image data is added)
    // Buttons will be hidden by CSS if productImages.length is 1
    prevSlideButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent modal from closing if clicked on slider buttons
        if (productImages.length > 1) {
            currentImageIndex = (currentImageIndex - 1 + productImages.length) % productImages.length;
            modalProductImage.src = productImages[currentImageIndex];
        }
    });

    nextSlideButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent modal from closing if clicked on slider buttons
        if (productImages.length > 1) {
            currentImageIndex = (currentImageIndex + 1) % productImages.length;
            modalProductImage.src = productImages[currentImageIndex];
        }
    });


    // -------------------- FAQ Accordion --------------------
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling; // The .faq-answer div
            const toggleIcon = question.querySelector('.faq-toggle-icon');

            // Toggle active class on the question to change icon
            question.classList.toggle('active');

            if (answer.classList.contains('open')) {
                answer.classList.remove('open');
                answer.style.maxHeight = null; // Reset max-height to collapse
            } else {
                // Close other open answers first (optional, but good UX)
                document.querySelectorAll('.faq-answer.open').forEach(openAnswer => {
                    openAnswer.classList.remove('open');
                    openAnswer.style.maxHeight = null;
                    openAnswer.previousElementSibling.classList.remove('active'); // Remove active from its question
                });

                answer.classList.add('open');
                // Set max-height to scrollHeight to allow smooth transition
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });


    // -------------------- PWA Install Prompt --------------------
    const installPromptContainer = document.getElementById('install-prompt');
    const installButton = document.getElementById('install-button');
    let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        // Show the install prompt if it hasn't been dismissed before
        if (getCookie('pwa_prompt_dismissed') !== 'true' && !window.matchMedia('(display-mode: standalone)').matches && !window.matchMedia('(display-mode: fullscreen)').matches) {
            installPromptContainer.classList.add('show');
        }
    });

    installButton.addEventListener('click', () => {
        installPromptContainer.classList.remove('show');
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('Usuario aceptó la instalación de la PWA');
                    setCookie('pwa_installed', 'true', 365); // Set cookie for successful install
                } else {
                    console.log('Usuario rechazó la instalación de la PWA');
                    setCookie('pwa_prompt_dismissed', 'true', 30); // Dismiss for a month
                }
                deferredPrompt = null;
            });
        }
    });

    // Function to set a cookie
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    function getCookie(name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Check if the app is already installed or dismissed (for display-mode: standalone/fullscreen)
    if (window.matchMedia('(display-mode: standalone)').matches || window.matchMedia('(display-mode: fullscreen)').matches || getCookie('pwa_prompt_dismissed') === 'true') {
        console.log('PWA is running in standalone mode or prompt dismissed.');
        installPromptContainer.style.display = 'none'; // Hide if already installed or dismissed
    }

    // -------------------- Share Page Button --------------------
    const sharePageButton = document.querySelector('.share-page-button');

    if (navigator.share) {
        sharePageButton.addEventListener('click', async () => {
            try {
                await navigator.share({
                    title: document.title,
                    text: '¡Mira esta increíble tienda online!',
                    url: window.location.href
                });
                console.log('Página compartida con éxito');
            } catch (error) {
                console.error('Error al compartir la página:', error);
            }
        });
    } else {
        // Fallback para navegadores que no soportan Web Share API
        sharePageButton.addEventListener('click', () => {
            alert('La función de compartir no está soportada en tu navegador. Puedes copiar el enlace manualmente.');
            // O podrías implementar un modal con opciones de copiar enlace/compartir en redes
            console.log('Web Share API no soportada.');
        });
    }

    // -------------------- Modal Share Button (Product) --------------------
    modalShareButton.addEventListener('click', async () => {
        const productName = modalProductName.textContent;
        const productUrl = window.location.href; // In a real app, this would be a specific product URL

        if (navigator.share) {
            try {
                await navigator.share({
                    title: `Producto: ${productName} en ComprasFaciles Online`,
                    text: `¡Mira este producto en ComprasFaciles Online: ${productName}!`,
                    url: productUrl
                });
                console.log('Producto compartido con éxito');
            } catch (error) {
                console.error('Error al compartir el producto:', error);
            }
        } else {
            alert(`Comparte ${productName}: ${productUrl}\n(La función de compartir no está soportada directamente)`);
        }
    });
});

// -------------------- Service Worker Registration --------------------
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registrado con éxito:', registration);
            })
            .catch(error => {
                console.error('Error al registrar el Service Worker:', error);
            });
    });
}