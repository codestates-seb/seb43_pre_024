import styled from 'styled-components';

const HomeBox = styled.div`
  width: calc(100% - 250px);
  border: 1px solid red;
`;
function Home() {
  return (
    <HomeBox>
      <div>Home</div>
    </HomeBox>
  );
}

export default Home;
