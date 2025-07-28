// receive/receiveSignal.js

const socket = new WebSocket('wss://wsserver-cngm.onrender.com');


socket.onopen = () => {
  console.log("📡 WebSocket подключён [панель]");
};

socket.onmessage = (event) => {
  console.log("📨 Получен сигнал:", event.data);
  if (event.data === "signal") {
    const playBtn = document.getElementById("playButton");
    if (playBtn) {
      playBtn.click(); // Автозапуск
      console.log("▶️ Нажата кнопка Play");
    } else {
      console.warn("❌ Кнопка Play не найдена на панели");
    }
  }
};

socket.onerror = (e) => {
  console.error("❌ WebSocket ошибка [панель]:", e);
};
