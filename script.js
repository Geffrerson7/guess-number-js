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

// Configuración
const MAX_INTENTOS = 10;
let numeroSecreto = generarNumero();
let intentos = 0;
let juegoActivo = true;

function cambiarEstado(texto) {
  systemState.textContent = texto;
}

// FUNCIONES UTILITARIAS
function generarNumero() {
  return Math.floor(Math.random() * 100) + 1;
}

function esMobile() {
  return window.innerWidth <= 480;
}

// FUNCIONES VISUALES
// CURSOR
function actualizarCursor() {
  if (input.value.length === 0) {
    fakeCursor.style.left = "50%";
    return;
  }

  const offset = input.value.length * 18;
  fakeCursor.style.left = `calc(50% + ${offset - 20}px)`;
}

// RADAR
function activarRadar(tipo) {
  const angulo = Math.random() * 2 * Math.PI;
  const distancia = Math.random() * 55 + 15;
  const cx = 80,
    cy = 80;
  const x = cx + distancia * Math.cos(angulo) - 3;
  const y = cy + distancia * Math.sin(angulo) - 3;

  radarBlip.style.left = x + "px";
  radarBlip.style.top = y + "px";

  radarBlip.className = "radar-blip";
  void radarBlip.offsetWidth;

  if (tipo === "success") {
    radarBlip.classList.add("success");
    radarStatus.textContent = "CÓDIGO IDENTIFICADO";
    radarStatus.style.color = "#00ff88";
  } else {
    radarBlip.classList.add("error", "active");
    radarStatus.textContent = "SIN COINCIDENCIA";
    radarStatus.style.color = "#ff4444";
  }
}

function resetRadar() {
  radarBlip.className = "radar-blip";
  radarStatus.textContent = "INGRESE CÓDIGO";
  radarStatus.style.color = "#00c853";
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
