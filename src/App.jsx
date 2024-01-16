import { useState } from 'react'
import './App.css'
import question from "./Question.jsx";
import Question from "./Question.jsx";

function App() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [questions, setQuestions] = useState([]);
    const [code, setCode] = useState("");


  const regenerate = () => {
      let info = {title: title, description: description};
      let code = {__format: "BFS2QUIZ", info: info};

      setCode(JSON.stringify(code));
  }

  return (
    <>
        <h2>Quiz Designer</h2>

        <p>Titel</p>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titel" />
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Beschreibung" />

        <button onClick={() => regenerate()}>Neu generieren</button>

        <button onClick={() => setQuestions([...questions, {}])}>Frage erstellen</button>

        {questions.map(question => {
            return <Question></Question>;
        })}

        <p>^{code}</p>

    </>
  )
}

export default App;