import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import AllRoutes from "./components/AllRoutes"
import UserContextProvider from "./context/userContext"
function App() {

  return (
    <>
    <UserContextProvider>
      <AllRoutes></AllRoutes>
    </UserContextProvider>

    </>
  )
}

export default App
