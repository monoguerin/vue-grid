export default [
  {
    id: 0,
    width: 30,
    formatter () {
      return `<input type="checkbox">`
    }
  },
  {
    id: 'col-count',
    width: 50,
    formatter (rowIndex) {
      return rowIndex + 1
    }
  },
  {
    id: 1,
    title: 'Column1',
    width: 85,
    field: 'column-1'
  },
  {
    id: 2,
    title: 'Column2',
    width: 85,
    field: 'column-2'
  },
  {
    id: 3,
    title: 'Column3',
    width: 85,
    field: 'column-3'
  },
  {
    id: 4,
    title: 'Column4',
    width: 85,
    field: 'column-4'
  },
  {
    id: 5,
    title: 'Column5',
    width: 85,
    field: 'column-5'
  },
  {
    id: 6,
    title: 'Column6',
    width: 85,
    field: 'column-6'
  }
]
