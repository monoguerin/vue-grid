<template>
  <div class="slick-header-column col slick-header-sortable"
    :class="[col.headerCssClass, sorted]"
    :style="{ width: col.width + 'px' }"
    @click="sortColumnResize(col)">
    <span class="slick-column-name" v-html="titleValue(col)"></span>
    <span class="slick-sort-line"></span>
    <span class="slick-sort-indicator" :class="sortAscend"></span>
    <div
      class="slick-resizable-handle"
      @mousedown.prevent="dragStart"></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'header-single',
  props: ['col'],
  data () {
    return {
      prevXPos: 0,
      startWidth: 0,
      resizing: false
    }
  },
  computed: {
    sortAscend () {
      return {
        'sort-ascend': this.$store.state.sortBy === this.col.field && this.$store.state.sortAscend,
        'sort-descend': this.$store.state.sortBy === this.col.field && !this.$store.state.sortAscend
      }
    },
    sorted () {
      return {
        'sorted': this.$store.state.sortBy === this.col.field
      }
    }
  },
  methods: {
    ...mapActions([
      'sortColumn'
    ]),
    sortColumnResize (col) {
      if (!this.resizing) {
        this.sortColumn(col)
      }
    },
    titleValue (col) {
      return col.headerFormatter ? col.headerFormatter(col.title) : col.title
    },
    dragStart (e) {
      this.prevXPos = e.clientX
      this.startWidth = this.col.width
      document.addEventListener('mousemove', this.drag)
      document.addEventListener('mouseup', this.dragEnd)
      this.resizing = true
    },
    drag (e) {
      const totalMove = e.clientX - this.prevXPos
      this.$store.dispatch('changeColWidth', { col: this.col, width: this.startWidth + totalMove })
    },
    dragEnd (e) {
      document.removeEventListener('mousemove', this.drag)
      document.removeEventListener('mouseup', this.dragEnd)
      this.resizing = false
    }
  }
}
</script>

<style>
  .slick-header-column {
    position: relative;
    -o-text-overflow: ellipsis;
    text-overflow: initial;
    float: none;
    white-space: normal;
    height: 38px;
    padding-bottom: 8px;
    left: 1000px;
    color: #666666;
    line-height: 19px;
    font-size: 14px;
    display: inline-block;
    vertical-align: top;
    padding-left: 6px;
    padding-right: 6px;
    box-sizing: border-box;
    overflow: hidden;
    min-height: 18px;
    cursor: pointer;
  }

  .slick-header-column.sorted .slick-sort-line {
    position: absolute;
    width: 100%;
    border-bottom: 1px solid black;
    top: 23px;
    left: 0;
    margin: 0 6px;
  }

  .slick-header-column .slick-column-name {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .slick-sort-indicator {
    position: absolute;
    font-size: 15px;
    margin: 0;
    height: 0;
    display: block;
    line-height: 1;
    left: 5px;
    bottom: 15px;
  }

  .slick-sort-indicator.sort-ascend{
    bottom: 19px;
  }

  .slick-sort-indicator.sort-ascend:after {
    width: 0; 
    height: 0; 
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid black;
    content: '';
    display: block;
  }

  .slick-sort-indicator.sort-descend:after {
    width: 0; 
    height: 0; 
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid black;
    content: '';
    display: block;
  }

  .slick-resizable-handle {
    position: absolute;
    font-size: 0.1px;
    display: block;
    cursor: col-resize;
    width: 2px;
    right: 0px;
    top: 0;
    height: 100%;
    z-index: 10;
  }

  .slick-resizable-handle:hover {
    background-color: #00A8E1;
  }
</style>
