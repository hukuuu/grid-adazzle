import React, { Component } from 'react'

class Toolbar extends Component {
  componentDidMount = () => this.props.onToggleFilter()
  render = () => (
    <div className="react-grid-Toolbar">
      <div className="tools">{this.props.children}</div>
    </div>
  )
}

export default Toolbar
