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
    });

    // Cerrar el menú al hacer clic en un enlace (para móviles)
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // -------------------- Product Modals --------------------
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

    // Sample descriptions for products (can be expanded)
    const productDescriptions = {
        "Juego de Sábanas de Lujo": "Experimenta la máxima comodidad con nuestro juego de sábanas de lujo. Fabricadas con algodón egipcio de alta calidad, estas sábanas ofrecen una suavidad inigualable y durabilidad para un descanso reparador.",
        "Set de Utensilios de Cocina": "Equipa tu cocina con este completo set de utensilios de acero inoxidable. Incluye todo lo necesario para preparar tus platillos favoritos con facilidad y estilo. Diseño ergonómico y resistente al calor.",
        "Aspiradora Robótica": "Simplifica la limpieza de tu hogar con nuestra aspiradora robótica inteligente. Programable, con sensores avanzados y alta potencia de succión para dejar tus pisos impecables sin esfuerzo. Compatible con asistentes de voz.",
        "Juego de Toallas de Algodón": "Envuelve tu cuerpo en la suavidad de nuestro juego de toallas de algodón 100%. Altamente absorbentes y de secado rápido, ideales para el uso diario. Disponibles en varios colores.",
        "Lámpara de Escritorio LED": "Ilumina tu espacio de trabajo con esta moderna lámpara de escritorio LED. Con intensidad de luz ajustable y brazo flexible, perfecta para estudiar, leer o trabajar. Ahorra energía y cuida tus ojos.",
        "Organizador de Armario Modular": "Maximiza el espacio de tu armario con este organizador modular. Fácil de ensamblar y personalizar, te permite mantener tu ropa y accesorios ordenados y accesibles. Materiales resistentes.",
        "Auriculares Inalámbricos": "Disfruta de tu música con total libertad con estos auriculares inalámbricos. Sonido de alta fidelidad, cancelación de ruido y batería de larga duración. Perfectos para deportes, viajes o el día a día.",
        "Smartwatch Avanzado": "Mantente conectado y monitorea tu salud con nuestro smartwatch de última generación. Notificaciones inteligentes, monitor de ritmo cardíaco, GPS y seguimiento de actividad. Estilo y funcionalidad en tu muñeca.",
        "Cámara de Seguridad WiFi": "Protege tu hogar con esta cámara de seguridad WiFi. Vigilancia en tiempo real, visión nocturna, detección de movimiento y audio bidireccional. Fácil instalación y control desde tu smartphone.",
        "Teclado Mecánico RGB": "Lleva tu experiencia de juego o escritura al siguiente nivel con este teclado mecánico retroiluminado RGB. Teclas de alta respuesta, durabilidad excepcional y efectos de iluminación personalizables.",
        "Batería Portátil de Alta Capacidad": "Nunca te quedes sin batería con esta power bank de alta capacidad. Carga tus dispositivos múltiples veces. Diseño compacto y ligero, ideal para viajes o emergencias.",
        "Disco Duro Externo SSD": "Expande tu almacenamiento con este disco duro externo SSD ultra rápido. Ideal para guardar fotos, videos y documentos. Resistente a golpes y vibraciones, con conexión USB 3.0.",
        "Camiseta de Algodón Orgánico": "Viste con comodidad y conciencia con nuestra camiseta de algodón orgánico. Suave, transpirable y respetuosa con el medio ambiente. Un básico esencial para tu guardarropa.",
        "Jeans Clásicos Azules": "Un clásico atemporal que no puede faltar en tu armario. Nuestros jeans azules ofrecen un ajuste perfecto y durabilidad excepcional. Versátiles para cualquier ocasión, de día o de noche.",
        "Vestido de Verano Floral": "Frescura y estilo con este hermoso vestido de verano floral. Tejido ligero y diseño vibrante, ideal para los días soleados. Combínalo con sandalias para un look casual y chic.",
        "Chaqueta Deportiva Ligera": "Mantente activo y protegido con esta chaqueta deportiva ligera. Ideal para tus entrenamientos al aire libre o para un estilo casual. Material transpirable y resistente al viento.",
        "Zapatillas Urbanas": "Camina con estilo y comodidad con nuestras zapatillas urbanas. Diseño moderno y suela acolchada para el uso diario. Perfectas para la ciudad y tus actividades cotidianas.",
        "Bufanda de Lana Suave": "Abrígate con estilo con esta bufanda de lana suave. Ideal para los días fríos, te brinda calidez y un toque elegante a tu atuendo. Amplia y cómoda.",
        "Libro Best-Seller": "Sumérgete en una cautivadora historia con este libro best-seller. Una lectura imprescindible que te mantendrá enganchado de principio a fin. Disponible en tapa dura.",
        "Juego de Mesa Familiar": "Reúne a la familia y amigos con este divertido juego de mesa. Horas de entretenimiento garantizadas, ideal para noches de juegos y reuniones. Fácil de aprender y jugar.",
        "Mochila Ergonómica": "Lleva tus pertenencias con comodidad y estilo en esta mochila ergonómica. Compartimentos organizados, soporte lumbar acolchado y resistencia al agua. Ideal para el día a día o viajes.",
        "Kit de Jardinería Básico": "Inicia tu propio jardín con este kit de jardinería básico. Incluye herramientas esenciales de alta calidad para cuidar tus plantas y flores. Perfecto para principiantes.",
        "Set de Maquillaje Profesional": "Crea looks impresionantes con este set de maquillaje profesional. Incluye una variedad de brochas, sombras y labiales de alta pigmentación para cualquier ocasión.",
        "Termo de Acero Inoxidable": "Mantén tus bebidas frías o calientes por horas con este termo de acero inoxidable. Ideal para el café de la mañana o el agua helada en el gimnasio. Duradero y fácil de limpiar.",
        "Guitarra Acústica Usada": "Inicia tu pasión por la música o mejora tus habilidades con esta guitarra acústica usada en excelente estado. Sonido cálido y resonante, ideal para cualquier nivel.",
        "Bicicleta de Montaña Usada": "Explora nuevos senderos con esta bicicleta de montaña usada. Lista para la aventura, con suspensión y cambios que garantizan un viaje suave. Mantenimiento al día.",
        "Consola de Videojuegos Antigua": "Revive la nostalgia con esta consola de videojuegos antigua. Incluye juegos clásicos y accesorios. Perfecta para coleccionistas o para recordar viejos tiempos.",
        "Cámara Reflex Usada": "Captura momentos inolvidables con esta cámara réflex usada. Ideal para entusiastas de la fotografía, con múltiples funciones y lentes intercambiables. En buen estado de conservación.",
        "Equipo de Sonido Vintage": "Disfruta de un sonido auténtico con este equipo de sonido vintage. Perfectamente funcional, con diseño retro y calidad de audio inigualable. Para los amantes de lo clásico.",
        "Set de Palos de Golf Usados": "Mejora tu juego con este set de palos de golf usados. Incluye drivers, hierros y putter. Ideal para golfistas que buscan calidad a un precio accesible.",
        "Smart TV 4K de 55 pulgadas": "Sumérgete en una experiencia visual inmersiva con esta Smart TV 4K de 55 pulgadas. Colores vibrantes, detalles nítidos y acceso a tus aplicaciones favoritas. Conexión Wi-Fi integrada.",
        "Cafetera Programable": "Despierta con el aroma de tu café recién hecho gracias a esta cafetera programable. Prepara tu bebida favorita con solo pulsar un botón. Capacidad para varias tazas y filtro permanente.",
        "Zapatillas Deportivas Edición Limitada": "Destaca en tus entrenamientos con estas zapatillas deportivas de edición limitada. Diseño exclusivo, amortiguación avanzada y tracción superior. Perfectas para corredores y atletas.",
        "Kit de Herramientas Completo": "Ten siempre la herramienta adecuada a mano con este kit completo. Incluye destornilladores, llaves, alicates y más. Ideal para reparaciones en casa o proyectos de bricolaje."
    };


    productCards.forEach(card => {
        card.addEventListener('click', () => {
            const productName = card.dataset.name;
            const productPrice = card.dataset.price;
            const productImage = card.dataset.image;
            const productDescription = productDescriptions[productName] || "Descripción detallada del producto.";

            modalProductImage.src = productImage;
            modalProductName.textContent = productName;
            modalProductDescription.textContent = productDescription;
            modalProductPrice.textContent = `$${parseFloat(productPrice).toFixed(2)}`;

            // Set data attributes for WhatsApp link in modal
            modalBuyButton.dataset.productName = productName;
            modalBuyButton.dataset.productPrice = productPrice;
            modalBuyButton.dataset.productImage = productImage;

            productModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Evitar scroll del body cuando el modal está abierto
        });
    });

    closeModalButton.addEventListener('click', () => {
        productModal.style.display = 'none';
        document.body.style.overflow = ''; // Restaurar scroll del body
    });

    window.addEventListener('click', (event) => {
        if (event.target == productModal) {
            productModal.style.display = 'none';
            document.body.style.overflow = ''; // Restaurar scroll del body
        }
    });

    // Share and Favorite Buttons in Modal (Example - can be extended)
    modalFavoriteButton.addEventListener('click', () => {
        alert('Producto añadido a favoritos!');
        // Implement real favorite logic here (e.g., save to localStorage)
    });

    modalShareButton.addEventListener('click', () => {
        const productUrl = window.location.href; // Or a specific product URL
        const productName = modalProductName.textContent;

        if (navigator.share) {
            navigator.share({
                title: `Mira este producto en Tu Tienda Online: ${productName}`,
                text: `¡Me encanta este producto! ${productName} por ${modalProductPrice.textContent}`,
                url: productUrl
            }).then(() => {
                console.log('Contenido compartido con éxito');
            }).catch((error) => {
                console.error('Error al compartir:', error);
                alert('No se pudo compartir. Por favor, copia el enlace manualmente.');
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            const dummyInput = document.createElement('textarea');
            document.body.appendChild(dummyInput);
            dummyInput.value = `¡Mira este producto! ${productName} - ${modalProductPrice.textContent} - ${productUrl}`;
            dummyInput.select();
            document.execCommand('copy');
            document.body.removeChild(dummyInput);
            alert('Enlace del producto copiado al portapapeles. ¡Compártelo!');
        }
    });

    // -------------------- WhatsApp Buy Links --------------------
    const buyButtons = document.querySelectorAll('.buy-button');
    buyButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent modal from opening when clicking buy button inside product card
            const productName = button.dataset.productName;
            const productPrice = button.dataset.productPrice;
            const productImage = button.dataset.productImage; // Image URL for the product

            const whatsappNumber = '573205893469';
            const message = `¡Hola! Me gustó este producto, excelente. Un asesor me atenderá en minutos. \n\nProducto: ${productName}\nPrecio: $${parseFloat(productPrice).toFixed(2)}\nImagen: ${productImage}`; // Added image URL

            const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappLink, '_blank');
        });
    });

    // -------------------- Footer Share Button --------------------
    const sharePageButton = document.querySelector('.share-page-button');
    sharePageButton.addEventListener('click', () => {
        if (navigator.share) {
            navigator.share({
                title: 'Tu Tienda Online - ¡Las mejores ofertas!',
                text: 'Descubre productos increíbles y precios inigualables en nuestra tienda.',
                url: window.location.href
            }).then(() => {
                console.log('Página compartida con éxito');
            }).catch((error) => {
                console.error('Error al compartir la página:', error);
                alert('No se pudo compartir la página. Por favor, copia el enlace manualmente.');
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            const dummyInput = document.createElement('textarea');
            document.body.appendChild(dummyInput);
            dummyInput.value = window.location.href;
            dummyInput.select();
            document.execCommand('copy');
            document.body.removeChild(dummyInput);
            alert('Enlace de la página copiado al portapapeles. ¡Compártelo!');
        }
    });

    // -------------------- FAQ Accordion --------------------
    const faqItems = document.querySelectorAll('.faq-item h3');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const parent = item.parentElement;
            parent.classList.toggle('active');
        });
    });

    // -------------------- PWA Installation Prompt --------------------
    let deferredPrompt;
    const installPromptContainer = document.getElementById('install-prompt');
    const installButton = document.getElementById('install-button');

    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 76 and later from showing the mini-infobar
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;
        // Update UI to notify the user they can add to home screen
        installPromptContainer.classList.add('show');
        console.log('beforeinstallprompt fired');
    });

    installButton.addEventListener('click', async () => {
        installPromptContainer.classList.remove('show');
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        // Optionally, send analytics event with outcome of user choice
        console.log(`User response to the install prompt: ${outcome}`);
        // We've used the prompt, and can't use it again, clear it.
        deferredPrompt = null;
    });

    window.addEventListener('appinstalled', () => {
        // Hide the install prompt
        installPromptContainer.classList.remove('show');
        console.log('PWA was installed');
    });

    // Check if the app is already installed (for display-mode: standalone/fullscreen)
    if (window.matchMedia('(display-mode: standalone)').matches || window.matchMedia('(display-mode: fullscreen)').matches) {
        console.log('PWA is running in standalone mode (installed)');
        installPromptContainer.style.display = 'none'; // Hide if already installed
    }

    // Optional: Fullscreen on PWA launch if not already
    // This is more complex and browser-dependent.
    // Generally, manifest 'display' property handles this.
    // For a manual attempt, you'd check `window.innerHeight == screen.height`
    // or use a dedicated Fullscreen API, which typically requires user interaction.
});

// -------------------- Service Worker Registration --------------------
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registrado con éxito:', registration);
            })
            .catch(error => {
                console.error('Fallo el registro del Service Worker:', error);
            });
    });
}


