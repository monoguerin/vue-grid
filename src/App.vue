<template>
  <div id="app">
    <grid frozen-columns="3" :container-width="containerWidth" :container-height="containerHeight"></grid>
  </div>
</template>

<script>
import Grid from './components/Grid'

export default {
  name: 'App',
  components: {
    'grid': Grid
  },
  computed: {
    containerWidth () {
      return this.$parent.$el.offsetWidth
    },
    containerHeight () {
      return this.$parent.$el.offsetHeight
    }
  }
}
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  width: 900px;
  height: 400px;
}
</style>
