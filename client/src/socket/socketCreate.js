export function createSoket() {
  return new WebSocket("ws:/localhost:5000/");
}

export function onopenSocket(socket, fun) {
  socket.onopen = () => {
    fun();
  };
}

export function onmessageSocket(socket, fun) {
  socket.onmessage = (e) => {
    fun(e);
  };
}
