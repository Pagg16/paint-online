import Tools from "./Tools";

export default class Line extends Tools {
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

      this.draw(currentX, currentY);
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
}
