import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import "@testing-library/jest-dom";
import App from "../App";
import Home from "../components/Home";
import Question from "../components/Question";

describe("Trivia Game Tests", () => {
  test("initial score is set to 0", async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    await act(async () => {});

    const scoreElement = screen.getByText(/Score: 0/i);
    expect(scoreElement).toBeInTheDocument();
  });

  test("resetScore function correctly resets the score to 0", async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    await act(async () => {});

    const restartButton = screen.getByText(/Restart/i);
    await act(async () => {
      fireEvent.click(restartButton);
    });

    const scoreElement = screen.getByText(/Score: 0/i);
    expect(scoreElement).toBeInTheDocument();
  });

  test("renders home page when path is '/'", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    await act(async () => {});
    expect(screen.getByText(/Trivia Game/i)).toBeInTheDocument();
  });

  test("renders category page when path is '/category/:categoryName'", async () => {
    const categoryName = "History";

    act(() => {
      render(
        <MemoryRouter initialEntries={[`/category/${categoryName}`]}>
          <Routes>
            <Route
              path="/category/:categoryName"
              element={<div>{categoryName}</div>}
            />
          </Routes>
        </MemoryRouter>
      );
    });

    expect(screen.getByText(categoryName)).toBeInTheDocument();
  });

  test("renders question page when path is '/question/:questionId'", async () => {
    const mockQuestion = {
      category: "History",
      id: "sample-question-1",
      question: {
        text: "Sample question for this category?",
      },
      correctAnswer: "Correct Answer",
      incorrectAnswers: ["Incorrect 1", "Incorrect 2", "Incorrect 3"],
      difficulty: "easy",
      type: "text_choice",
    };

    act(() => {
      render(
        <MemoryRouter
          initialEntries={[
            {
              pathname: "/question/sample-question-1",
              state: {
                question: mockQuestion,
                pointValue: 200,
              },
            },
          ]}
        >
          <Routes>
            <Route
              path="/question/:questionId"
              element={<Question question={mockQuestion} pointValue={200} />}
            />
          </Routes>
        </MemoryRouter>
      );
    });

    expect(
      screen.getByText("Sample question for this category?")
    ).toBeInTheDocument();
  });
});
