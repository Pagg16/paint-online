import React, { useState } from "react";
import canvasState from "../../store/canvasState";
import "./singInModal.scss";

function SingInModal() {
  const [inputValue, setInputValue] = useState("");
  const [modalShow, setModelShow] = useState(true);

  return (
    <div className={`singInModal ${modalShow ? "singInModal_visible" : ""}`}>
      <div className="singInModal__form">
        {/* <button
          className="singInModal__bts-close"
          onClick={() => setModelShow(false)}
        >
          X
        </button> */}
        <input
          value={inputValue}
          className="singInModal__input"
          type="text"
          placeholder="name"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          onClick={() => {
            canvasState.setUserName(inputValue);
            setModelShow(false);
          }}
          className="singInModal__bts-singIn"
        >
          Войти
        </button>
      </div>
    </div>
  );
}

export default SingInModal;
