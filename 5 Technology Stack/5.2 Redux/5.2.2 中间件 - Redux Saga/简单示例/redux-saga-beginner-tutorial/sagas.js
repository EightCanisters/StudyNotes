import { delay } from 'redux-saga'
import { put, takeEvery, all } from 'redux-saga/effects'

export function* helloSaga() {
  console.log('Hello sagas!');
}

// OUR worker Saga: 将执行异步的increment任务
export function* incrementAsync() {
  yield delay(1000)
  yield put({ type: 'INCREMENT'})
}

// Our worker Saga: 在每个 INCREMENT_ASYNC action spawn 一个新的 incrementAsync任务
export function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync()
  ])
}