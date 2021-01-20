let photos;
let current;

function addPhotos(jsonObj) {
   if (photos == null) {
      displayPhotos(jsonObj)
   }
   else {
      photos += 
   }
}

function clearPhotos() {
   delete photos;
   current = 0;
}

function displayPhotos(jsonObj) {   
   photos = jsonObj.photos;
   current = 0;
   document.getElementById("slide-img").src = (photos[0].img_src);
   document.getElementById("numbertext").innerHTML = "1 / " + photos.length;
   document.getElementById("caption").innerHTML = photos[0].rover.name + " - " + photos[0].earth_date;
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
   
   current = prev;
   document.getElementById("slide-img").src = (photos[prev].img_src);
   document.getElementById("numbertext").innerHTML = (current + 1) + " / " + photos.length;
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
   document.getElementById("numbertext").innerHTML = (current + 1) + " / " + photos.length;
}