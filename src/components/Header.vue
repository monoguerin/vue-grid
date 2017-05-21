<template>
  <div class="slick-header-column col slick-header-sortable" :style="{ width: col.width + 'px' }">
    <span class="slick-column-name" v-html="titleValue(col)"></span>
    <span class="slick-sort-indicator"></span>
    <div class="slick-resizable-handle"></div>
  </div>
</template>

<script>
  export default {
    name: 'header-single',
    props: ['col'],
    methods: {
      titleValue (col) {
        return col.headerFormatter ? col.headerFormatter(col.title) : col.title
      }
    }
  }
</script>

<style>
  .slick-header-column {
    position: relative;
    -o-text-overflow: ellipsis;
    text-overflow: initial;
    float: none;
    white-space: normal;
    height: 38px;
    padding-bottom: 8px;
    left: 1000px;
    color: #666666;
    line-height: 19px;
    font-size: 14px;
    display: inline-block;
    vertical-align: top;
    padding-left: 6px;
    padding-right: 6px;
    box-sizing: border-box;
    overflow: hidden;
    min-height: 18px;
  }

  .slick-sort-indicator {
    position: absolute;
    font-size: 15px;
    margin: 0;
    height: 0;
    display: inline-block;
    width: 8px;
    font-family: "mui-font";
    speak: none;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
  }

  .slick-resizable-handle {
    position: absolute;
    font-size: 0.1px;
    display: block;
    cursor: col-resize;
    width: 2px;
    right: 0px;
    top: 0;
    height: 100%;
    z-index: 10;
  }

  .slick-resizable-handle:hover {
    background-color: #00A8E1;
  }
</style>
