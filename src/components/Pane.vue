<template>
  <div class="slick-pane" :class="positionClass" tabindex="0" :style="paneInlineStyles" style="top: 38px;">
    <!-- frozen header needed ? -->
    <div class="ui-state-default slick-top-panel-scroller" style="display: none;">
      <div class="slick-top-panel" style="width:10000px"></div>
    </div>
    <div class="slick-viewport" :class="viewportPosClass" :style="viewportInlineStyles" @mouseWheel="handleScroll" @scroll.capture="handleScroll" tabindex="0" hidefocus="">
      <rows
        :rows="rows"
        :columns="columns"
        :col-width="colsWidth"
        :position="position"
        :left-gap="leftGap">
      </rows>
    </div>
    <!-- frozen footer needed ? -->
  </div>
</template>
<script>
  import Rows from './RowsSlick'

  export default {
    name: 'Pane',
    props: ['position', 'columns', 'rows', 'leftGap', 'colsWidth', 'height', 'containerWidth'],
    components: {
      'rows': Rows
    },
    data () {
      return {
        paneInlineStyles: {
          left: this.leftGap + 'px',
          width: this.colsWidth + 'px',
          height: this.height + 'px'
        },
        headerColsStyles: {
          width: (1000 + this.colsWidth) + 'px'
        },
        viewportInlineStyles: {
          width: (this.containerWidth - this.leftGap) + 'px',
          height: this.height + 'px'
        },
        prevScrollTop: 0,
        prevScrollLeft: 0
      }
    },
    computed: {
      positionClass () {
        return `slick-pane-${this.position}`
      },
      viewportPosClass () {
        return `slick-viewport-${this.position}`
      },
      canvasPosClass () {
        return `grid-canvas-${this.position}`
      },
      colWidths () {
        let sumWidths = 0
        this.columns.forEach(col => (sumWidths += col.width))
        return sumWidths
      }
    },
    methods: {
      paneScroll (evt) {
        this.$emit('paneScroll', this, evt)
      },
      handleScroll (evt) {
        let viewportElement = this.$el.querySelector('.slick-viewport')
        let scrollTop = viewportElement.scrollTop
        let scrollLeft = viewportElement.scrollLeft
        let maxScrollDistanceY = viewportElement.scrollHeight - viewportElement.clientHeight
        // This is the scrollbar width check this later to get that dynamic
        let maxScrollDistanceX = viewportElement.scrollWidth - viewportElement.clientWidth - 17

        // Ceiling the max scroll values
        if (scrollTop > maxScrollDistanceY) {
          scrollTop = maxScrollDistanceY
        }
        if (scrollLeft > maxScrollDistanceX) {
          scrollLeft = maxScrollDistanceX
        }

        // Set current element Scrolls with the one from the ceiling operation
        viewportElement.scrollLeft = scrollLeft
        viewportElement.scrollTop = scrollTop

        let vScrollDist = Math.abs(scrollTop - this.prevScrollTop)
        let hScrollDist = Math.abs(scrollLeft - this.prevScrollLeft)

        // Was a real scroll in horizontal direction
        if (hScrollDist) {
          this.prevScrollLeft = scrollLeft
          this.$emit('horizontalPaneScroll', viewportElement, scrollLeft)
        }

        // Was a real scroll in vertical direction
        if (vScrollDist) {
          this.prevScrollTop = scrollTop
          this.$emit('paneScroll', this, scrollTop)
        }
      }
    }
  }
</script>

<style>
  .slick-pane {
    outline: 0;
  }

  .slick-viewport {
    overflow-x: scroll;
    overflow-y: auto;
    outline: 0;
  }

  .slick-viewport-left {
    overflow-y: hidden;
    overflow-x: auto;
  }
</style>
