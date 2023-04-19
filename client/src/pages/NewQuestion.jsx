import styled from 'styled-components';
import { useState } from 'react';

const NewQuestionStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 20px;
`;

function NewQuestion() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');

  return (
    <NewQuestionStyle>
      <h2>Ask a public question</h2>
      <QuestionInputBox
        title="Title"
        inputType="text"
        description="Be specific and imagine you’re asking a question to another person."
        placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
        value={title}
        setValue={setTitle}
      />
      <button
        type="button"
        onClick={() => {
          console.log('title', title);
          console.log('body', body);
          console.log('tags', tags);
        }}
      >
        Post your question
      </button>
      <button
        type="button"
        onClick={() => {
          setTitle('');
        }}
      >
        Discard draft
      </button>
    </NewQuestionStyle>
  );
}

function QuestionInputBox(props) {
  const { title, description, inputType, placeholder, value, setValue } = props;
  return (
    <>
      <h4>{title}</h4>
      <p>{description}</p>
      {inputType === 'text' && (
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      )}
    </>
  );
}
export default NewQuestion;
