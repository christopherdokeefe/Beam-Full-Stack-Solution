// Your API key for cdok@uw.edu is:

// Need to remove private key from this file
var privateKey = "2b1zn2ziGqMUl8yFBVuSCIN6Ev98Bh52PPrKelXB";

// Queuy Structure
// photos ->
// id: unsigned int
// sol: unsigned int
// camera { id, name, rover_id, full_name }
// img_src: url
// earth_date: date (YYYY-MM-DD)
// rover { id, name, landing_date, launch date, status }


// Rover names used to query all photos from Nasa API
var rovers = ["curiosity", "opportunity", "spirit"];
var date;


// Fetch the JSON object from the NASA api
function fetchMarsImages() {
   if (document.getElementById("date-input").value == "") {
      date = convertDateFormat(new Date());
   }
   else {
      date = document.getElementById("date-input").value;
   }
   document.getElementById("console").innerHTML += "<br>" + date;

   var url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=" + date + "&api_key=" + privateKey;
   var xmlhttp = new XMLHttpRequest();

   document.getElementById("console").innerHTML += "<br>" + url;

   xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         var jsonObj = JSON.parse(this.responseText);
         displayPhotos(jsonObj);
      }
   };

   xmlhttp.open("GET", url, true);
   xmlhttp.send();
}

// 
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