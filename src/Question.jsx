import {useState} from "react";

function Question() {

    const [title, setTitle] = useState("");

    const [type, setType] = useState("SINGLE_CHOICE");

    const [answers, setAnswers] = useState([]);

    const [correctAnswer, setCorrectAnswert] = useState(0);

    return (
        <div className="question">
            <h2>Frage</h2>

            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="frage" />
            <select>
                <option value={type}>SINGLE_CHOICE</option>
            </select>
            {answers.map(answer => {
                return <input placeholder="Antwortmöglichkeit"/>
            })}

            <input type="number" value= {correctAnswer} onChange={(e) => setCorrectAnswert(e.target.value)} className={"zaehler"} />

        </div>
    );
}

export default Question;