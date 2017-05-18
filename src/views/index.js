import React from 'react'

class App extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date()
    }
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick() {
    this.setState({
      date: new Date()
    })
  }

  render() {
    return (
      <div>
        <p>Funny</p>
        <p>{this.state.date.toLocaleTimeString()}</p>
      </div>
    )
  }
}
export default App
