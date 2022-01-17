<template>
  <div id="app">
    <div class="wrapper">
      <div class="content">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  body {
    padding: 0;
    margin: 0;
    background: #f1f1f1;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0;

    & > .wrapper {
      width: 900px;
      max-width: calc( 100% - 40px );
      margin: 0 auto;
      padding: 20px;
      background: #f1f1f1;

      & > .content {
        background: #fff;

        .inner-content {
          padding: 0 1em 1em 1em;
        }
      }
    }
  }
</style>
