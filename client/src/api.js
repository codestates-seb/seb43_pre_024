import axios from "axios";

export const API_URL =
  "http://ec2-43-200-3-23.ap-northeast-2.compute.amazonaws.com:8080";

export function fetchAnswerInfo({ questionId }) {
  return axios
    .get(`${API_URL}/questions/${questionId}`)
    .then(function (response) {
      // 성공 핸들링
      console.log(response);
      console.log(response.data);
      return response.data.answers;
    })
    .catch(function (error) {
      // 에러 핸들링
      console.log(error);
      return [
        {
          AnswerId: 14,
          title: "답변입니다",
          content:
            "```javascript\n const a = 235242; const b = 7654345\n console.log(a);\nconsole.log(b)\n```",
          name: "김미리",
          likes: "140",
          answer_cnt: "8",
          views: "64",
          created_at: "2023-04-18 18:52",
          accepted_answer: true,
        },
        {
          AnswerId: 14,
          title: "저도 답변 하나 추가요",
          content:
            "good~~  hihi~~\n ```javascript\n const a = 123124; \nconst b = 43252314\n console.log(a);\nconsole.log(b)\n```",
          name: "오다경",
          likes: "183",
          answer_cnt: "8",
          views: "74",
          created_at: "2023-04-18 18:52",
          accepted_answer: true,
        },
      ];
    });
}

export function addLike({ questionId }) {
  return axios.post(`${API_URL}/questions/${questionId}/like`);
}
