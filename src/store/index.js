import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function sumColsWidths (columns) {
  let sumWidths = 0
  columns.forEach(col => (sumWidths += col.width))
  return sumWidths
}

const DEFAULTS = {
  frozenColumns: 0,
  containerWidth: 200,
  containerHeight: 200,
  itemHeight: 28,
  leftColsWidth: 0,
  rightColsWidth: 0,
  viewportHeight: 200
}

export const store = new Vuex.Store({
  state: {
    frozenColumns: DEFAULTS.frozenColumns,
    rows: [],
    selectedRows: [],
    columns: [],
    visibleItems: [],
    leftColumns: [],
    leftColsWidth: DEFAULTS.leftColsWidth,
    rightColumns: [],
    rightColsWidth: DEFAULTS.rightColsWidth,
    sortBy: '',
    sortAscend: true,
    containerWidth: DEFAULTS.containerWidth,
    containerHeight: DEFAULTS.containerHeight,
    itemHeight: DEFAULTS.itemHeight,
    activeRow: false,
    viewportHeight: DEFAULTS.viewportHeight
  },
  getters: {
    frozenColumns (state) {
      return state.frozenColumns
    },
    rows (state) {
      return state.rows
    },
    selectedRows (state) {
      return state.selectedRows
    },
    columns (state) {
      return state.columns
    },
    visibleItems (state) {
      return state.visibleItems
    },
    leftColumns (state) {
      return state.leftColumns
    },
    leftColsWidth (state) {
      return state.leftColsWidth
    },
    rightColumns (state) {
      return state.rightColumns
    },
    rightColsWidth (state) {
      return state.rightColsWidth
    },
    sortBy (state) {
      return state.sortBy
    },
    sortAscend (state) {
      return state.sortAscend
    },
    containerWidth (state) {
      return state.containerWidth
    },
    containerHeight (state) {
      return state.containerHeight
    },
    itemHeight (state) {
      return state.itemHeight
    },
    activeRow (state) {
      return state.activeRow
    },
    viewportHeight (state) {
      return state.viewportHeight
    }
  },
  mutations: {
    setFrozenColumns (state, frozenColumns) {
      state.frozenColumns = frozenColumns
    },
    setContainerWidth (state, newContainerWidth) {
      state.containerWidth = newContainerWidth
    },
    setContainerHeight (state, newContainerHeight) {
      state.containerHeight = newContainerHeight
    },
    setRows (state, newRows) {
      state.rows = newRows
      state.viewportHeight = state.rows.length * state.itemHeight
    },
    setSortedRows (state, sortedRows) {
      state.rows = sortedRows
    },
    setVisibleItems (state, visibleItems) {
      state.visibleItems = visibleItems
    },
    setColumns (state, newCols) {
      state.columns = newCols
      state.leftColumns = state.columns.slice(0, state.frozenColumns)
      state.leftColsWidth = sumColsWidths(state.leftColumns)
      state.rightColumns = state.columns.slice(state.frozenColumns)
      state.rightColsWidth = sumColsWidths(state.rightColumns)
    },
    setActiveRow (state, row) {
      state.activeRow = row
    },
    setSortAscend (state, sortAscend) {
      state.sortAscend = sortAscend
    },
    setSortBy (state, sortBy) {
      state.sortBy = sortBy
    },
    setSelectedRow (state, selectedRow) {
      state.selectedRows
    }
  },
  actions: {
    initGrid ({ commit }, {
      frozenColumns = DEFAULTS.frozenColumns,
      containerHeight = DEFAULTS.containerHeight,
      containerWidth = DEFAULTS.containerWidth,
      rows = [],
      columns = []
    }) {
      commit('setFrozenColumns', frozenColumns)
      commit('setContainerHeight', containerHeight)
      commit('setContainerWidth', containerWidth)
      commit('setRows', rows)
      commit('setColumns', columns)
    },
    changeActiveRow ({ commit }, rowId) {
      commit('setActiveRow', rowId)
    },
    resetActiveRow ({ commit }) {
      commit('setActiveRow', false)
    },
    sortColumn ({ commit, state }, { field: colField }) {
      const sortAscend = colField === state.sortBy && !state.sortAscend
      const sortedRows = state.rows = state.rows.sort((a, b) => {
        let result = 0
        const valueA = a[colField]
        const valueB = b[colField]
        if (valueA < valueB) {
          result = sortAscend ? -1 : 1
        }
        if (valueA > valueB) {
          result = sortAscend ? 1 : -1
        }
        return result
      })

      commit('setSortAscend', sortAscend)
      commit('setSortBy', colField)
      commit('setSortedRows', sortedRows)
    },
    selectRow ({ commit }, rowIndex) {
      commit('setSelectedRow', rowIndex)
    }
  }
})
