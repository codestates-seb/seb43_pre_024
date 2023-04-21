import React from 'react';
import { useParams } from 'react-router-dom';
import AnswerList from '../components/AnswerList';
import QuestionInfo from '../components/QuestionInfo';

function NewAnswerInput() {
  return <div>이곳에 새 답변을 입력하는 UI가 들어갑니다.</div>;
}

function QuestionDetail() {
  const { id } = useParams();
  console.log({ questionId: id });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
      <QuestionInfo questionId={id} />
      <AnswerList questionId={id} />
      <NewAnswerInput />
    </div>
  );
}

export default QuestionDetail;
