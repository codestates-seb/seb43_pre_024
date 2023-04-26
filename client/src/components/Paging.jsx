import styled from 'styled-components';
import Pagination from 'react-js-pagination';
import { useState, useEffect } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import useFetch from '../util/useFetch';
import MyPage from '../pages/MyPage';

const PagingBox = styled.div`
  width: 35%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  position: absolute;
  bottom: -8%;
  left: 26%;

  .left {
    padding-top: 5px;
  }

  .right {
    padding-top: 5px;
  }

  .pagination {
    display: flex;
    flex-direction: row;
    font-size: 1.2rem;
    align-items: center;
    width: 100%;
    justify-content: space-evenly;
    margin: 0;

    li {
      list-style: none;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      background-color: rgb(107, 147, 249);

      :hover {
        background-color: rgb(77, 139, 221);
      }

      a {
        text-decoration: none;
        color: white;
      }
    }
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

function Paging() {
  const [userName, setUsersName] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [isPending, setIsPending] = useState(false);

  const URL = process.env.REACT_APP_FRONT;
  const token = localStorage.getItem("Authorization");
  const memberId = localStorage.getItem("member-id");

  useEffect(() => {
    fetch(
      `${URL}/users/${memberId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
      },
      })
      .then(res => {
        if (!res.ok) {
          throw Error('could not fetch the data for that resource');
        }
        return res.json();
      })
      .then(data => {
        setIsPending(true);
        setQuestions(data.questions);
        setAnswers(data.answers);
        setUsersName(data.name);
      })
      .catch(err => {
        setIsPending(false);
        console.log(err);
      });
  }, [isPending]);

  const [questionsActive, setQuestionsActive] = useState(true);
  const [answersActive, setAnswersActive] = useState(false);

  const [page, setPage] = useState(1);

  const questionsCount = questions ? questions.length : 0;
  const questionsPerPage = 2;
  const totalPage = Math.floor(questionsCount / questionsPerPage);

  const dataPerPage = [];

  for (let i = 0; i < totalPage; i += 1) {
    const temp = [];
    for (let j = 0; j < 2; j += 1) {
      if (i * 2 + j < questionsCount) temp.push(questions[i * 2 + j]);
    }
    dataPerPage.push(temp);
  }

  function handlePageChange(pageCnt) {
    setPage(pageCnt);
  }

  const pageData = dataPerPage[page - 1];

  const answersCount = answers ? answers.length : 0;
  const answersPerPage = 2;
  const answersTotalPage = Math.floor(answersCount / answersPerPage);

  const [answersPage, setAnswersPage] = useState(1);

  const dataPerAnswersPage = [];

  for (let i = 0; i < answersTotalPage; i += 1) {
    const temp = [];
    for (let j = 0; j < 2; j += 1) {
      if (i * 2 + j < answersCount) temp.push(answers[i * 2 + j]);
    }
    dataPerAnswersPage.push(temp);
  }

  function handleAnswersPageChange(pageCnt) {
    setAnswersPage(pageCnt);
  }

  const pageAnswersData = dataPerAnswersPage[answersPage - 1];

  return (
    <Container>
      <MyPage
        pageData={pageData}
        pageAnswersData={pageAnswersData}
        questionsActive={questionsActive}
        setQuestionsActive={setQuestionsActive}
        answersActive={answersActive}
        setAnswersActive={setAnswersActive}
      />
      <PagingBox>
        {questionsActive ? (
          <Pagination
            activePage={page}
            itemsCountPerPage={questionsPerPage}
            totalItemsCount={questionsCount}
            pageRangeDisplayed={totalPage}
            prevPageText={<BiChevronLeft className="left" size="30" />}
            nextPageText={<BiChevronRight className="right" size="30" />}
            onChange={e => handlePageChange(e)}
          />
        ) : (
          <Pagination
            activePage={answersPage}
            itemsCountPerPage={answersPerPage}
            totalItemsCount={answersCount}
            pageRangeDisplayed={answersTotalPage}
            prevPageText={<BiChevronLeft className="left" size="30" />}
            nextPageText={<BiChevronRight className="right" size="30" />}
            onChange={e => handleAnswersPageChange(e)}
          />
        )}
      </PagingBox>
    </Container>
  );
}

export default Paging;
