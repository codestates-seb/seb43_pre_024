import styled from 'styled-components';

const ConfirmStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ConfirmModal = styled.div`
  width: 400px;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  .confirm__message {
    font-size: 1.2rem;
    margin-bottom: 20px;
  }
  .confirm__buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  .confirm__button {
    width: 100px;
    height: 40px;
    border-radius: 5px;
    border: none;
    background-color: #0a95ff;
    color: #fff;
    :hover {
      cursor: pointer;
      background-color: #0055aa;
    }
    :active {
      background-color: #003366;
    }
  }
  .confirm__button--cancel {
    background-color: #fff;
    color: red;
    :hover {
      background-color: #fff2f2;
      color: #f00;
    }
    :active {
      background-color: #ffcccc;
      color: #c00;
    }
  }
`;

function Confirm({ message, onConfirm, onCancel }) {
  return (
    <ConfirmStyle>
      <ConfirmModal>
        <div className="confirm__message">{message}</div>
        <div className="confirm__buttons">
          <button
            className="confirm__button confirm__button--cancel"
            onClick={onCancel}
            type="button"
          >
            Cancel
          </button>
          <button
            className="confirm__button confirm__button--confirm"
            onClick={onConfirm}
            type="button"
          >
            Confirm
          </button>
        </div>
      </ConfirmModal>
    </ConfirmStyle>
  );
}

export default Confirm;
