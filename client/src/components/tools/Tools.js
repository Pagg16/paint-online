export default class Tools {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.destroyEvents();
  }

  destroyEvents() {
    this.canvas.onmousemove = null;
    this.canvas.onmousedown = null;
    this.canvas.onmousedown = null;
  }
}
