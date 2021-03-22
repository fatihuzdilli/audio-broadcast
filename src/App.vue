<template>
  <Broadcast v-if="showBroadcast" />
  <HelloWorld v-if="showHelloWorld" />
  <Record v-if="showRecord" />
</template>

<script>
import Broadcast from "./components/Broadcast.vue";
import HelloWorld from "./components/HelloWorld.vue";
import Record from "./components/Record.vue";

export default {
  name: "App",
  components: {
    Broadcast,
    HelloWorld,
    Record,
  },
  data() {
    return {
      showBroadcast: window.location.search.includes("broadcast"),
      showHelloWorld: window.location.search.includes("helloworld"),
      showRecord: window.location.search.includes("record"),
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
