import styled from 'styled-components';

const MypageBox = styled.div`
  width: calc(100% - 250px);
  border: 1px solid green;
  box-sizing: border-box;
  padding: 3rem 5rem 3rem 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProfileBox = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: 30%;
  border: 1px solid black;
`;

const TabBox = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: 50%;
  border: 1px solid black;
`;

const BtnBox = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: 10%;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: end;
  padding-right: 1rem;

  .secession {
    border: none;
    background-color: rgb(220, 85, 85);
    padding: 10px;
    color: white;
    border-radius: 5px;

    :hover {
      background-color: rgb(169, 63, 63);
    }
  }
`;

function MyPage() {
  return (
    <MypageBox>
      <ProfileBox>
        <h2>안녕</h2>
      </ProfileBox>
      <TabBox>
        <h2>안녕</h2>
      </TabBox>
      <BtnBox>
        <button type="button" className="secession">
          secession
        </button>
      </BtnBox>
    </MypageBox>
  );
}

export default MyPage;
