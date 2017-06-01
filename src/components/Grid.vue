<template>
  <div id="myGrid" class="grid-star">
    <div class="pane-container">
      <pane-headers
        position="left"
        ref="left-pane-headers"
        :columns="leftColumns"
        :cols-width="leftColsWidth"
        :container-height="containerHeight">
      </pane-headers><!--
   --><pane-headers
        position="right"
        ref="right-pane-headers"
        :columns="rightColumns"
        :cols-width="rightColsWidth"
        :left-gap="leftColsWidth"
        :container-width="containerWidth"
        :container-height="containerHeight">
      </pane-headers>
      <pane
        position="left"
        ref="left-pane"
        :columns="leftColumns"
        :rows="items"
        :container-height="containerHeight"
        :cols-width="leftColsWidth"
        :start-index="startIndex"
        :viewport-height="viewportHeight"
        @verticalPaneScroll="verticalPaneScroll"
        @horizontalPaneScroll="handleHorizontal">
      </pane><!--
   --><pane
        position="right"
        ref="right-pane"
        :columns="rightColumns"
        :rows="items"
        :cols-width="rightColsWidth"
        :left-gap="leftColsWidth"
        :container-height="containerHeight"
        :container-width="containerWidth"
        :start-index="startIndex"
        :viewport-height="viewportHeight"
        @verticalPaneScroll="verticalPaneScroll"
        @horizontalPaneScroll="handleHorizontal">
      </pane>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PaneHeaders from './PaneHeaders'
import Pane from './Pane'
import { getOtherPane } from './util/utils'
import { throttle } from 'lodash'

export default {
  name: 'Grid',
  components: {
    'pane-headers': PaneHeaders,
    'pane': Pane
  },

  data () {
    return {
      items: [],
      startIndex: 0,
      endIndex: 0,
      canvasStyle: {},
      poolSize: 1,
      buffer: 10,
      throttleVisible: null
    }
  },

  computed: {
    ...mapGetters([
      'containerWidth',
      'containerHeight',
      'rows',
      'leftColumns',
      'leftColsWidth',
      'rightColumns',
      'rightColsWidth',
      'itemHeight',
      'viewportHeight'
    ])
  },

  methods: {
    verticalPaneScroll (paneComponent, scrollTop, scrollBottom) {
      // Remove active class
      this.$store.dispatch('resetActiveRow')
      const affectedPane = paneComponent.position
      let otherPaneComponent = this.$refs[getOtherPane(affectedPane)]
      this.$set(otherPaneComponent.$el.querySelector('.slick-viewport'), 'scrollTop', scrollTop)

      // Check for visible items
      this.$nextTick(() => {
        this.throttleVisible(false, scrollTop, scrollBottom)
      })
    },
    visibleItems (sortingCall = false, scrollTop, scrollBottom) {
      if (scrollTop === undefined || scrollBottom === undefined) {
        const componentViewport = this.$refs['left-pane'].$el.querySelector('.slick-viewport')
        scrollTop = componentViewport.scrollTop
        scrollBottom = componentViewport.scrollTop + this.containerHeight
      }

      const scroll = {
        top: scrollTop,
        bottom: scrollBottom
      }
      const dataLength = this.rows.length
      if (scroll) {
        let startIndex = Math.floor((Math.floor(scroll.top / this.itemHeight) - this.buffer) / this.poolSize) * this.poolSize
        let endIndex = Math.floor((Math.ceil(scroll.bottom / this.itemHeight) + this.buffer) / this.poolSize) * this.poolSize

        if (startIndex < 0) {
          startIndex = 0
        }
        if (endIndex > dataLength) {
          endIndex = dataLength
        }

        if (startIndex !== this.startIndex || endIndex !== this.endIndex || sortingCall) {
          this.startIndex = startIndex
          this.endIndex = endIndex
          this.items = this.rows.slice(startIndex, endIndex)
        }
      }
    },
    handleHorizontal (scrollTarget, scrollLeft) {
      const rightHeadersComponet = this.$refs['right-pane-headers']
      rightHeadersComponet.$el.querySelector('.slick-header').scrollLeft = scrollLeft
    }
  },

  watch: {
    rows () {
      this.visibleItems(true)
    }
  },

  mounted () {
    this.throttleVisible = throttle(this.visibleItems, 100)
    this.visibleItems()
  }
}
</script>

<style>
  .grid-star {
    height: 100%;
    width: 100%;
    overflow: hidden;
    outline: 0px;
    position: relative;
  }
  .pane-container {
    height: 100%;
  }

</style>
