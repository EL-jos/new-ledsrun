$('#el-hero-sliders.owl-carousel').owlCarousel({
    items: 1,
    loop: true,
    nav: true,
    
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