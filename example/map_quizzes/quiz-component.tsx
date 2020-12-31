import * as React from "react"

type QuizQuestions = {
  id: string
  correct: boolean | null
}[]

const shuffleQuestions = (questions: string[]): QuizQuestions => {
  // knuth shuffle the questions
  let currentIndex = questions.length
  let temporaryValue
  let randomIndex

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    temporaryValue = questions[currentIndex]
    questions[currentIndex] = questions[randomIndex]
    questions[randomIndex] = temporaryValue
  }

  return questions.map(q => ({ id: q, correct: null }))
}

type reducerState = {
  quizState: "answerQuestion" | "reviewQuestion" | "quizComplete"
  guess: string
  questions: QuizQuestions
  index: number
}
type actionType = {
  type: string
  guess?: string
  questionSet?: string[]
}
const reducer = (state: reducerState, action: actionType) => {
  switch (action.type) {
    case "CLICK_MAP": {
      if (state.guess) return state
      let guess = action.guess as string
      let question = state.questions[state.index]
      return {
        ...state,
        guess,
        questions: state.questions.map(q => {
          if (q.id === question.id) {
            return { id: q.id, correct: guess === question.id }
          }
          return q
        }),
        quizState:
          state.index === state.questions.length - 1
            ? "quizComplete"
            : "reviewQuestion",
      }
    }
    case "NEXT_QUESTION": {
      return {
        ...state,
        guess: "",
        index: state.index + 1,
        quizState: "answerQuestion",
      }
    }
    case "RESTART_QUIZ": {
      return {
        quizState: "answerQuestion",
        guess: "",
        questions: shuffleQuestions(action.questionSet as string[]),
        index: 0,
      }
    }
    default:
      throw Error(`unhandled action type ${action.type}`)
  }
}

export const QuizComponent = ({ questionSet, Component }) => {
  // state is answerQuestion -> reviewAnswer recursively, then quizComplete
  let [{ questions, index, quizState, guess }, dispatch] = React.useReducer(
    reducer,
    {
      quizState: "answerQuestion",
      guess: "",
      questions: shuffleQuestions(questionSet),
      index: 0,
    }
  )

  React.useEffect(() => dispatch({ type: "RESTART_QUIZ", questionSet }), [
    questionSet,
  ])

  let question = questions[index]
  const config = {
    [guess]: {
      fill: question.id === guess ? "#0F0" : "#F00",
    },
    [question.id]: {
      fill: !guess ? "#ccc" : "#0F0",
    },
  }

  const mapHandler = event =>
    dispatch({ type: "CLICK_MAP", guess: event.target.dataset.name })

  const FeedbackModal = () => (
    <div className="modal">
      <div className="modal-content">
        {quizState === "reviewQuestion" && (
          <>
            <div
              style={{ color: guess === question.id ? "#4caf50" : "#f44336" }}
            >
              {guess === question.id ? "Correct" : `You chose ${guess}`}
            </div>
            <button onClick={() => dispatch({ type: "NEXT_QUESTION" })}>
              Next Question
            </button>
          </>
        )}
        {quizState === "quizComplete" && (
          <>
            <div style={{ color: "#4caf50" }}>Great job!</div>
            <div>
              You scored{" "}
              {(
                (questions.filter(q => q.correct).length / questions.length) *
                100
              ).toFixed(0)}
              %
            </div>
            <button
              onClick={() => dispatch({ type: "RESTART_QUIZ", questionSet })}
            >
              Play Again
            </button>
          </>
        )}
      </div>
    </div>
  )
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={{ display: "flex" }}>
        {questions.map(q => (
          <div
            key={q.id}
            style={{
              width: 20,
              height: 20,
              margin: 3,
              borderRadius: "50%",
              background:
                q.correct === null ? "#aaa" : q.correct ? "#4caf50" : "#f44336",
            }}
          />
        ))}
      </div>
      <div style={{ color: "dodgerblue", fontSize: 20 }}>
        Where is {question.id}?
      </div>
      {guess && <FeedbackModal />}

      <div style={{ width: 600 }}>
        <Component
          customize={config}
          defaultClickHandler={mapHandler}
          hideTitles
        />
      </div>
    </div>
  )
}
