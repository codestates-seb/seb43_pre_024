import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MDEditor from "@uiw/react-md-editor";
import AnswerList from "../components/AnswerList";
import QuestionInfo from "../components/QuestionInfo";
import QuestionInputBox from "../components/QuestionInputBox";
import { API_URL } from "../api";

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
      <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
        <QuestionInfo questionId={id} />
        <AnswerList questionId={id} />
        <NewAnswerInput questionId={id} />
      </div>
    </DetailPageStyle>
  );
}

function NewAnswerInput({ questionId }) {
  const [value, setValue] = useState("");
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
      <span
        style={{
          fontSize: "20px",
        }}
      >
        Know someone who can answer? Share a link to this question via email,
        Twitter, or Facebook. Your Answer
      </span>
      <MDEditor
        style={{ marginTop: "15px", width: "80%" }}
        value={value}
        onChange={(e) => {
          setValue(e);
        }}
      />
      <PostButtonStyle
        type="button"
        onClick={() => {
          axios
            .post(`${API_URL}/questions/${questionId}/answer`, {
              //TODO : 로그인 기능 구현 후, 로그인한 사용자의 email을 넣어야 함
              email: "abc@gmail.com",
              content: value,
            })
            .then(function (response) {
              console.log(response);
              /* eslint-disable no-restricted-globals */
              location.reload();
            })
            .catch(function (error) {
              console.log(error);
              alert("답변 등록에 실패했습니다.");
            });
        }}
      >
        Post Your Answer
      </PostButtonStyle>
    </div>
  );
}
export default QuestionDetail;
