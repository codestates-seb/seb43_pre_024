import styled from 'styled-components';
import { useState } from 'react';
import QuestionInputBox from '../components/QuestionInputBox';
import Confirm from '../components/Confirm';

const NewQuestionStyle = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 20px 50px 100px 50px;
  background-color: #fafafa;
  width: 100%;
`;

const ButtonListStyle = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const ButtonStyle = styled.button`
  width: 150px;
  height: 40px;
  background: ${props =>
    props.buttonType === 'danger' ? '#ffffff' : '#0a95ff'};
  color: ${props => (props.buttonType === 'danger' ? 'red' : 'white')};
  border-radius: 5px;
  border: none;
  :hover {
    cursor: pointer;
    background: ${props =>
      props.buttonType === 'danger' ? '#fff2f2' : '#0055aa'};
    color: ${props => (props.buttonType === 'danger' ? '#f00' : 'white')};
  }
  :active {
    background: ${props =>
      props.buttonType === 'danger' ? '#ffcccc' : '#003366'};
    color: ${props => (props.buttonType === 'danger' ? '#c00' : 'white')};
  }
`;

function NewQuestion() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isCorfirmOpen, setIsConfirmOpen] = useState(false);

  function onClickDiscardButton() {
    setIsConfirmOpen(true);
  }

  function onConfirmDiscard() {
    setTitle('');
    setBody('');
    setTags([]);
    setIsConfirmOpen(false);
  }

  function onCancelDiscard() {
    setIsConfirmOpen(false);
  }

  return (
    <>
      <NewQuestionStyle>
        <h1>Ask a public question</h1>
        <QuestionInputBox
          title="Title"
          inputType="text"
          description="Be specific and imagine you’re asking a question to another person."
          placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
          value={title}
          setValue={setTitle}
          hasNextButton={currentStep === 0}
          disabled={currentStep < 0}
          onClickNext={() => {
            if (title.length < 10) {
              alert('10자 이상 입력해주세요.');
            } else {
              setCurrentStep(1);
            }
          }}
        />
        <QuestionInputBox
          title="What are the details of your problem? "
          inputType="md-editor"
          description="Introduce the problem and expand on what you put in the title. Minimum 20 characters."
          value={body}
          setValue={setBody}
          hasNextButton={currentStep === 1}
          disabled={currentStep < 1}
          onClickNext={() => {
            if (title.length < 10) {
              alert('10자 이상 입력해주세요.');
            } else {
              setCurrentStep(2);
            }
          }}
        />
        <QuestionInputBox
          title="Tags"
          inputType="tags"
          description="Add up to 5 tags to describe what your question is about. Start typing to see suggestions."
          placeholder="e.g. javascript, react, java, python, c++"
          value={tags}
          setValue={setTags}
          disabled={currentStep < 2}
          hasNextButton={false}
        />
        <ButtonListStyle>
          <ButtonStyle
            type="button"
            onClick={() => {
              console.log('title', title);
              console.log('body', body);
              console.log('tags', tags);
            }}
          >
            Post your question
          </ButtonStyle>
          <ButtonStyle
            type="button"
            buttonType="danger"
            onClick={() => {
              onClickDiscardButton();
            }}
          >
            Discard draft
          </ButtonStyle>
        </ButtonListStyle>
      </NewQuestionStyle>
      {isCorfirmOpen && (
        <Confirm
          message="확인해 봐야해"
          onConfirm={() => onConfirmDiscard()}
          onCancel={() => onCancelDiscard()}
        />
      )}
    </>
  );
}

export default NewQuestion;
