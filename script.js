// Get references to the necessary elements
const fetchDataBtn = document.getElementById("fetch-data-btn");
const mapDiv = document.getElementById("map");
const weatherDataDiv = document.getElementById("weather-data");

// Add event listener to the fetch data button
fetchDataBtn.addEventListener("click", () => {
  // Get the user's current location using the Geolocation API
  navigator.geolocation.getCurrentPosition(position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Display the Google Map of the user's current location
    const map = new google.maps.Map(mapDiv, {
      center: { lat: latitude, lng: longitude },
      zoom: 8,
    });

    // Make an API call to the OpenWeatherMap API to retrieve the weather data for the user's location
    const apiKey = "b631e6244703d49c5cd405275c2a1cab";
    const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    fetch(apiUrl)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Unable to retrieve weather data");
        }
      })
      .then(data => {
        // Use the retrieved weather data to display the weather details
        const currentWeatherData = data.current;
        const weatherDataHtml = `
          <h2>Current Weather</h2>
          <p>Temperature: ${currentWeatherData.temp} °C</p>
          <p>Feels Like: ${currentWeatherData.feels_like} °C</p>
          <p>Weather: ${currentWeatherData.weather[0].description}</p>
        `;
        weatherDataDiv.innerHTML = weatherDataHtml;
      })
      .catch(error => {
        console.error(error);
      });
  }, error => {
    console.error(error);
  });
});
