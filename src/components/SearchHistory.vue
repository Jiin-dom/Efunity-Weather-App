<template>
  <div>
    <input
      v-model="searchQuery"
      @keyup.enter="emitSearch"
      placeholder="Enter city name"
    />
    <button @click="emitSearch">Search</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SearchHistory",
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    emitSearch() {
      this.$emit("onSearch", this.searchQuery);
    },
  },
});
</script>
