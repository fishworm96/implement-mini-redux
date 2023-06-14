import React from 'react'
import { connectToUser } from './connecters/connectToUser.js'
import { appContext, store, connect } from './redux.jsx'

function App () {
  return (
    <appContext.Provider value={store}>
      <ComponentOne />
      <ComponentTwo />
      <ComponentThree />
    </appContext.Provider>
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
  return <section>组件三<div>Group: {group.name}</div></section>
})

const User = connectToUser(({ user }) => {
  console.log('User执行了' + Math.random())
  return <div>User: {user.name}</div>
})

const UserModifier = connectToUser(({ updateUser, user, children }) => {
  console.log('UserModifier执行了' + Math.random())
  const onChange = e => {
    updateUser({ name: e.target.value })
  }

  return <div>
    {children}
    <input value={user.name}
      onChange={onChange}
    />
  </div>
})

export default App
