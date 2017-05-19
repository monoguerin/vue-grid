<template>
  <div id="myGrid" class="grid-star">
    <div v-if="frozenColumns > 0" class="pane-container">
      <pane
        position="left"
        ref="left-pane"
        :columns="leftColumns"
        :rows="data"
        @paneScroll="paneScroll"
        @wheelPaneScroll="paneScroll">
      </pane><!--
   --><pane
        position="right"
        ref="right-pane"
        :columns="rightColumns"
        :rows="data"
        @paneScroll="paneScroll"
        @wheelPaneScroll="paneScroll">
      </pane>
    </div>
    <div v-else class="pane-container">
      <columns-headers :columns="columns"></columns-headers>
      <rows :rows="data" :columns="columns"></rows>
    </div>
  </div>
</template>

<script>
  import ColumnsHeaders from './ColumnsHeaders'
  import Rows from './Rows'
  import Pane from './Pane'
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
      'columns-headers': ColumnsHeaders,
      'rows': Rows,
      'pane': Pane
    },
    props: ['frozenColumns'],
    data () {
      return {
        data,
        columns
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
      paneScroll (paneComponent, evt) {
        const affectedPane = paneComponent.position
        let otherPaneComponent = this.$refs[getOtherPane(affectedPane)]
        otherPaneComponent.$el.querySelector('.scroller').scrollTop = evt.$el.scrollTop
      }
    }
  }
</script>

<style>
  .grid-star {
    max-width: 800px;
    height: 500px;
    overflow: hidden;
    outline: 0px;
    position: relative;
  }
  .pane-container {
    height: 100%;
  }

</style>
