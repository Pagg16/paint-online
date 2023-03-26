import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import "./canvas.scss";
import canvasState from "../../store/canvasState";
import toolState from "../../store/toolState";
import Brush from "../tools/Brush";
import { useParams } from "react-router-dom";

const Canvas = observer(() => {
  const canvasRef = useRef(null);

  const { id } = useParams();

  console.log(id);

  useEffect(() => {
    canvasState.setCanvas(canvasRef?.current);
    toolState.setTool(new Brush(canvasRef?.current));
  }, []);

  function mouseDovnHandler() {
    canvasState.pushToUndoList(canvasRef?.current.toDataURL());
  }

  useEffect(() => {
    if (!!canvasState.userName) {
      const socket = new WebSocket("ws:/localhost:5000/");
      socket.onopen = () => {
        console.log("Подключение установлено");
        socket.send(
          JSON.stringify({
            id: id,
            username: canvasState.userName,
            metod: "connection",
          })
        );
      };
    }
  }, [canvasState.userName]);

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
