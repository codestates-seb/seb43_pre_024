import styled from 'styled-components';

const Box = styled.div`
  width: calc(100% - 250px);
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

const TitleBox = styled.div`
  width: 100%;
  height: 20%;
  border: 1px solid red;
  padding: 20px;
  box-sizing: border-box;
`;

const ContentsBox = styled.div`
  width: 100%;
  height: 80%;
  border: 1px solid black;
  padding: 20px;
  box-sizing: border-box;
`;

function AllQuestions() {
  return (
    <Box>
      <TitleBox>
        <h2>안녕</h2>
      </TitleBox>
      <ContentsBox>
        <h2>질문 목록</h2>
      </ContentsBox>
    </Box>
  );
}

export default AllQuestions;
