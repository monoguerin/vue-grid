<template>
  <div class="slick-pane" :class="positionClass" tabindex="0" :style="paneInlineStyles" style="top: 38px;">
    <!-- frozen header needed ? -->
    <div class="ui-state-default slick-top-panel-scroller" style="display: none;">
      <div class="slick-top-panel" style="width:10000px"></div>
    </div>
    <div class="slick-viewport" :class="viewportPosClass" :style="viewportInlineStyles" @mouseWheel="handleMouseWheel" @scroll.prevent="handleScroll" tabindex="0" hidefocus="">
      <rows
        :rows="rows"
        :columns="columns"
        :col-width="colsWidth"
        :position="position"
        :left-gap="leftGap"
        :start-index="startIndex"
        :viewport-height="viewportHeight">
      </rows>
    </div>
    <!-- frozen footer needed ? -->
  </div>
</template>
<script>
import Rows from './Rows'

export default {
  name: 'Pane',
  props: ['position', 'columns', 'rows', 'leftGap', 'colsWidth', 'containerWidth', 'startIndex', 'viewportHeight', 'containerHeight'],
  components: {
    'rows': Rows
  },
  data () {
    return {
      paneInlineStyles: {
        left: this.leftGap + 'px',
        width: this.colsWidth + 'px',
        // Substracting the headers Height
        // TODO: Make this dynamic
        height: (this.containerHeight - 38) + 'px'
      },
      headerColsStyles: {
        width: (1000 + this.colsWidth) + 'px'
      },
      viewportInlineStyles: {
        width: `${(this.containerWidth - this.leftGap) >= this.colsWidth ? this.colsWidth : (this.containerWidth - this.leftGap)}px`,
        // Substracting the headers Height
        // TODO: Make this dynamic
        height: (this.containerHeight - 38) + 'px'
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
    }
  },
  methods: {
    getScroll () {
      const el = this.$el.querySelector('.slick-viewport')
      let scroll = {
        top: el.scrollTop,
        bottom: el.scrollTop + el.clientHeight
      }

      if (scroll.bottom >= 0 && scroll.top <= scroll.bottom) {
        return scroll
      } else {
        return null
      }
    },
    getScrollbar (element) {
      return {
        width: element.offsetWidth - element.clientWidth,
        height: element.offsetHeight - element.clientHeight
      }
    },
    handleMouseWheel (evt) {
      const viewportElement = this.$el.querySelector('.slick-viewport')
      const scrollTop = Math.max(0, viewportElement.scrollTop - evt.deltaY)
      const scrollLeft = viewportElement.scrollLeft + evt.deltaX
      this.handleScroll(evt, scrollTop, scrollLeft, true)
    },
    handleScroll (evt, scrollTop = false, scrollLeft = false, isMouseWheel) {
      const viewportElement = this.$el.querySelector('.slick-viewport')
      const scrollBar = this.getScrollbar(viewportElement)
      const maxScrollDistanceY = viewportElement.scrollHeight - viewportElement.clientHeight - scrollBar.height
      const maxScrollDistanceX = viewportElement.scrollWidth - viewportElement.clientWidth - scrollBar.width
      const scrollBottom = viewportElement.scrollTop + viewportElement.clientHeight
      scrollTop = scrollTop || viewportElement.scrollTop
      scrollLeft = scrollLeft || viewportElement.scrollLeft

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

      const vScrollDist = Math.abs(scrollTop - this.prevScrollTop)
      const hScrollDist = Math.abs(scrollLeft - this.prevScrollLeft)

      // Was a real scroll in horizontal direction
      if (hScrollDist) {
        this.prevScrollLeft = scrollLeft
        this.$emit('horizontalPaneScroll', viewportElement, scrollLeft)
      }

      // Was a real scroll in vertical direction
      if (vScrollDist) {
        if (isMouseWheel) {
          viewportElement.scrollTop = scrollTop
        }

        this.prevScrollTop = scrollTop
        this.$emit('paneScroll', this, scrollTop, scrollBottom)
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
