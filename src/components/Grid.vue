<template>
  <div id="myGrid" class="grid-star">
    <!--<div tabindex="0" hidefocus="" style="position:fixed;width:0;height:0;top:0;left:0;outline:0;"></div>-->
    <columns :columns="columns"></columns>
    <!--<div class="slick-headerrow" style="overflow: hidden; position: relative; display: none;">
        <div class="slick-headerrow-columns" style="width: 480px;"></div>
        <div style="display: block; height: 1px; position: absolute; top: 0px; left: 0px; width: 495px;"></div>
    </div>
    <div class="slick-top-panel-scroller " style="overflow: hidden; position: relative; display: none;">
        <div class="slick-top-panel" style="width:10000px"></div>
    </div>-->
    <div @scroll="handleScroll" @mousewheel="handleMouseWheel" class="slick-viewport" style="width: 100%; overflow: auto; outline: 0px; position: relative; height: 100%;">
        <div class="grid-canvas" :style="{ height: virtualHeight + 'px'}">
          <row v-for="(row, index) in data" :key="index" :index="index" :row="row" :columns="columns"></row>
        </div>
    </div>
    <div tabindex="0" hidefocus="" style="position:fixed;width:0;height:0;top:0;left:0;outline:0;"></div>
  </div>
</template>

<script>
  import Columns from './Columns'
  import Row from './Row'
  import data from './config/data'
  import columns from './config/columns'

  export default {
    name: 'grid',
    components: {
      'columns': Columns,
      'row': Row
    },
    data () {
      return {
        data,
        columns
      }
    },
    computed: {
      virtualHeight () {
        return this.data.length * 28
      }
    },
    methods: {
      handleScroll () {
        window.console.log(arguments)
      },
      handleMouseWheel () {
        window.console.log(arguments)
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
</style>
