import { useState } from 'react'
import './App.css'
import question from "./Question.jsx";
import Question from "./Question.jsx";
import Logo from "./assets/logo_bs2ab_farbe.png";

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
        <div className="title">
            <div className="logo-container">
                <img width="50" src={Logo} alt="Logo" />
                <h2>Quiz creation</h2>

            </div>
            <h2 className="rechts"> MTLM Product</h2>
        </div>

        <div className="content ">



            <p>Titel</p>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Quiz Titel" />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Beschreibung" />

            <button onClick={() => regenerate()}>Neu generieren</button>


            <br/>
            <button className="Frage" onClick={() => setQuestions([...questions, {}])}>Frage erstellen</button>


            {questions.map(question => {
                return <Question></Question>;
            })}

            <p>^{code}</p>

        </div>

        <div className="container" />


        </>
  )
}

export default App;