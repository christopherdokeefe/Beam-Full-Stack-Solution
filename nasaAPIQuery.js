// Your API key for cdok@uw.edu is:

// Need to remove private key from this file
let privateKey = "2b1zn2ziGqMUl8yFBVuSCIN6Ev98Bh52PPrKelXB";

// Queuy Structure
// photos ->
// id: unsigned int
// sol: unsigned int
// camera { id, name, rover_id, full_name }
// img_src: url
// earth_date: date (YYYY-MM-DD)
// rover { id, name, landing_date, launch date, status }


// Rover names used to query all photos from Nasa API
let rovers = ["curiosity", "opportunity", "spirit"];

function onLoad() {
   // By default the date is set to the current date and time.
   var date = new Date();
   var formattedDate = convertDateFormat(date);  

   document.getElementById("console").innerHTML += "<br>" + formattedDate;

   // Iterate backwards from today's date until a date with results appears.
   while (fetchMarsImages(formattedDate) == 0) {
      document.getElementById("console").innerHTML += "<br>date " + formattedDate;

      date.setDate(date.getDate() - 1);
      formattedDate = convertDateFormat(date);
      setTimeout(100);
   }
}


function queryNewDate() {
   if (document.getElementById("date-input").value == "")  return;

   var date = document.getElementById("date-input").value;
   fetchMarsImages(date);
}

function fetchMarsImages(date) {
   var url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=" + date.toString() + "&api_key=" + privateKey;
   var xmlhttp = new XMLHttpRequest();

   document.getElementById("console").innerHTML += "<br>" + url;

   // Query the NASA api and determine how many 
   // xmlhttp.onreadystatechange = function() {
   //    if (this.readyState == 4 && this.status == 200) {
   //       var jsonObj = JSON.parse(this.responseText);

   //       document.getElementById("console").innerHTML += "<br>" + jsonObj.photos.length;
         
   //       if (jsonObj.photos.length > 0) {
   //          pictures = jsonObj.photos.length;
   //          displayPhotos(jsonObj);
   //       }
   //    }
   // };

   xmlhttp.open("GET", url, false);
   xmlhttp.send();

   if (xmlhttp.status == 200) {
      var jsonObj = JSON.parse(xmlhttp.responseText);
      if (jsonObj.photos.length > 0) {
         displayPhotos(jsonObj);
         return jsonObj.photos.length;
      }
      document.getElementById("console").innerHTML += "<br> no photos";
      return 0;
   }
   document.getElementById("console").innerHTML += "<br> bad http request";
   return -1;
}


function displayPhotos(arr) {   
   var photos = arr.photos;
   document.getElementById("slide-img").src = (photos[0].img_src);
}

// Convert date to the standard api format 
function convertDateFormat(date) {
   var ret = "";
   ret += date.getFullYear() + "-";
   ret += date.getMonth() + 1 + "-";
   ret += date.getDate();

   return ret;
}