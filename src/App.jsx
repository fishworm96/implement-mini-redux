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
const ComponentTwo = () => <section>组件二<UserModifier /></section>
const ComponentThree = () => <section>组件三</section>

const User = () => {
  const contextValue = useContext(appContext)
  return <div>User: {contextValue.appState.user.name}</div>
}

const UserModifier = () => {
  const contextValue = useContext(appContext)
  const { appState, setAppState } = contextValue
  const onChange = e => {
    appState.user.name = e.target.value
    setAppState({ ...contextValue.appState })
  }

  return <div>
    <input value={contextValue.appState.user.name}
      onChange={onChange}
    />
  </div>
}

export default App
