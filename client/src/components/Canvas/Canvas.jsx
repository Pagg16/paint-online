import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import "./canvas.scss";
import canvasState from "../../store/canvasState";
import toolState from "../../store/toolState";
import Brush from "../tools/Brush";
import { useParams } from "react-router-dom";
import Rect from "../tools/Rect";
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
import Ellipse from "../tools/Ellipse";

const Canvas = observer(() => {
  const canvasRef = useRef(null);
  const loop = useRef(true);
  const brushLoop = useRef(true);
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
    if (loop.current) {
      loop.current = false;
      return;
    }
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
            if (figure.type !== "finish") {
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

              if (figure.type === "brush") {
                if (brushLoop.current) {
                  brushLoop.current = false;
                  canvasState.pushToUndoList(canvas.toDataURL());
                }
              } else {
                canvasState.pushToUndoList(canvas.toDataURL());
              }
            } else {
              brushLoop.current = true;
            }

            drawHandler(figure, ctx, canvas);

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

          case "undo":
            canvasState.undo();
            break;

          case "redo":
            canvasState.redo();
            break;

          default:
            break;
        }
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  function restCanvas(canvas) {
    canvasState.pushToUndoList(canvas.toDataURL());
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    postImage(id, canvasState.canvas.toDataURL()).catch((e) => console.log(e));
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
        Triangle.staticDraw(
          ctx,
          figure.previosStartX,
          figure.previosStartY,
          figure.previosCurrentX,
          figure.previosCurrentY,
          figure.currentX,
          figure.currentY
        );
        break;

      case "ellipse":
        Ellipse.staticDraw(
          ctx,
          figure.x,
          figure.y,
          figure.radiusX,
          figure.radiusY,
          figure.corner
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
    postImage(id, canvasState.canvas.toDataURL()).catch((e) => console.log(e));
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
