<!-- eslint-disable prettier/prettier  -->
<template>
  <div class="home">
    <div class="current-location-five-day-forecast-section">
      <!-- Current Location Weather -->

      <div>
        <div v-if="currentLocationWeather" class="current-location">
          <div>
            <div class="today-current-date">
              <p>Today</p>
              <p>{{ currentDate }}</p>
            </div>
            <div class="pin-location">
              <i class="bi bi-geo-alt"></i>
              <p>{{ currentLocationWeather.name }}</p>
            </div>
            
          </div>
            <!-- Weather Display -->
          <div class="weather-display">
            <p class="temperature">{{ Math.round(currentLocationWeather.main.temp) }}°</p>
            <img :src="currentLocationWeatherIconUrl" alt="Weather Icon" class="weatherIcon" />
          </div>

          <p>{{ currentLocationWeather.weather[0].description }}</p>
          <div class="current-location-weather">
            <div class="current-location-weather-item">
              <p class="current-location-weather-item-value">{{ currentLocationWeather.main.humidity }} %</p>
              <p class="current-location-weather-item-label">Humidity</p>
            </div>
            <div class="current-location-weather-item">
              <p class="current-location-weather-item-value">{{ currentLocationWeather.wind.speed }} m/s</p>
              <p class="current-location-weather-item-label">Wind Speed</p>
            </div>
            <div class="current-location-weather-item">
              <p class="current-location-weather-item-value">
                <span
                  :style="{
                    transform: `rotate(${currentLocationWeather.wind.deg}deg)`,
                  }"
                  class="arrow"
                  >↑</span
                >
                ({{ currentLocationWeather.wind.deg }}°)
              </p>
              <p class="current-location-weather-item-label">Wind Direction</p>
            </div>
            <div class="current-location-weather-item">
              <p class="current-location-weather-item-value">{{ visibilityInKm }}</p>
              <p class="current-location-weather-item-label">Visibility </p>
            </div>
          </div>
          
        </div>
        <!-- Nearby Cities Weather -->
        <div v-if="nearbyCitiesWeather.length" class="nearby-cities-weather">
          <div v-for="cityWeather in nearbyCitiesWeather" :key="cityWeather.id" class="nearby-city">


            <!-- Weather Display -->
            <div class="weather-diplsay-group-nearby">
              <div class="pin-location pin-location-nearby">
                <i class="bi bi-geo-alt"></i>
                <p>{{ cityWeather.name }}</p>
              </div>
              <div class="weather-display">
                <p class="temperature temperatureNearby">{{ Math.round(cityWeather.main.temp) }}°</p>
                <img
                  :src="`https://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png`"
                  alt="Weather Icon"
                  class="weatherIcon weatherIconNearby"
                />
              </div>
              <div class="current-location-weather current-location-weather-nearby">
                <div class="current-location-weather-item">
                  <p class="current-location-weather-item-value">{{ cityWeather.main.humidity }} %</p>
                  <p class="current-location-weather-item-label">Humidity</p>
                </div>
                <div class="current-location-weather-item">
                  <p class="current-location-weather-item-value">{{ cityWeather.wind.speed }} m/s</p>
                  <p class="current-location-weather-item-label">Wind Speed</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>



        <!-- 5-Day Forecast -->
        <div class="five-day-forcast-section">
          <FiveDayForecast
          v-if="forecastData.length"
          :forecastData="forecastData"
          :displayMode="forecastDisplayMode"
        />
        </div>

        <div>
          <div class="search-section">
            <div class="input-group">
              <input
              v-model="searchQuery"
              @keyup.enter="handleSearch"
              type="text"
              placeholder="Enter city name"
              class="form-control form-control-sm"
              />
              <button @click="handleSearch" class="btn search-btn"><i class="bi bi-search"></i></button>
            </div>
            <p v-if="searchError" class="error">{{ searchError }}</p>
          </div>
              <!-- Search History -->
              <div class="search-history">
            <div class="recent-clearbtn">
              <p class="recent-label">Recent</p>
              <button class="clearSearchHistory" @click="clearSearchHistory" v-if="searchHistory.length">
                Clear All
              </button>
            </div>
            <div class="recent-searches-list">
              <ul>
                <li v-for="(city, index) in searchHistory" :key="index">
                  <span @click="fetchWeatherFromHistory(city)" class="recent-search-item">{{ city }}</span>
                  <button @click="deleteHistoryItem(index)" class="deleteSearchItem"><i class="bi bi-x-lg"></i></button>
                </li>
              </ul>
            </div>
          </div>
          <div v-if="searchWeather" class="search-results">
            <div>
              <div class="today-current-date">
                <p>{{ currentDate }}</p>
              </div>
              <div class="pin-location">
                <i class="bi bi-geo-alt"></i>
                <p>{{ searchWeather.name }}</p>
              </div>
            </div>

            <!-- Weather Display -->
            <div class="weather-display">
              <p class="temperature">{{ Math.round(searchWeather.main.temp) }}°</p>
              <img :src="searchWeatherIconUrl" alt="Weather Icon" class="weatherIcon weatherIconResult" />
            </div>

            <p>{{ searchWeather.weather[0].description }}</p>

            <div class="current-location-weather">
              <div class="current-location-weather-item">
                <p class="current-location-weather-item-value">{{ searchWeather.main.humidity }} %</p>
                <p class="current-location-weather-item-label">Humidity</p>
              </div>
              <div class="current-location-weather-item">
                <p class="current-location-weather-item-value">{{ searchWeather.wind.speed }} m/s</p>
                <p class="current-location-weather-item-label">Wind Speed</p>
              </div>
              <div class="current-location-weather-item">
                <p class="current-location-weather-item-value">
                  <span
                    :style="{
                      transform: `rotate(${searchWeather.wind.deg}deg)`,
                    }"
                    class="arrow"
                    >↑</span
                  >
                  ({{ searchWeather.wind.deg }}°)
                </p>
                <p class="current-location-weather-item-label">Wind Direction</p>
              </div>
              <div class="current-location-weather-item">
                <p class="current-location-weather-item-value">{{ visibilityInKmSearch }}</p>
                <p class="current-location-weather-item-label">Visibility </p>
              </div>
            </div>
          </div>

        </div>
        



    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  getCurrentWeather,
  getFiveDayForecast,
  getNearbyCitiesWeather,
} from "@/utils/WeatherService";
import FiveDayForecast from "@/components/FiveDayForecast.vue";
import { WeatherData, ForecastData } from "@/types/WeatherTypes";
import "@/styles/global.css";

