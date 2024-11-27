<template>
  <div>
    <h2>Weather in {{ city }}</h2>
    <p>Temperature: {{ temperature }}°C</p>
    <p>Humidity: {{ humidity }}%</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CurrentWeatherSummary",
  props: {
    city: {
      type: String,
      required: true,
    },
    temperature: {
      type: Number,
      required: true,
    },
    humidity: {
      type: Number,
      required: true,
    },
  },
});
</script>

<style scoped></style>
