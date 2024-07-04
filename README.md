# Trivia Game

The Trivia Game is a web-based application built with React that allows users to test their knowledge by answering trivia questions from various categories. The game fetches questions from the Trivia API and presents them to the user in a user-friendly interface. The application is deployed and can be accessed at https://trivia-questions-game.onrender.com

## Features

- Multiple categories to choose from, including History, Film & TV, General Knowledge, Sport & Leisure, and Music.
- Questions with different difficulty levels (easy, medium, hard) and corresponding point values.
- Interactive gameplay where users can select an answer and submit their response.
- Score tracking and the ability to restart the game.
- Routing using React Router for seamless navigation between pages.

## Technologies Used

- React: A JavaScript library for building user interfaces.
- React Router: A routing library for React applications.
- Axios: A promise-based HTTP client for making API requests.
- CSS: Cascading Style Sheets for styling the components.
- Jest: A JavaScript testing framework for unit testing.

## Getting Started

To run the Trivia Questions Game locally, follow these steps:

1. Clone the repository: git clone https://github.com/your-username/trivia-questions-game.git

2. Navigate to the project directory: cd trivia-questions-game

3. Install the dependencies: npm install

4. Start the development server: npm start

5. Open your browser and visit `http://localhost:3000` to play the game.

## Testing

The project includes unit tests written with Jest. To run the tests, use the following command: npm test

The tests cover the main components and ensure their proper rendering and behavior.

## API

The Trivia Questions Game uses the Trivia API to fetch questions and categories. The API endpoints used in the game are:

- `https://the-trivia-api.com/api/questions`: Fetches questions based on the selected category and difficulty level.
- `https://the-trivia-api.com/api/categories`: Fetches the available categories for the game.