export default defineComponent({
  name: "HomePage",
  components: { FiveDayForecast },
  data() {
    return {
      currentLocationWeather: null as WeatherData | null, // Weather for current location
      searchWeather: null as WeatherData | null, // Weather for search results
      currentDate: new Date().toLocaleDateString(),
      visibilityInKm: null as string | null,
      visibilityInKmSearch: null as string | null,
      searchQuery: "",
      searchHistory: JSON.parse(localStorage.getItem("searchHistory") || "[]"),
      searchError: "",
      forecastData: [] as ForecastData[], // 5-day forecast data
      forecastDisplayMode: "daysOnly" as "daysOnly" | "daysWithHours", // Explicitly typed
      nearbyCitiesWeather: [] as any[], // Array to store nearby cities' weather data
    };
  },
  computed: {
    currentLocationWeatherIconUrl(): string {
      return this.currentLocationWeather
        ? `https://openweathermap.org/img/wn/${this.currentLocationWeather.weather[0].icon}@2x.png`
        : "";
    },
    searchWeatherIconUrl(): string {
      return this.searchWeather
        ? `https://openweathermap.org/img/wn/${this.searchWeather.weather[0].icon}@2x.png`
        : "";
    },
  },
  methods: {
    async handleSearch() {
      if (!this.searchQuery.trim()) {
        this.searchError = "Please enter a valid city name.";
        return;
      }
      try {
        const weatherData = await getCurrentWeather(this.searchQuery);
        this.searchWeather = weatherData;
        this.visibilityInKmSearch =
          (weatherData.visibility / 1000).toFixed(2) + " km";
        this.searchError = ""; // Clear previous errors if the search is successful

        // Add to search history
        if (!this.searchHistory.includes(this.searchQuery)) {
          this.searchHistory.unshift(this.searchQuery);
          localStorage.setItem(
            "searchHistory",
            JSON.stringify(this.searchHistory)
          );
        }

        // Fetch 5-day forecast for the searched city
        const forecastData = await getFiveDayForecast(this.searchQuery);
        this.forecastData = forecastData.list;
      } catch (error) {
        console.error("Error fetching weather data for search:", error);
        this.searchError = "City not found. Please try another.";
      }
    },
    async fetchWeatherFromHistory(city: string) {
      this.searchQuery = city;
      await this.handleSearch(); // Reuse the handleSearch method
    },
    deleteHistoryItem(index: number) {
      this.searchHistory.splice(index, 1);
      localStorage.setItem("searchHistory", JSON.stringify(this.searchHistory));
    },
    clearSearchHistory() {
      this.searchHistory = [];
      localStorage.removeItem("searchHistory");
    },
    async fetchNearbyCitiesWeather(lat: number, lon: number) {
      try {
        const nearbyCitiesData = await getNearbyCitiesWeather(lat, lon);
        this.nearbyCitiesWeather = nearbyCitiesData.list.slice(0, 2); // Get the first two nearby cities
      } catch (error) {
        console.error("Error fetching nearby cities weather:", error);
      }
    },
    async fetchWeatherForCurrentLocation() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const weatherData = await getCurrentWeather(
                `${latitude},${longitude}`
              );
              this.currentLocationWeather = weatherData;
              this.visibilityInKm =
                (weatherData.visibility / 1000).toFixed(2) + " km";

              const forecastData = await getFiveDayForecast(
                `${latitude},${longitude}`
              );
              this.forecastData = forecastData.list; // Store forecast list

              // Fetch nearby cities weather
              this.fetchNearbyCitiesWeather(latitude, longitude);
            } catch (error) {
              console.error("Error fetching weather:", error);
              this.fetchDefaultForecast(); // Fallback to default location
            }
          },
          (error) => {
            console.error("Geolocation error:", error);
            this.fetchDefaultForecast();
          }
        );
      } else {
        console.warn("Geolocation not supported. Using default location.");
        this.fetchDefaultForecast();
      }
    },
    async fetchDefaultForecast() {
      try {
        const weatherData = await getCurrentWeather("Manila");
        this.currentLocationWeather = weatherData;
        this.visibilityInKm =
          (weatherData.visibility / 1000).toFixed(2) + " km";

        const forecastData = await getFiveDayForecast("Manila");
        this.forecastData = forecastData.list;
      } catch (error) {
        console.error("Error fetching default weather:", error);
      }
    },
  },
  mounted() {
    this.fetchWeatherForCurrentLocation(); // Fetch current location weather on load
  },
});
</script>

<style scoped>
.home {
  padding: 20px;
}
/* .current-location,
.search-results {
  border: 2px solid #4caf50;
  margin-bottom: 20px;
  padding: 10px;
} */
.search-section {
  margin-bottom: 20px;
}
.search-history ul {
  list-style: none;
  padding: 0;
}
.search-history li {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.search-history button {
  margin-left: 10px;
}
.error {
  color: red;
}
.forecast-options {
  margin: 20px 0;
}
.current-location {
  width: 20%;
}
</style>
