// Your API key for cdok@uw.edu is:

// Need to remove private key from this file
let privateKey = "2b1zn2ziGqMUl8yFBVuSCIN6Ev98Bh52PPrKelXB";

// Query JSON Structure
   // photos ->
      // id: unsigned int
      // sol: unsigned int
      // camera { id, name, rover_id, full_name }
      // img_src: url
      // earth_date: date (YYYY-MM-DD)
      // rover { id, name, landing_date, launch date, status }


// Rover names used to query all photos from Nasa API
let rovers = ["curiosity", "opportunity", "spirit"];

// Used when the website is first loaded. This method is responsible for fetching
// the last date that rover pictures are available on the NASA API.
function onLoad() {
   // By default the date is set to the current date and time.
   var date = new Date();
   
   // Need to reformat how the date is displayed so it can be deciphered by the NASA API.
   var formattedDate = convertDateFormat(date);  

   document.getElementById("console").innerHTML += "<br>" + formattedDate;

   // Iterate backwards from today's date until a date with results is reached.
   // fetchMarsImagesSynchronous returns number of pictures taken from that date or -1 for a bad http request.
   while (fetchMarsImagesSynchronous(formattedDate) == 0) {
      date.setDate(date.getDate() - 1);
      formattedDate = convertDateFormat(date);
      document.getElementById("console").innerHTML += "<br>date " + formattedDate;
   }
}

// Uses the user's input and queries the NASA API for that date.
function queryNewDate() {
   if (document.getElementById("date-input").value == "") {
      alert("No date has been specified");
      return;
   } 

   var date = document.getElementById("date-input").value;
   fetchMarsImagesAsynchronous(date);
}

// Constructs a URL to fetch data from the specific date. Uses synchronous HTTP requests because knowing number of photos on a date is required to
// when first loading the webpage. Only uses the curiousity rovers in the URL since it is the only that is currently active.
//
// Returns the number of photos the was returned from the request or -1 if the HTTP request was unsuccessful.
function fetchMarsImagesSynchronous(date) {
   var url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=" + date.toString() + "&api_key=" + privateKey;
   var xmlhttp = new XMLHttpRequest();

   document.getElementById("console").innerHTML += "<br>" + url;

   // Send HTTP request that waits for response.
   xmlhttp.open("GET", url, false);
   xmlhttp.send();

   if (xmlhttp.status == 200) {
      var jsonObj = JSON.parse(xmlhttp.responseText);
      if (jsonObj.photos.length > 0) {
         document.getElementById("console").innerHTML += "<br>Num of pics " + jsonObj.photos.length;
         displayPhotos(jsonObj);
         return jsonObj.photos.length;
      }
      document.getElementById("console").innerHTML += "<br> no photos";
      return 0;
   }
   document.getElementById("console").innerHTML += "<br> bad http request" + xmlhttp.status;
   return -1;
}

// Constructs URLs for each NASA rover to fetch data from the specific date. Uses asynchronous HTTP requests since the result of the queries aren't needed. 
function fetchMarsImagesAsynchronous(date) {
   for (var i = 0; i < rovers.length; i++) {
      var url = "https://api.nasa.gov/mars-photos/api/v1/rovers/" + rovers[i] + "/photos?earth_date=" + date.toString() + "&api_key=" + privateKey;
      var xmlhttp = new XMLHttpRequest();

      document.getElementById("console").innerHTML += "<br>" + url;

      //Query the NASA api and determine how many 
      xmlhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
            var jsonObj = JSON.parse(this.responseText);

            document.getElementById("console").innerHTML += "<br>" + jsonObj.photos.length;
            
            if (jsonObj.photos.length > 0) {
               displayPhotos(jsonObj);
            }
         }
      };

      // Send HTTP request that 
      xmlhttp.open("GET", url, true);
      xmlhttp.send();
   }
}

// Convert date to the standard api format 
function convertDateFormat(date) {
   var ret = "";
   ret += date.getFullYear() + "-";
   ret += date.getMonth() + 1 + "-";
   ret += date.getDate();

   return ret;
}