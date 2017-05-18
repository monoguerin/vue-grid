<template>
  <div :class="positionClass" class="data-pane">
    <ColumnsHeaders :columns="columns"></ColumnsHeaders>
    <Rows 
      :rows="rows"
      :columns="columns"
      :position="position"
      :ref="positionClass"
      :handle-scroll="paneScroll"
      :handle-mouse-wheel="wheelPaneScroll">
    </Rows>
  </div>
</template>
<script>
  import ColumnsHeaders from './ColumnsHeaders'
  import Rows from './Rows'

  export default {
    name: 'Pane',
    props: ['position', 'columns', 'rows'],
    components: {
      'ColumnsHeaders': ColumnsHeaders,
      'Rows': Rows
    },
    computed: {
      positionClass () {
        return `${this.position}-pane`
      }
    },
    methods: {
      paneScroll (evt) {
        this.$emit('paneScroll', this, evt)
      },
      wheelPaneScroll (evt) {
        this.$emit('wheelPaneScroll', this, evt)
      }
    }
  }
</script>

<style>
  .data-pane {
    display: inline-block;
    overflow: hidden;
    height: 100%;
  }

  .right-pane {
    overflow-x: scroll;
  }
</style>
