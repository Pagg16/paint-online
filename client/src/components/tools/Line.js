import toolState from "../../store/toolState";
import Tools from "./Tools";

export default class Line extends Tools {
  constructor(canvas, socket, id) {
    super(canvas, socket, id);
    this.listen();
  }

  listen() {
    this.canvas.onmousemove = this.mouseMovehandler.bind(this);
    this.canvas.onmousedown = this.mouseDownhandler.bind(this);
    this.canvas.onmouseup = this.mouseUphandler.bind(this);
  }

  mouseUphandler(e) {
    this.mouseDown = false;
    const img = new Image();
    img.src = this.saved;
    console.log(this.saved);
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
    };
    this.socket.send(
      JSON.stringify({
        method: "draw",
        id: this.id,
        figure: {
          type: "line",
          x: this.startX,
          y: this.stertY,
          currentX: this.currentX,
          currentY: this.currentY,
          strokeColor: this.ctx.strokeStyle,
          fillColor: this.ctx.fillStyle,
          lineDash: toolState.lineDashType,
          lineWidth: this.ctx.lineWidth,
        },
      })
    );
  }

  mouseDownhandler(e) {
    this.mouseDown = true;
    this.ctx.beginPath();
    this.startX = e.pageX - e.target.offsetLeft;
    this.stertY = e.pageY - e.target.offsetTop;
    this.saved = this.canvas.toDataURL();
  }

  mouseMovehandler(e) {
    if (this.mouseDown) {
      this.currentX = e.pageX - e.target.offsetLeft;
      this.currentY = e.pageY - e.target.offsetTop;
      this.draw(this.currentX, this.currentY);
    }
  }

  draw(x, y) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.moveTo(this.startX, this.stertY);
      this.ctx.lineTo(x, y);
      this.ctx.fill();
      this.ctx.stroke();
    };
    this.ctx.moveTo(this.startX, this.stertY);
    this.ctx.lineTo(x, y);
    this.ctx.fill();
    this.ctx.stroke();
  }

  static staticDraw(ctx, x, y, currentX, currentY, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(currentX, currentY);
    ctx.fill();
    ctx.stroke();
  }
}
