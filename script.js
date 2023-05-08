const input = document.getElementById("input");
const searchButton = document.getElementById("search-button");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weather-description");
const windSpeed = document.getElementById("wind-speed");
const forecastContainer = document.getElementById("forecast-container");
const main = document.getElementById("main");
const apiKey = "a1dc15efe7cf1ff75e3d2a3b0bbfcbbb";

searchButton.addEventListener("click", () => {
  const city = input.value;
  main.classList.remove("hidden");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=es`;
  console.log(city);

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      cityName.textContent = data.name;
      temperature.textContent = `
      temp: ${data.main.temp} °C
      temp_max: ${data.main.temp_max} °C
      temp_min: ${data.main.temp_min} °C
      feels_like: ${data.main.feels_like} °C
      humidity: ${data.main.humidity}`;
      weatherDescription.textContent = data.weather[0].description;
      windSpeed.textContent = `Wind speed: ${data.wind.speed} m/s`;
    })
    .catch((error) => console.log(error));
  //FOrecast
  fetch(forecastUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      forecastContainer.innerHTML = ""; // Limpiar los datos antiguos

      // Iterar sobre los pronósticos del clima y crear elementos HTML para cada uno
      for (let i = 0; i < 8; i++) {
        /* console.log(data.list.length); */
        const forecast = data.list[i];
        const date = new Date(forecast.dt * 1000); // Convertir la fecha de UNIX a formato legible por humanos
        const dayOfWeek = date.toLocaleDateString("es-ES", {
          weekday: "short",
        });
        const timeOfDay = date.toLocaleTimeString("es-ES", {
          hour: "numeric",
          hour12: true,
        });
        const temperature = forecast.main.temp;
        const iconUrl = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
        const description = forecast.weather[0].description;

        const forecastItem = `
          <div class="forecast-item border border-blue-600 rounded m-4 border-opacity-50">
            <div>${dayOfWeek}</div>
            <div>${timeOfDay}</div>
            <div><img src="${iconUrl}" alt="${description}"></div>
            <div>${temperature}°C</div>
            <div>${description}</div>
          </div>
        `;

        forecastContainer.insertAdjacentHTML("beforeend", forecastItem);
      }
    })
    .catch((error) => console.log(error));
});
