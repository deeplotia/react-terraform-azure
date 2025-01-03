import React, { createContext, useState, useContext } from 'react';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
    const [quizType, setQuizType] = useState('quiz-devops-d1');

    return(
        <QuizContext.Provider value={{ quizType, setQuizType }}>
            {children}
        </QuizContext.Provider>
    );
};

export const useQuiz = () => useContext(QuizContext);