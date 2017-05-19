<template>
  <div class="scroller virtual-scroller" @scroll="updateVisibleItems" @mouseWheel="updateVisibleItems" v-observe-visibility="handleVisibilityChange">
    <div class="grid-canvas rows-container" :style="itemContainerStyle">
      <div class="rows" :style="itemsStyle">
        <row v-for="(row, index) in visibleItems" :key="index" :index="_startIndex + index" :row="row" :columns="columns"></row>
      </div>
    </div>
    <resize-observer @notify="updateVisibleItems" />
  </div>
</template>

<script>
  import ResizeObserver from 'vue-resize/src/components/ResizeObserver'
  import Row from './Row'

  export default {
    name: 'Rows',

    components: {
      'resize-observer': ResizeObserver,
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
      position: {
        type: String,
        default: 'left'
      },
      paneScroll: {},
      buffer: {
        type: [Number, String],
        default: 5
      },
      poolSize: {
        type: [Number, String],
        default: 5
      }
    },
    data () {
      return {
        visibleItems: [],
        itemContainerStyle: null,
        itemsStyle: null,
        keysEnabled: true,
        itemHeight: 28
      }
    },

    methods: {
      getScroll () {
        const el = this.$el
        let scroll

        if (this.pageMode) {
          const rect = el.getBoundingClientRect()
          let top = -rect.top
          let height = window.innerHeight
          if (top < 0) {
            height += top
            top = 0
          }
          if (top + height > rect.height) {
            height = rect.height - top
          }
          scroll = {
            top: top,
            bottom: top + height
          }
        } else {
          scroll = {
            top: el.scrollTop,
            bottom: el.scrollTop + el.clientHeight
          }
        }

        if (scroll.bottom >= 0 && scroll.top <= scroll.bottom) {
          return scroll
        } else {
          return null
        }
      },

      updateVisibleItems (evt) {
        const l = this.rows.length
        const scroll = this.getScroll()
        if (scroll) {
          // Callback from the parent for Sync purposes
          if (typeof this.paneScroll === 'function') {
            this.paneScroll(this, evt)
          }
          let startIndex = Math.floor((Math.floor(scroll.top / this.itemHeight) - this.buffer) / this.poolSize) * this.poolSize
          let endIndex = startIndex + 30
          // let endIndex = Math.floor((Math.ceil(scroll.bottom / this.itemHeight) + this.buffer) / this.poolSize) * this.poolSize
          if (startIndex < 0) {
            startIndex = 0
          }
          if (endIndex > l) {
            endIndex = l
          }
          if (startIndex !== this._startIndex || endIndex !== this.endIndex) {
            this.keysEnabled = !(startIndex > this._endIndex || endIndex < this._startIndex)
            this._startIndex = startIndex
            this._endIndex = endIndex
            this.visibleItems = this.rows.slice(startIndex, endIndex)
            this.itemContainerStyle = {
              height: l * this.itemHeight + 'px'
            }
            this.itemsStyle = {
              marginTop: startIndex * this.itemHeight + 'px'
            }
          }
        }
      },

      scrollToItem (index) {
        this.$el.scrollTop = index * this.itemHeight
      },

      handleVisibilityChange (isVisible, entry) {
        if (isVisible || entry.boundingClientRect.width !== 0 || entry.boundingClientRect.height !== 0) {
          this.$nextTick(() => {
            this.updateVisibleItems()
          })
        }
      },

      applyPageMode () {
        if (this.pageMode) {
          this.addWindowScroll()
        } else {
          this.removeWindowScroll()
        }
      },

      addWindowScroll () {
        window.addEventListener('scroll', this.updateVisibleItems, true)
      },

      removeWindowScroll () {
        window.removeEventListener('scroll', this.updateVisibleItems, true)
      }
    },

    watch: {
      items () {
        this.updateVisibleItems()
      }
    },

    mounted () {
      this.updateVisibleItems()
      this.applyPageMode()
    },

    beforeDestroy () {
      this.removeWindowScroll()
    }
  }
</script>

<style>
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
