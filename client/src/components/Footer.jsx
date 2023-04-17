import styled from 'styled-components';

const FooterBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 322px;
  background: #232629;
`;

const Container = styled.div`
  width: 1264px;
`;

function Footer() {
  return (
    <FooterBox>
      <Container>
        <div>hi</div>
        <div>hi</div>
      </Container>
    </FooterBox>
  );
}

export default Footer;
