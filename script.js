// Elementos
const systemState = document.getElementById("systemState");
const historyList = document.getElementById("historyList");

function cambiarEstado(texto) {
  systemState.textContent = texto;
}

function agregarAlHistorial(numero) {
  const item = document.createElement("div");
  item.classList.add("history-item");
  item.textContent = `Intento: ${numero}`;
  historyList.appendChild(item);
}