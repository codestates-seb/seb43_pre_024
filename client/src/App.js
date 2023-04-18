import './App.css';
import { useState } from 'react';
import HeaderLogout from './components/HeaderLogout';
import HeaderLogin from './components/HeaderLogin';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

function App() {
  const [login, setLogin] = useState(false);

  function onLogin() {
    setLogin(true);
  }

  function onLogout() {
    setLogin(false);
  }

  return (
    <div className="App">
      {login ? (
        <HeaderLogin setLogout={() => onLogout()} />
      ) : (
        <HeaderLogout setLogin={() => onLogin()} />
      )}
      <div
        style={{
          paddingTop: 70,
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Navbar />
      </div>
      <Footer />
    </div>
  );
}

export default App;
