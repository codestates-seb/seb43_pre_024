import styled from 'styled-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiSearchAlt } from 'react-icons/bi';
import { FiMenu } from 'react-icons/fi';
import Logo from '../images/logo.png';

const HeaderBox = styled.div`
  min-width: 100%;
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
`;

const Container = styled.div`
  width: 1264px;
  display: flex;
  align-items: center;

  .logoImg {
    width: 190px;
  }

  .questions {
    margin-left: 10px;
    margin-right: 20px;
    width: 150px;
    text-align: center;
    padding: 10px;
    color: rgba(0, 0, 0, 0.7);

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

const SignUp = styled.button`
  display: inline-block;
  width: 70px;
  height: 40px;
  background-color: rgba(95, 149, 248);
  border: 1px solid rgba(95, 149, 248);
  border-radius: 5px;
  color: white;

  :hover {
    cursor: pointer;
    background-color: rgb(65, 115, 200);
  }
`;

const SignIn = styled(SignUp)`
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

function HeaderLogout({ login, setLogin }) {
  const [focus, setFocus] = useState(false);

  function searchFocus() {
    setFocus(true);
  }

  function searchBlur() {
    setFocus(false);
  }

  return (
    <HeaderBox>
      <Container>
        <FiMenu className="menu" size="30" />
        <a href="/">
          <img src={Logo} className="logoImg" alt="로고사진" />
        </a>
        <span className="questions">All Questions</span>
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
        <SignIn onClick={setLogin} type="button">
          Log in
        </SignIn>
        <SignUp type="button">Sign up</SignUp>
      </Container>
    </HeaderBox>
  );
}

export default HeaderLogout;
