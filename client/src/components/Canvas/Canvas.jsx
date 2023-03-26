import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import "./canvas.scss";
import canvasState from "../../store/canvasState";
import toolState from "../../store/toolState";
import Brush from "../tools/Brush";

const Canvas = observer(() => {
  const canvasRef = useRef(null);
  useEffect(() => {
    canvasState.setCanvas(canvasRef?.current);
    toolState.setTool(new Brush(canvasRef?.current));
  }, []);

  function mouseDovnHandler() {
    canvasState.pushToUndoList(canvasRef?.current.toDataURL());
  }

  return (
    <div className="canvas">
      <canvas
        onMouseDown={() => mouseDovnHandler()}
        ref={canvasRef}
        className="canvas__gtx"
        width={600}
        height={400}
      ></canvas>
    </div>
  );
});

export default Canvas;
