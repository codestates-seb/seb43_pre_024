import MDEditor from "@uiw/react-md-editor";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BorderBottom } from "@mui/icons-material";

function QuestionInfo({ questionId }) {
  const navigate = useNavigate();

  // TODO: API 연동
  const data = {
    questionId: 1,
    title:
      "Why is processing a sorted array faster than processing an unsorted array?",
    content:
      "\n I accidentally committed the wrong files to Git, but didn`\nt push the commit to the server yet. \n How do I undo those commits from the local repository?\n ```javascript\n const a = 1;\n console.log(a);\n```",
    name: "김지은",
    likes: "0",
    answer_cnt: "2",
    views: "1",
    created_at: "2023-04-18 13:52",
    accepted_answer: true,
  };
  // TODO: API 연동
  const tags = ["javascript", "react", "java", "python", "c++"];
  // TODO: API 연동 (하트 수 받아오기)
  const numberOfHearts = 21;

  const [isEditing, setIsEditing] = useState(false);
  const [questionContent, setQuestionContent] = useState(data.content);
  const [isFilled, setIsFilled] = useState(false);
  const [count, setCount] = useState(0);

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

  function onClickHeartButton() {
    setIsFilled(!isFilled);
    setCount(count + 1);
    setCount(!isFilled ? count + 1 : count - 1);
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
        <h2>{data.title}</h2>
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
          onChange={(e) => setQuestionContent(e.target.value)}
          style={{ width: "80%" }}
        />
      ) : (
        <MDEditor.Markdown source={data.content} style={{ width: "80%" }} />
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
              // TODO: 로그인 여부에 따라 다르게 동작하도록 수정
              // if (isLogin === false) {
              //   navigate("/login");
              // }

              if (isEditing === true) {
                // 저장하기가 눌렸음
                // TODO: API 연동 (post, update question)
                setIsEditing(false);
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
              navigate("/login");
              // TODO: delete api 호출
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
              {numberOfHearts}
            </div>
          </HeartButtonStyle>
        </EditDeleteButtonStyle>
      </div>
    </>
  );
}
export default QuestionInfo;
