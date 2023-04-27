import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import MDEditor from "@uiw/react-md-editor";
import AnswerList from "../components/AnswerList";
import QuestionInfo from "../components/QuestionInfo";

const DetailPageStyle = styled.div`
  width: 80%;
  align-items: left;
  padding-top: 50px;
  margin-left: 40px;
`;

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

function QuestionDetail() {
  const [questionDetailData, setQuestionDetailData] = useState({});

  const { id } = useParams();

  const URL = process.env.REACT_APP_FRONT;

  function fetchQuestionDetail() {
    fetch(`${process.env.REACT_APP_FRONT}/questions/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        setQuestionDetailData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchQuestionDetail();
  }, []);

  return (
    <DetailPageStyle>
      <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
        <QuestionInfo
          questionDetail={questionDetailData}
          fetchQuestionDetail={fetchQuestionDetail}
          questionId={id}
        />
        <AnswerList
          questionDetail={questionDetailData}
          fetchQuestionDetail={fetchQuestionDetail}
          questionId={id}
        />
        <NewAnswerInput questionId={id} />
      </div>
    </DetailPageStyle>
  );
}

function NewAnswerInput({ questionId }) {
  const [value, setValue] = useState("");
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
          const data = {
            email: "aaa@naver.com",
            content: value,
          };
          const token = localStorage.getItem("Authorization");
          fetch(`${process.env.REACT_APP_FRONT}/questions/answer`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then(function (response) {
              console.log(data);
              console.log(response);
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
