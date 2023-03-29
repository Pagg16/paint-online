import Tools from "./Tools";

export default class Triangle extends Tools {
  constructor(canvas, socket, id) {
    super(canvas, socket, id);
    this.mouseClickNum = 0;
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
    }
  }

  mouseDownhandler(e) {
    this.mouseDown = true;
    this.startX = e.pageX - e.target.offsetLeft;
    this.stertY = e.pageY - e.target.offsetTop;

    if (this.mouseClickNum === 0) {
      this.previosStartX = this.startX;
      this.previosStartY = this.stertY;
    }

    this.saved = this.canvas.toDataURL();
  }

  mouseMovehandler(e) {
    if (this.mouseDown) {
      let currentX = e.pageX - e.target.offsetLeft;
      let currentY = e.pageY - e.target.offsetTop;

      if (this.mouseClickNum === 0) {
        this.previosCurrentX = currentX;
        this.previosCurrentY = currentY;
      }

      this.draw(currentX, currentY);
    }
  }

  draw(x, y) {
    const img = new Image();
    img.src = this.saved;

    if (this.mouseClickNum >= 1) {
      img.onload = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, this.stertY);
        this.ctx.lineTo(x, y);
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.moveTo(this.previosStartX, this.previosStartY);
        this.ctx.lineTo(this.previosCurrentX, this.previosCurrentY);
        this.ctx.lineTo(x, y);
        this.ctx.fill();
      };
    } else {
      img.onload = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, this.stertY);
        this.ctx.lineTo(x, y);
        this.ctx.fill();
        this.ctx.stroke();
      };
    }
  }

  static staticDraw(ctx, x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fill();
    ctx.stroke();
  }
}
