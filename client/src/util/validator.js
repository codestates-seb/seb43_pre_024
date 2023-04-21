export const validateEmail = userInputEmail => {
  // eslint-disable-next-line no-useless-escape
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (!emailRegex.test(userInputEmail)) {
    return '이메일 형식을 확인해주세요.';
  }
  return '';
};

export const validatePassword = userPassword => {
  if (userPassword.length < 7 || userPassword.length > 20) {
    return '7자에서 20자 이내로 비밀번호를 입력해주세요.';
  }
  return '';
};

export const validateCheckPassword = (password, passwordcheck) => {
  if (password !== passwordcheck) {
    return '비밀번호를 다시 한번 확인해주세요.';
  }
  return '';
};
export default {};
