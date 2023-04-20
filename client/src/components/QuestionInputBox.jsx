import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

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

export default QuestionInputBox;
