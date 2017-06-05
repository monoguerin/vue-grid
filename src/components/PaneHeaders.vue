<template>
  <div class="slick-pane slick-pane-header" :class="positionClass" :style="paneInlineStyles" tabindex="0">
    <div class="slick-header" :class="headerPosClass">
      <col-headers
        :columns="columns"
        :position="position"
        :cols-width="colsWidth">
      </col-headers>
    </div>
  </div>
</template>
<script>
import { addPx } from './util/utils'
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
        left: addPx(this.leftGap),
        width: addPx(this.containerWidth - this.leftGap)
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
