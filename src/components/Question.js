import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/Question.css";

/**
 * Component for displaying a question and handling the user's answer.
 */
function Question() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState("");

  useEffect(() => {
    if (
      !location.state ||
      !location.state.question ||
      !location.state.pointValue
    ) {
      navigate("/");
    }
  }, [location.state, navigate]);

  if (
    !location.state ||
    !location.state.question ||
    !location.state.pointValue
  ) {
    return null;
  }

  const { question, pointValue } = location.state;

  /**
   * Handles the answer selection.
   * @param {string} answer - The selected answer.
   */
  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);

    // Update the className of the selected answer button
    const answerButtons = document.querySelectorAll(".answer-options button");
    answerButtons.forEach((button) => {
      if (button.textContent === answer) {
        button.classList.add("selected");
      } else {
        button.classList.remove("selected");
      }
    });
  };

  /**
   * Handles the answer submission.
   * Navigates back to the home page with the result and score.
   */
  const handleSubmit = () => {
    const selectedAnswerButton = document.querySelector(
      ".answer-options button.selected"
    );
    const selectedAnswerText = selectedAnswerButton
      ? selectedAnswerButton.textContent
      : "";

    if (selectedAnswerText === question.correctAnswer) {
      navigate("/", { state: { correct: true, score: pointValue } });
    } else {
      navigate("/", { state: { correct: false } });
    }
  };

  /**
   * Handles the go back button click event.
   * Navigates back to the home page.
   */
  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="question-container" data-testid="question-component">
      <h2>{question.question.text}</h2>
      <ul className="answer-options">
        {[...question.incorrectAnswers, question.correctAnswer].map(
          (answer, index) => (
            <li key={index}>
              <button
                data-testid={`answer-button-${answer}`}
                className={selectedAnswer === answer ? "selected" : ""}
                onClick={() => handleAnswerSelect(answer)}
              >
                {answer}
              </button>
            </li>
          )
        )}
      </ul>
      <div className="button-container">
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleGoBack}>Go Back</button>
      </div>
    </div>
  );
}

export default Question;
