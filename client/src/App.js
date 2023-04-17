import './App.css';
import { createGlobalStyle } from 'styled-components';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HeaderLogout from './components/HeaderLogout';
import HeaderLogin from './components/HeaderLogin';
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

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

function App() {
  return (
    <div className="App">
      <HeaderLogin />
      <div
        style={{
          paddingTop: 70,
          maxWidth: 900,
        }}
      >
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
