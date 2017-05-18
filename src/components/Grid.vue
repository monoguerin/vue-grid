<template>
  <div id="myGrid" class="grid-star">
    <div v-if="frozenColumns > 0" class="pane-container">
      <Pane
        position="left"
        ref="left-pane"
        :columns="leftColumns"
        :rows="data"
        @paneScroll="paneScroll"
        @wheelPaneScroll="paneScroll">
      </Pane><!--
   --><Pane
        position="right"
        ref="right-pane"
        :columns="columns"
        :rows="data"
        @paneScroll="paneScroll"
        @wheelPaneScroll="paneScroll">
      </Pane>
    </div>
    <div v-else>
      <ColumnsHeaders :columns="columns"></ColumnsHeaders>
      <Rows :rows="data" :columns="columns"></Rows>
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
      'ColumnsHeaders': ColumnsHeaders,
      'Rows': Rows,
      'Pane': Pane
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
        return this.columns.splice(0, this.frozenColumns)
      }
    },
    methods: {
      paneScroll (paneComponent, evt) {
        const affectedPane = paneComponent.position
        let otherPaneComponent = this.$refs[getOtherPane(affectedPane)]
        otherPaneComponent.$el.querySelector('.scroller').scrollTop = evt.target.scrollTop
      }
    }
  }
</script>

<style>
  .grid-star {
    max-width: 800px;
    height: 250px;
    overflow: hidden;
    outline: 0px;
    position: relative;
  }
  .pane-container {
    height: 100%;
  }

</style>
