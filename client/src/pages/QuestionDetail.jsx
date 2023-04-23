import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import AnswerList from '../components/AnswerList';
import QuestionInfo from '../components/QuestionInfo';

function QuestionDetail() {
  const DetailPageStyle = styled.div`
    width: 80%;
    align-items: left;
    padding-top: 50px;
    margin-left: 40px;
  `;

  const { id } = useParams();
  console.log({ questionId: id });

  return (
    <DetailPageStyle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
        <QuestionInfo questionId={id} />
        <AnswerList questionId={id} />
        <NewAnswerInput />
      </div>
    </DetailPageStyle>
  );
}

function NewAnswerInput() {
  return <div>이곳에 새 답변을 입력하는 UI가 들어갑니다.</div>;
}
export default QuestionDetail;
