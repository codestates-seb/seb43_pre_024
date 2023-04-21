import MDEditor from '@uiw/react-md-editor';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function QuestionInfo({ questionId }) {
  const navigate = useNavigate();
  const QuestionButtonStyle = styled.button`
    display: flex;
    align-items: center;
    width: 120px;
    height: 40px;
    border: none;
    background-color: #5594fc;
    color: white;
    padding: 10px 20px;
    margin-left: 50px;
    border-radius: 5px;
    :hover {
      background-color: #3b7ddd;
      cursor: pointer;
    }
  `;

  const HeartButtonStyle = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    .heartButton {
      border: 1px solid red;
    }
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

  function heartChangeButton() {
    console.log('heartChangeButton');
    console.log('heartChangeButton');
  }

  return (
    <>
      <div style={{ display: 'flex', gap: 30, alignItems: 'center' }}>
        <h2>{data.title}</h2>
        <HeartButtonStyle>
          <div onClick={() => heartChangeButton}>♡</div>
          <FontAwesomeIcon icon={faHeart} style={{ color: 'red' }} />
        </HeartButtonStyle>
        <QuestionButtonStyle
          type="button"
          onClick={() => navigate('/new-question')}
        >
          Ask Question
        </QuestionButtonStyle>
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
              borderRadius: 5,
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
