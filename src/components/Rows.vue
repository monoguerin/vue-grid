<template>
  <div class="grid-canvas" :class="canvasPosClass" tabindex="0" hidefocus="" :style="itemContainerStyle">
    <row v-for="(row, index) in rows" :key="row.id" :index="startIndex + index" :row="row" :columns="columns"></row>
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
      leftGap: {
        type: Number,
        default: 0
      },
      position: {
        type: String,
        default: 'left'
      },
      startIndex: {
        type: Number
      }
    },
    data () {
      return {
        itemContainerStyle: {
          width: this.colWidth + 'px'
        },
        itemsStyle: {
          width: this.colWidth + 'px'
        },
        inlineStylesScroller: {
          width: this.colWidth + 'px',
          left: this.leftGap + 'px'
        },
        keysEnabled: true,
        itemHeight: 28
      }
    },

    computed: {
      canvasPosClass () {
        return `grid-canvas-${this.position}`
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
