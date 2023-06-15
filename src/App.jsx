import React from 'react'
import { connectToUser } from './connecters/connectToUser.js'
import { Provider, connect, createStore } from './redux.jsx'

const reducer = (state, { type, payload }) => {
  if (type === 'updateUser') {
    return {
      ...state,
      user: {
        ...state.user,
        ...payload
      }
    }
  }
  return state
}

const initState = {
  user: { name: 'fishworm', age: 18 },
  group: { name: '前端组' }
}

const store = createStore(reducer, initState)

function App () {
  return (
    <Provider store={store}>
      <ComponentOne />
      <ComponentTwo />
      <ComponentThree />
    </Provider>
  )
}

const ComponentOne = () => {
  console.log('componentOne' + Math.random())
  return <section>组件一<User /></section>
}
const ComponentTwo = () => {
  console.log('componentTwo' + Math.random())
  return <section>组件二<UserModifier /></section>
}
const ComponentThree = connect(state => {
  return { group: state.group }
})(({ group }) => {
  console.log('componentThree' + Math.random())
  return <section>组件三<div>
    Group: {group.name}</div>
  </section>
})

const User = connectToUser(({ user }) => {
  console.log('User执行了' + Math.random())
  return <div>User: {user.name}</div>
})

const ajax = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({data: {name: '3秒后的fishworm'}})
    }, 3000)
  })
}

const fetchUser = (dispatch) => {
  ajax('/user').then(response => {
    dispatch({type: 'updateUser', payload: response.data})
  })
}

const UserModifier = connect(null, null)(({ state, dispatch }) => {
  console.log('UserModifier执行了' + Math.random())
  const onClick = e => {
    dispatch(fetchUser)
  }

  return <div>
    <div>User: {state.user.name}</div>
    <button onClick={onClick}>异步获取</button>
  </div>
})

export default App
