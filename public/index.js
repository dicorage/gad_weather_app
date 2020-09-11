const searchForm = document.getElementById('search_form');
const baseURL = "https://api.openweathermap.org/data/2.5/";
const apiKey = "0ac52289e818f164acc93f26540648a1";
const mainSummary = document.getElementById('main_summary');
const otherDetails = document.getElementById('other_details');

function getLocation() {
    showSpinner();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getCurrentWeatherByCoordinates);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showSpinner(){
    otherDetails.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-pulse"></i></div>';
    mainSummary.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-pulse"></i></div>';
}

function showFailed(){
    otherDetails.innerHTML = '<div class="error"><i class="fas fa-exclamation-circle"></i><br/>Sorry! Could not retrieve weather, pls try again</div>';
    mainSummary.innerHTML = '<div class="error"><i class="fas fa-exclamation-circle"></i><br/>Sorry! Could not retrieve weather, pls try again</div>';
}

getLocation();

searchForm.addEventListener('submit', function(e){
    e.preventDefault();
    let query = e.target.search.value;
    search.value = "";
    getCurrentWeatherByCity(query);
    showSpinner();
})

function displayMainSummary(response){
    let div = document.createElement('div');
    let today = new Date();
    let weather = response.weather[0];
    let description = weather.description;
    let image = getWeatherImage(weather);
    if(today.getHours() > 19 && today.getHours() < 6){
        image += "_night";
    }
    let name = response.name;
    let html =
    `
    <div class="left">
        <h2 class="city">${name} Weather</h2>
        <time class="muted_white_text">${today.getHours()}:${today.getMinutes()} Lagos Time</time>
        <div class="temprature">${response.main.temp}<sup>o</sup></div>
        <div class="condition">${description}</div>
    </div>
    <div class="main_icon">
        <img src="img/icons/${image}@3x.png" alt="${description}">
    </div>
    `;
    div.innerHTML = html;
    mainSummary.innerHTML = html;
}

function displayOtherDetails(response){
    let div = document.createElement('div');
    let main = response.main;
    let name = response.name;
    let html =
    `
        <h2>Weather Today in ${name}</h2>
        <div class="other_weather_items">
            <div class="feels-like">Feels like</div>
            <div class="temprature">${main.feels_like}<sup>o</sup></div>
            <div class="weather_list">
                <ul class="weather-left">
                    <li><span>High/Low</span><span>${main.temp_max}°/${main.temp_min}°</span></li>
                    <li><span>Humidity</span><span>${main.humidity}%</span></li>
                    <li><span>Pressure</span><span>${main.pressure} mb</span></li>
                </ul>
                <ul class="weather-left">
                    <li><span>Visibility</span><span>${response.visibility} km</span></li>
                    <li><span>Wind</span><span>${response.wind.speed} km/h</span></li>
                </ul>
            </div>
        </div>
    `;
    div.innerHTML = html;
    console.log(response);
    otherDetails.innerHTML = html;
}