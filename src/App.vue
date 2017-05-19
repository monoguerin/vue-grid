<template>
  <div id="app">
    <grid frozen-columns="3"></grid>
  </div>
</template>

<script>
import Grid from './components/Grid'

export default {
  name: 'App',
  components: {
    'grid': Grid
  }
}
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
}
</style>
