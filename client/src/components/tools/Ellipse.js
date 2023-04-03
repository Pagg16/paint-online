import toolState from "../../store/toolState";
import Tools from "./Tools";

export default class Ellipse extends Tools {
  constructor(canvas, socket, id) {
    super(canvas, socket, id);
    this.mouseClickNum = 0;
    this.corner = 0;
    this.isHorizontal = true;
    this.listen();
  }

  listen() {
    this.canvas.onmousemove = this.mouseMovehandler.bind(this);
    this.canvas.onmousedown = this.mouseDownhandler.bind(this);
    this.canvas.onmouseup = this.mouseUphandler.bind(this);
  }

  mouseUphandler() {
    this.mouseClickNum += 1;
    if (this.mouseClickNum >= 2) {
      this.mouseDown = false;
      this.mouseClickNum = 0;
      this.isHorizontal = true;
      const img = new Image();
      img.src = this.saved;
      img.onload = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);

        this.socket.send(
          JSON.stringify({
            method: "draw",
            id: this.id,
            figure: {
              type: "ellipse",
              x: this.startX,
              y: this.startY,
              radiusX: this.radiusX,
              radiusY: this.radiusY,
              corner: this.corner,
              strokeColor: this.ctx.strokeStyle,
              fillColor: this.ctx.fillStyle,
              lineDash: toolState.lineDashType,
              lineWidth: this.ctx.lineWidth,
            },
          })
        );

        this.corner = 0;
      };
    }
  }

  mouseDownhandler(e) {
    this.mouseDown = true;
    if (this.mouseClickNum === 0) {
      this.startX = e.pageX - e.target.offsetLeft;
      this.startY = e.pageY - e.target.offsetTop;
      this.saved = this.canvas.toDataURL();
    }
  }

  mouseMovehandler(e) {
    if (this.mouseDown) {
      this.currentX = e.pageX - e.target.offsetLeft;
      this.currentY = e.pageY - e.target.offsetTop;

      if (this.mouseClickNum === 0) {
        this.radiusX = Math.abs(this.startX - this.currentX);
        this.radiusY = Math.abs(this.startY - this.currentY);
      } else {
        const catetA = this.startX - this.currentX;
        const catetB = this.startY - this.currentY;
        this.corner = Math.atan(catetB / catetA);

        if (this.isHorizontal) {
          this.corner = 0;
          this.isHorizontal = false;
        }
      }

      this.draw();
    }
  }

  draw() {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.ellipse(
        this.startX,
        this.startY,
        this.radiusX,
        this.radiusY,
        this.corner,
        0,
        2 * Math.PI
      );
      this.ctx.stroke();
      this.ctx.fill();
    };
  }

  static staticDraw(ctx, x, y, radiusX, radiusY, corner) {
    ctx.beginPath();
    ctx.ellipse(x, y, radiusX, radiusY, corner, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
  }
}
