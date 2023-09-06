var searchButton = document.getElementById("#searchButton");

function getWeather() {
  var requestWeather =
    "https://api.openweathermap.org/data/2.5/weather?q=Denver,us&APPID=6125957e3b746825efbf44ae31af7452";

  fetch(requestWeather)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

getWeather();

// // searchButton.addEventListener("click", getWeather());
