import styled from 'styled-components';
import { useState } from 'react';
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
    border: 1px solid black;
    height: 40px;
    width: 240px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
  }
`;

const HotBtn = styled.button`
  border: none;
  width: 80px;
  height: 40px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  cursor: pointer;

  background-color: ${props =>
    props.hotActive === true ? 'rgb(205, 205, 205)' : 'white'};
`;

const NewBtn = styled.button`
  border: none;
  width: 80px;
  height: 40px;
  border-left: 1px solid black;
  border-right: 1px solid black;

  background-color: ${props =>
    props.newActive === true ? 'rgb(205, 205, 205)' : 'white'};
`;

const TopBtn = styled.button`
  border: none;
  width: 80px;
  height: 40px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  cursor: pointer;

  background-color: ${props =>
    props.topActive === true ? 'rgb(205, 205, 205)' : 'white'};
`;

const ContentsBox = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid green;
  padding: 20px;
  box-sizing: border-box;
`;

const QuestionBox = styled.div`
  border: 1px solid red;
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border: 1px solid red;
  box-sizing: border-box;
`;

const CountBox = styled.div`
  width: 20%;
  border: 1px solid blue;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const QuestionMain = styled.div`
  width: 80%;
  border: 1px solid green;
  box-sizing: border-box;
`;

const QuestionProfile = styled.div`
  width: 100%;
  border: 1px solid black;
  box-sizing: border-box;
`;

function AllQuestions() {
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
            <button type="button" className="askBtn">
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
        {datas
          ? datas.map(data => {
              return (
                <QuestionBox>
                  <CountBox>
                    <div className="likes">
                      <span className="likesValue">{data.likes}</span>
                      <span className="likesText">likes</span>
                    </div>
                    <div className="answers">
                      <span className="answersValue">{data.answer_cnt}</span>
                      <span className="answersText">answers</span>
                    </div>
                    <div className="views">
                      <span className="viewsValue">{data.views}</span>
                      <span className="viewsText">views</span>
                    </div>
                  </CountBox>
                  <QuestionMain>
                    {data.title}
                    {data.content}
                  </QuestionMain>
                  <QuestionProfile>
                    {data.name}
                    {data.createdAt}
                  </QuestionProfile>
                </QuestionBox>
              );
            })
          : null}
      </ContentsBox>
    </Box>
  );
}

export default AllQuestions;
