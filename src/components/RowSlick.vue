<template>
  <div class="ui-widget-content slick-row" :class="oddOrEven" :style="inlineStyleRow">
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
    data () {
      return {
        inlineStyleRow: {
          top: (this.index * 27) + 'px'
        }
      }
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
    position: absolute;
    width: 100%;
    height: 27px;
    font-size: inherit;
    border-bottom: 1px solid #cccccc;
    font-weight: 400;
    color: #151515;
    line-height: 27px;
  }

  .slick-row:after {
    content: '';
    clear: both;
  }
</style>
