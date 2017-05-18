<template>
  <div class="slick-header" style="width: 200px;" :style="{ width: sumWidthCols}">
      <Column v-for="column in columns" :title="column.title" :width="column.width" :key="column.key"></Column>
  </div>
</template>

<script>
  import Column from './Column'
  export default {
    name: 'Columns',
    components: {
      'Column': Column
    },
    props: ['columns'],
    computed: {
      sumWidthCols () {
        let sum = 0
        this.columns.forEach(col => {
          sum += col.width
        })
        return sum
      }
    }
  }
</script>

<style>
  .slick-header {
    overflow: hidden;
    position: relative;
  }
</style>
