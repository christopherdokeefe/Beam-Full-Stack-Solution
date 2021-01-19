// const imageSlide = document.querySelector('.image-slide');
// const images = doceument.querySelectorAll('.carousel-slide img')

// // Buttons 
// const prevButton = document.getElementById("prevButton");
// const nextButton = document.getElementById("nextButton");

// // Counter 
// let counter = 1;
// const size = carouselImages[0].clientWidth;

// carouselSlide.style.transform = ''

let photos;
let current;

function displayPhotos(jsonObj) {   
   photos = jsonObj.photos;
   current = 0;
   document.getElementById("slide-img").src = (photos[0].img_src);
}

function prevPhoto() {
   if (photos == null) {
      document.getElementById("console").innerHTML += "<br> Photos is empty";
      return;
   }

   var prev = current - 1;
   if (prev < 0) {
      prev = photos.length - 1;
   }

   document.getElementById("console").innerHTML += "<br>prev = " + prev;
   current = prev;
   document.getElementById("slide-img").src = (photos[prev].img_src);
}

function nextPhoto() {
   if (photos == null) {
      document.getElementById("console").innerHTML += "<br> Photos is empty";
      return;
   }

   var next = current + 1;
   if (next >= photos.length) {
      next = 0;
   }
   current = next;
   document.getElementById("slide-img").src = (photos[next].img_src);
}