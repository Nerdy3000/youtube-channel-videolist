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
    color: $textColor;
    margin: 0;

    & > .wrapper {
      width: 900px;
      max-width: calc( 100% - 40px );
      margin: 0 auto;
      padding: 20px;
      background: darken( $whiteColor, 5.49% );

      & > .content {
        background: $whiteColor;

        .inner-content {
          padding: 0 1em 1em 1em;
        }
      }
    }
  }
</style>
