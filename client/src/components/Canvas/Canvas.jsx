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
import { getImage, postImage } from "../../api/api";
import {
  createSoket,
  onmessageSocket,
  onopenSocket,
} from "../../socket/socketCreate";
import Triangle from "../tools/Triangle";

const Canvas = observer(() => {
  const canvasRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({
    width: 0,
    height: 0,
  });

  const canvasBlock = useRef(null);
  const { id } = useParams();

  const ctxStyleUser = useRef({});

  useEffect(() => {
    const style = getComputedStyle(canvasBlock.current);
    setCanvasSize({
      width: +style.width.replace("px", ""),
      height: +style.height.replace("px", ""),
    });
  }, []);

  useEffect(() => {
    canvasState.setCanvas(canvasRef?.current);
    getImage(id).then((res) => {
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

  useEffect(() => {
    if (!!!canvasState.userName) {
      try {
        const socket = createSoket();
        canvasState.setSocket(socket);
        canvasState.setSessionId(id);
        toolState.setTool(new Brush(canvasRef.current, socket, id));
        onopenSocket(socket, () => {
          console.log("Подключение установлено");
          socket.send(
            JSON.stringify({
              id: id,
              username: canvasState.userName,
              method: "connection",
            })
          );
        });
        onmessageSocket(socket, (e) => {
          const msg = JSON.parse(e.data);
          const figure = msg.figure;
          const canvas = canvasRef.current;
          const ctx = canvas.getContext("2d");

          switch (msg.method) {
            case "connection":
              console.log(`пользователь ${msg.username} подключен`);
              break;

            case "draw":
              const { lineDash, lineWidth, strokeColor, fillColor } = figure;

              ctxStyleUser.current = {
                lineDashUser: JSON.parse(
                  JSON.stringify(toolState.lineDashType)
                ),
                lineWidthUser: ctx.lineWidth,
                strokeColorUser: ctx.strokeStyle,
                fillColorUser: ctx.fillStyle,
              };

              setStyleCtx(lineDash, lineWidth, strokeColor, fillColor, ctx);
              drawHandler(figure, ctx);
              const {
                lineDashUser,
                lineWidthUser,
                strokeColorUser,
                fillColorUser,
              } = ctxStyleUser.current;

              setStyleCtx(
                lineDashUser,
                lineWidthUser,
                strokeColorUser,
                fillColorUser,
                ctx
              );
              break;

            case "rest":
              restCanvas(canvas);
              break;

            default:
              break;
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
  }, [canvasState.userName]);

  function restCanvas(canvas) {
    canvasState.pushToUndoList(canvas.toDataURL());
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    postImage(id).catch((e) => console.log(e));
  }

  function setStyleCtx(lineDash, lineWidth, strokeColor, fillColor, ctx) {
    ctx.setLineDash(lineDash || []);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeColor;
    ctx.fillStyle = fillColor;
  }

  function drawHandler(figure, ctx) {
    switch (figure.type) {
      case "brush":
        Brush.draw(ctx, figure.x, figure.y);
        break;

      case "rect":
        Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height);
        break;

      case "circle":
        Circle.staticDraw(ctx, figure.x, figure.y, figure.radius);
        break;

      case "line":
        Line.staticDraw(
          ctx,
          figure.x,
          figure.y,
          figure.currentX,
          figure.currentY
        );
        break;

      case "eraser":
        Eraser.draw(ctx, figure.x, figure.y);
        break;

      case "triangle":
        const {
          previosStartX,
          previosStartY,
          previosCurrentX,
          previosCurrentY,
          currentX,
          currentY,
        } = figure;

        Triangle.staticDraw(
          ctx,
          previosStartX,
          previosStartY,
          previosCurrentX,
          previosCurrentY,
          currentX,
          currentY
        );
        break;

      case "finish":
        ctx.beginPath();
        break;

      default:
        break;
    }
  }

  function mouseUpHandler() {
    canvasState.pushToUndoList(canvasRef?.current.toDataURL());
    postImage(id).catch((e) => console.log(e));
  }

  return (
    <div className="canvas" ref={canvasBlock}>
      <canvas
        onMouseUp={() => mouseUpHandler()}
        ref={canvasRef}
        className="canvas__gtx"
        width={canvasSize.width}
        height={canvasSize.height}
      ></canvas>
    </div>
  );
});

export default Canvas;
