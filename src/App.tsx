import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FileVisualizer from './FileVisualizer'

function App() {
  const [count, setCount] = useState(0)

  return (

      <FileVisualizer />
    
  )
}

export default App
