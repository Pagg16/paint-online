import React, { useRef } from "react";
import "./toolBar.scss";
import brush from "../../images/brush.png";
import rect from "../../images/rect.png";
import circle from "../../images/circle.png";
import eraser from "../../images/eraser.png";
import line from "../../images/line.png";
import arrow from "../../images/arrow.png";
import save from "../../images/save.png";
import toolState from "../../store/toolState";
import Brush from "../tools/Brush";
import canvasState from "../../store/canvasState";
import Rect from "../tools/Rect";
import Circle from "../tools/Сircle";
import Eraser from "../tools/Eraser";
import Line from "../tools/Line";

function ToolBar() {
  const checkedArr = useRef(null);

  function changeClolor(e) {
    toolState.setStrokeColor(e.target.value);
    toolState.setFillColor(e.target.value);
  }

  function checkedBts(e) {
    if (!!checkedArr.current) {
      checkedArr.current.classList.remove("toolBar__btn_checked");
    }
    checkedArr.current = e.currentTarget;
    e.currentTarget.classList.add("toolBar__btn_checked");
  }

  return (
    <div className="toolBar">
      <button
        className="toolBar__btn"
        onClick={(e) => {
          checkedBts(e);
          toolState.setTool(new Brush(canvasState.canvas));
        }}
      >
        <img className="toolBar__btn-image" src={brush} alt="brush-icon" />
      </button>
      <button
        className="toolBar__btn"
        onClick={(e) => {
          checkedBts(e);
          toolState.setTool(new Rect(canvasState.canvas));
        }}
      >
        <img className="toolBar__btn-image" src={rect} alt="brush-icon" />
      </button>
      <button
        className="toolBar__btn"
        onClick={(e) => {
          checkedBts(e);
          toolState.setTool(new Circle(canvasState.canvas));
        }}
      >
        <img className="toolBar__btn-image" src={circle} alt="brush-icon" />
      </button>
      <button
        className="toolBar__btn"
        onClick={(e) => {
          checkedBts(e);
          toolState.setTool(new Eraser(canvasState.canvas));
        }}
      >
        <img className="toolBar__btn-image" src={eraser} alt="brush-icon" />
      </button>
      <button
        className="toolBar__btn"
        onClick={(e) => {
          checkedBts(e);
          toolState.setTool(new Line(canvasState.canvas));
        }}
      >
        <img className="toolBar__btn-image" src={line} alt="brush-icon" />
      </button>

      <input
        onChange={(e) => changeClolor(e)}
        type="color"
        className="toolBar__input-color"
      />

      <button
        className="toolBar__btn toolBar__btn_rights"
        onClick={() => canvasState.undo()}
      >
        <img className="toolBar__btn-image" src={arrow} alt="brush-icon" />
      </button>
      <button
        className="toolBar__btn toolBar__btn_arrow-redo"
        onClick={() => canvasState.redo()}
      >
        <img className="toolBar__btn-image" src={arrow} alt="brush-icon" />
      </button>
      <button className="toolBar__btn">
        <img className="toolBar__btn-image" src={save} alt="brush-icon" />
      </button>
    </div>
  );
}

export default ToolBar;
