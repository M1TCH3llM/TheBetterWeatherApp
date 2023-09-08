var searchButton = document.getElementById("searchButton");
var searchInput = document.getElementById("searchT");
var cityNameEl = document.getElementById("cityName");
var currentTempEl = document.getElementById("currentTemp");
var currentHumidEl = document.getElementById("currentHumid");
var currentWindEl = document.getElementById("currentWind");
var currentImgEl = document.getElementById("todayImg");
var pastSearch = JSON.parse(localStorage.getItem("cities")) || [];

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
  var weatherEmoji = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

  cityNameEl.textContent = data.name;
  currentTempEl.textContent = `Temp: ${data.main.temp}°`;
  currentHumidEl.textContent = `Humidity: ${data.main.humidity}%`;
  currentWindEl.textContent = `Wind Speed ${data.wind.speed} Mph`;
  currentImgEl.setAttribute("src", weatherEmoji);
}

function saveSearch(cityName) {
  if (!pastSearch.includes(cityName)) {
    pastSearch.push(cityName);
    localStorage.setItem("cities", JSON.stringify(pastSearch));
  }
  renderSaveSearch();
}

function renderSaveSearch() {
  var savedCityList = document.getElementById("savedCities");
  savedCityList.textContent = "";
  for (const city of pastSearch) {
    var cityEl = document.createElement("button");
    cityEl.textContent = city;
    cityEl.setAttribute("id", "cityButton");

    cityEl.addEventListener("click", function () {
      var userInput = city;
      getWeather(userInput);
    });

    savedCityList.appendChild(cityEl);
  }
}

function fiveDayDisplay(data) {
  var fiveDay = data.list.filter(
    (obj) => obj.dt_txt.split(" ")[1] === "12:00:00"
  );
  var cardContainer = document.getElementById("five-day");

  cardContainer.textContent = "";

  for (var i = 0; 1 < fiveDay.length; i++) {
    var dayData = fiveDay[i];

    var dayDate = dayjs(dayData.dt_txt).format("MM/DD/YYYY");
    var temperature = dayData.main.temp;
    var windSpeed = dayData.wind.speed;
    var humidity = dayData.main.humidity;
    var img = dayData.weather[0].icon;
    var alt = dayData.weather[0].description;

    var weatherCard = document.createElement("div");
    weatherCard.className = "card";
    weatherCard.innerHTML = `
    <div class="card-body">
      <h5 class="card-title">${dayDate}</h5>
      <img src="https://openweathermap.org/img/wn/${img}.png" alt="${alt}">
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

renderSaveSearch();
