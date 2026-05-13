// Elementos
const systemState = document.getElementById("systemState");
const historyList = document.getElementById("historyList");
const input = document.getElementById("inputIntento");
const fakeCursor = document.getElementById("fakeCursor");

function cambiarEstado(texto) {
  systemState.textContent = texto;
}

function agregarAlHistorial(numero) {
  const item = document.createElement("div");
  item.classList.add("history-item");
  item.textContent = `Intento: ${numero}`;
  historyList.appendChild(item);
}

function actualizarCursor() {
  if (input.value.length === 0) {
    fakeCursor.style.left = "calc(50% - 20px)";
    return;
  }

  const offset = input.value.length * 18;
  fakeCursor.style.left = `calc(50% + ${offset - 20}px)`;
}