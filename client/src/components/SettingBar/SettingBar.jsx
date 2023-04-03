import React, { useEffect, useRef, useState } from "react";
import canvasState from "../../store/canvasState";
import toolState from "../../store/toolState";
import CopyLink from "../CopyLink/CopyLink";
import "./settingBar.scss";

function SettingBar() {
  const [lineWidth, setlineWidth] = useState("1");
  const [isStrokeColor, setIsStrokeColor] = useState("black");

  const containerCanvCheck = useRef(null);
  const canvas = useRef(null);

  const checkbox = useRef(null);

  const lineTypes = [
    [],
    [3, 3],
    [10, 10],
    [20, 5],
    [15, 3, 3, 3],
    [20, 3, 3, 3, 3, 3, 3, 3],
    [12, 3, 3],
  ];

  useEffect(() => {
    const width = 260;
    containerCanvCheck.current.style.height = "150px";
    canvas.current.width = width;
    canvas.current.height = 100;
    canvas.current.style.height = "150px";
    canvas.current.style.width = width + "px";

    const ctx = canvas.current.getContext("2d");
    let y = 10;

    lineTypes.forEach((item) => {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "white";
      ctx.setLineDash(item);
      ctx.moveTo(25, y);
      ctx.lineTo(width, y);
      ctx.stroke();
      y += 14;
    });
  }, []);

  useEffect(() => {
    checkbox.current.checked = true;
  }, []);

  function checkboxChoice(e) {
    checkbox.current.checked = false;
    checkbox.current = e.currentTarget;
    e.currentTarget.checked = true;

    const dashedType = JSON.parse(e.target.value);

    let correction = 1;

    if (lineWidth >= 10 && lineWidth <= 60) {
      correction = correction * 2;
    }

    toolState.setLineDash(dashedType.map((elem) => elem * correction));
  }

  return (
    <div className="settingBar">
      <div className="settingBar__input-container">
        <label className="settingBar__inputLabel" htmlFor="line-width">
          Толщина
        </label>
        <span className="settingBar__width-line">{lineWidth}</span>
        <input
          className="settingBar__input-line-width"
          id="line-width"
          type="range"
          defaultValue={lineWidth}
          min={0}
          max={60}
          onChange={(e) => {
            if (e.target.value === "0") {
              setlineWidth("0");
              return toolState.setStrokeColor("rgba(0,0,0,0)");
            }
            if (!!lineWidth) {
              setlineWidth(e.target.value);
              toolState.setStrokeColor(isStrokeColor);
            }
            toolState.setLineWidth(e.target.value);
          }}
        />
      </div>

      <div className="settingBar__line-type">
        <label className="settingBar__inputLabel">Тип линии</label>

        <div
          className="settingBar__line-type-checkbox-canvas-continer"
          ref={containerCanvCheck}
        >
          <div className="settingBar__line-type-checkbox">
            <input
              type="checkbox"
              ref={checkbox}
              value={`[${lineTypes[0]}]`}
              onChange={(e) => checkboxChoice(e)}
              className="settingBar__line-type-checkbox-input"
            ></input>
            <input
              type="checkbox"
              value={`[${lineTypes[1]}]`}
              onChange={(e) => checkboxChoice(e)}
              className="settingBar__line-type-checkbox-input"
            ></input>
            <input
              type="checkbox"
              value={`[${lineTypes[2]}]`}
              onChange={(e) => checkboxChoice(e)}
              className="settingBar__line-type-checkbox-input"
            ></input>
            <input
              type="checkbox"
              value={`[${lineTypes[3]}]`}
              onChange={(e) => checkboxChoice(e)}
              className="settingBar__line-type-checkbox-input"
            ></input>
            <input
              type="checkbox"
              value={`[${lineTypes[4]}]`}
              onChange={(e) => checkboxChoice(e)}
              className="settingBar__line-type-checkbox-input"
            ></input>
            <input
              type="checkbox"
              value={`[${lineTypes[5]}]`}
              onChange={(e) => checkboxChoice(e)}
              className="settingBar__line-type-checkbox-input"
            ></input>
            <input
              type="checkbox"
              value={`[${lineTypes[6]}]`}
              onChange={(e) => checkboxChoice(e)}
              className="settingBar__line-type-checkbox-input"
            ></input>
          </div>
          <div className="settingBar__line-type-canvas-container">
            <canvas className="settingBar__canvas" ref={canvas}></canvas>
          </div>
        </div>
      </div>

      <div className="settingBar__input-container">
        <label className="settingBar__inputLabel" htmlFor="stroke-color">
          Цвет обводки
        </label>
        <input
          className="settingBar__input-color"
          id="stroke-color"
          type="color"
          onChange={(e) => {
            setIsStrokeColor(e.target.value);
            if (!!lineWidth) toolState.setStrokeColor(e.target.value);
          }}
        />
      </div>

      <div className="settingBar__input-container">
        <label className="settingBar__inputLabel" htmlFor="fill-color">
          Цвет заливки
        </label>
        <input
          onChange={(e) => {
            toolState.setFillColor(e.target.value);
          }}
          type="color"
          className="settingBar__input-color"
          id="fill-color"
        />
      </div>
      <CopyLink />
    </div>
  );
}

export default SettingBar;
