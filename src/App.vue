<template>
  <Broadcast v-if="showBroadcast" />
  <HelloWorld v-if="showHelloWorld" />
</template>

<script>
import Broadcast from "./components/Broadcast.vue";
import HelloWorld from "./components/HelloWorld.vue";
export default {
  name: "App",
  components: {
    Broadcast,
    HelloWorld,
  },
  data() {
    return {
      showHelloWorld: window.location.search.includes("helloworld"),
      showBroadcast: window.location.search.includes("broadcast"),
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
