import { useState } from 'react'
import Header from './components/Header'
import Banner from './components/Banner'
import Site from './pages/Site'


function App() {
  const [count, setCount] = useState(0)

  return (
    <Site/> 
  )
}

export default App
