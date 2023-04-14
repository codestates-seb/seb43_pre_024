import './App.css';
import { createGlobalStyle } from 'styled-components';
import HeaderLogout from './components/HeaderLogout';

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <div>
        <HeaderLogout />
      </div>
    </>
  );
}

export default App;
