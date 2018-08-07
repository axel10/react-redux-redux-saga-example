import {all, put, select, call, takeEvery} from 'redux-saga/effects'
import axios from 'axios'

function* helloSaga () {
  console.log('Hello Sagas!')
}

function* getList () {
  const list = yield call(() => {
    return axios.get('http://jsonplaceholder.typicode.com/users').then(o => o.data)
  })
  yield put({type: 'setList', list}) // 将或得到的数据用reducer设置到state
}

function* listenInit () {
  yield takeEvery('userList/init', getList) // 监听dispatch出来的action的type来执行其他的effect
}

function* listenRemove () {
  yield takeEvery('userList/remove', postRemoveUser)
}

function* postRemoveUser (action) {
  let result = yield call((id) => axios.post('http://jsonplaceholder.typicode.com/users'), action.id)

  result = true // 假设已成功
  if (result) {
    yield put({type: 'userList/removeListUser', id: action.id})
  }
}

export default function* rootSaga () {
  yield all([ // 合并所有saga
    helloSaga(),
    listenInit(),
    listenRemove()
  ])
}
