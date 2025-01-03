import React, { useState, useEffect } from 'react';
import './quiz.css';
import useCustomNavigate from '../../custom-hooks/navigate';
import { loadQuestions } from './questions/loadQuestions';
import { useQuiz } from '../../context/quiz-context';

const Quiz = () => {
  const { quizType } = useQuiz();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const navigateTo = useCustomNavigate();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    loadQuestions(quizType).then((module) => {
      setQuestions(module.default);
    });
  }, [quizType]);

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
        <div className="score-container">
          <div className="score-section">
            You scored {score} out of {questions.length}
          </div>
          <button onClick={() => navigateTo('/')}>Home</button>
          {/* <button onClick={() => navigateTo('/answers')}>Answers</button> */}
        </div>
      ) : (
        questions.length > 0 && (
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
        )
      )}
    </div>
  );
};

export default Quiz;