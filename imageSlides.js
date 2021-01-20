let photos;
let current;

function addPhotos(jsonObj) {
   if (photos.length == 0) {
      displayPhotos(jsonObj)
   }
   else {

   }
}

function clearPhotos() {
   photos = [];
   current = 0;

   document.getElementById("slide-img").src = "Images/Error-Photo.jpg";
   document.getElementById("numbertext").innerHTML = "";
   document.getElementById("caption").innerHTML = "";
   document.getElementById("error-message").innerHTML = "Loading Images...";
}

function noPhotosFound(date) {
   if (photos.length == 0) {
      document.getElementById("error-message").innerHTML = "No photos found for " + date;
   }
}

function displayPhotos(jsonObj) {  
   // Clear the error message 
   document.getElementById("error-message").innerHTML = ""; 

   // Determine whether to replace the photos object or concat 
   if (photos == null || photos.length == 0) {
      photos = jsonObj.photos;
      current = 0;
   }
   else {
      addPhotos(jsonObj);
   }
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