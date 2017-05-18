<template>
  <div class="slick-header" style="width: 200px;" :style="{ width: sumWidthCols}">
      <ColumnHeader v-for="column in columns" :title="column.title" :width="column.width" :key="column.key"></ColumnHeader>
  </div>
</template>

<script>
  import ColumnHeader from './ColumnHeader'
  export default {
    name: 'ColumnsHeaders',
    components: {
      'ColumnHeader': ColumnHeader
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
