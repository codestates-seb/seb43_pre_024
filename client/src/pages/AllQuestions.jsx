import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useFetch from '../util/useFetch';

const Box = styled.div`
  width: calc(100% - 250px);
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  box-sizing: border-box;
`;

const TitleBox = styled.div`
  width: 80%;
  height: 20%;
  border-bottom: 1px solid rgb(214, 216, 219);
  padding: 45px 50px 20px 30px;
  box-sizing: border-box;

  .firstLine,
  .secondLine {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }

  .title,
  .questionsCount {
    flex: 6;
    padding: 20px;
    padding-left: 20px;
  }

  .title {
    font-size: 1.5rem;

    h2 {
      margin: 0%;
    }
  }

  .questionsCount {
    font-size: 1.3rem;

    h3 {
      margin: 0;
    }
  }

  .buttonBox {
    flex: 4;
    text-align: right;

    .askBtn {
      background-color: rgb(84, 148, 252);
      font-size: 1.2rem;
      padding: 15px;
      border-radius: 5px;
      color: white;
      border: none;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
        rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
      cursor: pointer;

      :hover {
        background-color: rgb(66, 119, 206);
      }
    }
  }

  .sortBtnBox {
    position: relative;
    border: 1px solid black;
    height: 40px;
    width: 240px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    z-index: 5;
  }
`;

const HotBtn = styled.button`
  position: relative;
  border: none;
  width: 80px;
  height: 40px;
  z-index: 1;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  cursor: pointer;

  background-color: ${props =>
    props.hotActive === true ? 'rgb(205, 205, 205)' : 'white'};
`;

const NewBtn = styled.button`
  position: relative;
  border: none;
  width: 80px;
  height: 40px;
  z-index: 1;
  border-left: 1px solid black;
  border-right: 1px solid black;

  background-color: ${props =>
    props.newActive === true ? 'rgb(205, 205, 205)' : 'white'};
`;

const TopBtn = styled.button`
  position: relative;
  border: none;
  width: 80px;
  height: 40px;
  z-index: 1;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  cursor: pointer;

  background-color: ${props =>
    props.topActive === true ? 'rgb(205, 205, 205)' : 'white'};
`;

const ContentsBox = styled.div`
  width: 100%;
  height: 80%;
  border: 1px solid black;
  padding: 20px;
  box-sizing: border-box;
`;

function AllQuestions() {
  const navigate = useNavigate();
  const { datas, isPending, error } = useFetch(`
  http://localhost:3001/questions`);

  const [hotActive, setHotActive] = useState(false);
  const [newActive, setNewActive] = useState(false);
  const [topActive, setTopActive] = useState(false);

  function onHotActive() {
    setHotActive(true);
    setNewActive(false);
    setTopActive(false);
  }

  function onNewActive() {
    setHotActive(false);
    setNewActive(true);
    setTopActive(false);
  }

  function onTopActive() {
    setHotActive(false);
    setNewActive(false);
    setTopActive(true);
  }

  return (
    <Box>
      <TitleBox>
        <div className="firstLine">
          <div className="title">
            <h2>All Questions</h2>
          </div>
          <div className="buttonBox">
            <button
              type="button"
              className="askBtn"
              onClick={() => navigate('/new-question')}
            >
              Ask Question
            </button>
          </div>
        </div>
        <div className="secondLine">
          <div className="questionsCount">
            <h3>{datas ? datas.length : null} questions</h3>
          </div>
          <div className="sortBtnBox">
            <HotBtn
              onClick={() => onHotActive()}
              hotActive={hotActive}
              className="hot"
            >
              HOT
            </HotBtn>
            <NewBtn
              onClick={() => onNewActive()}
              newActive={newActive}
              className="new"
            >
              NEW
            </NewBtn>
            <TopBtn
              onClick={() => onTopActive()}
              topActive={topActive}
              className="top"
            >
              TOP
            </TopBtn>
          </div>
        </div>
      </TitleBox>
      <ContentsBox>
        <h2>질문 목록</h2>
      </ContentsBox>
    </Box>
  );
}

export default AllQuestions;
