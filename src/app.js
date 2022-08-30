// Location Button
let locationButton = document.querySelector("button");
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}
locationButton.addEventListener("click", getCurrentPosition);

//  Current Location
function currentPosition(position) {
  let apiKey = "5d98d72afef93f95a4b9d79718338c1e";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(url).then(currentWeather);
}

// Search Form
function enterCity(event) {
  event.preventDefault();
  let submit = document.querySelector("#city");
  searchEnterCity(submit.value);
}
let form = document.querySelector(".search-form");
form.addEventListener("submit", enterCity);

function searchEnterCity(city) {
  let apiKey = "5d98d72afef93f95a4b9d79718338c1e";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(url).then(currentWeather);
}
// default city
searchEnterCity("Kharkiv");

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

// Day + Date + Mounth
function forecastDate(dateTemp) {
  let dateNow = new Date(dateTemp * 1000);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dateNow.getDay()];

  let date = dateNow.getDate();
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
  let month = months[date.getMonth()];

  return `${day}, ${date} ${month}`;
}

// Display Weather Forecast Cards
function displayWeatherForecast(response) {
  let weatherForecast = response.data.daily;

  let forecastCards = document.querySelector("#weather-forecast-cards");

  forecastHTML = `<div class="row">`;

  weatherForecast.forEach(function (weatherForecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-sm-auto div-cards">
      <h2 class="days">${forecastDate(weatherForecastDay.dt)}</h2>
      <div class="card">
        <div class="card-body">
          <img
            src="https://openweathermap.org/img/wn/${
              weatherForecastDay.weather[0].icon
            }2x.png"
            alt="${weatherForecastDay.weather[0].description} "
          />
          <p class="card-text">
            <i
              class="fa-solid fa-temperature-low"
              title="temperature"
            ></i>
            <span class="day-temp">${Math.round(
              weatherForecastDay.temp.max
            )}</span
            ><span class="celsius">℃</span>
            <span class="separate">|</span>
            <span class="night-temp">${Math.round(
              weatherForecastDay.temp.min
            )}</span
            ><span class="celsius">℃</span>
          </p>
          <p class="card-text">
            <i class="fa-solid fa-wind" title="wind"></i>
            <span class="wind">${Math.round(
              weatherForecastDay.weather.wind_speed
            )}</span>
            <span class="units">km/h</span>
          </p>
          <p class="card-text">
            <i class="fa-solid fa-droplet" title="humidity"></i>
            <span class="humidity">15</span>
            <span class="units">%</span>
          </p>
        </div>
      </div>
    </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastCards.innerHTML = forecastHTML;
}

function weatherForecast(coordinates) {
  console.log(coordinates);
  // let apiKey = "5d98d72afef93f95a4b9d79718338c1e";
  let apiKey = "b40b135798f82a05aed08769f9275f50";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeatherForecast);
}
// weather
function currentWeather(response) {
  console.log(response.data);
  // city
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = response.data.name;

  // temperature
  let tempNow = document.querySelector("#tempNow");
  celsiusTemperature = response.data.main.temp;
  tempNow.innerHTML = Math.round(celsiusTemperature);

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

  // Icon
  let mainIcon = document.querySelector("#main-icon");
  mainIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  mainIcon.setAttribute("alt", response.data.weather[0].description);

  weatherForecast(response.data.coord);
}
// celsius | fahrenheit conversion

function celsiusToFahrenheit(event) {
  event.preventDefault();
  let tempNow = document.querySelector("#tempNow");
  celsiusTempLink.classList.remove("active-link");
  fahrenheitTempLink.classList.add("active-link");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  tempNow.innerHTML = Math.round(fahrenheitTemp);
}
let celsiusTemperature = null;

let fahrenheitTempLink = document.querySelector("#fahrenheit");
fahrenheitTempLink.addEventListener("click", celsiusToFahrenheit);

function fahrenheitToCelsius(event) {
  event.preventDefault();
  let tempNow = document.querySelector("#tempNow");
  celsiusTempLink.classList.add("active-link");
  fahrenheitTempLink.classList.remove("active-link");
  tempNow.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTempLink = document.querySelector("#celsius");
celsiusTempLink.addEventListener("click", fahrenheitToCelsius);
