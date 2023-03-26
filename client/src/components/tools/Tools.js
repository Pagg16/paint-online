export default class Tools {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.destroyEvents();
  }

  fillColor(color) {
    this.ctx.fillStyle = color;
  }

  strokeColor(color) {
    this.ctx.strokeStyle = color;
  }

  lineWidth(width) {
    this.ctx.lineWidth = width;
  }

  destroyEvents() {
    this.canvas.onmousemove = null;
    this.canvas.onmousedown = null;
    this.canvas.onmousedown = null;
  }
}
