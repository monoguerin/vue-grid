<template>
  <div class="slick-pane slick-pane-header" :class="positionClass" :style="paneInlineStyles" tabindex="0">
    <div class="slick-header" :class="headerPosClass">
      <col-headers
        :columns="columns"
        :position="position"
        :cols-width="colsWidth"
        @clickHeader="handleClickHeader">
      </col-headers>
    </div>
  </div>
</template>
<script>
  import Headers from './Headers'

  export default {
    name: 'Pane',
    props: ['position', 'columns', 'leftGap', 'colsWidth', 'containerWidth'],
    components: {
      'col-headers': Headers
    },
    data () {
      return {
        paneInlineStyles: {
          left: this.leftGap + 'px',
          width: this.containerWidth - this.leftGap + 'px'
        }
      }
    },
    computed: {
      positionClass () {
        return `slick-pane-${this.position}`
      },
      headerPosClass () {
        return `slick-header-${this.position}`
      }
    },
    methods: {
      handleClickHeader (col, event) {
        this.$emit('sort', col, event)
      }
    }
  }
</script>

<style>
  .slick-pane-right {
    position: absolute;
    top: 0;
  }

  .slick-header {
    overflow: hidden;
    position: relative;
  }

</style>
