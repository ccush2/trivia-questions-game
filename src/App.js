import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Category from "./components/Category";
import Question from "./components/Question";
import "./App.css";

/**
 * The main application component.
 * Handles the game state and routing.
 */
function App() {
  const [score, setScore] = useState(0);

  /**
   * Updates the score by adding the given points.
   * @param {number} points - The points to add to the score.
   */
  const updateScore = (points) => {
    setScore((prevScore) => prevScore + points);
  };

  /**
   * Resets the score to 0.
   */
  const resetScore = () => {
    setScore(0);
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Home
              score={score}
              updateScore={updateScore}
              resetScore={resetScore}
            />
          }
        />
        <Route path="/category/:categoryName" element={<Category />} />
        <Route path="/question/:questionId" element={<Question />} />
      </Routes>
    </div>
  );
}

export default App;
