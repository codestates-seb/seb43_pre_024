import MDEditor from "@uiw/react-md-editor";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { apiClient } from "../api";

const QuestionButtonStyle = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 40px;
  border: none;
  background-color: #5594fc;
  color: white;
  padding: 20px;
  margin-left: 50px;
  border-radius: 5px;
  :hover {
    background-color: #3b7ddd;
    cursor: pointer;
  }
`;

const EditDeleteButtonStyle = styled.div`
  width: 80%;
  border-bottom: 1px solid #e1e4e8;
  display: flex;
  justify-content: flex-start;
  margin-top: 40px;
  .editButton,
  .deleteButton {
    background-color: white;
    border: none;
    width: 50px;
    font-size: 16px;
    color: gray;
    :hover {
      cursor: pointer;
      font-weight: bold;
    }
  }
`;

const HeartButtonStyle = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  .heartButton {
    border: 1px solid red;
  }
  :hover {
    cursor: pointer;
  }
`;

function QuestionInfo({ questionDetail, fetchQuestionDetail, questionId }) {
  const navigate = useNavigate();

  const [questionContent, setQuestionContent] = useState(
    questionDetail?.content || ""
  );

  useEffect(() => {
    fetchQuestionDetail();
  }, []);

  useEffect(() => {
    setQuestionContent(questionDetail?.content || "");
  }, [questionDetail]);

  // TODO: API 연동
  const tags = ["javascript", "react", "java", "python", "c++"];

  const [isEditing, setIsEditing] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [count, setCount] = useState(0);
  const [isLogin, setIsLogin] = useState(false);

  function onClickHeartButton() {
    setIsFilled(!isFilled);
    setCount(count + 1);
    setCount(!isFilled ? count + 1 : count - 1);
  }

  if (!questionDetail) {
    return <div>존재하지 않는 질문입니다.</div>;
  }

  return (
    <>
      <div
        style={{
          width: "80%",
          display: "flex",
          gap: 30,
          alignItems: "center",
        }}
      >
        <h2>{questionDetail.title}</h2>
        <QuestionButtonStyle
          type="button"
          onClick={() => navigate("/new-question")}
        >
          Ask Question
        </QuestionButtonStyle>
      </div>
      {isEditing ? (
        <MDEditor
          value={questionContent}
          onChange={(e) => {
            setQuestionContent(e);
          }}
          style={{ width: "80%" }}
        />
      ) : (
        <MDEditor.Markdown
          source={questionDetail.content}
          style={{ width: "80%" }}
        />
      )}

      <div style={{ marginTop: 16 }}>
        {tags.map((tag) => (
          <span
            style={{
              marginRight: 16,
              padding: 8,
              background: "#cef",
              color: "#57A",
              borderRadius: 5,
            }}
          >
            {tag}
          </span>
        ))}
        <EditDeleteButtonStyle>
          <button
            type="button"
            className="editButton"
            onClick={() => {
              // TODO: 로그인 여부에 따라 다르게 동작하도록 수정 (로그인 여부를 이 컴포넌트에서 확인할 수 있게 해야힘)
              if (isLogin === false) {
                navigate("/login");
              }
              if (isEditing === true) {
                // 저장하기가 눌렸음
                setIsEditing(false);

                apiClient
                  .patch(`questions/${questionId}/edit`, {
                    title: questionDetail.title,
                    content: questionContent,
                  })
                  .then(() => {
                    fetchQuestionDetail();
                  })
                  .catch(() => {
                    alert("수정 실패");
                  });
              } else {
                // 수정하기가 눌렸음
                setIsEditing(true);
              }
            }}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
          <button
            type="button"
            className="deleteButton"
            onClick={() => {
              // TODO: 로그인 되어 있는지 확인, 작성자인지 확인
              if (isLogin === false) {
                navigate("/login");
              }
              apiClient
                .delete(`questions/${questionId}`)
                .then(() => {
                  navigate("/");
                })
                .catch(() => {
                  alert("삭제 실패");
                });
            }}
          >
            Delete
          </button>
          <HeartButtonStyle>
            <div style={{ display: "flex", gap: 2 }}>
              {isFilled ? (
                <AiFillHeart
                  size="20"
                  style={{ color: "red" }}
                  onClick={() => onClickHeartButton()}
                />
              ) : (
                <AiOutlineHeart
                  size="20"
                  onClick={() => onClickHeartButton()}
                  style={{ color: "black" }}
                />
              )}
              {questionDetail.likes}
            </div>
          </HeartButtonStyle>
        </EditDeleteButtonStyle>
      </div>
    </>
  );
}
export default QuestionInfo;
