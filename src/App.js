import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Quiz from './components/quiz/quiz';
import Home from './components/home/home';
import Answers from './components/quiz/answers/answers';
import { QuizProvider } from './context/quiz-context';
import { useMsal } from '@azure/msal-react';
import { useEffect } from 'react';

function App() {
  const { instance, accounts } = useMsal();

  useEffect(() => {
    if (accounts.length === 0) {
      instance.loginRedirect({
        scopes: ['user.read'],
      });
    }
  }, [accounts, instance]);

  if (accounts.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <QuizProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/answers" element={<Answers />} />
        </Routes>
      </Router>
    </QuizProvider>
  );
}

export default App;
