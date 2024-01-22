// take in the city name input typed by the user
let citySearched = $("#search-input").val().trim();
//initialize latitude and longitude variables to store coordinates of City Search
let lat =""
let lon =""

//define API URLS
let geocodeURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + 'London' + '&limit=1&appid=1aff72a595bc5c38e3d0296bf6ef9274'

// functions
// save the search term as a button
function generateCityButton(){
    
}
// get the latitude and longitude of the city searched 
function dashboard(){
    fetch(geocodeURL)
    .then(function (response) {
        return response.json();
      })
      .then(function(data){
    lat = data[0].lat;
    lon = data[0].lon;
    let currentWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=1aff72a595bc5c38e3d0296bf6ef9274';
      displayCurrentWeather(currentWeatherURL);
    let forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=1aff72a595bc5c38e3d0296bf6ef9274';
        displayForecast(forecastURL);
    
    })

}

// clear existing display of current weather and forecast 
function clearView(){
    $('#today').empty()
    $('#forecast').empty()
}
//get and display the current weather
function displayCurrentWeather(url){
    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
    let cityName = data.name;
    let currentDate = dayjs().format('DD MMM YYYY');
    let icon = data.weather[0].icon;
    let iconURL = 'https://openweathermap.org/img/wn/'+ icon +'@2x.png'
    let currentTemperature = Math.round(data.main.temp)
    let currentWind = data.wind.speed
    let currentHumidity = data.main.humidity


    today.append(
        $('<div class="card p-3 m-2 border-warning">').append([
            $('<div class="card-header">').append(
                $('<h2>').text(cityName + ' '+ currentDate).append(
                $('<img>').attr('src', iconURL))), 
                $('<div class="card-body">').append([
                $('<p>').text('Temperature: '+ currentTemperature +'°C'),
                 $('<p>').text('Humidity: '+ currentHumidity +'%'),
                            $('<p>').text('Wind Speed: '+ currentWind +'kmph') 
                ])
                ])
                );
            });
        };

// get and display the weather forecast for the next five days

function displayForecast(url){
    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        forecast.append($('<h2> 5 days forecast </h2>'))

        for(let i=0; i<data.list.length; i=i+8){

            let dispayDate = dayjs(data.list[i].dt_txt).format('DD MMM YYYY');
            let icon = data.list[i].weather[0].icon;
            let iconURL = 'https://openweathermap.org/img/wn/'+ icon +'@2x.png';
            let temperature = Math.round(data.list[i].main.temp);
            let humidity = data.list[i].main.humidity;
            let windSpeed = data.list[i].wind.speed;
            
            forecast.append(
                $('<div class="card forecast p-2 m-2 border-warning" style="width: 12rem;">').append([
                $('<div class="card-header">').append([
                        $('<h4>').text(dispayDate),
                        $('<img>').attr('src', iconURL)]), 
                $('<div class="card-body">').append([
                        $('<p>').text('Temperature: '+ temperature +'°C'),
                        $('<p>').text('Humidity: '+ humidity +'%'),
                        $('<p>').text('Wind Speed: '+ windSpeed +'kmph') 
                     ])
                ])
            )
        }
    }
)}


//event listeners to run the functions

$("#search-button").on("click", function(event){
event.preventDefault();
clearView();
generateCityButton();
dashboard(); 
})