import styled from 'styled-components';

const MypageBox = styled.div`
  width: calc(100% - 250px);
`;

function MyPage() {
  return (
    <MypageBox>
      <div>Mypage</div>
    </MypageBox>
  );
}

export default MyPage;
