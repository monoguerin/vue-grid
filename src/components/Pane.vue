<template>
  <div :class="positionClass" class="data-pane">
    <columns-headers :columns="columns"></columns-headers>
    <rows :rows="rows" :columns="columns" :position="position" :paneScroll="paneScroll"></rows>
  </div>
</template>
<script>
  import Rows from './Rows'
  import ColumnsHeaders from './ColumnsHeaders'
  import Row from './Row'

  export default {
    name: 'Pane',
    props: ['position', 'columns', 'rows'],
    components: {
      'columns-headers': ColumnsHeaders,
      'row': Row,
      'rows': Rows
    },
    computed: {
      positionClass () {
        return `${this.position}-pane`
      }
    },
    methods: {
      paneScroll (evt) {
        this.$emit('paneScroll', this, evt)
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
    overflow-x: auto;
  }
</style>
