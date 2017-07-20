import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import PropTypes from 'prop-types'
import All from '../views/all'
import Frontend from '../views/frontend'
import styles from '../styles/nav.css'

const rootContainer = () => (
  <Router>
    <div>
      <nav className={styles.nav}>
        <NavRoute activeOnlyWhenExact to="/" label="全部" />
        <NavRoute to="/frontend" label="前端" />
      </nav>

      <Route exact path="/" component={All} />
      <Route path="/frontend" component={Frontend} />
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
  <div className={`${styles['nav-item']} ${(match ? styles.active : '')}`}>
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
