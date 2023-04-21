import MDEditor from '@uiw/react-md-editor';
import styled from 'styled-components';

function QuestionInfo({ questionId }) {
  const QuestionButtonStyle = styled.button`
    width: 120px;
    height: 40px;
    border: none;
    background-color: #5594fc;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
  `;

  // TODO: API 연동
  const data = {
    questionId: 1,
    title:
      'Why is processing a sorted array faster than processing an unsorted array?',
    content:
      '\n I accidentally committed the wrong files to Git, but didn`\nt push the commit to the server yet. \n How do I undo those commits from the local repository?\n ```javascript\n const a = 1;\n console.log(a);\n```',
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
    <>
      <div style={{ display: 'flex', gap: 30, alignItems: 'center' }}>
        <h2>{data.title}</h2>
        <QuestionButtonStyle type="button">Ask Question</QuestionButtonStyle>
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
    </>
  );
}
export default QuestionInfo;
