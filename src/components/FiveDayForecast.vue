<template>
  <div class="forecast">
    <div class="next-days-dropdown">
      <p class="nextFiveDayslabel">Next 5 days</p>
      <div class="forecast-options">
        <select
          v-model="localDisplayMode"
          class="forecast-dropdown form-select form-select-sm"
        >
          <option value="daysOnly">Days Only</option>
          <option value="daysWithHours">Days with Hours</option>
        </select>
      </div>
    </div>

    <div class="forecast-table">
      <table
        class="table five-dayforecast-table table-borderless align-middle table-striped table-dark"
      >
        <thead>
          <tr>
            <th v-if="localDisplayMode === 'daysWithHours'" class="five-thead">
              Time
            </th>
            <th class="five-thead">Icon</th>
            <th class="five-thead">Min Temp</th>
            <th class="five-thead">Max Temp</th>
            <th class="five-thead">Description</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="day in groupedForecast" :key="day.date">
            <!-- Display the date as a header -->
            <tr>
              <td colspan="5" class="day-header">{{ day.date }}</td>
            </tr>
            <!-- Display entries based on the display mode -->
            <tr
              v-for="entry in localDisplayMode === 'daysWithHours'
                ? day.entries
                : [day.entries[0]]"
              :key="entry.dt"
            >
              <td v-if="localDisplayMode === 'daysWithHours'">
                {{ entry.time }}
              </td>
              <td>
                <img
                  :src="entry.icon"
                  alt="Weather Icon"
                  class="weather-icon-table"
                />
              </td>
              <td>{{ entry.minTemp }}°C</td>
              <td>{{ entry.maxTemp }}°C</td>
              <td>{{ entry.description }}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FiveDayForecast",
  props: {
    forecastData: {
      type: Array as () => { dt: number; main: any; weather: any }[],
      required: true,
    },
    displayMode: {
      type: String as () => "daysOnly" | "daysWithHours",
      required: true,
    },
  },

  data() {
    return {
      localDisplayMode: this.displayMode, // Initialize with prop value
    };
  },
  watch: {
    localDisplayMode(newValue) {
      this.$emit("update:displayMode", newValue); // Emit changes to parent if needed
    },
  },
  computed: {
    groupedForecast() {
      const days: Record<string, any[]> = {};
      this.forecastData.forEach((entry: any) => {
        const date = new Date(entry.dt * 1000);
        const day = date.toLocaleDateString(undefined, { weekday: "long" });
        const time = date.toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
        });

        if (!days[day]) {
          days[day] = [];
        }

        days[day].push({
          dt: entry.dt,
          time,
          icon: `https://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png`,
          minTemp: entry.main.temp_min,
          maxTemp: entry.main.temp_max,
          description: entry.weather[0].description,
        });
      });

      // Convert the days object into an array of objects with date and entries
      return Object.keys(days).map((day) => ({
        date: day,
        entries: days[day],
      }));
    },
  },
});
</script>

<style scoped>
.forecast-dropdown {
  /* padding: 10px; */
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  max-width: 300px;
}
</style>
