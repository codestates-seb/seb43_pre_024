import './App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Header from './components/Header';

function App() {
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

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
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Navbar login={login} setLogin={setLogin} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
