import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'

import {Provider} from 'react-redux'

import List from './List'
import reducer from './reducers'
import rootSaga from './saga'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

// 列表数据获取流程：List发起dispatch => saga的listener监听到dispatch => 调用effect（saga） => 发起异步请求获得数据 =》 将获得到的数据在reducer里设置到state里
// 用户点击列表项删除也类似列表数据的获取。

function render () {
  // 使用react-redux时要注意用Provider包裹根级组件
  ReactDOM.render(
    <Provider store={store}>
      <List />
    </Provider>
    , document.getElementById('root')
  )
}

render()
