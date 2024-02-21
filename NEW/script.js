function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
    getCurrentWeather(position.coords.latitude, position.coords.longitude);
}
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}
function getCurrentWeather(latitude, longitude) {
    const apiKey = 'ea5ed911ab8fffb0a44b70c75bb5e795';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const weatherDiv = document.getElementById('weather');
            weatherDiv.innerHTML = `<h2>Current Weather</h2>
                                    <p>Temperature: ${data.main.temp} °C</p>
                                    <p>Humidity: ${data.main.humidity} %</p>
                                    <p>Weather: ${data.weather[0].description}</p>
                                    <p>Wind Speed: ${data.wind.speed} m/s</p>
                                    <p>Pressure: ${data.main.pressure} hPa</p>
                                    <p>Visibility: ${data.visibility / 1000} km</p>
                                    <p>Cloudiness: ${data.clouds.all} %</p>
                                    ${data.rain ? `<p>Precipitation (1h): ${data.rain['1h'] || 0} mm</p>` : ''}
                                    <p>Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
                                    <p>Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>`;
        })
        .catch(error => console.error('Error fetching weather data:', error));
}
getUserLocation();