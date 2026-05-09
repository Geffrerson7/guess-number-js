// === ADIVINA EL NÚMERO ===
// El programa genera un número secreto entre 1 y 100
// El jugador intenta adivinarlo

console.log('=== Adivina el Número ===');

// --- Generar número secreto ---
const numeroSecreto = Math.floor(Math.random() * 100) + 1;

// Temporal: ver el número para probar (lo quitaremos después)
console.log('(DEBUG) Número secreto:', numeroSecreto);

// --- Pedir intento al jugador ---
let intento = prompt('Adivina el número (1-100):');
intento = Number(intento);

console.log('Intento del jugador:', intento);
console.log('Tipo:', typeof intento);

// --- Comparar intento con número secreto ---
if (intento === numeroSecreto) {
  alert('🎉 ¡Correcto! El número era ' + numeroSecreto);
} else {
  alert('❌ Incorrecto. El número era ' + numeroSecreto);
}