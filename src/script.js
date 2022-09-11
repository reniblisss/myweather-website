let now = new Date();
let currentDate = document.querySelector("h2.date");

let day = now.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let week = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return days[day];
}
currentDate.innerHTML = `${week}, ${hours}:${minutes}`;
function displayForecast(response) {
  console.log(response.data);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  forecast.forEach(function (forecastDay, index) {
    if (index < 7) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
        <div class="forecast-block">
        <div class="days">${formatDay(forecastDay.dt)}</div>
        <img src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" width="42"/>
      <div class="forecast-temperature">
        <span class="max-forecast-temp">${Math.round(
          forecastDay.temp.max
        )}°</span>
      /
    <span class="min-forecast-temperature">${Math.round(
      forecastDay.temp.min
    )}°</span>
    </div>
    </div>
    </div>
`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}
function getForecast(coordinates) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";

  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=5f472b7acba333cd8a035ea85a0d4d4c&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemp(response) {
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#min-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#max-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document
    .querySelector("#image")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  getForecast(response.data.coord);
}
function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-field").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c9c90b15b0f5f19c221c3a697ab4d437&units=metric`;
  axios.get(apiUrl).then(showTemp);
  let searchInput = document.querySelector("#search-field");
  let h1 = document.querySelector("h1");
  h1.innerHTML = searchInput.value;
}

let form = document.querySelector(".search-form");
form.addEventListener("submit", search);

function currentTemperature(response) {
  let h1 = document.querySelector("h1");
  let temp = document.querySelector("#temperature");
  h1.innerHTML = response.data.name;
  temp.innerHTML = Math.round(response.data.main.temp);
}

function showInfo(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=c9c90b15b0f5f19c221c3a697ab4d437&units=metric`;
  axios.get(url).then(currentTemperature);
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showInfo);
}

let buttonLocation = document.querySelector("#geolocation");
buttonLocation.addEventListener("click", getCurrentPosition);

function fahrenConversion(event) {
  event.preventDefault();
  let fahrenhTemp = document.querySelector("#temperature");
  let fahrenhConv = (celsiusTemperature * 9) / 5 + 32;
  fahrenhTemp.innerHTML = Math.round(fahrenhConv);
}
function celsConversion(event) {
  event.preventDefault();
  let celsTemp = document.querySelector("#temperature");

  celsTemp.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;
let fahrenhTemperature = document.querySelector("#fahrenh-temp");
fahrenhTemperature.addEventListener("click", fahrenConversion);
let celsTemperature = document.querySelector("#celsius-temp");
celsTemperature.addEventListener("click", celsConversion);
search("Kyiv");
