import React from 'react'
import PropType from 'prop-types'
import _ from 'lodash'
import {connect} from 'react-redux'

class List extends React.Component {
  componentDidMount () {
    this.props.dispatch({type: 'userList/init'}) // 调用effect（saga）,
  }

  render () {
    const list = this.props.list
    const dispatch = this.props.dispatch
    return (
      <div>
        <ul>
          {
            list.map(o => (
              <li key={_.uniqueId()} onClick={() => { // lodash的uniqueId()可以很方便的生成唯一id。
                dispatch({type: 'userList/remove', id: o.id})
              }}>{o.name}</li>
            ))
          }
        </ul>
      </div>
    )
  }
}

export default connect((state) => {
  return {list: state.userList.list} // 将store与组件连接起来。connect第一个参数是一个函数，要求返回用来描述props和store的对象。
})(List) // 高阶函数，第一次执行返回一个函数，需要再次执行以完成整个流程。

List.propTypes = { // 用来描述组件的props
  dispatch: PropType.func,
  list: PropType.array
}
