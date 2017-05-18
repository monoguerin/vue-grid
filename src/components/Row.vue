<template>
  <div class="ui-widget-content slick-row" :class="oddOrEven">
    <cell v-for="(col, colIndex) in columns" :key="colIndex + '_' + index" :column="col" :col-index="colIndex" :row="row" :row-index="index"></cell>
  </div>
</template>

<script>
  import Cell from './Cell'

  export default {
    name: 'row',
    props: ['row', 'columns', 'index'],
    components: {
      'cell': Cell
    },
    computed: {
      oddOrEven () {
        return this.index % 2 === 0 ? 'odd' : 'even'
      }
    }
  }
</script>

<style>
  .slick-row {
    height: 26px;
    line-height: 1.8;
    width: 100%;
    overflow: hidden;
    border-bottom: 1px solid black;
  }

  .slick-row:after {
    content: '';
    clear: both;
  }
</style>
