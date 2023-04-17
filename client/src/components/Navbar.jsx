import styled from 'styled-components';

const NavBox = styled.div`
  width: 20%;
  border-right: 1px solid red;
  height: calc(100%-70px);
`;

function Navbar() {
  return (
    <NavBox>
      <div className="navHome">Home</div>
      <div className="navTitle">PUBLIC</div>
      <ul>
        <li className="navMenu">Questions</li>
        <li className="navMenu">Tags</li>
        <li className="navMenu">Users</li>
        <li className="navMenu">Companies</li>
      </ul>
      <div className="navTitle">COLLECTIVES</div>
      <div className="navTitle">TEAMS</div>
    </NavBox>
  );
}

export default Navbar;
