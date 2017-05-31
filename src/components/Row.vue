<template>
  <div
    class="ui-widget-content slick-row"
    :class="[oddOrEven, hoverClass, selectedClass]"
    :data-slick-row="index"
    :style="inlineStyleRow"
    @mouseenter="changeActiveRow(index)"
    @mouseleave="resetActiveRow">
    <cell v-for="(col, colIndex) in columns" :key="key" :column="col" :col-index="colIndex" :row="row" :row-index="index"></cell>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Cell from './Cell'

export default {
  name: 'row',
  props: ['row', 'columns', 'index', 'startIndex'],
  components: {
    'cell': Cell
  },
  computed: {
    inlineStyleRow () {
      return {
        top: (this.index * this.$store.state.itemHeight) + 'px'
      }
    },
    hoverClass () {
      return {
        'hover': this.index === this.$store.state.activeRow
      }
    },
    oddOrEven () {
      return this.index % 2 === 0 ? 'odd' : 'even'
    },
    selectedClass () {
      return {
        'selected': this.$store.state.selectedRows.filter(row => row === this.row.id).length > 0
      }
    },
    key () {
      return `${this.row.id}_${this.colIndex}`
    }
  },
  methods: {
    ...mapActions([
      'changeActiveRow',
      'resetActiveRow'
    ])
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

  .slick-row.selected {
    background-color: #ccc;
  }

  .slick-row.hover {
    background-color: #aaa;
  }

  .slick-row:after {
    content: '';
    clear: both;
  }
</style>
