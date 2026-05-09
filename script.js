// === ADIVINA EL NÚMERO ===
// El programa genera un número secreto entre 1 y 100
// El jugador intenta adivinarlo

console.log("=== Adivina el Número ===");

// --- Generar número secreto ---
const numeroSecreto = Math.floor(Math.random() * 100) + 1;

// Temporal: ver el número para probar (lo quitaremos después)
console.log("(DEBUG) Número secreto:", numeroSecreto);

// --- Pedir intento al jugador ---
let intento = prompt("Adivina el número (1-100):");
console.log("Intento del jugador:", intento);
intento = Number(intento);

// --- Validar entrada ---
if (isNaN(intento)) {
  alert("⚠️ Eso no es un número. Por favor ingresa un número del 1 al 100.");
} else if (intento < 1 || intento > 100) {
  alert("⚠️ El número debe estar entre 1 y 100.");
} else if (intento === numeroSecreto) {
  alert("🎉 ¡Correcto! El número era " + numeroSecreto);
} else if (intento > numeroSecreto) {
  alert("📈 Muy alto. Intenta un número más bajo.");
} else {
  alert("📉 Muy bajo. Intenta un número más alto.");
}

// --- Segundo intento (si no acertó) ---
if (
  !isNaN(intento) &&
  intento >= 1 &&
  intento <= 100 &&
  intento !== numeroSecreto
) {
  // --- Pista de cercanía ---
  let diferencia = Math.abs(intento - numeroSecreto);
  let cercanía = diferencia <= 10 ? "🔥 ¡Estás cerca!" : "❄️ Estás lejos";
  console.log(cercanía);

  let intento2 = prompt("Intenta de nuevo (1-100):");
  intento2 = Number(intento2);

  if (isNaN(intento2) || intento2 < 1 || intento2 > 100) {
    alert("⚠️ Entrada inválida. El número era " + numeroSecreto);
  } else if (intento2 === numeroSecreto) {
    alert("🎉 ¡Correcto en el segundo intento! El número era " + numeroSecreto);
  } else {
    let pista = intento2 > numeroSecreto ? "alto" : "bajo";
    alert(`Muy ${pista}. El número era ${numeroSecreto}`);
  }
}
