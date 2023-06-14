import React from 'react'
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
const ComponentThree = () => {
  console.log('componentThree' + Math.random())
  return <section>组件三</section>
}

const User = connect(({ state, dispatch }) => {
  console.log('User执行了' + Math.random())
  return <div>User: {state.user.name}</div>
})



const UserModifier = connect(({ dispatch, state, children }) => {
  console.log('UserModifier执行了' + Math.random())
  const onChange = e => {
    dispatch({ type: 'updateUser', payload: { name: e.target.value } })
  }

  return <div>
    {children}
    <input value={state.user.name}
      onChange={onChange}
    />
  </div>
})

export default App
