import './App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Header from './components/Header';

function App() {
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  const [homeActive, setHomeActive] = useState(true);
  const [questionsActive, setQuestionsActive] = useState(false);
  const [usersActive, setUsersActive] = useState(false);

  function changeLoginStatus() {
    if (login === true) {
      setLogin(false);
      navigate('/'); // go to home when sign outed
    } else {
      setLogin(true);
      navigate('/login'); // go to all questions page when sign in
    }
  }

  return (
    <div className="App">
      <Header
        isLogin={login}
        changeLoginStatus={() => {
          changeLoginStatus();
        }}
        homeActive={homeActive}
        questionsActive={questionsActive}
        usersActive={usersActive}
        setHomeActive={setHomeActive}
        setQuestionsActive={setQuestionsActive}
        setUsersActive={setUsersActive}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Navbar
          login={login}
          homeActive={homeActive}
          questionsActive={questionsActive}
          usersActive={usersActive}
          setHomeActive={setHomeActive}
          setQuestionsActive={setQuestionsActive}
          setUsersActive={setUsersActive}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
