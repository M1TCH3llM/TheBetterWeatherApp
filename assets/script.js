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

      fiveDayForecast(data);
      saveSearch(data.name);
      displayWeather(data);
    });
}

function fiveDayForecast(data) {
  var lat = data.coord.lat;
  var lon = data.coord.lon;
  var requestFiveDay = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=6125957e3b746825efbf44ae31af7452`;

  fetch(requestFiveDay)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      fiveDayDisplay(data);
    });
}

function displayWeather(data) {
  cityNameEl.textContent = data.name;
  currentTempEl.textContent = `Temp: ${data.main.temp}°`;
  currentHumidEl.textContent = `Humidity: ${data.main.humidity}%`;
  currentWindEl.textContent = `Wind Speed ${data.wind.speed} Mph`;
}

function saveSearch(cityName) {
  var pastSearch = JSON.parse(localStorage.getItem("cities")) || [];
  if (!pastSearch.includes(cityName)) {
    pastSearch.push(cityName);
    localStorage.setItem("cities", JSON.stringify(pastSearch));
  }
}

function fiveDayDisplay(data) {
  //   var dayOne = data.list[3];
  //   var dayTwo = data.list[11];
  //   var dayThree = data.list[19];
  //   var dayFour = data.list[27];
  //   var dayFive = data.list[35];

  var fiveDay = [3, 11, 19, 27, 35];
  var cardContainer = document.getElementById("five-day");

  cardContainer.textContent = "";

  for (var i = 0; 1 < fiveDay.length; i++) {
    var dayIndex = fiveDay[i];
    var dayData = data.list[dayIndex];

    var dayDate = dayData.dt_txt;
    var temperature = dayData.main.temp;
    var windSpeed = dayData.wind.speed;
    var humidity = dayData.main.humidity;

    var weatherCard = document.createElement("div");
    weatherCard.className = "card";
    weatherCard.innerHTML = `
    <div class="card-body">
      <h5 class="card-title">Day ${dayDate}</h5>
      <p class="card-text">Temperature: ${temperature}°F</p>
      <p class="card-text">Wind Speed: ${windSpeed} Mph</p>
      <p class="card-text">Humidity: ${humidity}%</p>
    </div>
  `;

    cardContainer.appendChild(weatherCard);
  }
}

searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  var cityVal = searchInput.value;
  getWeather(cityVal);
});
