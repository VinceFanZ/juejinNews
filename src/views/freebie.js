import React from 'react'
import app from '../styles/index.css'
import service from '../service'

class Freebie extends React.PureComponent {
  state = {
    date: new Date()
  }

  componentDidMount () {
    this.timerID = setInterval(() => this.tick(), 1000)
    this.getData()
  }

  componentWillUnmount () {
    clearInterval(this.timerID)
  }

  async getData () {
    const data = await service.getRankData('5562b422e4b00c57d9b94b53')
    console.log(data.entrylist)
  }

  tick () {
    this.setState({
      date: new Date()
    })
  }

  render () {
    return (
      <div>
        <h2>Frontend</h2>
        <p className={`${app.title} ${app['fs-18']}`}>DATE</p>
        <p>{this.state.date.toLocaleTimeString()}</p>
      </div>
    )
  }
}

export default Freebie
