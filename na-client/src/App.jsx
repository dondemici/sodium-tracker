import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import IngredientPage from './page/IngredientPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <IngredientPage />
    </>
  )
}

export default App
