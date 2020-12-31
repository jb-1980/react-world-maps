import "react-app-polyfill/ie11"
import * as React from "react"
import * as ReactDOM from "react-dom"
import { QuizComponent } from "./map_quizzes/quiz-component"
import * as DATA from "./map_quizzes/data-sets"
import {
  AfricaMap,
  AsiaMap,
  EuropeMap,
  NorthAmericaMap,
  SouthAmericaMap,
  UnitedStatesMap,
} from "../dist"
import "./index.css"

const App = () => {
  let [quiz, chooseQuiz] = React.useState("")

  let quizzes: { [key: string]: React.ReactNode } = {
    Africa: (
      <QuizComponent questionSet={DATA.africa_data} Component={AfricaMap} />
    ),
    Asia: <QuizComponent questionSet={DATA.asia_data} Component={AsiaMap} />,
    Europe: (
      <QuizComponent questionSet={DATA.europe_data} Component={EuropeMap} />
    ),
    "North America": (
      <QuizComponent questionSet={DATA.na_data} Component={NorthAmericaMap} />
    ),
    "South America": (
      <QuizComponent questionSet={DATA.sa_data} Component={SouthAmericaMap} />
    ),
    "United States": (
      <QuizComponent questionSet={DATA.us_data} Component={UnitedStatesMap} />
    ),
  }

  return (
    <div style={{ minWidth: 900 }}>
      {quiz !== "" ? (
        <div>
          <button
            style={{
              background: "none",
              color: "dodgerblue",
              fontSize: 20,
              marginBottom: 10,
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => chooseQuiz("")}
          >
            ⇦ Back to map selector
          </button>
          {quizzes[quiz]}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h3>Which map do you want to practice?</h3>

          {Object.keys(quizzes).map(q => (
            <button
              style={{
                background: "#fff",
                borderRadius: 5,
                border: "2px solid dodgerblue",
                width: 200,
                padding: "7px 5px",
                color: "dodgerblue",
                fontSize: 20,
                margin: "5px 0",
              }}
              key={q}
              onClick={() => chooseQuiz(q)}
            >
              {q}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
