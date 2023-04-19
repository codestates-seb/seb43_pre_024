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

  useEffect(() => {
    if (isPending) {
      setUsers(datas[0]);
      setQuestions(user.questions);
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
    console.log(page);
  }

  const pageData = dataPerPage[page - 1];
  console.log(pageData);

  return (
    <Container>
      <MyPage pageData={pageData} />
      <PagingBox>
        <Pagination
          activePage={page}
          itemsCountPerPage={questionsPerPage}
          totalItemsCount={questionsCount}
          pageRangeDisplayed={totalPage}
          prevPageText="-"
          nextPageText="+"
          onChange={e => handlePageChange(e)}
        />
      </PagingBox>
    </Container>
  );
}

export default Paging;
