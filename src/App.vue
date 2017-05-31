<template>
  <div id="app">
    <grid></grid>
  </div>
</template>

<script>
import Grid from './components/Grid'

import columns from './components/config/columns'

function generateRows () {
  const rows = 1000
  let dataObj = []
  for (let i = 0; i < rows; i++) {
    let rowData = {}
    rowData.id = i
    rowData['column-1'] = `data ${i} column 1`
    rowData['column-2'] = `data ${i} column 2`
    rowData['column-3'] = i + 1
    rowData['column-4'] = `data ${i} column 4`
    rowData['column-5'] = `data ${i} column 5`
    rowData['column-6'] = `data ${i} column 6`

    dataObj.push(rowData)
  }
  return dataObj
}

export default {
  name: 'App',
  components: {
    'grid': Grid
  },
  beforeCreate () {
    this.$store.dispatch('initGrid', {
      containerWidth: 900,
      containerHeight: 800,
      frozenColumns: 3,
      rows: generateRows(),
      columns
    })
  }
}
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  width: 900px;
  height: 800px;
}

.red-bg {
  background-color: red;
}

.text-right {
  text-align: right
}

.text-blue {
  color: blue
}

.text-chocolate {
  color: chocolate!important
}
</style>
