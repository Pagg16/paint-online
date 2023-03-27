import { makeAutoObservable } from "mobx";

class CanvasState {
  canvas = null;
  undoList = [];
  redoList = [];
  userName = "";
  socket = null;
  sessionid = null;

  constructor() {
    makeAutoObservable(this);
  }

  setSocket(socket) {
    this.socket = socket;
  }

  setSessionId(id) {
    this.sessionid = id;
  }

  setUserName(name) {
    this.userName = name;
  }

  setCanvas(canvas) {
    this.canvas = canvas;
  }

  pushToUndoList(data) {
    this.undoList.push(data);
  }

  pushToRedoList(data) {
    this.redoList.push(data);
  }

  undo() {
    const ctx = this.canvas.getContext("2d");
    if (this.undoList.length > 0) {
      const dataUrl = this.undoList.pop();
      this.redoList.push(this.canvas.toDataURL());
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      };
    } else {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  redo() {
    const ctx = this.canvas.getContext("2d");
    if (this.redoList.length > 0) {
      const dataUrl = this.redoList.pop();
      this.undoList.push(this.canvas.toDataURL());
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      };
    }
  }
}

export default CanvasState = new CanvasState();
