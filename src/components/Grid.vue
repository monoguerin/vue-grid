<template>
  <div id="myGrid" class="grid-star">
    <div v-if="frozenColumns > 0" class="pane-container">
      <pane-headers
        position="left"
        ref="left-pane-headers"
        :columns="leftColumns"
        :cols-width="getLeftWidth()"
        :height="containerHeight">
      </pane-headers><!--
   --><pane-headers
        position="right"
        ref="right-pane-headers"
        :columns="rightColumns"
        :cols-width="getRigthWidth()"
        :left-gap="getLeftWidth()"
        :container-width="containerWidth"
        :height="containerHeight">
      </pane-headers>
      <pane
        position="left"
        ref="left-pane"
        :columns="leftColumns"
        :rows="data"
        :cols-width="getLeftWidth()"
        :height="containerHeight">
      </pane><!--
   --><pane
        position="right"
        ref="right-pane"
        :columns="rightColumns"
        :rows="data"
        :cols-width="getRigthWidth()"
        :left-gap="getLeftWidth()"
        :height="containerHeight"
        :container-width="containerWidth"
        @paneScroll="paneScroll"
        @horizontalPaneScroll="handleHorizontal">
      </pane>
    </div>
    <div v-else class="pane-container">
      <rows :rows="data" :columns="columns"></rows>
    </div>
  </div>
</template>

<script>
  import PaneHeaders from './PaneHeaders'
  import Pane from './Pane'
  // import ColumnsHeaders from './ColumnsHeaders'
  import Rows from './Rows'
  import data from './config/data'
  import columns from './config/columns'

  function getOtherPane (currentPane) {
    let otherPane = 'left'
    if (otherPane === currentPane) {
      otherPane = 'right'
    }
    return `${otherPane}-pane`
  }

  export default {
    name: 'Grid',
    components: {
      'rows': Rows,
      'pane-headers': PaneHeaders,
      'pane': Pane
    },
    props: ['frozenColumns', 'containerWidth', 'containerHeight'],
    data () {
      return {
        data,
        columns,
        height: 0
      }
    },
    computed: {
      leftColumns () {
        return this.columns.slice(0, this.frozenColumns)
      },
      rightColumns () {
        return this.columns.slice(this.frozenColumns)
      }
    },
    methods: {
      getLeftWidth () {
        let sumWidths = 0
        this.leftColumns.forEach(col => (sumWidths += col.width))
        return sumWidths
      },
      getRigthWidth () {
        let sumWidths = 0
        this.rightColumns.forEach(col => (sumWidths += col.width))
        return sumWidths
      },
      paneScroll (paneComponent, scrollTop) {
        const affectedPane = paneComponent.position
        let otherPaneComponent = this.$refs[getOtherPane(affectedPane)]
        otherPaneComponent.$el.querySelector('.slick-viewport').scrollTop = scrollTop
      },
      handleHorizontal (scrollTarget, scrollLeft) {
        const rightHeadersComponet = this.$refs['right-pane-headers']
        rightHeadersComponet.$el.querySelector('.slick-header').scrollLeft = scrollLeft
      }
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
