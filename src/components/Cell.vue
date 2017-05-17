<template>
  <div :class="cellClass" class="slick-cell" :style="inlineStyles" v-html="cellValue"></div>
</template>

<script>
  export default {
    name: 'cell',
    props: ['column', 'colIndex', 'row', 'rowIndex'],
    data () {
      return {
        cellClass: [
          `row-${this.rowIndex}`,
          `col-${this.colIndex}`
        ],
        inlineStyles: {
          'width': this.column.width + 'px'
        }
      }
    },
    computed: {
      cellValue () {
        let value = this.row[this.column.field]
        if (this.column.formatter && typeof this.column.formatter === 'function') {
          value = this.column.formatter(this.rowIndex, this.colIndex, value, this.column)
        }
        return value
      }
    }
  }
</script>

<style>
  .slick-cell {
    display: inline-block;
    vertical-align: top;
    padding-left: 6px;
    padding-right: 6px;
    margin-left: 10px;
    box-sizing: border-box;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .slick-cell:first-child {
    margin: 0;
  }
</style>
