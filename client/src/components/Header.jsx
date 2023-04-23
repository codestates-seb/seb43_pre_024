import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BiSearchAlt } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import { FiMenu } from 'react-icons/fi';
import { useState } from 'react';
import { FaGlobeAsia } from 'react-icons/fa';
import Logo from '../images/logo.png';

const HeaderBox = styled.div`
  width: 100%;
  height: 70px;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  background-color: rgb(248, 249, 249);
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  border-top: 3px solid orange;
  z-index: 10;
  position: relative;
`;

const Container = styled.div`
  width: 1400px;
  display: flex;
  align-items: center;

  .logoImg {
    width: 190px;
  }

  a {
    text-decoration: none;
  }

  .questions {
    margin-left: 10px;
    margin-right: 20px;
    width: 100px;
    padding: 10px;
    text-align: center;
    color: rgba(0, 0, 0, 0.7);
    flex-shrink: 0;
    display: block;
    border: none;
    background-color: transparent;

    :hover {
      background-color: rgba(0, 0, 0, 0.1);
      padding: 10px;
      border-radius: 30px;
      color: rgba(0, 0, 0, 0.9);
    }
  }

  .menu {
    cursor: pointer;
    flex-shrink: 0;
    padding: 10px;

    :hover {
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 50%;
    }
  }
`;

const SearchBox = styled.div`
  border: 1px solid white;
  width: 770px;
  display: flex;
  align-items: center;
  background: #fff;
  padding: 5px;
  border-radius: 3px;

  border: ${props =>
    props.focus === true
      ? '1px solid rgba(95, 149, 248)'
      : '1px solid rgba(0, 0, 0, 0.2)'};

  box-shadow: ${props =>
    props.focus === true ? 'rgba(3, 102, 214, 0.3) 0px 0px 0px 3px' : null};

  .search {
    border: none;
    width: 720px;
    height: 30px;
    margin-left: 10px;
    font-size: 1.2rem;
    outline: none;
  }

  .search::focus {
    outline: none;
  }
`;

const LogoutOrSignUp = styled.button`
  display: inline-block;
  width: 70px;
  height: 40px;
  background-color: rgba(95, 149, 248);
  border: 1px solid rgba(95, 149, 248);
  border-radius: 5px;
  color: white;
  margin-left: 10px;

  :hover {
    cursor: pointer;
    background-color: rgb(65, 115, 200);
  }
`;

const SignIn = styled(LogoutOrSignUp)`
  background-color: rgba(228, 235, 243);
  color: rgba(95, 149, 248);
  border: 1px solid rgba(95, 149, 248);
  margin-left: 10px;
  margin-right: 5px;

  :hover {
    cursor: pointer;
    background-color: rgb(187, 210, 231);
  }
`;

const MenuBox = styled.div`
  width: 300px;
  position: absolute;
  top: 70px;
  left: 10px;
  background-color: white;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  padding-top: 1rem;
  padding-bottom: 1rem;

  .questionsBtnBox,
  .usersBtnBox,
  .tagsBtnBox,
  .companiesBtnBox {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: start;
    padding: 20px;
    box-sizing: border-box;
  }

  .homeBtnBox {
    width: 100%;
    display: flex;
    box-sizing: border-box;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  li {
    list-style: none;
    color: rgb(85, 90, 96);
    cursor: pointer;
  }

  .act {
    font-size: 1.2rem;

    :hover {
      font-weight: bold;
    }
  }

  .inact {
    font-size: 1rem;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .icon {
    margin-right: 10px;
  }
`;

const HomeBtn = styled.button`
  color: rgb(85, 90, 96);
  cursor: pointer;
  border: none;
  padding: 0;
  background-color: white;
`;

const QuestionsBtn = styled.button`
  cursor: pointer;
  background-color: white;
  border: none;
  margin-left: -7px;
`;

const UsersBtn = styled.button`
  color: rgb(85, 90, 96);
  cursor: pointer;
  background-color: white;
  border: none;
  margin-left: -7px;
`;

function Header({
  isLogin,
  changeLoginStatus,
  setHomeActive,
  setUsersActive,
  setQuestionsActive,
}) {
  const [focus, setFocus] = useState(false);
  const [toggle, setToggle] = useState(false);

  function searchFocus() {
    setFocus(true);
  }

  function searchBlur() {
    setFocus(false);
  }

  function toggleMenu() {
    setToggle(!toggle);
  }

  function activeHome() {
    setHomeActive(true);
    setQuestionsActive(false);
    setUsersActive(false);
    setToggle(false);
  }

  function activeQuestions() {
    setQuestionsActive(true);
    setHomeActive(false);
    setUsersActive(false);
    setToggle(false);
  }

  function activeUsers() {
    setUsersActive(true);
    setHomeActive(false);
    setQuestionsActive(false);
    setToggle(false);
  }

  return (
    <HeaderBox>
      <Container>
        {toggle ? (
          <AiOutlineClose
            className="menu"
            size="30"
            onClick={() => toggleMenu()}
          />
        ) : (
          <FiMenu className="menu" size="30" onClick={() => toggleMenu()} />
        )}
        {toggle ? (
          <MenuBox>
            <ul>
              <Link to="/">
                <div className="homeBtnBox">
                  <HomeBtn
                    type="button"
                    onClick={() => activeHome()}
                    className="homeLi act"
                  >
                    Home
                  </HomeBtn>
                </div>
              </Link>
              <li className="publicLi inact">
                <span className="publicText">PUBLIC</span>
                <ul className="publicUl">
                  <Link to="/all-questions">
                    <div className="questionsBtnBox">
                      <QuestionsBtn
                        className="questionsLi act"
                        onClick={() => activeQuestions()}
                        type="button"
                      >
                        <FaGlobeAsia className="icon" />
                        Questions
                      </QuestionsBtn>
                    </div>
                  </Link>
                  <div className="tagsBtnBox">
                    <li className="tagsLi act">Tags</li>
                  </div>
                  {isLogin ? (
                    <Link to="/Mypage">
                      <div className="usersBtnBox">
                        <UsersBtn
                          className="UsersLi act"
                          onClick={() => activeUsers()}
                          type="button"
                        >
                          Users
                        </UsersBtn>
                      </div>
                    </Link>
                  ) : null}
                  <div className="companiesBtnBox">
                    <li className="companiesLi act">Companies</li>
                  </div>
                </ul>
              </li>
              <li className="collectivesLi inact">COLLECTIVES</li>
              <li className="teamsLi inact">TEAMS</li>
            </ul>
          </MenuBox>
        ) : null}
        <a href="/">
          <img src={Logo} className="logoImg" alt="로고사진" />
        </a>
        <Link to="all-questions">
          <button className="questions" onClick={activeQuestions} type="button">
            All Questions
          </button>
        </Link>
        <SearchBox focus={focus}>
          <BiSearchAlt size="25" fill="#888" />
          <input
            onFocus={searchFocus}
            onBlur={searchBlur}
            type="text"
            className="search"
            placeholder="Search..."
          />
        </SearchBox>
        {isLogin ? (
          <LogoutOrSignUp type="button" onClick={changeLoginStatus}>
            Log out
          </LogoutOrSignUp>
        ) : (
          <SignIn type="button" onClick={changeLoginStatus}>
            Log in
          </SignIn>
        )}
        {isLogin === false && (
          <Link to="signup">
            <LogoutOrSignUp type="button">Sign up</LogoutOrSignUp>
          </Link>
        )}
      </Container>
    </HeaderBox>
  );
}

export default Header;
