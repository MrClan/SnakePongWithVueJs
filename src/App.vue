<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import eventBus from './modules/EventsBus'
export default {
  name: 'app',
  mounted: function () {
    window.addEventListener("keyup", function (e) {
      eventBus.GlobalEventsBus.$emit("globalKeyPress", e);
    });

    // eventBus.GlobalEventsBus.$on("globalKeyPress", (e)=> console.log(e.code));

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
