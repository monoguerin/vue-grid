export default [
  {
    id: 0,
    field: '__checkbox',
    width: 30,
    formatter () {
      return `<input type="checkbox">`
    },
    headerFormatter () {
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
    width: 200,
    field: 'column-1'
  },
  {
    id: 2,
    title: 'Column2',
    width: 85,
    field: 'column-2',
    formatter (row, col, value) {
      return `<div class="red-bg">${value}</div>`
    }
  },
  {
    id: 3,
    title: 'Column3',
    width: 85,
    field: 'column-3',
    headerCssClass: 'text-right text-chocolate',
    cssClass: 'text-right text-blue'
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
  },
  {
    id: 7,
    title: 'Column7',
    width: 85,
    field: 'column-7'
  },
  {
    id: 8,
    title: 'Column 8 long long long text header',
    width: 85,
    field: 'column-8'
  },
  {
    id: 9,
    title: 'Column 9',
    width: 85,
    field: 'column-9'
  },
  {
    id: 10,
    title: 'Column 10',
    width: 85,
    field: 'column-10'
  }
]
