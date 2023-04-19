import styled from 'styled-components';
import Pagination from 'react-js-pagination';
import { useState, useEffect } from 'react';
import useFetch from '../util/useFetch';
import MyPage from '../pages/MyPage';

const PagingBox = styled.div`
  width: 100%;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

function Paging() {
  const { datas, isPending, error } = useFetch(`
  http://localhost:3001/user`);

  const [user, setUsers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  const [questionsActive, setQuestionsActive] = useState(true);
  const [answersActive, setAnswersActive] = useState(false);

  useEffect(() => {
    if (isPending) {
      setUsers(datas[0]);
      setQuestions(user.questions);
      setAnswers(user.answers);
    }
  }, [datas, isPending, user]);

  const [page, setPage] = useState(1);

  const questionsCount = questions ? questions.length : 0;
  const questionsPerPage = 2;
  const totalPage = questionsCount / questionsPerPage;

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
  const answersTotalPage = answersCount / answersPerPage;

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
            prevPageText="-"
            nextPageText="+"
            onChange={e => handlePageChange(e)}
          />
        ) : (
          <Pagination
            activePage={answersPage}
            itemsCountPerPage={answersPerPage}
            totalItemsCount={answersCount}
            pageRangeDisplayed={answersTotalPage}
            prevPageText="-"
            nextPageText="+"
            onChange={e => handleAnswersPageChange(e)}
          />
        )}
      </PagingBox>
    </Container>
  );
}

export default Paging;
