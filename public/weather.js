function getCurrentWeatherByCity(query){
    
    let url = baseURL+'weather/'+'?q='+query+'&appid='+apiKey+'&units=metric';
    // console.log(url);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const response = JSON.parse(this.responseText);
            displayMainSummary(response);
            displayOtherDetails(response);
        }

        if (this.readyState == 4 && this.status != 200) {
            showFailed();
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function getCurrentWeatherByCoordinates(position){
    
    let url = baseURL+'weather/'+'?lat='+position.coords.latitude+'&lon='+position.coords.longitude+'&appid='+apiKey+'&units=metric';
    // console.log(url);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const response = JSON.parse(this.responseText);
            displayMainSummary(response);
            displayOtherDetails(response);
        }

        if (this.readyState == 4 && this.status != 200) {
            showFailed();
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function getWeatherImage(weather){
    const today = new Date();

    if(weather.main == "Thunderstorm"){
        if(weather.description.includes('light') || weather.description.includes('drizzle')){
            image = "scattered_thunderstorm";
        }else if(weather.description.includes('heavy')){
            image = "severe_thunderstorm";
        }else{
            image = "scattered_thunderstorm";
        }

        if(today.getHours() > 18.59){
            image += "_night";
        }else if(today.getHours() < 5.59){
            image += "_night";
        }

        return image;
    }

    if(weather.main == "Clouds"){
        if(weather.description.includes('overcast')){
            image = "mostly_cloudy";
        }else if(weather.description.includes('scattered')){
            image = "partly_cloudy";
        }else if(weather.description.includes('broken')){
            image = "partly_cloudy";
        }else{
            image = "partly_cloudy";
        }

        if(today.getHours() > 18.59){
            image += "_night";
        }else if(today.getHours() < 5.59){
            image += "_night";
        }

        return image;
    }

    if(weather.main == "Drizzle"){
        return "drizzle";
    }

    if(weather.main == "Rain"){
        if(weather.description.includes('light') || weather.description.includes('shower')){
            image = "light_rain";
        }else if(weather.description.includes('heavy')){
            image = "heavy_rain";
        }else{
            image = "rain";
        }

        if(today.getHours() > 18.59){
            image += "_night";
        }else if(today.getHours() < 5.59){
            image += "_night";
        }

        return image;
    }

    if(weather.main == "Clear"){
        image = "clear";

        if(today.getHours() > 18.59){
            image += "_night";
        }else if(today.getHours() < 5.59){
            image += "_night";
        }

        return image;
    }

    if(weather.main == "Snow"){
        image = "snow";
        if(today.getHours() > 18.59){
            image += "_night";
        }else if(today.getHours() < 5.59){
            image += "_night";
        }

        return image;
    }

    if(weather.main == "Snow"){
        image = "snow";
        if(today.getHours() > 18.59){
            image += "_night";
        }else if(today.getHours() < 5.59){
            image += "_night";
        }

        return image;
    }

    return weather.main.toLowerCase();
}