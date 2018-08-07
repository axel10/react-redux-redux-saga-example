/* export function counter (state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'INCREMENT_IF_ODD':
      return (state % 2 !== 0) ? state + 1 : state
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
} */

import {combineReducers} from 'redux'

const initState = {
  list: []
}

function userList (state = initState, action) {
  if (action.type === 'setList') {
    state.list = action.list
  }
  if (action.type === 'userList/removeListUser') { // 原生的reducer只能靠action的type来判断执行哪个方法来修改数据。dvajs能够解决这个问题。
    state.list = state.list.filter(o => o.id !== action.id)
  }
  return {...state}
}

function count (state = 0, action) { // 同学们可以使用count来实现一个计数器以巩固知识。
  return state
}

export default combineReducers({ // 合并所有reducer
  count, userList
})
