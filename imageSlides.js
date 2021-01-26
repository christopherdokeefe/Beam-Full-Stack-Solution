/*Query JSON Structure
   photos:
      id: unsigned int
      sol: unsigned int
      camera { id, name, rover_id, full_name }
      img_src: url
      earth_date: date (YYYY-MM-DD)
      rover { id, name, landing_date, launch_date, status }
   
*/

// Array of photos stored from the NASA API 
let photos = [];

// The index of the current photo being displayed
let current = 0;

// Clears the current photos and sets all the UI elements to their default values.
function clearPhotos() {
   photos = [];
   current = 0;

   document.getElementById("slide-img").src = "Images/Error-Photo.jpg";
   document.getElementById("numbertext").innerHTML = "";
   document.getElementById("caption").innerHTML = "";
   document.getElementById("error-message").innerHTML = "Loading Images...";
}

// Adds the photos gathered from the NASA API and displays the first picture.
function displayPhotos(jsonObj) {  
   // Clear the error message 
   document.getElementById("error-message").innerHTML = ""; 

   // Determine whether to replace the photos object or concat 
   if (photos == null || photos.length == 0) {
      photos = jsonObj.photos;
      current = 0;
   }
   else {
      photos = photos.concat(jsonObj.photos);
   }

   displayData(0);
   fadeAnimation();

   setTimeout(function() {
      preloadImages(jsonObj.photos)
   }, 100 );
}

// Loads recently fetched photos into browser's cache for faster retrival.
function preloadImages(photosToLoad) {
   if (!preloadImages.list) {
       preloadImages.list = [];
   }
   var list = preloadImages.list;
   for (var i = 0; i < photosToLoad.length; i++) {
       var img = new Image();
       img.onload = function() {
           var index = list.indexOf(this);
           if (index !== -1) {
               // remove image from the array once it's loaded
               // for memory consumption reasons
               list.splice(index, 1);
           }
       }
       list.push(img);
       img.src = photosToLoad[i].img_src;
   }
}

// Event for when no photos are returned for a user specified date.
function noPhotosFound(date) {
   if (photos.length == 0) {
      document.getElementById("error-message").innerHTML = "No photos found for " + date;
   }
}

// Slide show previous button.
function prevPhoto() {
   if (photos == null) return;

   var prev = current - 1;
   if (prev < 0) {
      prev = photos.length - 1;
   }
   
   current = prev;
   displayData(current);
   fadeAnimation();
}

// Slide show next button.
function nextPhoto() {
   if (photos == null) return;

   var next = current + 1;
   if (next >= photos.length) {
      next = 0;
   }
   current = next;
   displayData(current);
   fadeAnimation();
}

// Takes the index of the current picture displayed and outputs the data to the UI elements.
function displayData(current) {
   document.getElementById("slide-img").src = (photos[current].img_src);
   document.getElementById("numbertext").innerHTML = (current + 1) + " / " + photos.length;
   document.getElementById("caption").innerHTML = photos[current].rover.name + " - " + photos[current].earth_date;
}

// Triggers the fade animation
function fadeAnimation() {
   var image = document.getElementsByClassName("image-slide")[0];

   image.classList.remove('fade');

   // Must set timeout or the animation doesn't trigger
   setTimeout(function(){
      image.classList.add('fade');  
   }, 50);
}