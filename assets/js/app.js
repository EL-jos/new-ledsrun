$(document).ready(function () {
    const $scrollBtn = $('#el-scrollToTop');

    // Affiche ou masque le bouton quand on scrolle
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 300) {
            $scrollBtn.addClass('show');
        } else {
            $scrollBtn.removeClass('show');
        }
    });

    // Animation fluide de retour en haut
    $scrollBtn.on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 600, 'swing');
    });

    //OWL CAROUSEL
    $('#el-hero-sliders.owl-carousel').owlCarousel({
        items: 1,
        loop: true,
        nav: true,
        autoplay: true,
        autoplaySpeed: 1000,
        smartSpeed: 1500,
        autoplayHoverPause: true
    });

    $('.el-bestsellers .owl-carousel').owlCarousel({
        items: 1,
        loop: true,
        nav: false,
        dots: false,
        margin: 10
    });

    $('#el-blogs .owl-carousel').owlCarousel({
        items: 1,
        loop: true,
        nav: false,
        dots: true,
        margin: 10,
        responsive: {
            768: {
                items: 2
            },
            992: {
                items: 3
            },
            1366: {
                items: 4,
                dots: false
            }
        }
    });

    // Animation Anime.js
    /* anime.timeline({ loop: true })
        .add({
            targets: "#el-hero-sliders .el-slider .el-container-top",
            translateY: ["-50px", 0],
            translateX: ["-50px", 0],
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 1000,
            offset: 0
        })

        .add({
            targets: "#el-hero-sliders .el-slider .el-container-middle h2",
            translateY: ["50px", 0],
            translateX: ["-50px", 0],
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 1000,
            //delay: (el, i) => 50 + i * 80,
            offset: 0
        })
        
        .add({
            targets: "#el-hero-sliders .el-slider .el-container-bottom",
            translateY: ["50px", 0],
            translateX: ["-50px", 0],
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 1000,
            //delay: (el, i) => 50 + i * 80,
            offset: 0
        }); */
   
    /* // Animation du slider actif
    function animateCurrentSlide() {
        const activeSlider = document.querySelector('.owl-item.active .el-slider'); // Owl ajoute la classe 'active' à .owl-item

        if (activeSlider) {

            const config = {
                duration: 1300,
                easing: "easeOutExpo"
            }
            // Animer .el-container-top
            anime({
                targets: activeSlider.querySelector('.el-container-top'),
                translateY: ["-50px", 0],
                translateX: ["-100px", 0],
                opacity: [0, 1],
                easing: config.easing,
                duration: config.duration
            });

            // Animer les <h2> dans .el-container-middle avec un décalage
            anime({
                targets: activeSlider.querySelectorAll('.el-container-middle h2'),
                translateY: ["50px", 0],
                translateX: ["-100px", 0],
                opacity: [0, 1],
                easing: config.easing,
                duration: config.duration,
                delay: (el, i) => i * 100
            });

            // Animer .el-container-bottom
            anime({
                targets: activeSlider.querySelector('.el-container-bottom'),
                translateY: ["50px", 0],
                translateX: ["-100px", 0],
                opacity: [0, 1],
                easing: config.easing,
                duration: config.duration
            });
        }
    }

    // Initialiser la 1ère animation
    animateCurrentSlide();

    // Ré-animer à chaque changement de slide
    jQuery('#el-hero-sliders').on('changed.owl.carousel', function (event) {
        setTimeout(animateCurrentSlide, 10); // Petit délai pour s'assurer que la classe 'active' est mise à jour
    }); */

});

let previousIndex = 0;
let currentDirection = null;

// Fonction pour déterminer la direction
function getDirection(currentIndex, prevIndex, total) {
    if ((currentIndex > prevIndex && currentIndex - prevIndex < total / 2) ||
        (prevIndex - currentIndex > total / 2)) {
        return "next";
    } else {
        return "prev";
    }
}

// Animation du slider actif
function animateCurrentSlide(direction = 'next') {
    const activeSlider = document.querySelector('.owl-item.active .el-slider');
    if (!activeSlider) return;

    const translateXValue = direction === 'next' ? '100px' : '-100px';
    const config = { duration: 1300, easing: "easeOutExpo" };

    // Animation du top
    anime({
        targets: activeSlider.querySelector('.el-container-top'),
        translateY: ["-50px", 0],
        translateX: [translateXValue, 0],
        opacity: [0, 1],
        easing: config.easing,
        duration: config.duration
    });

    // Animation des h2 avec décalage
    anime({
        targets: activeSlider.querySelectorAll('.el-container-middle h2'),
        translateY: ["50px", 0],
        translateX: [translateXValue, 0],
        opacity: [0, 1],
        easing: config.easing,
        duration: config.duration,
        delay: (el, i) => i * 100
    });

    // Animation du bottom
    anime({
        targets: activeSlider.querySelector('.el-container-bottom'),
        translateY: ["50px", 0],
        translateX: [translateXValue, 0],
        opacity: [0, 1],
        easing: config.easing,
        duration: config.duration
    });
}

// Initialiser la 1ère animation
animateCurrentSlide('next');

jQuery('#el-hero-sliders').on('initialized.owl.carousel', function (event) {
    previousIndex = event.item.index;
});

jQuery('#el-hero-sliders').on('translate.owl.carousel', function (event) {
    const currentIndex = event.item.index;
    const total = event.item.count;

    currentDirection = getDirection(currentIndex, previousIndex, total);

    setTimeout(() => animateCurrentSlide(currentDirection), 1000);

    previousIndex = currentIndex;
});

jQuery('#el-hero-sliders').on('translated.owl.carousel', function (event) {
    //setTimeout(() => animateCurrentSlide(currentDirection), 1000);
    const currentIndex = event.item.index;
    const total = event.item.count;

    // Récupérer le slider précédent
    const previousSlider = document.querySelector(`.owl-item:nth-child(${previousIndex}) .el-slider`);

    if (previousSlider) {
        let top = previousSlider.querySelector('.el-container-top');
        resetCSS(top);
        let middle = previousSlider.querySelectorAll('.el-container-middle h2');
        resetCSS(middle);
        let bottom = previousSlider.querySelector('.el-container-bottom');
        resetCSS(bottom)
    }
    
});

// Réinitialiser les styles CSS pour un élément ou plusieurs
function resetCSS(elements) {
    if (elements.length) {
        elements.forEach(el => {
            el.style.opacity = 0;
            el.style.transform = 'translateY(50px) translateX(100px)'; // ou -50px selon le cas
        });
    } else {
        elements.style.opacity = 0;
        elements.style.transform = 'translateY(50px) translateX(100px)';
    }
}