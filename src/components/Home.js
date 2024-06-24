import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Category from "./Category";
import "../css/Home.css";

/**
 * Component for the home page of the trivia game.
 * @param {Object} props - The component props.
 * @param {number} props.score - The current score.
 * @param {function} props.updateScore - Function to update the score.
 * @param {function} props.resetScore - Function to reset the score.
 */
function Home({ score, updateScore, resetScore }) {
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const prevLocationKeyRef = useRef(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  /**
   * Handles the score update based on the location state.
   */
  useEffect(() => {
    if (
      location.state &&
      location.state.correct !== undefined &&
      location.key !== prevLocationKeyRef.current
    ) {
      if (location.state.correct) {
        updateScore(location.state.score);
      } else {
        resetScore();
      }

      prevLocationKeyRef.current = location.key;

      window.history.replaceState({}, document.title);
    }
  }, [location]);

  /**
   * Fetches the categories from the API.
   */
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://the-trivia-api.com/api/categories"
      );
      const categoriesData = Object.entries(response.data)
        .filter(([name]) =>
          [
            "History",
            "Film & TV",
            "General Knowledge",
            "Sport & Leisure",
            "Music",
          ].includes(name)
        )
        .map(([name, tags]) => ({
          name,
          tags,
        }));
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  /**
   * Handles the restart button click event.
   * Resets the score to 0.
   */
  const handleRestart = () => {
    resetScore();
  };

  return (
    <div className="home">
      <h1>Trivia Game</h1>
      <div className="score-container">
        <div>Score: {score}</div>
        <button onClick={handleRestart}>Restart</button>
      </div>
      <div className="grid">
        {categories.map((category) => (
          <Category key={category.name} category={category.name} />
        ))}
      </div>
    </div>
  );
}

export default Home;
