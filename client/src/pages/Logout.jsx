import styled from "styled-components";
import { Link } from "react-router-dom";
import mainImg from "../images/main_img2.png";

const LogoutBox = styled.div`
  ul {
    padding: 0;
  }
  li {
    list-style-type: none;
  }
  padding-top: calc(70px + 7vh);
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: #f1f2f3;

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .title {
    margin-bottom: 24px;
    font-size: 20px;
    text-align: center;
  }
`;

const ContentBox = styled.div`
  width: 290px;
  padding: 15px;
  background: #fff;
  border-radius: 7px;
  box-shadow: 0px 0px 15px #ddd;

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .linkBox {
    width: 85%;
    border-bottom: 1px solid #eee;
  }
  .linkBox a {
    display: flex;
    align-items: center;
    text-decoration: none;
    margin-bottom: 10px;
  }
  .linkImage {
    display: inline-block;
    margin-right: 7px;
    width: 16px;
    height: 20px;
    background: url(${mainImg});
  }

  .linkImage.ubuntu {
    background-position: -614px 197px;
  }
  .linkImage.mathoverflow {
    background-position: -614px 171px;
  }
  .linkImage.serverfault {
    background-position: -614px 141px;
  }
  .linkImage.stackapps {
    background-position: -614px 114px;
  }
  .linkImage.stackexchange {
    background-position: -614px 86px;
  }
  .linkImage.stackoverflow {
    background-position: -614px 59px;
  }
  .linkImage.superuser {
    background-position: -614px 31px;
  }
  .linkName {
    font-size: 15px;
    color: #0a95ff;
    font-weight: 500;
  }

  .textArea p {
    font-size: 13px;
    color: #999;
  }

  .buttonBox {
    width: 85%;
  }

  .checkLink {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }

  .label {
    font-size: 13px;
    color: #222;
  }

  .btnArea {
    margin-bottom: 30px;
  }

  .logoutBtn {
    padding: 11px 13px;
    background: #0a95ff;
    color: #fff;
    border: none;
    border-radius: 5px;
    box-shadow: rgb(86, 174, 241) 0px 2px 4px inset;
  }
  .cancelBtn {
    padding: 12px 13px;
    color: #0a95ff;
    background: transparent;
    border: none;
  }
`;

function Logout({ setLogin }) {
  return (
    <LogoutBox>
      <div className="container">
        <p className="title">
          Clicking “Log out” will log you out of the following
          <br /> domains on this device:
        </p>
        <ContentBox>
          <div className="container">
            <ul className="linkBox">
              <li>
                <a
                  href="https://askubuntu.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="linkImage ubuntu"></i>
                  <span className="linkName">askubuntu.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://mathoverflow.net"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="linkImage mathoverflow"></i>
                  <span className="linkName">mathoverflow.net</span>
                </a>
              </li>
              <li>
                <a
                  href="https://serverfault.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="linkImage serverfault"></i>
                  <span className="linkName">serverfault.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://stackapps.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="linkImage stackapps"></i>
                  <span className="linkName">stackapps.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://stackexchange.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="linkImage stackexchange"></i>
                  <span className="linkName">stackexchange.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://stackoverflow.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="linkImage stackoverflow"></i>
                  <span className="linkName">stackoverflow.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://superuser.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="linkImage superuser"></i>
                  <span className="linkName">superuser.com</span>
                </a>
              </li>
            </ul>
            <div className="buttonBox">
              <div className="checkLink">
                <input
                  type="checkbox"
                  name="everywhere"
                  id="everywhere"
                  className="checkbox"
                />
                <label for="everywhere" className="label">
                  Log out on all devices
                </label>
              </div>
              <div className="btnArea">
                <Link to="/">
                  <button
                    className="logoutBtn"
                    onClick={() => {
                      setLogin(false);
                      localStorage.removeItem("Authorization");
                    }}
                  >
                    Log out
                  </button>
                </Link>
                <Link to="/">
                  <button className="cancelBtn">Cancel</button>
                </Link>
              </div>
              <div className="textArea">
                <p>
                  If you’re on a shared computer, remember to log out of your
                  Open ID provider (Facebook, Google, Stack Exchange, etc.) as
                  well.
                </p>
              </div>
            </div>
          </div>
        </ContentBox>
      </div>
    </LogoutBox>
  );
}
export default Logout;
