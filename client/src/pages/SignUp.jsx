import styled from 'styled-components';
import { useState, useEffect } from 'react';

const SignUpBox = styled.div`
  padding: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  background: #f1f2f3;

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const TextBox = styled.div`
  max-width: 420px;
  margin-right: 30px;
  .textTitle {
    font-size: 1.7rem;
    font-weight: 500;
  }
  .textLine {
    list-style: none;
    margin-bottom: 20px;
    display: flex;
    align-items: center;

  .icon {
    fill: #0a95ff;
    margin-right: 10px;
  }
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

const SignUpBtn = styled.button`
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

function SignUpPage() {
  const [nameIsFocused, setNameIsFocused] = useState(false);
  const [emailIsFocused, setEmailIsFocused] = useState(false);
  const [pwIsFocused, setPwIsFocused] = useState(false);
  const [pwChIsFocused, setChPwIsFocused] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [userData, setUserData] = useState([]);
  const [emailErrorMeassage, setEmailErrorMeassage] = useState('');
  const [pwErrorMeassage, setPwErrorMeassage] = useState('');
  const [pwCheckErrorMeassage, setPwCheckErrorMeassage] = useState('');

  // display name input 클릭 시 div 포커스 효과
  const nameHandleFocus = () => {
    setNameIsFocused(true);
  };

  const nameHandleBlur = () => {
    setNameIsFocused(false);
  };

  // email input 클릭 시 div 포커스 효과
  const emailHandleFocus = () => {
    setEmailIsFocused(true);
  };

  const emailHandleBlur = () => {
    setEmailIsFocused(false);
  };

  // password input 클릭 시 div 포커스 효과
  const handleFocus = () => {
    setPwIsFocused(true);
  };

  const handleBlur = () => {
    setPwIsFocused(false);
  };

  // password Check input 클릭 시 div 포커스 효과
  const pwCheckHandleFocus = () => {
    setChPwIsFocused(true);
  };

  const pwCheckHandleBlur = () => {
    setChPwIsFocused(false);
  };

  const user = {
    name,
    email,
    password,
  };

  useEffect(() => {
    fetch('http://localhost:4000/users/')
      .then(response => response.json())
      .then(data => setUserData(data));
  }, []);

  const handleSubmit = () => {
    fetch('http://localhost:4000/users/')
      .then(response => response.json())
      .then(data => setUserData(data));

    if (
      userData.some(m => {
        return m.name === name;
      })
    ) {
      alert('이미 존재하는 display name입니다.');
      return;
    }

    if (
      userData.some(m => {
        return m.email === email;
      })
    ) {
      alert('이미 존재하는 이메일입니다.');
      return;
    }

    if (
      emailErrorMeassage.length !== 0 ||
      name.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      pwCheckErrorMeassage.length !== 0
    ) {
      return;
    }

    fetch('http://localhost:4000/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then(response => response.json());
  };

  // 이메일 유효성 체크
  useEffect(() => {
    if (!email.includes('@') && email.length > 6) {
      setEmailErrorMeassage('이메일 형식을 확인해주세요.');
    } else setEmailErrorMeassage('');
  }, [email]);

  // 패스워드 유효성 체크
  useEffect(() => {
    if ((password.length > 3 && password.length < 7) || password.length > 20) {
      setPwErrorMeassage('7자에서 20자 이내로 비밀번호를 입력해주세요.');
    } else setPwErrorMeassage('');
  }, [password]);

  // 패스워드 유효성 체크
  useEffect(() => {
    if (password !== passwordCheck) {
      setPwCheckErrorMeassage('비밀번호를 다시 한번 확인해주세요.');
    } else setPwCheckErrorMeassage('');
  }, [password, passwordCheck]);

  return (
    <SignUpBox>
      <div className="container">
        <TextBox>
          <h3 className="textTitle">Join the Stack Overflow community</h3>
          <ul>
            <li className="textLine">
              <svg width="26" height="26" className="icon">
                <path
                  opacity=".5"
                  d="M4.2 4H22a2 2 0 012 2v11.8a3 3 0 002-2.8V5a3 3 0 00-3-3H7a3 3 0 00-2.8 2z"
                />
                <path d="M1 7c0-1.1.9-2 2-2h18a2 2 0 012 2v12a2 2 0 01-2 2h-2v5l-5-5H3a2 2 0 01-2-2V7zm10.6 11.3c.7 0 1.2-.5 1.2-1.2s-.5-1.2-1.2-1.2c-.6 0-1.2.4-1.2 1.2 0 .7.5 1.1 1.2 1.2zm2.2-5.4l1-.9c.3-.4.4-.9.4-1.4 0-1-.3-1.7-1-2.2-.6-.5-1.4-.7-2.4-.7-.8 0-1.4.2-2 .5-.7.5-1 1.4-1 2.8h1.9v-.1c0-.4 0-.7.2-1 .2-.4.5-.6 1-.6s.8.1 1 .4a1.3 1.3 0 010 1.8l-.4.3-1.4 1.3c-.3.4-.4 1-.4 1.6 0 0 0 .2.2.2h1.5c.2 0 .2-.1.2-.2l.1-.7.5-.7.6-.4z" />
              </svg>
              Get unstuck — ask a question
            </li>
            <li className="textLine">
              <svg width="26" height="26" className="icon">
                <path d="M12 .7a2 2 0 013 0l8.5 9.6a1 1 0 01-.7 1.7H4.2a1 1 0 01-.7-1.7L12 .7z" />
                <path
                  opacity=".5"
                  d="M20.6 16H6.4l7.1 8 7-8zM15 25.3a2 2 0 01-3 0l-8.5-9.6a1 1 0 01.7-1.7h18.6a1 1 0 01.7 1.7L15 25.3z"
                />
              </svg>
              Unlock new privileges like voting and commenting
            </li>
            <li className="textLine">
              <svg width="26" height="26" className="icon">
                <path d="M14.8 3a2 2 0 00-1.4.6l-10 10a2 2 0 000 2.8l8.2 8.2c.8.8 2 .8 2.8 0l10-10c.4-.4.6-.9.6-1.4V5a2 2 0 00-2-2h-8.2zm5.2 7a2 2 0 110-4 2 2 0 010 4z" />
                <path
                  opacity=".5"
                  d="M13 0a2 2 0 00-1.4.6l-10 10a2 2 0 000 2.8c.1-.2.3-.6.6-.8l10-10a2 2 0 011.4-.6h9.6a2 2 0 00-2-2H13z"
                />
              </svg>
              Save your favorite questions, answers, watch tags, and more
            </li>
            <li className="textLine">
              <svg width="26" height="26" className="icon">
                <path d="M21 4V2H5v2H1v5c0 2 2 4 4 4v1c0 2.5 3 4 7 4v3H7s-1.2 2.3-1.2 3h14.4c0-.6-1.2-3-1.2-3h-5v-3c4 0 7-1.5 7-4v-1c2 0 4-2 4-4V4h-4zM5 11c-1 0-2-1-2-2V6h2v5zm11.5 2.7l-3.5-2-3.5 1.9L11 9.8 7.2 7.5h4.4L13 3.8l1.4 3.7h4L15.3 10l1.4 3.7h-.1zM23 9c0 1-1 2-2 2V6h2v3z" />
              </svg>
              Earn reputation and badges
            </li>
          </ul>
        </TextBox>
        <InputBox>
          <div className="inputArea">
            <label htmlFor="displayName">
              Display name
              <div
                className={nameIsFocused ? 'inputFocus focused' : 'inputFocus'}
              >
                <input
                  onFocus={nameHandleFocus}
                  onBlur={nameHandleBlur}
                  onChange={e => setName(e.target.value)}
                  maxLength="10"
                  type="displayName"
                  id="displayName"
                />
              </div>
            </label>
          </div>
          <div className="inputArea">
            <label htmlFor="email">
              Email
              <div
                className={emailIsFocused ? 'inputFocus focused' : 'inputFocus'}
              >
                <input
                  onFocus={emailHandleFocus}
                  onBlur={emailHandleBlur}
                  onChange={e => setEmail(e.target.value)}
                  type="email"
                  id="email"
                />
              </div>
            </label>
            <p className="errorMessage">{emailErrorMeassage}</p>
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
                  onChange={e => setPassword(e.target.value)}
                  maxLength="20"
                  type="password"
                  id="password"
                />
              </div>
            </label>
            <p className="errorMessage">{pwErrorMeassage}</p>
          </div>
          {password.length > 6 ? (
            <div className="inputArea">
              <label htmlFor="password">
                Password Check
                <div
                  className={
                    pwChIsFocused ? 'inputFocus focused' : 'inputFocus'
                  }
                >
                  <input
                    onFocus={pwCheckHandleFocus}
                    onBlur={pwCheckHandleBlur}
                    onChange={e => setPasswordCheck(e.target.value)}
                    maxLength="20"
                    type="password"
                    id="password"
                  />
                </div>
              </label>
              <p className="errorMessage">{pwCheckErrorMeassage}</p>
            </div>
          ) : (
            ''
          )}
          <SignUpBtn onClick={handleSubmit} type="submit">
            Sign up
          </SignUpBtn>
        </InputBox>
      </div>
    </SignUpBox>
  );
}

export default SignUpPage;
