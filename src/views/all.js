import React from 'react'
import app from '../styles/index.css'

class All extends React.PureComponent {
  state = {
    date: new Date()
  }

  componentDidMount () {
    this.timerID = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount () {
    clearInterval(this.timerID)
  }

  tick () {
    this.setState({
      date: new Date()
    })
  }

  render () {
    return (
      <div>
        <h2>All</h2>
        <p className={`${app.title} ${app['fs-18']}`}>DATE</p>
        <p>{this.state.date.toLocaleTimeString()}</p>
      </div>
    )
  }
}

export default All
