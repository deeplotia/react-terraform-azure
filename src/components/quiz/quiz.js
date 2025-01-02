import React, { useState } from 'react';
import './quiz.css';
import questions from './questions';
import useCustomNavigate from '../../custom-hooks/navigate';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const navigateTo = useCustomNavigate();

  const handleAnswerOptionClick = (option) => {
  const trimmedOption = option.trim();
  const trimmedAnswer = questions[currentQuestion].answer.trim();

  if (trimmedOption.localeCompare(trimmedAnswer) === 0) {
    console.log(score);
    setScore(score + 1);
  }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="quiz-container">
      {showScore ? (
        <div>
          <div className="score-section">
            You scored {score} out of {questions.length}
          </div>
          <button onClick={() => navigateTo('/')}>Home</button>
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className="question-text">{questions[currentQuestion].question}</div>
          </div>
          <div className="answer-section">
            {questions[currentQuestion].options.map((option, index) => (
              <div className="answer-section" key={index}>
                {index + 1}.
                <button onClick={() => handleAnswerOptionClick(option)}>
                  {option}
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;