import styled from "styled-components";
import { useState } from "react";
import { FaGlobeAsia } from "react-icons/fa";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Main from "../pages/Main";
import AllQuestions from "../pages/AllQuestions";
import Paging from "./Paging";
import MyPage from "../pages/MyPage";
import NewQuestion from "../pages/NewQuestion";
import SignUpPage from "../pages/SignUpPage";
import LogIn from "../pages/LogIn";
import QuestionDetail from "../pages/QuestionDetail";
import SearchQuestions from "../pages/SearchQuestions";
import Logout from "../pages/Logout";

const NavBox = styled.div`
  width: 250px;
  height: 130vh;
  padding-top: 20px;
  color: rgba(99, 103, 109);
  border-right: 1px solid rgb(202, 202, 202);
  display: flex;
  flex-direction: column;
  align-items: end;
  user-select: none;
  flex-shrink: 0;
  top: 0;
  position: sticky;

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
  border-right: ${(props) =>
    props.homeActive === true ? "3px solid rgb(218, 129, 49)" : "none"};
  background-color: ${(props) =>
    props.homeActive === true ? "#F2F2F3" : "white"};
`;

const QuestionsBtn = styled.button`
  border: none;
  border-right: ${(props) =>
    props.questionsActive === true ? "3px solid rgb(218, 129, 49)" : "none"};
  background-color: ${(props) =>
    props.questionsActive === true ? "#F2F2F3" : "white"};
`;

const UsersBtn = styled.button`
  border: none;
  border-right: ${(props) =>
    props.usersActive === true ? "3px solid rgb(218, 129, 49)" : "none"};
  background-color: ${(props) =>
    props.usersActive === true ? "#F2F2F3" : "white"};
`;

function Navbar({
  login,
  setLogin,
  setHomeActive,
  setUsersActive,
  setQuestionsActive,
  homeActive,
  questionsActive,
  usersActive,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const hideNavbarRoutes = [
    "/login",
    "/signupPage",
    "/main",
    "/signup",
    "/logout",
  ];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  const [lastSegment, setLastSegment] = useState("");

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
      {shouldHideNavbar || (!login && location.pathname === "/") ? null : (
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
      )}
      <Routes>
        {login ? (
          <Route path="/" element={<AllQuestions />} />
        ) : (
          <Route path="/" element={<Main />} />
        )}
        <Route path="/main" element={<Main />} />
        <Route path="/all-questions" element={<AllQuestions />} />
        <Route
          path="/new-question"
          element={<NewQuestion />}
          lastSegment={lastSegment}
          setLastSegment={setLastSegment}
        />
        <Route path="/mypage" element={<Paging />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/search-questions/title" element={<SearchQuestions />} />
        <Route
          path="/login"
          element={<LogIn login={login} setLogin={setLogin} />}
        />
        <Route path="/questions/:id" element={<QuestionDetail />} />
        <Route path="/logout" element={<Logout setLogin={setLogin} />} />
      </Routes>
    </>
  );
}
export default Navbar;
