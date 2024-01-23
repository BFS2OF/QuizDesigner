import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

function Question({setQuestions, index, ...props}) {

    const [title, setTitle] = useState(props.title || "");

    const [type, setType] = useState("SINGLE_CHOICE");

    const [answers, setAnswers] = useState(props.answers || ["", "", "", ""]);

    const [correctAnswer, setCorrectAnswer] = useState(props.correctAnswer || 1);

    const updateQuestion = () => {
        setQuestions(questions => {
            const newQuestions = [...questions];
            newQuestions[index] = {title, type, answers, correctAnswer};
            return newQuestions;
        });
    }

    const deleteQuestion = () => {
        setQuestions(questions => questions.filter((_, i) => i !== index));
    }

    return (
        <div className="question">
            <div className="question-header">
                <h2>Frage</h2>
                <div className="delete" onClick={deleteQuestion}>
                    <FontAwesomeIcon icon={faTrash}/>
                </div>
            </div>

            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="frage"
                   placeholder="Wie heißt die Frage?"
                   onBlur={updateQuestion}/>

            <div className="answers">

                {answers?.map((answer, index) => {
                    return <div className="answer" key={index}>
                        <input placeholder="Antwortmöglichkeit" type="text"
                               value={answer}
                               onChange={(e) => {
                                   const newAnswers = [...answers];
                                   newAnswers[index] = e.target.value;
                                   setAnswers(newAnswers);
                               }}
                               onBlur={updateQuestion}/>
                        <input type="radio"
                               checked={correctAnswer === index + 1}
                               onChange={(e) => setCorrectAnswer(index + 1)}
                               className="radio"
                               onBlur={updateQuestion}/>
                    </div>
                })}
            </div>
        </div>
    );
}

export default Question;