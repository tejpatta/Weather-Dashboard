// take in the city name input typed by the user
let citySearched = $("#search-input").val().trim();
//initialize latitude and longitude variables to store coordinates of City Search
let lat =""
let lon =""

//define API URLS
let geocodeURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + citySearched + '&limit=1&appid=1aff72a595bc5c38e3d0296bf6ef9274'
let fiveDayQueryURL = 'api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=1aff72a595bc5c38e3d0296bf6ef9274';
let currentWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=1aff72a595bc5c38e3d0296bf6ef9274';

// functions
// save the search term as a button
function generateCityButton(){
    //ASK TEAGUE FOR HELP
}
// get the latitude and longitude of the city searched 
function getCityCoordinates(){
    fetch(geocodeURL)
    .then(function (response) {
        return response.json();
      })
      .then(function(data){
    console.log(data);
    lat = data[0].lat;
    lon = data[0].lon;
    console.log(lat + " & " + lon)
      })

}

// clear existing display of current weather and forecast 
function clearView(){
    //ASK TEAGUE FOR HELP
}
//get and display the current weather
function displayCurrentWeather(){
    fetch(currentWeatherURL)
    .then(function(response){
        return response.json();
    })
    .then(function(data){

    })
}



//event listeners to run the functions

$("#search-button").on("click", function(event){ // ASK TEAGUE FOR HELP WITH PARAMETERS
clearView()
getCityCoordinates(citySearched); 
displayCurrentWeather();
})