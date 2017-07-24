import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { increase, decrease } from '../actions/count'

/* eslint-disable */
function Other ({ number, increase, decrease }) {
  return (
    <div>
      Some state changes:
      {number}
      <button onClick={() => increase(1)}>Increase</button>
      <button onClick={() => decrease(1)}>Decrease</button>
    </div>
  )
}

export default withRouter(connect(
  state => ({ number: state.count.number }),
  { increase, decrease }
)(Other))
