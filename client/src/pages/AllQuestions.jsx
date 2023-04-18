import styled from 'styled-components';

const Box = styled.div`
  width: calc(100% - 250px);
  border: 1px solid red;
`;

function AllQuestions() {
  return (
    <Box>
      <h2>AllQuestions</h2>
    </Box>
  );
}

export default AllQuestions;
