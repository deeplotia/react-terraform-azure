import useCustomNavigate from '../../custom-hooks/navigate';
import './home.css';
import { useQuiz } from '../../context/quiz-context';


const Home = () => {
  const navigateTo = useCustomNavigate();
  const {setQuizType} = useQuiz();

  const handleQuizSelection = (type) => {
    setQuizType(type);
    navigateTo('/quiz');
  }

  return (
    <div className="App">
        <header className="App-header">
        <h1>Welcome to the Quiz</h1>
        <button onClick={() => handleQuizSelection('quiz-devops-d1')}>Day 1 - DevOps</button>
        {/* <button onClick={() => handleQuizSelection('quiz-azure-d2')}>Day 2 - Azure</button> */}
        </header>
    </div>
  );
};

export default Home;
