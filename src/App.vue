<template>
  <div id="app">
    <div class="wrapper">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
$text-color: #2c3e50;

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: $text-color;
    margin-top: 60px;

    & > .wrapper {
      width: 100%;
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
    }
  }
</style>
