// API key should be placed in a proxy server for actual web service.
const privateKey = "2b1zn2ziGqMUl8yFBVuSCIN6Ev98Bh52PPrKelXB";

// Rover names used to query all photos from Nasa API.
let rovers = ["curiosity", "opportunity", "spirit"];

// Function called onLoad of body of index.html. Uses a timeout so that all web elements load before 
// querying the NASA API for the most recent date.
function onLoad() {
   setTimeout(function(){
      getMostRecentDate();
     }, 500);
}

// Used when the website is first loaded. This method is responsible for fetching the last date that rover pictures are 
// available on the NASA API. Only uses the curiousity rovers in the URL since it the only currently active rover.
function getMostRecentDate() {
   // By default the date is set to the current date and time.
   var date = new Date();
   
   // Need to reformat how the date is displayed so it can be deciphered by the NASA API.
   var formattedDate = convertDateFormat(date);  

   // Iterate backwards from today's date until a date with results is reached.
   // fetchMarsImagesSynchronous returns number of pictures taken from that date or -1 for a bad http request.
   while (fetchMarsImagesSynchronous(formattedDate, rovers[0]) == 0) {
      date.setDate(date.getDate() - 1);
      formattedDate = convertDateFormat(date);
   }
}

// Uses the user's input and queries the NASA API for that date.
function queryNewDate() {
   if (document.getElementById("date-input").value == "") {
      alert("No date has been specified");
      return;
   } 

   clearPhotos();

   var date = document.getElementById("date-input").value;
   var numOfPhotos = 0;

   // Get data for all three rovers.
   for (var i = 0; i < rovers.length; i++) {
      numOfPhotos += fetchMarsImagesSynchronous(date, rovers[i]);
   }

   if (numOfPhotos == 0) {
      noPhotosFound(date);
   }
}

// Constructs a URL to fetch data from the specific date. Uses synchronous HTTP requests because knowing number of photos on a date is required.
// Returns the number of photos the was returned from the request or -1 if the HTTP request was unsuccessful.
function fetchMarsImagesSynchronous(date, rover) {
   var url = "https://api.nasa.gov/mars-photos/api/v1/rovers/" + rover + "/photos?earth_date=" + date.toString() + "&api_key=" + privateKey;
   var xmlhttp = new XMLHttpRequest();

   // Send HTTP request that waits for response.
   xmlhttp.open("GET", url, false);
   xmlhttp.send();

   if (xmlhttp.status == 200) {
      var jsonObj = JSON.parse(xmlhttp.responseText);
      if (jsonObj.photos.length > 0) {
         displayPhotos(jsonObj);
         return jsonObj.photos.length;
      }
      return 0;
   }
   return -1;
}

// Convert date to the format the NASA API uses.
function convertDateFormat(date) {
   var ret = "";
   ret += date.getFullYear() + "-";
   ret += date.getMonth() + 1 + "-";
   ret += date.getDate();

   return ret;
}