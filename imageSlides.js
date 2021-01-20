/*Query JSON Structure
   photos:
      id: unsigned int
      sol: unsigned int
      camera { id, name, rover_id, full_name }
      img_src: url
      earth_date: date (YYYY-MM-DD)
      rover { id, name, landing_date, launch_date, status }
   
*/

// Array of photos that was returned by the NASA API
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
}

// Event for when no photos are returned for a user specified date.
function noPhotosFound(date) {
   if (photos.length == 0) {
      document.getElementById("error-message").innerHTML = "No photos found for " + date;
   }
}

// Slide show button method.
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
   displayData(current);
}

// Slide show button method.
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
   displayData(current);
}

// Takes the index of the current picture displayed and outputs the data to the UI elements.
function displayData(current) {
   document.getElementById("slide-img").src = (photos[current].img_src);
   document.getElementById("numbertext").innerHTML = (current + 1) + " / " + photos.length;
   document.getElementById("caption").innerHTML = photos[current].rover.name + " - " + photos[current].earth_date;
}