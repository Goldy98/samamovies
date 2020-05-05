<template>
  <div class="centerx">
    <vs-navbar
      v-model="indexActive"
      :color="colorx"
      text-color="rgba(255,255,255,.6)"
      active-text-color="rgba(255,255,255,1)"
      class="myNavbar"
    >
      <div slot="title">
        <vs-navbar-title>
          Navbar Color
        </vs-navbar-title>
      </div>

      <vs-navbar-item index="0">
        <a href="#">Home</a>
      </vs-navbar-item>
      <vs-navbar-item index="1">
        <a href="#">Favorite</a>
      </vs-navbar-item>
      <vs-navbar-item index="2">
        <a href="#">Upcoming</a>
      </vs-navbar-item>

      <vs-spacer></vs-spacer>
      <vs-input icon="search" placeholder="Search" />
    </vs-navbar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "NavBar",
  data: () => ({
    colorx: "#C95730",
    indexActive: 0,
  }),
});
</script>

<style lang="css">
.input-color {
  margin-bottom: 10px;
  position: relative;
  display: block;
}
.myNavbar {
  color: rgb(255, 255, 255);
}
</style>
