import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { colors } from '@mui/material';

const NewQuestionStyle = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 20px;
`;

function NewQuestion() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

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
      <button
        style={{
          width: '150px',
          height: '40px',
          background: '#0A95FF',
          color: 'white',
          borderRadius: '5px',
          border: 'none',
        }}
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
        style={{
          width: '150px',
          height: '40px',
          background: 'beige',
          color: 'red',
          borderRadius: '5px',
          border: 'none',
        }}
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
  const {
    title,
    description,
    inputType,
    placeholder,
    value,
    setValue,
    hasNextButton,
    onClickNext,
    disabled,
  } = props;
  return (
    <div style={{ opacity: disabled ? 0.5 : 1 }}>
      <h4>{title}</h4>
      <p>{description}</p>
      {inputType === 'text' && (
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={e => setValue(e.target.value)}
          style={{ width: '100%' }}
          disabled={disabled}
        />
      )}
      {inputType === 'md-editor' && (
        <MDEditor
          value={value}
          style={{ width: '100%' }}
          onChange={event => {
            if (!disabled) {
              setValue(event);
            }
          }}
        />
      )}
      {inputType === 'tags' && (
        <LimitTags
          type="text"
          placeholder={placeholder}
          style={{ width: '100%' }}
          onChange={event => {
            if (!disabled) {
              setValue(event);
            }
          }}
        />
      )}
      {hasNextButton && (
        <button
          type="button"
          onClick={onClickNext}
          style={{ marginTop: '5px' }}
        >
          Next
        </button>
      )}
    </div>
  );
}
function LimitTags(props) {
  const { placeholder } = props;
  const tagsList = [
    { label: 'JavaScript' },
    { label: 'React' },
    { label: 'Java' },
    { label: 'Python' },
    { label: 'C++' },
  ];
  const [tags, setTags] = useState([]);

  return (
    <Autocomplete
      multiple
      limitTags={2}
      id="multiple-limit-tags"
      options={tagsList}
      getOptionLabel={option => option.label}
      defaultValue={[tagsList[0]]}
      onChange={(event, newValue) => {
        setTags(newValue);
      }}
      renderInput={params => (
        <TextField {...params} label="Tags" placeholder={placeholder} />
      )}
      sx={{ width: '500px' }}
    />
  );
}

export { NewQuestion, LimitTags };
