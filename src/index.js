
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

function todaysDay(){
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

//fuction for setting the following days
function getDay2(){
  let today = new Date();
  let tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  let day = days[tomorrow.getDay()];
  return `${day}`
}

function getDay3(){
  let today = new Date();
  let tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 2);
  let day = days[tomorrow.getDay()];
  return `${day}`
}

function getDay4(){
  let today = new Date();
  let tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 3);
  let day = days[tomorrow.getDay()];
  return `${day}`
}

function getDay5(){
  let today = new Date();
  let tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 4);
  let day = days[tomorrow.getDay()];
  return `${day}`
}

function getDay6(){
  let today = new Date();
  let tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 5);
  let day = days[tomorrow.getDay()];
  return `${day}`
}

function getDay7(){
  let today = new Date();
  let tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 6);
  let day = days[tomorrow.getDay()];
  return `${day}`
}

let day2 = document.querySelector("#day2")
day2.innerHTML = getDay2();
let day3 = document.querySelector("#day3")
day3.innerHTML = getDay3();
let day4 = document.querySelector("#day4")
day4.innerHTML = getDay4();
let day5 = document.querySelector("#day5")
day5.innerHTML = getDay5();
let day6 = document.querySelector("#day6")
day6.innerHTML = getDay6();


function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector(".current-temp").innerHTML = Math.round(
    celciusTemperature);
  document.querySelector("#wind2").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description2").innerHTML = response.data.weather[0].description;
  console.log(response.data);
    
  let currentIcon = document.querySelector("#currentTemp-icon");
  currentIcon.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  celciusTemperature = response.data.main.temp;
}

function showFollowingTemp(response) {
  console.log(response.data)
  document.querySelector("#day2-temp").innerHTML = Math.round(response.data.list[5].main.temp_max);
  document.querySelector("#day3-temp").innerHTML = Math.round(response.data.list[13].main.temp_max);
  document.querySelector("#day4-temp").innerHTML = Math.round(response.data.list[21].main.temp_max);
  document.querySelector("#day5-temp").innerHTML = Math.round(response.data.list[30].main.temp_max);
  document.querySelector("#day6-temp").innerHTML = Math.round(response.data.list[37].main.temp_max);
}

function searchCity(city) {
  let apiKey = "1fb819a70022e5b5b0ca00fd56103479";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  let apiUrl_followingDays = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&cnt=40`;

  axios.get(apiUrl).then(showTemperature);
  axios.get(apiUrl_followingDays).then(showFollowingTemp);
  
}

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
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${
    position.coords.latitude
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

