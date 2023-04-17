import styled from 'styled-components';
import { BiSearchAlt } from 'react-icons/bi';
import { FiMenu } from 'react-icons/fi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    width: 120px;
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

const Logout = styled.button`
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

function HeaderLogin() {
  const [focus, setFocus] = useState(false);
  // const navigate = useNavigate();

  function searchFocus() {
    setFocus(true);
    console.log(focus);
  }

  // function GoHome() {
  //   navigate('/');
  // }

  return (
    <HeaderBox>
      <Container>
        <FiMenu className="menu" size="30" />
        <a href="https://naver.com">
          <img src={Logo} className="logoImg" alt="로고사진" />
        </a>
        <span className="questions">All Questions</span>
        <SearchBox focus={focus}>
          <BiSearchAlt size="25" fill="#888" />
          <input
            onFocus={searchFocus}
            type="text"
            className="search"
            placeholder="Search..."
          />
        </SearchBox>
        <Logout type="button">Log out</Logout>
      </Container>
    </HeaderBox>
  );
}

export default HeaderLogin;
