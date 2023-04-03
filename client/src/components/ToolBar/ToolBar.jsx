import React, { useRef } from "react";
import "./toolBar.scss";
import brush from "../../images/brush.png";
import rect from "../../images/rect.png";
import circle from "../../images/circle.png";
import eraser from "../../images/eraser.png";
import line from "../../images/line.png";
import arrow from "../../images/arrow.png";
import save from "../../images/save.png";
import ellipse from "../../images/ellipse.png";
import triangle from "../../images/triangle.png";
import toolState from "../../store/toolState";
import rest from "../../images/rest.png";
import Brush from "../tools/Brush";
import canvasState from "../../store/canvasState";
import Rect from "../tools/Rect";
import Circle from "../tools/Сircle";
import Eraser from "../tools/Eraser";
import Line from "../tools/Line";
import Triangle from "../tools/Triangle";
import { useParams } from "react-router-dom";
import Ellipse from "../tools/Ellipse";

function ToolBar() {
  const { id } = useParams();

  const previousSelected = useRef(null);

  function checkedBts(e) {
    previousSelected.current.classList.remove("toolBar__btn_checked");
    previousSelected.current = e.currentTarget;
    e.currentTarget.classList.add("toolBar__btn_checked");
  }

  function download() {
    const dataUrl = canvasState.canvas.toDataURL();
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = canvasState.sessionid + ".jpg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <div className="toolBar">
      <div className="toolBar__btn-container">
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
        <button className="toolBar__btn" onClick={download}>
          <img className="toolBar__btn-image" src={save} alt="brush-icon" />
        </button>
      </div>

      <button
        className="toolBar__btn toolBar__btn_checked"
        ref={previousSelected}
        onClick={(e) => {
          checkedBts(e);
          toolState.setTool(
            new Brush(
              canvasState.canvas,
              canvasState.socket,
              canvasState.sessionid
            )
          );
        }}
      >
        <img className="toolBar__btn-image" src={brush} alt="brush-icon" />
      </button>
      <button
        className="toolBar__btn"
        onClick={(e) => {
          checkedBts(e);
          toolState.setTool(
            new Rect(
              canvasState.canvas,
              canvasState.socket,
              canvasState.sessionid
            )
          );
        }}
      >
        <img className="toolBar__btn-image" src={rect} alt="brush-icon" />
      </button>
      <button
        className="toolBar__btn"
        onClick={(e) => {
          checkedBts(e);
          toolState.setTool(
            new Circle(
              canvasState.canvas,
              canvasState.socket,
              canvasState.sessionid
            )
          );
        }}
      >
        <img className="toolBar__btn-image" src={circle} alt="brush-icon" />
      </button>
      <button
        className="toolBar__btn"
        onClick={(e) => {
          checkedBts(e);
          toolState.setTool(
            new Eraser(
              canvasState.canvas,
              canvasState.socket,
              canvasState.sessionid
            )
          );
        }}
      >
        <img className="toolBar__btn-image" src={eraser} alt="brush-icon" />
      </button>
      <button
        className="toolBar__btn"
        onClick={(e) => {
          checkedBts(e);
          toolState.setTool(
            new Line(
              canvasState.canvas,
              canvasState.socket,
              canvasState.sessionid
            )
          );
        }}
      >
        <img className="toolBar__btn-image" src={line} alt="brush-icon" />
      </button>

      <button
        className="toolBar__btn"
        onClick={(e) => {
          checkedBts(e);
          toolState.setTool(
            new Ellipse(
              canvasState.canvas,
              canvasState.socket,
              canvasState.sessionid
            )
          );
        }}
      >
        <img className="toolBar__btn-image" src={ellipse} alt="brush-icon" />
      </button>

      <button
        className="toolBar__btn"
        onClick={(e) => {
          checkedBts(e);
          toolState.setTool(
            new Triangle(
              canvasState.canvas,
              canvasState.socket,
              canvasState.sessionid
            )
          );
        }}
      >
        <img className="toolBar__btn-image" src={triangle} alt="brush-icon" />
      </button>

      <div className="toolBar__delimiter"></div>

      <button
        className="toolBar__clear-bts"
        onClick={() => {
          canvasState.socket.send(
            JSON.stringify({
              method: "rest",
              id: id,
            })
          );
        }}
      >
        <img src={rest} alt="rest-icon" className="toolBar__rest-icon" />
      </button>
    </div>
  );
}

export default ToolBar;
