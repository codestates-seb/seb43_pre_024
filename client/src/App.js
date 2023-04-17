import './App.css';
import { createGlobalStyle } from 'styled-components';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useState } from 'react';
import HeaderLogout from './components/HeaderLogout';
import HeaderLogin from './components/HeaderLogin';
import Footer from './components/Footer';
import AllQuestions from './pages/AllQuestions';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import MyPage from './pages/MyPage';
import QuestionDetail from './pages/QuestionDetail';
import SignUp from './pages/SignUp';
import WriteQuestion from './pages/WriteQuestion';

const router = createBrowserRouter([
  {
    // 메인 페이지
    path: '/',
    element: <Home />,
  },
  {
    // 모든 질문 보기
    path: '/all-questions',
    element: <AllQuestions />,
  },
  {
    // 질문 작성 페이지
    path: '/write-question',
    element: <WriteQuestion />,
  },
  {
    // 질문 상세 페이지
    path: '/question/ :id',
    element: <QuestionDetail />,
  },
  {
    // 로그인 페이지
    path: '/login',
    element: <LogIn />,
  },
  {
    // 회원가입 페이지
    path: '/signup',
    element: <SignUp />,
  },
  {
    // 마이페이지
    path: '/mypage',
    element: <MyPage />,
  },
]);

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
          maxWidth: 900,
        }}
      >
        <RouterProvider router={router} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
