import toolState from "../../store/toolState";
import Tools from "./Tools";

export default class Triangle extends Tools {
  constructor(canvas, socket, id) {
    super(canvas, socket, id);
    this.mouseClickNum = 0;
    this.transparentStroke = false;
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
              type: "triangle",
              currentX: this.currentX,
              currentY: this.currentY,
              previosStartX: this.previosStartX,
              previosStartY: this.previosStartY,
              previosCurrentX: this.previosCurrentX,
              previosCurrentY: this.previosCurrentY,
              strokeColor: this.ctx.strokeStyle,
              fillColor: this.ctx.fillStyle,
              lineDash: toolState.lineDashType,
              lineWidth: this.ctx.lineWidth,
            },
          })
        );
      };
    }
    if (this.transparentStroke) {
      this.ctx.lineWidth = "0";
      this.ctx.strokeStyle = "rgba(0, 0, 0, 0)";
      this.transparentStroke = false;
    }
  }

  mouseDownhandler(e) {
    this.mouseDown = true;
    this.startX = e.pageX - e.target.offsetLeft;
    this.stertY = e.pageY - e.target.offsetTop;

    if (this.mouseClickNum === 0) {
      this.previosStartX = this.startX;
      this.previosStartY = this.stertY;

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
        this.previosCurrentX = this.currentX;
        this.previosCurrentY = this.currentY;
      }
      this.draw();
    }
  }

  draw() {
    const img = new Image();
    img.src = this.saved;
    if (this.mouseClickNum >= 1) {
      img.onload = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.moveTo(this.previosStartX, this.previosStartY);
        this.ctx.lineTo(this.previosCurrentX, this.previosCurrentY);
        this.ctx.lineTo(this.currentX, this.currentY);
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.fill();
      };
    } else {
      img.onload = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, this.stertY);
        this.ctx.lineTo(this.currentX, this.currentY);
        this.ctx.fill();
        this.ctx.stroke();
      };
    }
  }

  static staticDraw(
    ctx,
    previosStartX,
    previosStartY,
    previosCurrentX,
    previosCurrentY,
    currentX,
    currentY
  ) {
    ctx.beginPath();
    ctx.moveTo(previosStartX, previosStartY);
    ctx.lineTo(previosCurrentX, previosCurrentY);
    ctx.lineTo(currentX, currentY);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.beginPath();
  }
}
