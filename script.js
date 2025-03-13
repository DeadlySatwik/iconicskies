const apiKey = "6a3f6a90fbc5f0c2fd94d72387de2fed";

const cityInput = document.querySelector(".city-input");
const searchBtn = document.querySelector(".search-btn");

const weatherInfoSection = document.querySelector(".weather-info");
const notFoundSection = document.querySelector(".not-found");
const searchCitySection = document.querySelector(".search-city");

const countryTxt = document.querySelector(".country-txt");

const tempTxt = document.querySelector(".temp-txt");
const conditionTxt = document.querySelector(".condition-txt");
const humidityValueTxt = document.querySelector(".humidity-value-txt");
const windValueTxt = document.querySelector(".wind-value-txt");

const currentDateTxt = document.querySelector(".current-date-txt");
const forecastDateTxt = document.querySelector(".forecast-item-date");
const weatherSummaryImg = document.querySelector(".weather-summary-img");

const forecastItemsContainer = document.querySelector(
  ".forecast-items-container"
);

// Handle search button click
searchBtn.addEventListener("click", () => {
  if (cityInput.value.trim() !== "") {
    updateWeatherInfo(cityInput.value);
    cityInput.value = "";
    cityInput.blur();
  }
});

// Handle Enter key press
cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && cityInput.value.trim() !== "") {
    updateWeatherInfo(cityInput.value);
    cityInput.value = "";
    cityInput.blur();
  }
});

function getWeatherIcon(id) {
  if (id <= 232) return "./assets/weather/thunderstorm.svg";
  else if (id <= 321) return "./assets/weather/drizzle.svg";
  else if (id <= 531) return "./assets/weather/rain.svg";
  else if (id <= 622) return "./assets/weather/snow.svg";
  else if (id <= 781) return "./assets/weather/atmosphere.svg";
  else if (id === 800) return "./assets/weather/clear.svg";
  else if (id <= 804) return "./assets/weather/clouds.svg";
  return "./assets/weather/unknown.svg";
}

function getCurrentDate() {
  const currentDate = new Date();
  const options = {
    weekday: "short",
    day: "2-digit",
    month: "short",
  };
  console.log(currentDate);
  return currentDate.toLocaleDateString("en-GB", options);
}

async function getFetchData(endpoint, city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/${endpoint}?q=${city}&appid=${apiKey}&units=metric`;

  const response = await fetch(apiUrl);
  return response.json();
}

async function updateWeatherInfo(city) {
  countryTxt.textContent = "Loading...";
  tempTxt.textContent = "--°C";
  conditionTxt.textContent = "...";
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay
  const weatherData = await getFetchData("weather", city);
  if (weatherData.cod !== 200) {
    showDisplaySection(notFoundSection);
    return;
  }

  const {
    name: country,
    main: { temp, humidity },
    weather: [{ id, main }],
    wind: { speed },
  } = weatherData;
  
  currentDateTxt.textContent = getCurrentDate();
  forecastDateTxt.textContent = getCurrentDate();

  countryTxt.textContent = country;
  tempTxt.textContent = Math.round(temp) + "°C";
  conditionTxt.textContent = main;
  humidityValueTxt.textContent = humidity + "%";
  windValueTxt.textContent = speed + " M/s";
  weatherSummaryImg.src = `${getWeatherIcon(id)}`;
  
  await updateForecastsInfo(city);
  showDisplaySection(weatherInfoSection);
}

async function updateForecastsInfo(city) {
  const forecastsData = await getFetchData("forecast", city);

  const timeTaken = "12:00:00";
  const todayDate = new Date().toISOString().split("T")[0];

  forecastItemsContainer.innerHTML = "";

  forecastsData.list.forEach((forecastWeather) => {
    if (
      forecastWeather.dt_txt.includes(timeTaken) &&
      !forecastWeather.dt_txt.includes(todayDate)
    ) {
      updateForecastItems(forecastWeather);
    }
  });
}

function updateForecastItems(weatherData) {
  const {
    dt_txt: date,
    weather: [{ id }],
    main: { temp },
  } = weatherData;

  const dateTaken = new Date(date);
  const dateOptions = {
    day: "2-digit",
    month: "short",
  };

  console.log(weatherData);
  const dateResult = dateTaken.toLocaleDateString("en-US", dateOptions);

  const forecastItem = `
    <div class="forecast-item">
                    <h5 class="forecast-item-date regular-txt">${dateResult}</h5>
                    <img src="${getWeatherIcon(id)}" class="forecast-item-img">
                    <h5 class="forecast-item-temp">${Math.round(temp)}°C</h5>
                </div>
                `;

  forecastItemsContainer.insertAdjacentHTML("beforeend", forecastItem);
}

function showDisplaySection(section) {
  [weatherInfoSection, notFoundSection, searchCitySection].forEach(
    (section) => (section.style.display = "none")
  );

  section.style.display = "flex";
}
