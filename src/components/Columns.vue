<template>
  <div class="slick-header" style="width: 200px;" :style="{ width: sumWidthCols}">
      <column v-for="column in columns" :title="column.title" :width="column.width" :key="column.key"></column>
  </div>
</template>

<script>
  import Column from './Column'
  export default {
    name: 'columns',
    components: {
      'column': Column
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
