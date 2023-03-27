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
  }, []);

  function mouseDovnHandler() {
    canvasState.pushToUndoList(canvasRef?.current.toDataURL());
  }

  useEffect(() => {
    if (!!canvasState.userName) {
      try {
        const socket = new WebSocket("ws:/localhost:5000/");
        canvasState.setSocket(socket);
        canvasState.setSessionId(id);
        toolState.setTool(new Brush(canvasRef?.current, socket, id));
        socket.onopen = () => {
          console.log("Подключение установлено");
          socket.send(
            JSON.stringify({
              id: id,
              username: canvasState.userName,
              method: "connection",
            })
          );
        };
        socket.onmessage = (e) => {
          const msg = JSON.parse(e.data);

          switch (msg.method) {
            case "connection":
              console.log(`пользователь ${msg.username} подключен`);
              break;

            case "draw":
              drawHandler(msg);
              break;

            default:
              break;
          }
        };
      } catch (e) {
        console.log(e);
      }
    }
  }, [canvasState.userName]);

  function drawHandler(msg) {
    const figure = msg.figure;
    const ctx = canvasRef.current.getContext("2d");
    switch (figure.type) {
      case "brush":
        Brush.draw(ctx, figure.x, figure.y);
        break;

      default:
        break;
    }
  }

  return (
    <div className="canvas">
      <canvas
        onMouseDown={() => mouseDovnHandler()}
        ref={canvasRef}
        className="canvas__gtx"
        width={800}
        height={700}
      ></canvas>
    </div>
  );
});

export default Canvas;
