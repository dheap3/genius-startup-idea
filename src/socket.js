export function connectSocket(onMessage) {
  const protocol = window.location.protocol === "https:" ? "wss" : "ws";
  const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

  socket.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    onMessage(msg);
  };

  return socket;
}
