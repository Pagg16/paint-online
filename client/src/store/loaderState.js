import { makeAutoObservable } from "mobx";

class loaderState {
  onVisible = true;
  constructor() {
    makeAutoObservable(this);
  }

  setVisible(visible) {
    this.onVisible = visible;
  }
}

export default loaderState = new loaderState();
