<template>
  <div class="grid-canvas" :class="canvasPosClass" tabindex="0" hidefocus="" :style="itemContainerStyle">
    <row
      v-for="(row, index) in rows"
      :key="row.id"
      :index="getRowIndex(index)"
      :start-index="startIndex"
      :row="row"
      :columns="columns"></row>
  </div>
</template>

<script>
import Row from './Row'

export default {
  name: 'Rows',

  components: {
    'row': Row
  },

  props: {
    rows: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    colWidth: {
      type: Number,
      default: 0
    },
    position: {
      type: String,
      default: 'left'
    },
    startIndex: {
      type: Number
    },
    viewportHeight: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      itemContainerStyle: {
        width: this.colWidth + 'px',
        height: this.viewportHeight + 'px',
        marginTop: this.startIndex * 28 + 'px'
      },
      itemsStyle: {
        width: this.colWidth + 'px'
      }
    }
  },
  computed: {
    inlineStylesScroller () {
      return {
        width: this.colWidth + 'px',
        left: this.$store.state.leftColsWidth + 'px'
      }
    },
    rowIndex () {
      return this.startIndex + this.index
    },
    canvasPosClass () {
      return `grid-canvas-${this.position}`
    }
  },

  methods: {
    getRowIndex (index) {
      return this.startIndex + index
    }
  }
}
</script>

<style>
  .grid-canvas {
    position: relative;
    outline: 0;
  }

  .scroller.virtual-scroller {
    height: 100%;
    overflow-y: auto;
  }

  .rows-container {
    box-sizing: border-box;
    width: 100%;
    overflow: hidden;
  }

  .rows {
    width: 100%;
  }
</style>
