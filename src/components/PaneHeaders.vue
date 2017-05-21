<template>
  <div class="slick-pane slick-pane-header" :class="positionClass" :style="paneInlineStyles" tabindex="0">
    <div class="slick-header" :class="headerPosClass">
      <div class="slick-header-columns" :class="headerColPosClass" style="left:-1000px;" :style="headerColsStyles">
        <!-- EACH HEADER -->
        <div v-for="col in columns" class="slick-header-column col slick-header-sortable" :style="{ width: col.width + 'px' }">
          <span class="slick-column-name" v-html="titleValue(col)"></span>
          <span class="slick-sort-indicator"></span>
          <div class="slick-resizable-handle"></div>
        </div>
        <!-- END OF EACH HEADER -->
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Pane',
    props: ['position', 'columns', 'leftGap', 'colsWidth', 'containerWidth'],
    data () {
      return {
        paneInlineStyles: {
          left: this.leftGap + 'px',
          width: this.containerWidth - this.leftGap + 'px'
        },
        headerColsStyles: {
          width: (1000 + this.colsWidth) + 'px'
        }
      }
    },
    computed: {
      positionClass () {
        return `slick-pane-${this.position}`
      },
      headerPosClass () {
        return `slick-header-${this.position}`
      },
      headerColPosClass () {
        return `slick-header-columns-${this.position}`
      }
    },
    methods: {
      titleValue (col) {
        return col.headerFormatter ? col.headerFormatter(col.title) : col.title
      }
    }
  }
</script>

<style>
  .slick-pane-right {
    position: absolute;
    top: 0;
  }

  .slick-header-columns {
    position: relative;
    white-space: nowrap;
    cursor: default;
    overflow: hidden;
  }

  .slick-header-column {
    position: relative;
    display: table-cell;
    -o-text-overflow: ellipsis;
    text-overflow: initial;
    float: none;
    white-space: normal;
    vertical-align: bottom;
    height: 38px;
    padding-bottom: 8px;
    left: 1000px;

    color: #666666;
    line-height: 19px;
    min-height: 23px;
    font-size: 14px;
    padding-left: 6px;
    padding-right: 6px;
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
