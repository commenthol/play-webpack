import React, { Component } from 'react'
import Logo from '../components/Logo'

export default class Test extends Component {
  state = {
    show: false
  }

  onClick = () => {
    import('lodash').then(_ => {
      console.log(_)
      // window.alert('lodash loaded')
    })
    this.setState({ show: !this.state.show })
  }

  render () {
    return (
      <div>
        <Logo />
        <h1>This is a test</h1>
        <button onClick={() => this.onClick()}>
          { this.state.show ? 'Hide' : 'Show' }
        </button>
        {this.state.show
          ? this.props.children
          : null
        }
      </div>
    )
  }
}
