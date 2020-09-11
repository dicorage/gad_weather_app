let searchForm = document.getElementById('search_form');
let baseURL = "https://api.openweathermap.org/data/2.5/";
let apiKey = "0ac52289e818f164acc93f26540648a1";
let mainSummary = document.getElementById('main_summary');

function getLocation() {
    showSpinner();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getCurrentWeatherByCoordinates);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showSpinner(){
    mainSummary.innerHTML = '<div style="text-align:center;"><i class="fas fa-spinner fa-pulse"></i></div>';
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
        <div class="chance_of_rain">20% chance of rain until 5:00</div>
    </div>
    <div class="main_icon">
        <img src="img/icons/${image}@3x.png" alt="${description}">
    </div>
    `;
    div.innerHTML = html;
    console.log(response);
    mainSummary.innerHTML = html;
}