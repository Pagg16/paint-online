import React from "react";
import "./toolBar.scss";
import brush from "../../images/brush.png";
import rect from "../../images/rect.png";
import circle from "../../images/circle.png";
import eraser from "../../images/eraser.png";
import line from "../../images/line.png";
import arrow from "../../images/arrow.png";
import save from "../../images/save.png";

function ToolBar() {
  return (
    <div className="toolBar">
      <button className="toolBar__btn">
        <img className="toolBar__btn-image" src={brush} alt="brush-icon" />
      </button>
      <button className="toolBar__btn">
        <img className="toolBar__btn-image" src={rect} alt="brush-icon" />
      </button>
      <button className="toolBar__btn">
        <img className="toolBar__btn-image" src={circle} alt="brush-icon" />
      </button>
      <button className="toolBar__btn">
        <img className="toolBar__btn-image" src={eraser} alt="brush-icon" />
      </button>
      <button className="toolBar__btn">
        <img className="toolBar__btn-image" src={line} alt="brush-icon" />
      </button>
      <input type="color" className="toolBar__input-color" />

      <button className="toolBar__btn toolBar__btn_rights">
        <img className="toolBar__btn-image" src={arrow} alt="brush-icon" />
      </button>
      <button className="toolBar__btn toolBar__btn_arrow-redo">
        <img className="toolBar__btn-image" src={arrow} alt="brush-icon" />
      </button>
      <button className="toolBar__btn">
        <img className="toolBar__btn-image" src={save} alt="brush-icon" />
      </button>
    </div>
  );
}

export default ToolBar;
