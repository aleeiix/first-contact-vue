<template>
  <div id="app" class="container">
    <Header title="Fruits" />
    <List></List>
  </div>
</template>

<script>
import Header from "./components/Header";
import List from "./components/List";

export default {
  name: 'app',
  components: {
    Header,
    List
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
