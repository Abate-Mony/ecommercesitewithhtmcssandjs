// // test here

// const swiper = new Swiper(
//     ".swiper", {
//         slidesPerView: 1,
//         spaceBetween: 10,
//         breakpoints: {
//             320: {
//                 slidesPerView: 2,
//                 spaceBetween: 20
//             },
//             480: {
//                 slidesPerView: 3,
//                 spaceBetween: 30
//             },
//             640: {
//                 slidesPerView: 4,
//                 spaceBetween: 40
//             }
//         }
//     }

// )
// console.log(swiper);



new Swiper(".carouselbox", {

    spaceBetween: 30,
    slidesPerView: "auto",
    centerSlides: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {

        481: {
            slidesPerView: 2,
            slidesPerGroup: 1,

            centeredSlides: false
        },
        680: {
            slidesPerView: 3,
            slidesPerGroup: 3,

            centeredSlides: false
        },
        992: {
            slidesPerView: 4,
            slidesPerGroup: 4,

            centeredSlides: false
        },

    }
})
carousel.nextSlide()