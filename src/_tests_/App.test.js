import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import App from "../App";
import axios from "axios";

jest.mock("axios");

const mockCategories = {
  "Arts & Literature": [],
  "Film & TV": [],
  "Food & Drink": [],
  "General Knowledge": [],
  Geography: [],
  History: [],
  Music: [],
  Science: [],
  "Society & Culture": [],
  "Sport & Leisure": [],
};

const mockQuestion = {
  category: "History",
  id: "sample-question-1",
  question: "Sample question for this category?",
  correctAnswer: "Correct Answer",
  incorrectAnswers: ["Incorrect 1", "Incorrect 2", "Incorrect 3"],
  difficulty: "easy",
  type: "text_choice",
};

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

test("initial score is set to 0", async () => {
  axios.get.mockResolvedValueOnce({ data: mockCategories });

  render(<App />);

  const scoreElement = await screen.findByText(/Score: 0/i);
  expect(scoreElement).toBeInTheDocument();
});

test("updateScore function correctly updates the score", async () => {
  axios.get.mockImplementation((url) => {
    if (url === "https://the-trivia-api.com/api/categories") {
      return Promise.resolve({ data: mockCategories });
    } else if (url.includes("https://the-trivia-api.com/api/questions")) {
      return Promise.resolve({ data: [mockQuestion] });
    }
    return Promise.reject(new Error("Unexpected API request"));
  });

  render(<App />);

  await waitFor(() => {
    expect(screen.getByText(/History/i)).toBeInTheDocument();
  });

  const historyCategory = screen.getByText(/History/i);
  fireEvent.click(historyCategory);

  await waitFor(() => {
    const $200Question = screen
      .getByText(/History/i)
      .closest(".category")
      .querySelector("button");
    expect($200Question).toHaveTextContent("$200");
  });

  const $200Question = screen
    .getByText(/History/i)
    .closest(".category")
    .querySelector("button");
  fireEvent.click($200Question);

  await waitFor(() => {
    expect(
      screen.getByText("Sample question for this category?")
    ).toBeInTheDocument();
  });

  const correctAnswer = screen.getByText("Correct Answer");
  fireEvent.click(correctAnswer);

  const submitButton = screen.getByText("Submit");
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText(/Score: 200/i)).toBeInTheDocument();
  });
});

test("resetScore function correctly resets the score to 0", async () => {
  axios.get.mockResolvedValueOnce({ data: mockCategories });

  render(<App />);

  const restartButton = screen.getByText(/Restart/i);
  fireEvent.click(restartButton);

  await waitFor(() => {
    expect(screen.getByText(/Score: 0/i)).toBeInTheDocument();
  });
});
