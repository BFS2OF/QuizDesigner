import {useState} from 'react';
import './App.css';
import Question from "./Question.jsx";
import Logo from "./assets/logo.png";
import School from "./assets/school.jpg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloudUpload, faFileDownload, faFileImport, faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import toast, { Toaster } from 'react-hot-toast';
import { Tooltip } from "react-tooltip";
import { Buffer } from "buffer";

function App() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [questions, setQuestions] = useState([]);

    const loadQuiz = (file) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const quiz = Buffer.from(e.target.result, "base64").toString("utf-8");
            const parsedQuiz = JSON.parse(quiz);

            if (parsedQuiz.__format !== "BFS2QUIZ") throw new Error("Invalid quiz format");

            setTitle(parsedQuiz.info.title);
            setDescription(parsedQuiz.info.description);
            setQuestions(parsedQuiz.questions);
        }

        reader.readAsText(file);
    }

    const importQuiz = () => {
        const toastId = toast.loading("Quiz wird importiert...");
        const file = document.createElement("input");
        file.type = "file";
        file.accept = ".quizlet";
        file.onchange = (e) => {
            const file = e.target.files[0];
            loadQuiz(file);

            toast.success("Quiz erfolgreich importiert", {duration: 2000});
            toast.dismiss(toastId);
        }

        file.oncancel = () => {
            toast.error("Import abgebrochen", {duration: 2000});
            toast.dismiss(toastId);
        }

        file.click();
    }

    const regenerate = () => {
        let info = {title: title, description: description};
        let code = {__format: "BFS2QUIZ", info: info, questions: questions};

        return Buffer.from(JSON.stringify(code)).toString("base64");
    }

    const download = () => {
        const content = regenerate();

        setTimeout(() => {

            const element = document.createElement("a");
            const file = new Blob([content], {type: 'text/plain'});
            element.href = URL.createObjectURL(file);
            element.download = title + ".quizlet";
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }, 1000);


        toast.success("Quiz zum Download vorbereitet", {duration: 2000});
    }

    const upload = () => {
        const content = regenerate();

        const toastId = toast.loading("Quiz wird hochgeladen...");

        setTimeout(() => fetch("https://pastefy.app/api/v2/paste", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({type: "PASTE", title: title + ".quizlet", content: content,
                visibility: "UNLISTED", encrypted: false, expire_at: null})
        })
            .then(res => res.json())
            .then(res => {
                console.log(res?.paste?.id);
                toast.dismiss(toastId);
                toast.success("Quiz erfolgreich hochgeladen. ID: " + res?.paste?.id,
                    {duration: 5000});
                navigator.clipboard.writeText("https://classroomclient.pages.dev/?quizId=" + res?.paste?.id);
            })
            .catch(e => {
                toast.dismiss(toastId);
                toast.error("Fehler beim Hochladen: " + e, {duration: 2000});
            }), 1000);
    }

    return (
        <>
            <div className="title">
                <div className="logo-container">
                    <img width="60px" src={Logo} alt="Logo"/>
                    <h2>Quiz Creator</h2>

                </div>
                <h2 className="rechts"> MTLM Product</h2>
            </div>

            <div className="layout">
                <div className="content">
                    <div className="center-content">
                        <div className="input-container"><h2>Quiztitel</h2>
                            <hr/>
                        </div>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                               placeholder="Wie heißt das Quiz?"/>
                        <br/>
                        <div className="input-container"><h2>Beschreibung</h2>
                            <hr/>
                        </div>

                        <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                                  placeholder="Beschreibung"/>


                        <div className="input-container"><h2>Fragen</h2><hr/></div>

                        {questions?.map((question, index) => {
                            return <Question setQuestions={setQuestions} index={index} {...question} key={Math.random()}/>
                        })}

                        <div className="new-question" onClick={() => setQuestions([...questions, {}])}>
                            <FontAwesomeIcon icon={faPlusCircle}/>
                            <h2>Frage hinzufügen</h2>
                        </div>
                    </div>
                </div>

                <div className="descriptor-right">
                <img src={School} alt="Schule" width="500px" className="school"/>
                    <div className="download-area">
                        <div className="btn" id="import-btn" onClick={importQuiz}>
                            <FontAwesomeIcon icon={faFileImport}/>
                        </div>
                        <Tooltip anchorSelect="#import-btn" place="top" arrowColor="transparent">
                            Datei importieren
                        </Tooltip>

                        <div className="btn" id="download-btn" onClick={download}>
                            <FontAwesomeIcon icon={faFileDownload}/>
                        </div>
                        <Tooltip anchorSelect="#download-btn" place="top" arrowColor="transparent">
                            Herunterladen
                        </Tooltip>

                        <div className="btn" id="upload-btn" onClick={upload}>
                            <FontAwesomeIcon icon={faCloudUpload}/>
                        </div>
                        <Tooltip anchorSelect="#upload-btn" place="top" arrowColor="transparent">
                            In Cloud laden
                        </Tooltip>
                    </div>
                </div>
            </div>

            <div className="container"/>

            <Toaster
                position="bottom-right"
                toastOptions={{
                    style: {
                        fontSize: "1.2rem",
                    },
                }}
                reverseOrder={false} />

        </>
    )
}

export default App;