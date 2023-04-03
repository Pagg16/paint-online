import Tools from "./Tools";

export default class Ellipse extends Tools {
  constructor(canvas, socket, id) {
    super(canvas, socket, id);
    this.mouseClickNum = 0;
    this.transparentStroke = false;
    this.corner = 0;
    this.listen();
  }

  listen() {
    this.canvas.onmousemove = this.mouseMovehandler.bind(this);
    this.canvas.onmousedown = this.mouseDownhandler.bind(this);
    this.canvas.onmouseup = this.mouseUphandler.bind(this);
  }

  mouseUphandler(e) {
    this.mouseClickNum += 1;
    if (this.mouseClickNum >= 2) {
      this.mouseDown = false;
      this.mouseClickNum = 0;
      this.corner = 0;
    }
    if (this.transparentStroke) {
      this.ctx.lineWidth = "0";
      this.ctx.strokeStyle = "rgba(0, 0, 0, 0)";
      this.transparentStroke = false;
    }
  }

  mouseDownhandler(e) {
    this.mouseDown = true;
    if (this.mouseClickNum === 0) {
      this.startX = e.pageX - e.target.offsetLeft;
      this.startY = e.pageY - e.target.offsetTop;
      if (this.ctx.strokeStyle === "rgba(0, 0, 0, 0)") {
        this.ctx.lineWidth = "1";
        this.ctx.strokeStyle = "black";
        this.transparentStroke = true;
      }
    }

    this.saved = this.canvas.toDataURL();
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

  static staticDraw(ctx, x, y, w, h, color) {
    // ctx.fillStyle = color;
    // ctx.beginPath();
    // ctx.rect(x, y, w, h);
    // ctx.fill();
    // ctx.stroke();
  }
}
