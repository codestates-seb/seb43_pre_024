import styled from 'styled-components';
import CodeLogo from '../images/codestates.png';
import logo from '../images/logo-stackoverflow.png';

const FooterBox = styled.div`
  display: flex;
  justify-content: center;
  position: sticky;
  width: 100%;
  height: 340px;
  background: rgba(234, 234, 234);
  top: 0;
`;

const Container = styled.div`
  width: 100%;
  padding: 20px;
  position: relative;

  .teamName {
    position: absolute;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.5);
    right: 30px;
    bottom: 30px;
  }
`;

const UlBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  .footerUl {
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
  }

  .footerLi {
    text-align: left;
    margin-right: 10rem;
  }

  .memberUl,
  .stackUl {
    padding: 0;
  }

  .memberLi,
  .footerLi,
  .stackLi {
    list-style: none;
  }

  .memberLi,
  .stackLi {
    font-size: 1.1rem;
    margin-bottom: 8px;
  }

  .logo {
    width: 140px;
    margin-top: -5px;
  }

  .codeLogo {
    width: 30px;
    margin-right: 5px;
  }
`;

function Footer() {
  return (
    <FooterBox>
      <Container>
        <UlBox>
          <ul className="footerUl">
            <li className="footerLi">
              <h3 className="footerTitle">STACK OVERFLOW</h3>
              <img className=" logo" src={logo} alt="로고" />
            </li>
            <li className="footerLi">
              <h3 className="footerTitle">TEAM</h3>
              <p className="memberLi">NotFound 404</p>
            </li>
            <li className="footerLi">
              <h3 className="footerTitle">COMPANY</h3>
              <p className="memberLi">
                <img
                  className="codeLogo"
                  src={CodeLogo}
                  alt="코드스테이츠로고"
                />
                CodeStates
              </p>
            </li>
            <li className="footerLi">
              <h3 className="footerTitle">STACK</h3>
              <ul className="stackUl">
                <li className="stackLi">HTML/CSS</li>
                <li className="stackLi">React</li>
                <li className="stackLi">JavaScript</li>
                <li className="stackLi">Java</li>
                <li className="stackLi">Spring</li>
                <li className="stackLi">MySQL</li>
              </ul>
            </li>
            <li className="footerLi">
              <h3 className="footerTitle">MEMBER</h3>
              <ul className="memberUl">
                <li className="memberLi">김지은</li>
                <li className="memberLi">김미리</li>
                <li className="memberLi">오다경</li>
                <li className="memberLi">양도열</li>
                <li className="memberLi">김태진</li>
                <li className="memberLi">김예진</li>
              </ul>
            </li>
          </ul>
        </UlBox>
        <span className="teamName">@NotFound404</span>
      </Container>
    </FooterBox>
  );
}

export default Footer;
