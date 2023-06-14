import { useState, useContext, createContext } from "react"

const appContext = createContext(null)

function App () {
  const [appState, setAppState] = useState({
    user: { name: "fishworm", age: 18 }
  })
  const contextValue = { appState, setAppState }

  return (
    <appContext.Provider value={contextValue}>
      <ComponentOne />
      <ComponentTwo />
      <ComponentThree />
    </appContext.Provider>
  )
}

const ComponentOne = () => <section>组件一<User /></section>
const ComponentTwo = () => <section>组件二<Wrapper /></section>
const ComponentThree = () => <section>组件三</section>

const User = () => {
  const contextValue = useContext(appContext)
  return <div>User: {contextValue.appState.user.name}</div>
}

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

const Wrapper = () => {
  const { appState, setAppState } = useContext(appContext)
  const dispatch = (action) => {
    setAppState(reducer(appState, action))
  }

  return <UserModifier dispatch={dispatch} state={appState} />
}

const UserModifier = ({ dispatch, state }) => {
  const onChange = e => {
    dispatch({ type: 'updateUser', payload: { name: e.target.value } })
  }

  return <div>
    <input value={state.user.name}
      onChange={onChange}
    />
  </div>
}

export default App
