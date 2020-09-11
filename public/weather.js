function getCurrentWeatherByCity(query){
    
    let url = baseURL+'weather/'+'?q='+query+'&appid='+apiKey+'&units=metric';
    console.log(url);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const response = JSON.parse(this.responseText);
            displayMainSummary(response);
        }

        if (this.readyState == 4 && this.status != 200) {
            displayFailed();
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function getCurrentWeatherByCoordinates(position){
    
    let url = baseURL+'weather/'+'?lat='+position.coords.latitude+'&lon='+position.coords.longitude+'&appid='+apiKey+'&units=metric';
    console.log(url);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const response = JSON.parse(this.responseText);
            displayMainSummary(response);
            displayOtherDetails(response);
        }

        if (this.readyState == 4 && this.status != 200) {
            displayFailed();
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function getWeatherImage(weather){
    if(weather.main == "Thunderstorm"){
        if(weather.description.includes('light') || weather.description.includes('drizzle')){
            return "scattered_thunderstorm";
        }else if(weather.description.includes('heavy')){
            return "severe_thunderstorm";
        }else{
            return "scattered_thunderstorm";
        }
    }

    if(weather.main == "Clouds"){
        if(weather.description.includes('overcast')){
            return "mostly_cloudy";
        }else if(weather.description.includes('scattered')){
            return "partly_cloudy";
        }else if(weather.description.includes('broken')){
            return "partly_cloudy";
        }else{
            return "partly_cloudy";
        }
    }

    if(weather.main == "Drizzle"){
        return "drizzle";
    }

    if(weather.main == "Rain"){
        if(weather.description.includes('light') || weather.description.includes('shower')){
            return "light_rain";
        }else if(weather.description.includes('heavy')){
            return "heavy_rain";
        }else{
            return "rain";
        }
    }

    if(weather.main == "Clear"){
        return "clear";
    }

    if(weather.main == "Snow"){
        return "snow";
    }

    if(weather.main == "Snow"){
        return "snow";
    }

    return weather.main.toLowerCase();
}