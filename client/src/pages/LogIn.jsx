/* eslint-disable consistent-return */
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { ReactComponent as GoogleLogo } from '../images/googleLogo.svg';
import { ReactComponent as GitLogo } from '../images/gitLogo.svg';
import { ReactComponent as StackLogo } from '../images/stackoverflowMiniLogo.svg';

import { validateEmail, validatePassword } from '../util/validator';

const LoginBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: #f1f2f3;

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 170px;
    width: 290px;
  }
`;

const LoginLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;

const GoogleLogin = styled.button`
width: 100%;
padding: 8px 0;
display: flex;
align-items: center;
justify-content: center;
background:#fff;
color:#2f3337;
border: 1px solid #ccc;
border-radius: 5px;

svg{margin-right: 5px;}
`;
const GitLogin = styled.button`
  width: 100%;
  padding: 8px 0;
  margin: 10px 0 30px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background:#2f3337;
  color:#fff;
  border-radius: 5px;

  svg{margin-right: 5px;}
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #fff;
  padding: 40px 30px;
  border-radius: 5px;
  box-shadow: 0px 10px 15px #ccc;

  label {
    font-weight: 800;
    font-size: 1rem;
  }

  input {
    width: calc(100% - 22px);
    padding: 7px 10px;
    border: none;
    border-radius: 10px;
  }

  input:focus {
    outline: none;
  }

  .inputFocus {
    width: 240px;
    margin: 5px 0 20px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .inputFocus.focused {
    border: 1px solid #0a95ff;
    box-shadow: 0 0 0 3px #b7defc;
  }

  .errorMessage {
    margin-top: -13px;
    font-size: 0.8rem;
    color: #0a95ff;
  }
`;

const LoginBtn = styled.button`
  background: #0a95ff;
  border: none;
  padding: 12px 0;
  border-radius: 5px;
  color: #fff;
  box-shadow: 0px 2px 4px #56aef1 inset;
  cursor: pointer;

  &:hover {
    background: #0074cc;
  }
`;

function LogIn({ login, setLogin }) {
  const [emailIsFocused, setEmailIsFocused] = useState(false);
  const [pwIsFocused, setPwIsFocused] = useState(false);
  const [userData, setUserData] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] =
    useState('이메일 형식을 확인해주세요.');
  const [pwErrorMessage, setPwErrorMessage] = useState(
    '7자에서 20자 이내로 비밀번호를 입력해주세요.',
  );
  const [token, setToken] = useState('');

  // input박스 포커스
  const handleFocus = () => {
    setPwIsFocused(true);
  };
  const handleBlur = () => {
    setPwIsFocused(false);
  };
  const emailHandleFocus = () => {
    setEmailIsFocused(true);
  };
  const emailHandleBlur = () => {
    setEmailIsFocused(false);
  };

  useEffect(() => {
    fetch('http://localhost:4000/users/')
      .then(response => response.json())
      .then(data => setUserData(data));
  }, []);

  const handleSubmit = async e => {
    userData.some(el => {
      if (el.email !== userEmail) {
        const isUserExist = false;
        if (!isUserExist) {
          alert('존재하지 않는 아이디입니다.');
        }
        return isUserExist;
      }
      return true;
    });

    if (emailErrorMessage.length !== 0 || pwErrorMessage.length !== 0) {
      // 유효성 검사에 실패한 경우
      // eslint-disable-next-line consistent-return
      return alert('회원가입 실패: 유효하지 않은 데이터가 있습니다.');
    }

    try {
      const response = await fetch('http://localhost:4000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          password: userPassword,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        // JWT 토큰 저장
        localStorage.setItem('token', data.token);
        window.location.href = '/home';
        setLogin(true);
      } else {
        throw new Error(
          '로그인에 실패했습니다. 아이디 또는 패스워드를 확인해주세요.',
        );
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <LoginBox>
      <div className="container">
        <LoginLogo>
          <StackLogo />
        </LoginLogo>
        <GoogleLogin>
          <GoogleLogo />
          Log in with Google
        </GoogleLogin>
        <GitLogin>
          <GitLogo />
          Log in with GitHub
        </GitLogin>
        <InputBox>
          <div className="inputArea">
            <label htmlFor="email">
              Email
              <div
                className={emailIsFocused ? 'inputFocus focused' : 'inputFocus'}
              >
                <input
                  onFocus={emailHandleFocus}
                  onBlur={emailHandleBlur}
                  onChange={e => {
                    setEmailErrorMessage(validateEmail(e.target.value));
                    setUserEmail(e.target.value);
                  }}
                  type="email"
                  maxLength="25"
                  id="email"
                  value={userEmail}
                />
              </div>
            </label>
            <p className="errorMessage">{emailErrorMessage}</p>
          </div>
          <div className="inputArea">
            <label htmlFor="password">
              Password
              <div
                className={pwIsFocused ? 'inputFocus focused' : 'inputFocus'}
              >
                <input
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={e => {
                    setPwErrorMessage(validatePassword(e.target.value));
                    setUserPassword(e.target.value);
                  }}
                  type="password"
                  id="password"
                  maxLength="20"
                  value={userPassword}
                />
              </div>
            </label>
            <p className="errorMessage">{pwErrorMessage}</p>
          </div>
          <LoginBtn type="submit" onClick={handleSubmit}>
            Log in
          </LoginBtn>
        </InputBox>
      </div>
    </LoginBox>
  );
}

export default LogIn;
