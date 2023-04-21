import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MDEditor from '@uiw/react-md-editor';
import AnswerList from '../components/AnswerList';
import QuestionInfo from '../components/QuestionInfo';
import QuestionInputBox from '../components/QuestionInputBox';

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

function NewAnswerInput(props) {
  const { value, setValue } = props;
  const navigate = useNavigate();
  const PostButtonStyle = styled.button`
    width: 150px;
    height: 40px;
    background-color: rgb(84, 148, 252);
    padding: 15px;
    border-radius: 5px;
    color: white;
    border: none;
    margin-top: 20px;
    margin-bottom: 90px;
    :hover {
      background-color: rgb(66, 119, 206);
      cursor: pointer;
    }
  `;

  return (
    <div>
      <MDEditor style={{ width: '80%' }} value={value} />
      <PostButtonStyle type="button" onClick={() => navigate('/new-question')}>
        Post Your Answer
      </PostButtonStyle>
    </div>
  );
}
export default QuestionDetail;
