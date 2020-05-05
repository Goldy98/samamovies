<template>
  <div id="app">
    <!-- <NavBar /> -->
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default {
  components: {},
};
</script>

<style>
html {
  background-color: #001830;
}
#app {
  font-family: "Roboto", "Avenir", "Helvetica", "Arial", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
