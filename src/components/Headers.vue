<template>
  <div class="slick-header-columns" :class="headerColPosClass" style="left:-1000px;" :style="headerColsStyles">
    <header-single v-for="col in columns" :key="col.id" :col="col"></header-single>
  </div>
</template>

<script>
  import Header from './Header'

  export default {
    name: 'headers',
    props: ['columns', 'position', 'colsWidth'],
    components: {
      'header-single': Header
    },
    data () {
      return {
        headerColsStyles: {
          width: (1000 + this.colsWidth) + 'px'
        }
      }
    },
    computed: {
      headerColPosClass () {
        return `slick-header-columns-${this.position}`
      }
    }
  }
</script>

<style>
  .slick-header-columns {
    position: relative;
    white-space: nowrap;
    cursor: default;
    overflow: hidden;
  }
</style>
