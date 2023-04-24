import styled from "styled-components";
import notFoundImg from "../images/notFoundImg.svg";
import notFound from "../images/notFound.png";

const NotFoundBox = styled.div`
  width: 100%;
  height: 130vh;
  display: flex;
  justify-content: center;
  padding-top: 15%;
  background-color: #f1f2f3;
  color: rgb(41, 42, 45);

  .container {
    display: flex;
    flex-direction: row;
  }

  .title {
    font-size: 2.5rem;
    font-weight: 500;
    margin: 0;
  }

  .subTitle {
    font-size: 2rem;
    margin: 0;
    margin-bottom: 30px;
  }

  .subText {
    font-size: 1.5rem;
    line-height: 3.2rem;

    strong {
      color: rgb(83, 135, 207);
    }
  }

  .imgArea {
    width: 205px;
    height: 190px;
    background-image: url(${notFound});
    background-size: cover;
    background-repeat: no-repeat;
  }

  .textArea {
    padding-left: 3rem;
    padding-top: 4rem;
  }
`;

function NotFound() {
  return (
    <NotFoundBox>
      <div className="container">
        <div className="imgArea"></div>
        <div className="textArea">
          <h1 className="title">Page not found</h1>
          <p className="subTitle">
            We're sorry, we couldn't find the page you requested.
          </p>
          <p className="subText">
            Try <strong>searching for similar questions</strong>
            <br />
            Browse our <strong>recent questions</strong>
            <br />
            Browse our <strong>popular tags</strong>
            <br />
            If you feel something is missing that should be here,{" "}
            <strong>contact us.</strong>
            <br />
          </p>
        </div>
      </div>
    </NotFoundBox>
  );
}

export default NotFound;
