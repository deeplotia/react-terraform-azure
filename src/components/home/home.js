import useCustomNavigate from '../../custom-hooks/navigate';
import './home.css';


const Home = () => {
  const navigateTo = useCustomNavigate();
  return (
    <div className="App">
        <header className="App-header">
        <h1>Welcome to the Quiz</h1>
        <button onClick={() => navigateTo('/quiz')}>Start</button>
        </header>
    </div>
  );
};

export default Home;
