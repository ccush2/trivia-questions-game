import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Category.css";

/**
 * Component for displaying a category and its questions.
 * @param {Object} props - The component props.
 * @param {string} props.category - The category name.
 */
function Category({ category }) {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  /**
   * Fetches questions for the category from the API.
   */
  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        "https://the-trivia-api.com/api/questions",
        {
          params: {
            categories: category,
            limit: 20,
          },
        }
      );

      const easyQuestion = response.data.filter(
        (question) => question.difficulty === "easy"
      )[0];
      const mediumQuestion = response.data.filter(
        (question) => question.difficulty === "medium"
      )[0];
      const hardQuestions = response.data
        .filter((question) => question.difficulty === "hard")
        .slice(0, 2);

      const questions = [easyQuestion, mediumQuestion, ...hardQuestions]
        .filter((question) => question !== undefined)
        .map((question) => ({
          ...question,
          question: { text: question.question },
        }));

      setQuestions(questions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  /**
   * Gets the point value for a question based on its index.
   * @param {number} index - The index of the question.
   * @returns {number} The point value.
   */
  const getPointValue = (index) => {
    const pointValues = [200, 400, 600, 800];
    return pointValues[index];
  };

  /**
   * Handles the click event on a question.
   * Navigates to the question page with the selected question and point value.
   * @param {Object} question - The selected question.
   * @param {number} index - The index of the selected question.
   */
  const handleQuestionClick = (question, index) => {
    const pointValue = getPointValue(index);
    navigate(`/question/${question.id}`, {
      state: { question, pointValue },
    });
  };

  return (
    <div className="category" data-testid="category-component">
      <h2>{category}</h2>
      <ul className="point-values">
        {questions.map((question, index) => (
          <li key={question.id}>
            <button onClick={() => handleQuestionClick(question, index)}>
              ${getPointValue(index)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Category;
