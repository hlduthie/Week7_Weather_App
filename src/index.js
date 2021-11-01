//function to set up the current date and time

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

function todaysDay() {
  let now = new Date();
  let day = days[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let mins = now.getMinutes();
  if (mins < 10) {
    mins = `0${mins}`;
  }
  return `${day} ${hour}:${mins}`
}

let today = document.querySelector(".currentDay")
today.innerHTML = todaysDay();

// function to get the lat and long for the forecast

function getForecast(coordinates) {
  let apiKey = "1fb819a70022e5b5b0ca00fd56103479";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`  
  axios.get(apiURL).then(displayForecast);
}

// to display the name of the city, current temp, wind speed, weather description, display current temp icon
// and call the getForecast function

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector(".current-temp").innerHTML = Math.round(
    celciusTemperature = response.data.main.temp);
  document.querySelector("#wind2").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description2").innerHTML = response.data.weather[0].description;

  let currentIcon = document.querySelector("#currentTemp-icon");
  currentIcon.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  getForecast(response.data.coord);
}

// formatting the api timestamp from dt numbers to the name of a day

function formatDt(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"]
  return days[day];
}

// setting up the forecast for the next 6 days 
// index is the the numbers for the dt (0-8) - the next 8 days on the api
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function(forecastDay, index) {
    if (index > 0 && index < 7) {
    forecastHTML = forecastHTML +
    `<div class="col-2">
        <div class="forecast-day"> ${formatDt(forecastDay.dt)} </div>
        <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" class="futureTemp-icon" id="icon2"> </img>
        <div class="forecast-temp">
        <div class="col-6 following-temp neonText" id="day-temp">${Math.round(forecastDay.temp.day)}°C</div>
        </div>
    </div>`;
    }
  });
  
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// searching for the city using personel apiKey

function searchCity(city) {
  let apiKey = "1fb819a70022e5b5b0ca00fd56103479";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  let apiUrl_followingForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&cnt=40`;

  axios.get(apiUrl).then(showTemperature);
  axios.get(apiUrl_followingForecast).then(displayForecast);
}

// action after the user enters a city name

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector(".input-city").value;
  searchCity(city);
}

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", handleSubmit);

searchCity("New York");

function searchLocation(position) {
  let apiKey = "1fb819a70022e5b5b0ca00fd56103479";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude
    }&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#todaysTemp");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

}

function displayCelciusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#todaysTemp");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

//Global variables

let celciusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemperature);

let currentLocationButton = document.querySelector(".getCurrentLocation");
currentLocationButton.addEventListener("click", getCurrentLocation);

