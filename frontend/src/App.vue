<template>
  <div id="app">
    <HelloWorld />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  mounted() {
    if (window.DSGov) {
      window.DSGov.init();
    }
  },
};
</script>

<style>
/* Adicione estilos globais, se necessário */
</style>
