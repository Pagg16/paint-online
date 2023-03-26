import React, { useState } from "react";
import toolState from "../../store/toolState";
import "./settingBar.scss";

function SettingBar() {
  const [isLineWidth, setIsLineWidth] = useState(false);
  const [isStrokeColor, setIsStrokeColor] = useState("");

  return (
    <div className="settingBar">
      <label htmlFor="line-width">Толщина</label>
      <input
        className="settingBar__input-line-width"
        id="line-width"
        type="number"
        defaultValue={1}
        min={0}
        max={60}
        onChange={(e) => {
          if (e.target.value === "0") {
            setIsLineWidth(true);
            return toolState.setStrokeColor("rgba(0,0,0,0)");
          }
          if (isLineWidth) {
            setIsLineWidth(false);
            toolState.setStrokeColor(isStrokeColor);
          }
          toolState.setLineWidth(e.target.value);
        }}
      />

      <label htmlFor="stroke-color">Цвет обводки</label>
      <input
        className="settingBar__input-line-width"
        id="stroke-color"
        type="color"
        onChange={(e) => {
          setIsStrokeColor(e.target.value);
          if (!isLineWidth) toolState.setStrokeColor(e.target.value);
        }}
      />
    </div>
  );
}

export default SettingBar;
