import useCustomNavigate from '../../../custom-hooks/navigate';
import React, { useState, useEffect } from 'react';
import './answers.css';
import { loadQuestions } from '../questions/loadQuestions';
import { useQuiz } from '../../../context/quiz-context';


const Answers = () => {
  const navigateTo = useCustomNavigate();
  const [questions, setQuestions] = useState([]);
  const { quizType } = useQuiz();

  useEffect(() => {
    loadQuestions(quizType).then((module) => {
      setQuestions(module.default);
    });
  }, [quizType]);

  return (
    questions.length > 0 && (
        <div className="App">
          <h1>Answers</h1>
          <div className="results-container">
            {questions.map((question, index) => (
              <div key={index} className="question-answer-pair">
                <div className="question-text">{question.question}</div>
                <div className="options">
                  {question.options.map((option, idx) => (
                    <div
                      key={idx}
                      className={`option ${!option.trim().localeCompare(question.answer.trim()) ? 'correct' : ''}`}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => navigateTo('/')}>Home</button>
        </div>
    )
  );
};

export default Answers;