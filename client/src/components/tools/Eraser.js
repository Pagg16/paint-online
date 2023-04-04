import Brush from "./Brush";

export default class Eraser extends Brush {
  constructor(canvas, socket, id) {
    super(canvas, socket, id);
  }

  mouseMovehandler(e) {
    if (this.mouseDown) {
      this.socket.send(
        JSON.stringify({
          method: "draw",
          id: this.id,
          figure: {
            type: "eraser",
            x: e.pageX - e.target.offsetLeft,
            y: e.pageY - e.target.offsetTop,
            color: this.ctx.strokeStyle,
            lineWidth: this.ctx.lineWidth,
          },
        })
      );
    }
  }

  static draw(ctx, x, y) {
    ctx.lineTo(x, y);
    ctx.strokeStyle = "#fff";
    ctx.stroke();
  }
}
