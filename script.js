// Elementos
const input = document.getElementById("inputIntento");
const statusText = document.getElementById("statusText");
const hintText = document.getElementById("hintText");
const systemState = document.getElementById("systemState");
const btnReiniciar = document.getElementById("btnReiniciar");
const historyList = document.getElementById("historyList");
const radarBlip = document.getElementById("radarBlip");
const radarStatus = document.getElementById("radarStatus");
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
    activarRadar("success");
  } else if (intento < numeroSecreto) {
    statusText.textContent = "EL CÓDIGO ES MAYOR";
    activarRadar("error");
  } else {
    statusText.textContent = "EL CÓDIGO ES MENOR";
    activarRadar("error");
  }

  input.value = "";
  actualizarCursor();
}

btnVerificar.addEventListener("click", validarIntento);

function activarRadar(tipo) {
  radarBlip.classList.remove("error", "success", "active");

  void radarBlip.offsetWidth; // reinicia animación

  if (tipo === "error") {
    radarBlip.classList.add("error", "active");
    radarStatus.textContent = "CÓDIGO INCORRECTO";
  } else if (tipo === "success") {
    radarBlip.classList.add("success", "active");
    radarStatus.textContent = "OBJETIVO IDENTIFICADO";
  } else {
    radarBlip.classList.add("active");
    radarStatus.textContent = "ESCANEANDO...";
  }
}
