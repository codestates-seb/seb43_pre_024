import styled from "styled-components";
import { useState, useEffect } from "react";
import QuestionInputBox from "../components/QuestionInputBox";
import { useNavigate } from "react-router-dom";
import Confirm from "../components/Confirm";

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
  background: ${(props) =>
    props.buttonType === "danger" ? "#ffffff" : "#0a95ff"};
  color: ${(props) => (props.buttonType === "danger" ? "red" : "white")};
  border-radius: 5px;
  border: none;
  :hover {
    cursor: pointer;
    background: ${(props) =>
      props.buttonType === "danger" ? "#fff2f2" : "#0055aa"};
    color: ${(props) => (props.buttonType === "danger" ? "#f00" : "white")};
  }
  :active {
    background: ${(props) =>
      props.buttonType === "danger" ? "#ffcccc" : "#003366"};
    color: ${(props) => (props.buttonType === "danger" ? "#c00" : "white")};
  }
`;

function NewQuestion() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  // 컨펌 모달을 위한 상태들
  const [isCorfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [onClickConfirm, setOnClickConfirm] = useState(() => {});
  const [onClickCancel, setOnClickCancel] = useState(() => {});

  function onConfirmDiscard() {
    setTitle("");
    setBody("");
    setTags([]);
    setIsConfirmOpen(false);
  }

  function onCancelDiscard() {
    setIsConfirmOpen(false);
  }

  function onClickDiscardButton() {
    setConfirmMessage("작성중인 내용을 모두 삭제하시겠습니까?");
    setOnClickConfirm(() => onConfirmDiscard);
    setOnClickCancel(() => onCancelDiscard);
    setIsConfirmOpen(true);
  }

  function onClickNextButton(text, minLength) {
    if (text.length < minLength) {
      setConfirmMessage(`${minLength}자 이상 입력해주세요.`);
      setOnClickConfirm(() => () => {
        setIsConfirmOpen(false);
      });
      setOnClickCancel(null);
      setIsConfirmOpen(true);
    } else {
      setCurrentStep(currentStep + 1);
    }
  }
  const [email, setEmail] = useState("");
  const [isPending, setIsPending] = useState(false);
  const memberId = localStorage.getItem("member-id");
  const token = localStorage.getItem("Authorization");
  useEffect(() => {
    fetch(`${process.env.REACT_APP_FRONT}/users/${memberId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        setIsPending(true);
        setEmail(data.email);
        console.log(email);
      })
      .catch((err) => {
        setIsPending(false);
        console.log(err);
      });
  }, [isPending]);

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
          onClickNext={() => onClickNextButton(title, 10)}
        />
        <QuestionInputBox
          title="What are the details of your problem? "
          inputType="md-editor"
          description="Introduce the problem and expand on what you put in the title. Minimum 20 characters."
          value={body}
          setValue={setBody}
          hasNextButton={currentStep === 1}
          disabled={currentStep < 1}
          onClickNext={() => onClickNextButton(body, 20)}
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
              const data = {
                email: email,
                title: title,
                content: body,
              };
              const token = localStorage.getItem("Authorization");

              fetch(`${process.env.REACT_APP_FRONT}/questions/ask`, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              })
                .then(function (response) {
                  navigate("/all-questions");
                })
                .catch(function (error) {
                  console.log(error);
                  alert("질문 등록에 실패했습니다.");
                });
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
          message={confirmMessage}
          onConfirm={onClickConfirm}
          onCancel={onClickCancel}
        />
      )}
    </>
  );
}

export default NewQuestion;
