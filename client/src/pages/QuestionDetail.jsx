import React from 'react';
import { useParams } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';

function QuestionDetail() {
  const { id } = useParams();
  console.log({ questionId: id });

  // TODO: API 연동
  const data = {
    questionId: 1,
    title:
      'Why is processing a sorted array faster than processing an unsorted array?',
    content:
      '## 질문이 있습니다.\n  - 이거 어떻게 쓰나요?\n - 테스트 메시지 입니다.\n - 아래 코드 참고하세요.\n ```javascript\n const a = 1;\n console.log(a);\n```',
    name: '김지은',
    likes: '0',
    answer_cnt: '2',
    views: '1',
    created_at: '2023-04-18 13:52',
    accepted_answer: true,
  };

  // TODO: API 연동
  const tags = ['javascript', 'react', 'java', 'python', 'c++'];

  return (
    <div>
      <div style={{ display: 'flex', gap: 30 }}>
        <h2>{data.title}</h2>
        <button type="button">Ask Question</button>
      </div>
      <MDEditor.Markdown source={data.content} />
      <div style={{ marginTop: 16 }}>
        {tags.map(tag => (
          <span
            style={{
              marginRight: 16,
              padding: 8,
              background: '#cef',
              color: '#57A',
              borderRadius: 4,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default QuestionDetail;
