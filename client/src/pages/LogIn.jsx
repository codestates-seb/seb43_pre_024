/* eslint-disable consistent-return */
import styled from 'styled-components';
import { useState, useEffect } from 'react';

import { validateEmail, validatePassword } from '../util/validator';

const LoginBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background: #f1f2f3;

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20vh;
    width: 290px;
  }
`;

const LoginLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
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

function LogIn() {
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
          <svg aria-hidden="true" width="32" height="37" viewBox="0 0 32 37">
            <path d="M26 33v-9h4v13H0V24h4v9h22Z" fill="#BCBBBB" />
            <path
              d="m21.5 0-2.7 2 9.9 13.3 2.7-2L21.5 0ZM26 18.4 13.3 7.8l2.1-2.5 12.7 10.6-2.1 2.5ZM9.1 15.2l15 7 1.4-3-15-7-1.4 3Zm14 10.79.68-2.95-16.1-3.35L7 23l16.1 2.99ZM23 30H7v-3h16v3Z"
              fill="#F48024"
            />
          </svg>
        </LoginLogo>
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
