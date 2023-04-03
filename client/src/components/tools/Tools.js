export default class Tools {
  constructor(canvas, socket, id) {
    this.canvas = canvas;
    this.socket = socket;
    this.id = id;
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

  lineDash(lineDash) {
    this.ctx.setLineDash(lineDash);
  }

  destroyEvents() {
    this.canvas.onmousemove = null;
    this.canvas.onmousedown = null;
    this.canvas.onmousedown = null;
  }
}
