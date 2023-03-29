import { makeAutoObservable } from "mobx";

class ToolState {
  tool = null;
  constructor() {
    makeAutoObservable(this);
  }

  setTool(tool) {
    this.tool = tool;
  }
  setFillColor(color) {
    this.tool.fillColor(color);
  }
  setStrokeColor(color) {
    this.tool.strokeColor(color);
  }
  setLineWidth(width) {
    this.tool.lineWidth(width);
  }
  setLineDash(lineDash) {
    this.tool.lineDash(lineDash);
  }
}

export default ToolState = new ToolState();
