import React, { Component } from 'react'
import ReactDataGrid from 'react-data-grid'
import createRows from './createRows'
import { Editors, Formatters, Filters } from 'react-data-grid-addons'
import { sort } from 'ramda'
import Toolbar from './Toolbar'

import 'bootstrap/dist/css/bootstrap.css'

const {
  NumericFilter,
  AutoCompleteFilter,
  MultiSelectFilter,
  SingleSelectFilter
} = Filters
const { AutoComplete: AutoCompleteEditor, DropDownEditor } = Editors
const { DropDownFormatter } = Formatters

const resizable = true
const sortable = true
const editable = true
const locked = true
const filterable = true

const priorities = [
  { id: 0, title: 'Critical' },
  { id: 1, title: 'High' },
  { id: 2, title: 'Medium' },
  { id: 3, title: 'Low' }
]
const PrioritiesEditor = <AutoCompleteEditor options={priorities} />

const issueTypes = [
  { id: 'bug', value: 'bug', text: 'Bug', title: 'Bug' },
  {
    id: 'improvement',
    value: 'improvement',
    text: 'Improvement',
    title: 'Improvement'
  },
  { id: 'epic', value: 'epic', text: 'Epic', title: 'Epic' },
  { id: 'story', value: 'story', text: 'Story', title: 'Story' }
]
const IssueTypesEditor = <DropDownEditor options={issueTypes} />
const IssueTypesFormatter = (
  <DropDownFormatter options={issueTypes} value="bug" />
)

const PercentCompleteFormatter = ({ value, dependentValues }) => (
  <div className="progress">
    <div
      className="progress-bar"
      role="progressbar"
      aria-valuenow="60"
      aria-valuemin="0"
      aria-valuemax="100"
      style={{ width: value * 2 }}
    >
      {value} %
    </div>
  </div>
)

const CustomFilter = ({ column, onChange }) => (
  <div
    onClick={() =>
      onChange({
        column,
        filterTerm: 'Story'
      })
    }
  >
    hi
  </div>
)

const columns = [
  {
    key: 'id',
    name: 'ID',
    width: 80,
    sortable,
    resizable,
    filterable,
    locked,
    filterRenderer: NumericFilter
  },
  {
    key: 'task',
    name: 'Title',
    editable,
    sortable,
    resizable,
    filterable
  },
  {
    key: 'priority',
    name: 'Priority',
    editor: PrioritiesEditor,
    sortable,
    resizable,
    filterable
  },
  {
    key: 'issueType',
    name: 'Issue Type',
    editor: IssueTypesEditor,
    formatter: IssueTypesFormatter,
    filterRenderer: CustomFilter,
    sortable,
    resizable,
    filterable
  },
  {
    key: 'complete',
    name: '% Complete',
    formatter: PercentCompleteFormatter,
    width: 200,
    editable,
    sortable,
    resizable,
    filterable
  },
  {
    key: 'startDate',
    name: 'Start Date',
    editable,
    sortable,
    resizable,
    filterable
  },
  {
    key: 'completeDate',
    name: 'Expected Complete',
    sortable,
    resizable,
    filterable
  }
]

const _rows = createRows()

class App extends Component {
  state = {
    _rows,
    rows: [..._rows]
  }

  handleGridSort = (col, direction) => {
    this.setState({
      rows:
        direction === 'NONE'
          ? this.state._rows
          : sort(
              (a, b) =>
                direction === 'ASC'
                  ? a[col] > b[col]
                    ? 1
                    : -1
                  : a[col] < b[col]
                    ? 1
                    : -1,
              this.state._rows
            )
    })
  }

  handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    console.log(fromRow, toRow, updated)
    let rows = this.state.rows.slice()

    for (let i = fromRow; i <= toRow; i++) {
      let rowToUpdate = rows[i]
      let updatedRow = { ...rowToUpdate, ...updated }
      rows[i] = updatedRow
    }

    this.setState({ rows })
  }

  handleFilterChange = filter => {
    let filters = { ...this.state.filters }
    console.log(filters)
    if (filter.filterTerm) {
      filters[filter.column.key] = filter
    } else {
      delete filters[filter.column.key]
    }
    const rows = this.state._rows.filter(row => {
      for (let columnName in filters) {
        if (
          row[columnName]
            .toLowerCase()
            .indexOf(filters[columnName].filterTerm.toLowerCase()) === -1
        )
          return false
      }
      return true
    })

    this.setState({ filters, rows })
  }

  onClearFilters = () => {
    this.setState({ filters: {} })
  }

  getRow = i => this.state.rows[i]

  render() {
    const { rows } = this.state
    return (
      <ReactDataGrid
        columns={columns}
        rowGetter={this.getRow}
        rowsCount={rows.length}
        enableCellSelect={true}
        onGridRowsUpdated={this.handleGridRowsUpdated}
        onGridSort={this.handleGridSort}
        toolbar={<Toolbar enableFilter={true} />}
        onAddFilter={this.handleFilterChange}
        onClearFilters={this.onClearFilters}
      />
    )
  }
}

export default App
