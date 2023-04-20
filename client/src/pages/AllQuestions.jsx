import styled from 'styled-components';
import { useState, useEffect, useCallback } from 'react';
import { GoCheck } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import useFetch from '../util/useFetch';

const Box = styled.div`
  width: calc(100% - 250px);
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  box-sizing: border-box;
  height: 1320px;
`;

const TitleBox = styled.div`
  width: 80%;
  height: 20%;
  border-bottom: 1px solid rgb(214, 216, 219);
  padding: 45px 0px 20px 30px;
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
  width: 80%;
  height: 100%;
  box-sizing: border-box;
`;

const QuestionBox = styled.div`
  border-bottom: 1px solid rgb(214, 216, 219);
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  box-sizing: border-box;
`;

const CountBox = styled.div`
  width: 20%;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  padding-right: 30px;
  box-sizing: border-box;

  .likesValue {
    font-weight: bold;
    margin-right: 5px;
    font-size: 1.5rem;
  }

  .likesText {
    font-size: 1.3rem;
  }

  .answersValue {
    font-weight: bold;
    margin-right: 5px;
    font-size: 1.5rem;
  }

  .answersText {
    font-size: 1.3rem;
  }

  .views {
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .viewsValue {
    font-weight: bold;
    margin-right: 5px;
    font-size: 1.5rem;
    color: rgb(153, 88, 90);
  }

  .viewsText {
    font-size: 1.3rem;
    color: rgb(153, 88, 90);
  }
`;

const Answers = styled.div`
  background-color: ${props =>
    props.accepted === true ? 'rgb(74, 111, 72)' : 'white'};
  color: ${props => (props.accepted === true ? 'white' : 'rgb(74, 111, 72)')};
  border: ${props =>
    props.accepted === true ? 'none' : '1px solid rgb(74, 111, 72)'};
  padding: 5px;
  padding-right: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: end;
  width: 140px;

  .answersValue {
    margin-left: 10px;
  }
`;

const QuestionMain = styled.div`
  width: 80%;
  height: 160px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  flex-direction: column;

  .title {
    color: rgb(57, 116, 194);
    font-size: 1.7rem;
    margin-bottom: 5px;
    margin-top: 20px;

    :hover {
      color: rgb(77, 139, 221);
    }
  }

  .content {
    font-size: 1.3rem;
    line-height: 1.7rem;
    display: block;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    line-height: 1.2;
    text-align: left;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-bottom: 5px;
  }

  .tagsBox {
    padding: 10px 0 10px 0;
    color: rgb(57, 116, 194);

    .tag {
      background-color: rgb(227, 235, 243);
      padding: 8px;
      font-size: 1.1rem;
      border-radius: 5px;
      color: rgb(80, 114, 154);
      margin-right: 10px;

      :hover {
        background-color: rgb(213, 226, 240);
        color: rgb(66, 96, 129);
      }
    }
  }
`;

const QuestionProfile = styled.div`
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  text-align: right;

  .name {
    margin-right: 10px;
    font-size: 1.1rem;
    color: rgb(77, 139, 221);
  }

  .createdAt {
    font-size: 1.1rem;
    color: rgb(91, 92, 93);
  }
`;

function AllQuestions() {
  const navigate = useNavigate();
  const { datas, isPending, error } = useFetch(`
  http://localhost:3001/questions`);

  const [questions, setQuestions] = useState([]);
  const first = 0;

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
        {datas
          ? datas.map(data => {
              return (
                <QuestionBox>
                  <CountBox>
                    <div className="likes">
                      <span className="likesValue">{data.likes}</span>
                      <span className="likesText">likes</span>
                    </div>
                    <Answers accepted={data.accepted_answer}>
                      {data.accepted_answer === true ? (
                        <GoCheck size="30" />
                      ) : null}
                      <span className="answersValue">{data.answer_cnt}</span>
                      <span className="answersText">answers</span>
                    </Answers>
                    <div className="views">
                      <span className="viewsValue">{data.views}</span>
                      <span className="viewsText">views</span>
                    </div>
                  </CountBox>
                  <QuestionMain>
                    <span className="title">{data.title}</span>
                    <span className="content">{data.content}</span>
                    <div className="tagsBox">
                      {data.tagsList
                        ? data.tagsList.map(tag => {
                            return <span className="tag">{tag.label}</span>;
                          })
                        : null}
                    </div>
                  </QuestionMain>
                  <QuestionProfile>
                    <span className="name">{data.name}</span>
                    <span className="createdAt">
                      asked {data.created_at.slice(0, 10)} &nbsp;at
                      {data.created_at.slice(10)}
                    </span>
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
