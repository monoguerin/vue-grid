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
        :left-gap="leftGap"
        :start-index="mainStartIndex">
      </rows>
    </div>
    <!-- frozen footer needed ? -->
  </div>
</template>
<script>
  import Rows from './Rows'

  export default {
    name: 'Pane',
    props: ['position', 'columns', 'rows', 'leftGap', 'colsWidth', 'height', 'containerWidth'],
    components: {
      'rows': Rows
    },
    data () {
      return {
        visibleItems: [],
        paneInlineStyles: {
          left: this.leftGap + 'px',
          width: this.colsWidth + 'px',
          // Substracting the headers Height
          // TODO: Make this dynamic
          height: (this.height - 38) + 'px'
        },
        headerColsStyles: {
          width: (1000 + this.colsWidth) + 'px'
        },
        viewportInlineStyles: {
          width: `${(this.containerWidth - this.leftGap) >= this.colsWidth ? this.colsWidth : (this.containerWidth - this.leftGap)}px`,
          // Substracting the headers Height
          // TODO: Make this dynamic
          height: (this.height - 38) + 'px'
        },
        prevScrollTop: 0,
        prevScrollLeft: 0,
        poolSize: 1,
        buffer: 2,
        itemHeight: 28,
        mainStartIndex: 0,
        mainEndIndex: 0
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
      paneScroll (evt) {
        this.$emit('paneScroll', this, evt)
      },
      getScrollbar (element) {
        return {
          width: element.offsetWidth - element.clientWidth,
          height: element.offsetHeight - element.clientHeight
        }
      },
      updateVisibleItems () {
        const scroll = this.getScroll()
        const l = this.rows.length
        if (scroll) {
          let startIndex = Math.floor((Math.floor(scroll.top / this.itemHeight) - this.buffer) / this.poolSize) * this.poolSize
          let endIndex = Math.floor((Math.ceil(scroll.bottom / this.itemHeight) + this.buffer) / this.poolSize) * this.poolSize
          if (startIndex < 0) {
            startIndex = 0
          }
          if (endIndex > l) {
            endIndex = l
          }
          if (startIndex !== this.mainStartIndex || endIndex !== this.endIndex) {
            this.keysEnabled = !(startIndex > this.mainEndIndex || endIndex < this.mainStartIndex)
            this.mainStartIndex = startIndex
            this.mainEndIndex = endIndex
            this.visibleItems = this.rows.slice(startIndex, endIndex)
            // this.itemContainerStyle.height = l * this.itemHeight + 'px'
            // this.itemsStyle.marginTop = startIndex * this.itemHeight + 'px'
          }
        }
      },
      handleScroll (evt) {
        let viewportElement = this.$el.querySelector('.slick-viewport')
        let scrollBar = this.getScrollbar(viewportElement)
        let scrollTop = viewportElement.scrollTop
        let scrollLeft = viewportElement.scrollLeft
        let maxScrollDistanceY = viewportElement.scrollHeight - viewportElement.clientHeight - scrollBar.height
        let maxScrollDistanceX = viewportElement.scrollWidth - viewportElement.clientWidth - scrollBar.width

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
          // Shows different rows depending on the scroll
          this.updateVisibleItems({
            top: scrollTop
          })
        }
      }
    },

    mounted () {
      this.updateVisibleItems()
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
