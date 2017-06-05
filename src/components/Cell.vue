<template>
  <div
    :class="[cellClass, addedClasses]"
    class="slick-cell"
    :style="inlineStyles"
    v-html="cellValue"
    @click="handleCellClick"></div>
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
      return value || '-'
    },
    addedClasses () {
      return this.column.cssClass
    }
  },
  methods: {
    handleCellClick () {
      if (this.column.field === '__checkbox') {
        this.$store.dispatch('selectRow', this.rowIndex)
      }
    }
  },
  watch: {
    column: {
      handler: function (val) {
        console.log('column prop changed', val.width)
      },
      deep: true
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
    box-sizing: border-box;
    text-overflow: ellipsis;
    overflow: hidden;
    max-height: 27px;
  }
  .slick-cell:first-child {
    margin: 0;
  }
</style>
