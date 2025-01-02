import useCustomNavigate from '../../../custom-hooks/navigate';
import React from 'react';
import questions from '../questions/questions';
import './answers.css';


const Answers = () => {
  const navigateTo = useCustomNavigate();
  return (
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
  );
};

export default Answers;