<template>
  <div class="scroller" @scroll="handleScroll" @mouseWheel="handleMouseWheel">
    <div class="grid-canvas" :style="{ height: virtualHeight + 'px'}">
      <Row v-for="(row, index) in rows" :key="index" :index="index" :row="row" :columns="columns"></Row>
    </div>
  </div>
</template>

<script>
  import Row from './Row'

  export default {
    name: 'Rows',
    components: {
      'Row': Row
    },
    props: ['rows', 'columns', 'position', 'handleScroll', 'handleMouseWheel'],
    computed: {
      virtualHeight () {
        return this.rows.length * (28 + 1)
      }
    }
  }
</script>

<style>
  .scroller {
    height: 100%;
    overflow-y: scroll;
  }
</style>
