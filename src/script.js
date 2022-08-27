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
currentDate.innerHTML = `${week}, ${hours}:${minutes}`;

function showTemp(response) {
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
  document.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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
  let fahrenhConv = (fahrenhTemp.innerHTML * 9) / 5 + 32;
  fahrenhTemp.innerHTML = Math.round(fahrenhConv);
}
function celsConversion(event) {
  event.preventDefault();
  let celsTemp = document.querySelector("#temperature");
  let celsConv = ((celsTemp.innerHTML - 32) * 5) / 9;
  celsTemp.innerHTML = Math.round(celsConv);
}
let celsiusTemperature = null;
let fahrenhTemperature = document.querySelector("#fahrenh-temp");
fahrenhTemperature.addEventListener("click", fahrenConversion);
let celsTemperature = document.querySelector("#celsius-temp");
celsTemperature.addEventListener("click", celsConversion);
search("Kyiv");
