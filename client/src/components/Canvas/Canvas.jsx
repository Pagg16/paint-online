import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import "./canvas.scss";
import canvasState from "../../store/canvasState";
import toolState from "../../store/toolState";
import Brush from "../tools/Brush";
import { useParams } from "react-router-dom";
import Rect from "../tools/Rect";
import axios from "axios";
import Circle from "../tools/Сircle";
import Line from "../tools/Line";
import Eraser from "../tools/Eraser";

const Canvas = observer(() => {
  const canvasRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({
    width: 0,
    height: 0,
  });

  const canvasBlock = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.ellipse(100, 100, 50, 70, Math.PI / 4, 0, 2 * Math.PI);
    ctx.stroke();
    const style = getComputedStyle(canvasBlock.current);
    setCanvasSize({
      width: +style.width.replace("px", ""),
      height: +style.height.replace("px", ""),
    });
  }, []);

  useEffect(() => {
    canvasState.setCanvas(canvasRef?.current);
    axios.get(`http://localhost:5000/image?id=${id}`).then((res) => {
      const ctx = canvasRef.current.getContext("2d");
      const img = new Image();
      img.src = res.data;
      img.onload = () => {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(
          img,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
      };
    });
  }, []);

  function mouseDovnHandler() {
    canvasState.pushToUndoList(canvasRef?.current.toDataURL());

    axios.post(`http://localhost:5000/image?id=${id}`, {
      img: canvasState.canvas.toDataURL(),
    });
  }

  useEffect(() => {
    if (!!canvasState.userName) {
      try {
        const socket = new WebSocket("ws:/localhost:5000/");
        canvasState.setSocket(socket);
        canvasState.setSessionId(id);
        toolState.setTool(
          new Brush(
            canvasState.canvas,
            canvasState.socket,
            canvasState.sessionid
          )
        );
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

    if (figure.type !== "finish") ctx.setLineDash(figure.lineDash);

    switch (figure.type) {
      case "brush":
        Brush.draw(ctx, figure.x, figure.y, figure.color);
        break;

      case "rect":
        Rect.staticDraw(
          ctx,
          figure.x,
          figure.y,
          figure.width,
          figure.height,
          figure.color
        );
        break;

      case "circle":
        Circle.staticDraw(ctx, figure.x, figure.y, figure.radius, figure.color);
        break;

      case "line":
        Line.staticDraw(
          ctx,
          figure.x,
          figure.y,
          figure.currentX,
          figure.currentY,
          figure.color
        );
        break;

      case "eraser":
        Eraser.draw(ctx, figure.x, figure.y);
        break;

      case "finish":
        ctx.beginPath();
        break;

      default:
        break;
    }
  }

  return (
    <div className="canvas" ref={canvasBlock}>
      <canvas
        onMouseUp={() => mouseDovnHandler()}
        ref={canvasRef}
        className="canvas__gtx"
        width={canvasSize.width}
        height={canvasSize.height}
      ></canvas>
    </div>
  );
});

export default Canvas;
