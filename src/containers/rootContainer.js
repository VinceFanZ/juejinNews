import React from 'react'
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import PropTypes from 'prop-types'
import asyncComponent from '../components/asyncComponent'
import nav from '../styles/nav.css'

const All = asyncComponent(() => System.import('../views/all'))
const Frontend = asyncComponent(() => System.import('../views/frontend'))
const Freebie = asyncComponent(() => System.import('../views/freebie.js'))

const rootContainer = () => (
  <Router>
    <div>
      <nav className={nav.nav}>
        <NavRoute activeOnlyWhenExact to="/" label="全部" />
        <NavRoute to="/frontend" label="前端" />
        <NavRoute to="/freebie" label="工具资源" />
      </nav>

      <Route exact path="/" component={All} />
      <Route path="/frontend" component={Frontend} />
      <Route path="/freebie" component={Freebie} />
    </div>
  </Router>
)

const NavRoute = ({ activeOnlyWhenExact, to, label }) => (
  <Route
    exact={activeOnlyWhenExact}
    path={to}
  >
    { ({ match }) => <NavItem match={match} to={to} label={label} /> }
  </Route>
)

const NavItem = ({ match, to, label }) => (
  <div className={`${nav.item} ${(match ? nav.active : '')}`}>
    <Link to={to}>{ label }</Link>
  </div>
)

NavRoute.propTypes = {
  activeOnlyWhenExact: PropTypes.bool,
  to: PropTypes.string,
  label: PropTypes.string,
}

NavItem.propTypes = {
  match: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  to: PropTypes.string,
  label: PropTypes.string,
}

export default rootContainer
