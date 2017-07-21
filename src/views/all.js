import React from 'react'
import service from '../service'
import Item from '../components/Item'

class All extends React.PureComponent {
  state = {
    list: []
  }

  componentDidMount () {
    this.getData()
  }

  componentWillUnmount () {
  }

  async getData () {
    const data = await service.getTimelineData()
    this.setState({
      list: data.entrylist
    })
  }

  itemsRender () {
    const { list } = this.state
    if (!list) {
      return null
    }
    return list.map(item => (
      <Item
        key={item.objectId}
        originalUrl={item.originalUrl}
        title={item.title}
        content={item.content}
        collectionCount={item.collectionCount}
        commentsCount={item.commentsCount}
        username={item.user.username}
        avatarLarge={item.user.avatarLarge}
      />)
    )
  }

  render () {
    return (
      <div>
        {
          this.itemsRender()
        }
      </div>
    )
  }
}

export default All
