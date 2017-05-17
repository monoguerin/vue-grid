<template>
    <div class="slick-header-column" :title="title" :style="inlineStyles">
        <span class="slick-column-name">{{ title }}</span>
        <div class="slick-resizable-handle"></div>
    </div>
</template>

<script>
  export default {
    name: 'column',
    props: ['title', 'width'],
    data () {
      return {
        inlineStyles: {
          'width': this.width + 'px'
        }
      }
    }
  }
</script>

<style>
  .slick-header-column {
    display: inline-block;
    vertical-align: top;
    padding-left: 6px;
    padding-right: 6px;
    margin-left: 10px;
    box-sizing: border-box;
    text-overflow: ellipsis;
    overflow: hidden;
    min-height: 18px;
  }

  .slick-header-column:first-child {
    margin: 0;
  }
</style>
