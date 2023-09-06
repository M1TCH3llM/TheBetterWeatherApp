var searchButton = document.getElementById("searchButton");
var searchInput = document.getElementById("searchT");
var cityNameEl = document.getElementById("cityName");
var currentTempEl = document.getElementById("currentTemp");
var currentHumidEl = document.getElementById("currentHumid");
var currentWindEl = document.getElementById("currentWind");

function getWeather(city) {
  var requestWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city},us&units=imperial&APPID=6125957e3b746825efbf44ae31af7452`;

  fetch(requestWeather)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      saveSearch(data.name);
      displayWeather(data);
    });
}

function displayWeather(data) {
  cityNameEl.textContent = data.name;
  currentTempEl.textContent = `Temp: ${data.main.temp}°`;
  currentHumidEl.textContent = data.main.humidity;
  currentWindEl.textContent = data.wind.speed;
}

function saveSearch (cityName) {
    var pastSearch = JSON.parse(localStorage.getItem("cities")) || [];
    if (!pastSearch.includes(cityName)){
        pastSearch.push(cityName);
        localStorage.setItem("cities", JSON.stringify(pastSearch));
    }


}

searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  var cityVal = searchInput.value;
  getWeather(cityVal);
});


