const imageSlide = document.querySelector('.image-slide');
const images = doceument.querySelectorAll('.carousel-slide img')

// Buttons 
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

// Counter 
let counter = 1;
const size = carouselImages[0].clientWidth;

carouselSlide.style.transform = ''