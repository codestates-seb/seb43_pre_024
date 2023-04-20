import styled from 'styled-components';
import { useState } from 'react';
import { FaGlobeAsia } from 'react-icons/fa';
import { Routes, Route, Link } from 'react-router-dom';
import Home from '../pages/Home';
import Main from '../pages/Main';
import AllQuestions from '../pages/AllQuestions';
import Paging from './Paging';
import MyPage from '../pages/MyPage';
import { NewQuestion, LimitTags } from '../pages/NewQuestion';
import SignUp from '../pages/SignUp';
import LogIn from '../pages/LogIn';

const NavBox = styled.div`
  width: 250px;
  height: 100vh;
  padding-top: 20px;
  color: rgba(99, 103, 109);
  border-right: 1px solid rgba(202, 202, 202);
  display: flex;
  flex-direction: column;
  align-items: end;
  user-select: none;

  a {
    text-decoration: none;
  }

  .li {
    width: 60%;
    height: 50px;
    display: flex;
    align-items: center;
  }

  .navHome {
    width: 157px;
    font-weight: 500;
    font-size: 1.1rem;
    color: rgba(99, 103, 109);

    :hover {
      font-weight: 800;
    }
  }
  .navTitle {
    font-size: 0.8rem;
    margin-left: 5px;
  }
  .navMenu {
    display: flex;
    align-items: center;
    list-style: none;
    color: rgba(99, 103, 109);
    font-size: 14px;
    width: 157px;
    height: 30px;
    padding: 0 10;
    text-align: left;
    font-weight: 500;
    font-size: 1.1rem;
    width: 150px;
    height: 50px;

    :hover {
      font-weight: 800;
    }
  }

  .btnBox {
    display: flex;
    flex-direction: column;
    text-align: center;

    .globe {
      margin-right: 10px;
    }
  }

  .borderNone {
    border: none;
    background-color: white;
  }
`;

const HomeBtn = styled.button`
  border: none;
  border-right: ${props =>
    props.homeActive === true ? '3px solid rgb(218, 129, 49)' : 'none'};
  background-color: ${props =>
    props.homeActive === true ? '#F2F2F3' : 'white'};
`;

const QuestionsBtn = styled.button`
  border: none;
  border-right: ${props =>
    props.questionsActive === true ? '3px solid rgb(218, 129, 49)' : 'none'};
  background-color: ${props =>
    props.questionsActive === true ? '#F2F2F3' : 'white'};
`;

const UsersBtn = styled.button`
  border: none;
  border-right: ${props =>
    props.usersActive === true ? '3px solid rgb(218, 129, 49)' : 'none'};
  background-color: ${props =>
    props.usersActive === true ? '#F2F2F3' : 'white'};
`;

function Navbar({ login }) {
  const [homeActive, setHomeActive] = useState(false);
  const [questionsActive, setQuestionsActive] = useState(false);
  const [usersActive, setUsersActive] = useState(false);

  function activeHome() {
    setHomeActive(true);
    setQuestionsActive(false);
    setUsersActive(false);
  }

  function activeQuestions() {
    setQuestionsActive(true);
    setHomeActive(false);
    setUsersActive(false);
  }

  function activeUsers() {
    setUsersActive(true);
    setHomeActive(false);
    setQuestionsActive(false);
  }

  return (
    <>
      <NavBox>
        {login === true ? (
          <Link to="/">
            <HomeBtn
              className="navHome li"
              onClick={() => activeHome()}
              homeActive={homeActive}
              type="button"
            >
              Home
            </HomeBtn>
          </Link>
        ) : (
          <Link to="/main">
            <HomeBtn
              className="navHome li"
              onClick={() => activeHome()}
              homeActive={homeActive}
              type="button"
            >
              Home
            </HomeBtn>
          </Link>
        )}

        <div className="navTitle li">PUBLIC</div>
        <ul className="btnBox">
          <Link to="/all-questions">
            <QuestionsBtn
              className="navMenu"
              onClick={() => activeQuestions()}
              questionsActive={questionsActive}
              type="button"
            >
              <FaGlobeAsia className="globe" />
              Questions
            </QuestionsBtn>
          </Link>
          <button type="button" className="navMenu borderNone">
            Tags
          </button>
          {login === true ? (
            <Link to="/mypage">
              <UsersBtn
                type="button"
                onClick={() => activeUsers()}
                usersActive={usersActive}
                className="navMenu"
              >
                Users
              </UsersBtn>
            </Link>
          ) : null}
          <button type="button" className="navMenu borderNone">
            Companies
          </button>
        </ul>
        <div className="navTitle li">COLLECTIVES</div>
        <div className="navTitle li">TEAMS</div>
      </NavBox>

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/main" element={<Main />} />
        <Route path="/all-questions" element={<AllQuestions />} />
        <Route path="/new-question" element={<NewQuestion />} />
        <Route path="/mypage" element={<Paging />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="login" element={<LogIn />} />
      </Routes>
    </>
  );
}
export default Navbar;
