import Tools from "./Tools";

export default class Rect extends Tools {
  constructor(canvas) {
    super(canvas);
    this.listen();
  }

  listen() {
    this.canvas.onmousemove = this.mouseMovehandler.bind(this);
    this.canvas.onmousedown = this.mouseDownhandler.bind(this);
    this.canvas.onmouseup = this.mouseUphandler.bind(this);
  }

  mouseUphandler(e) {
    this.mouseDown = false;
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
      let currentX = e.pageX - e.target.offsetLeft;
      let currentY = e.pageY - e.target.offsetTop;
      let width = currentX - this.startX;
      let height = currentY - this.stertY;
      this.draw(this.startX, this.stertY, width, height);
    }
  }

  draw(x, y, w, h) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.rect(x, y, w, h);
      this.ctx.fill();
      this.ctx.stroke();
    };
    this.ctx.rect(x, y, w, h);
    this.ctx.fill();
    this.ctx.stroke();
  }
}
