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
const btnAyuda = document.getElementById("btnAyuda");
const modalAyuda = document.getElementById("modalAyuda");
const btnCerrarModal = document.getElementById("btnCerrarModal");

// Configuración
const MAX_INTENTOS = 10;
let numeroSecreto = generarNumero();
let intentos = 0;
let juegoActivo = true;

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

// LÓGICA DEL JUEGO
//Validar intento
function validarIntento() {
  const intento = parseInt(input.value);

  if (!input.value) {
    statusText.textContent = "ERROR: CAMPO VACÍO🚫";
    statusText.style.color = "#ff4444"
    radarStatus.textContent = "CODIGO NO DETECTADO";
    radarStatus.style.color = "#ff4444";
    actualizarEstado("CÓDIGO NO DETECTADO");
    return;
  }

  if (intento < 1 || intento > 100) {
    statusText.textContent = "CÓDIGO FUERA DEL RANGO PERMITIDO🚫";
    statusText.style.color = "#ff4444"
    actualizarEstado("CÓDIGO FUERA DEL RANGO PERMITIDO");
    hintText.textContent = "Ingrese un número del 1 al 100";
    radarStatus.textContent = "FUERA DE RANGO";
    radarStatus.style.color = "#ff4444";
    input.value = "";
    actualizarCursor();
    return;
  }

  intentos++;

  if (intentos >= MAX_INTENTOS && intento !== numeroSecreto) {
    bloquearSistema();
    return;
  }

  if (intento === numeroSecreto) {
    agregarAlHistorial(intento, "correct");
    ganar();
    return;
  }

  if (intento < numeroSecreto) {
    statusText.textContent = "EL CÓDIGO ES MAYOR";
    statusText.style.color = "#00aaff";
    hintText.textContent = calcularProximidad(intento);
    agregarAlHistorial(intento, "low");
  } else {
    statusText.textContent = "EL CÓDIGO ES MENOR";
    statusText.style.color = "#ff8800";
    hintText.textContent = calcularProximidad(intento);
    agregarAlHistorial(intento, "high");
  }

  actualizarEstado("ACCESO DENEGADO");
  efectoError();
  input.value = "";
  actualizarCursor();
}

// PROXIMIDAD DE CÓDIGO
function calcularProximidad(intento) {
  const diferencia = Math.abs(numeroSecreto - intento);
  const porcentaje = Math.max(0, 100 - diferencia);
  return `Proximidad del código: ${porcentaje}%`;
}

// GANAR
function ganar() {
  activarRadar("success");
  statusText.textContent = "ACCESO AUTORIZADO";
  hintText.textContent = "Sistema Desbloqueado";
  actualizarEstado("SISTEMA DESBLOQUEADO");
  input.classList.remove("input-active");
  document.querySelector(".lock-panel").style.boxShadow =
    "0 0 40px rgba(0,255,150,0.6)";

  juegoActivo = false;
}

//BLOQUEAR JUEGO
function bloquearSistema() {
  juegoActivo = false;

  statusText.textContent = "SISTEMA BLOQUEADO🚫";
  hintText.textContent = "Máximo de intentos alcanzado";
  systemState.textContent = "BLOQUEO DE SEGURIDAD";

  input.disabled = true;
  input.classList.remove("input-active");

  btnReiniciar.style.display = "block";

  const panel = document.querySelector(".lock-panel");
  panel.style.boxShadow = "0 0 25px rgba(255,0,0,0.6)";
}

// REINICIAR JUEGO
function reiniciarSistema() {
  resetRadar();
  numeroSecreto = generarNumero();
  intentos = 0;
  juegoActivo = true;

  statusText.textContent = "ADIVINA EL CÓDIGO OCULTO";
  hintText.textContent = "Rango del código: 1 - 100";
  systemState.textContent = "SISTEMA EN ESPERA";
  input.value = "";
  historyList.innerHTML = "";
  input.classList.add("input-active");
  input.focus();

  document.querySelector(".lock-panel").style.boxShadow =
    "inset 0 0 20px rgba(0,255,255,0.1)";
  actualizarCursor();
}

// ACTUALIZAR ESTADO
function actualizarEstado(mensaje) {
  systemState.textContent = `${mensaje} | INTENTOS: ${intentos}/10`;
}

// ACTUALIZAR HISTORIAL
function agregarAlHistorial(valor, resultado) {
  const entry = document.createElement("div");
  entry.classList.add("history-entry", `history-entry--${resultado}`);

  const icons = { low: "▲", high: "▼", correct: "✓" };
  entry.textContent = `${icons[resultado]} Intento ${intentos}: Código ${valor}`;

  historyList.prepend(entry);
}

// EFECTO ERROR
function efectoError() {
  activarRadar("error");
  const panel = document.querySelector(".lock-panel");
  panel.style.boxShadow = "0 0 25px rgba(255,0,0,0.6)";

  setTimeout(() => {
    panel.style.boxShadow = "inset 0 0 20px rgba(0,255,255,0.1)";
  }, 300);
}

// MODO RESPONSIVE
function ajustarModo() {
  if (esMobile()) {
    input.removeAttribute("readonly");
    input.setAttribute("type", "tel");
    input.setAttribute("maxlength", "3");
    fakeCursor.style.display = "none";
  } else {
    input.setAttribute("readonly", true);
    input.setAttribute("type", "number");
    input.removeAttribute("maxlength");
    fakeCursor.style.display = "block";
  }
}

//EVENTOS
// BOTÓN RESET
btnReiniciar.addEventListener("click", () => {
  btnReiniciar.blur();
  reiniciarSistema();
});

// SOPORTE TECLADO FÍSICO
document.addEventListener("keydown", (e) => {
  if (!juegoActivo) return;

  if (esMobile()) {
    if (e.key === "Enter") {
      e.preventDefault();
      validarIntento();
    }
    return;
  }

  if (e.key >= "0" && e.key <= "9") {
    if (input.value.length < 3) {
      input.value += e.key;
      actualizarCursor();
    }
  } else if (e.key === "Enter") {
    e.preventDefault();
    validarIntento();
  } else if (e.key === "Backspace") {
    input.value = input.value.slice(0, -1);
    actualizarCursor();
  } else if (e.key === "Escape") {
    input.value = "";
    actualizarEstado("ENTRADA BORRADA");
    actualizarCursor();
  }
});

//BOTÓN VERIFICAR CÓDIGO
btnVerificar.addEventListener("click", () => {
  if (!juegoActivo) return;
  validarIntento();
});

//BOTON AYUDA
btnAyuda.addEventListener("click", () => {
  modalAyuda.classList.add("active");
});

//BOTON CERRAR MODAL
btnCerrarModal.addEventListener("click", () => {
  modalAyuda.classList.remove("active");
});

// Cerrar al hacer click fuera del modal
modalAyuda.addEventListener("click", (e) => {
  if (e.target === modalAyuda) modalAyuda.classList.remove("active");
});

window.addEventListener("resize", ajustarModo);

// INICIO DEL SISTEMA
window.addEventListener("DOMContentLoaded", () => {
  ajustarModo();
  input.classList.add("input-active");
  radarStatus.textContent = "INGRESE CÓDIGO";
  input.focus();
  actualizarCursor();
});
