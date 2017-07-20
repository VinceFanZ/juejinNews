import React, {
  PureComponent
} from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/components/common-header.css'

class CommonHeader extends PureComponent {
  state = {
    current: 'all'
  }

  componentDidMount() {
  }

  render() {
    return (
      <header>
        <nav className={styles.nav}>
          <div className={styles['nav-item']}>
            <Link to="/all">全部</Link>
          </div>
          <div className={styles['nav-item']}>
            <Link to="/frontend">前端</Link>
          </div>
        </nav>
      </header>
    )
  }
}

export default CommonHeader
