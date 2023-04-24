import MDEditor from "@uiw/react-md-editor";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import styled from "styled-components";

const QuestionInputBoxStyle = styled.div`
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  margin-top: 48;
  background: #fff;
  margin: 24px 0;
  padding: 24px;
  border: #ccc 2px solid;
  border-radius: 5px;
  max-width: 600px;
`;

const NewQuestionItemTitle = styled.div`
  font-size: 24px;
  line-height: 28px;
  margin: 0;
  padding: 0;
  font-weight: 500;
  margin-bottom: 20px;
`;

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
    <QuestionInputBoxStyle disabled={disabled}>
      <NewQuestionItemTitle>{title}</NewQuestionItemTitle>
      <p>{description}</p>
      {inputType === "text" && (
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{ width: "100%" }}
          disabled={disabled}
        />
      )}
      {inputType === "md-editor" && (
        <MDEditor
          value={value}
          style={{ width: "100%" }}
          onChange={(event) => {
            if (disabled) {
              alert("위 질문에 먼저 답변하세요.");
            }
            if (!disabled) {
              setValue(event);
            }
          }}
        />
      )}
      {inputType === "tags" && (
        <LimitTags
          type="text"
          placeholder={placeholder}
          style={{ width: "100%" }}
          tags={value}
          setTags={setValue}
          disabled={disabled}
        />
      )}
      {hasNextButton && (
        <button
          type="button"
          onClick={onClickNext}
          style={{ marginTop: "10px" }}
        >
          Next
        </button>
      )}
    </QuestionInputBoxStyle>
  );
}

function LimitTags(props) {
  const { placeholder, tags, setTags, disabled } = props;
  const tagsList = [
    { label: "JavaScript" },
    { label: "React" },
    { label: "Java" },
    { label: "Python" },
    { label: "C++" },
  ];

  return (
    <Autocomplete
      multiple
      limitTags={2}
      id="multiple-limit-tags"
      options={tagsList}
      getOptionLabel={(option) => option.label}
      value={tags}
      onChange={(event, newValue) => {
        if (disabled) {
          alert("위 질문에 먼저 답변하세요.");
        }
        if (!disabled) {
          setTags(newValue);
        }
      }}
      renderInput={(params) => (
        <TextField {...params} label="Tags" placeholder={placeholder} />
      )}
      sx={{ width: "500px" }}
    />
  );
}

export default QuestionInputBox;
