import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [title, setTitle] = useState("");

  const regenerate = () => {
      let code = {title: title, description: "Test"};

      alert(JSON.stringify(code));
  }

  return (
    <>
        <h2>Quiz Designer</h2>

        <p>Titel</p>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

        <button onClick={() => regenerate()}>Neu generieren</button>

    </>
  )
}

export default App
