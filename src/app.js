let now = new Date();
// Day + Date + Mounth
function date(dayDateMonth) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayDateMonth.getDay()];
  let date = dayDateMonth.getDate();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[dayDateMonth.getMonth()];
  return `${day}, ${date} ${month}`;
}
let dayDateMonth = document.querySelector("#first-day");
dayDateMonth.innerHTML = date(now);

// Location Button
let locationButton = document.querySelector("button");
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}
locationButton.addEventListener("click", getCurrentPosition);

//  Current Location
function currentPosition(position) {
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=5d98d72afef93f95a4b9d79718338c1e`;
  axios.get(url).then(currentWeather);
}

// Search Form
function enterCity(event) {
  event.preventDefault();
  let submit = document.querySelector("#city");
  let city = submit.value;
  searchEnterCity(city);
}
let form = document.querySelector(".search-form");
form.addEventListener("submit", enterCity);

function searchEnterCity(city) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=5d98d72afef93f95a4b9d79718338c1e`;
  axios.get(url).then(currentWeather);
}
searchEnterCity("Kyiv");

// Last Update
function lastUpdate(update) {
  let date = new Date(update);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

// weather
function currentWeather(response) {
  console.log(response.data);
  // city
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = response.data.name;

  // temperature
  let tempNow = document.querySelector("#tempNow");
  tempNow.innerHTML = Math.round(response.data.main.temp);

  // Humidity
  let humidityMain = document.querySelector(".humidity-main");
  humidityMain.innerHTML = Math.round(response.data.main.humidity);

  // Wind
  let windMain = document.querySelector(".wind-main");
  windMain.innerHTML = Math.round(response.data.wind.speed);

  // Sky
  let skyNow = document.querySelector("#sky-now");
  skyNow.innerHTML = response.data.weather[0].description;

  // Date
  let dayTime = document.querySelector("#currentDayTime");
  dayTime.innerHTML = lastUpdate(response.data.dt * 1000);
}

// celsius | fahrenheit conversion

function celsiusToFahrenheit(event) {
  event.preventDefault();
  let tempNow = document.querySelector("#tempNow");

  let celsiusTemp = document.querySelector("#celsius");
}

function fahrenheitToCelsius(event) {
  event.preventDefault();
  let tempNow = document.querySelector("#tempNow");

  let fahrenheitTemp = document.querySelector("fahrenheit");
}
// celsius | fahrenheit
// function celsiusToFahrenheit(event) {
//   event.preventDefault();
//   let tempNow = document.querySelector("#tempNow");
//   let fahrCal = `${Math.round((28 * 9) / 5 + 32)}`;
//   tempNow.innerHTML = `${fahrCal}`;
// }
// let fahrenheit = document.querySelector("#fahrenheit");
// fahrenheit.addEventListener("click", celsiusToFahrenheit);

// fahrenheit | celsius
// function fahrenheitToCelsius(event) {
//   event.preventDefault();
//   let tempNow = document.querySelector("#tempNow");
//   let celCal = `${Math.round((82 - 32) / 1.8)}`;
//   tempNow.innerHTML = `${celCal}`;
// }
// let celsius = document.querySelector("#celsius");
// celsius.addEventListener("click", fahrenheitToCelsius);
