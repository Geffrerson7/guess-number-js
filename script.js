// Elementos
const systemState = document.getElementById("systemState");
const historyList = document.getElementById("historyList");
const input = document.getElementById("inputIntento");
const fakeCursor = document.getElementById("fakeCursor");
const btnVerificar = document.getElementById("btnVerificar");

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

function validarIntento() {
  const intento = parseInt(input.value);

  if (!input.value) {
    statusText.textContent = "CÓDIGO NO DETECTADO";
    return;
  }

  if (intento < 1 || intento > 100) {
    statusText.textContent = "FUERA DE RANGO";
    input.value = "";
    actualizarCursor();
    return;
  }

  if (intento === numeroSecreto) {
    statusText.textContent = "ACCESO AUTORIZADO";
  } else if (intento < numeroSecreto) {
    statusText.textContent = "EL CÓDIGO ES MAYOR";
  } else {
    statusText.textContent = "EL CÓDIGO ES MENOR";
  }

  input.value = "";
  actualizarCursor();
}

btnVerificar.addEventListener("click", validarIntento);