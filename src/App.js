import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Quiz from './components/quiz/quiz';
import Home from './components/home/home';
import Answers from './components/quiz/answers/answers';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/answers" element={<Answers />} />
        </Routes>
    </Router>
  );
}

export default App;
