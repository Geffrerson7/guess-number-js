console.log("¡Hola desde JavaScript!");
// --- Variables con let (pueden cambiar) ---
let nombre = "Gefferon Casasola";
let edad = 32;
let estaAprendiendo = true;

// --- Imprime cada variable ---
console.log("Nombre: ", nombre);
console.log("Edad: ", edad);
console.log("Está aprendiendo: ", estaAprendiendo);

// --- Verifica los tipos de dato ---
console.log("Tipo de dato de nombre: ", typeof nombre);
console.log("Tipo de dato de edad: ", typeof edad);
console.log("Tipo de dato de estaAprendiendo: ", typeof estaAprendiendo);

// --- Variables con const (no pueden cambiar) ---
const curso = "Code 101";
const maxIntentos = 10;
console.log("Curso: ", curso);
console.log("Máximo número de intentos: ", maxIntentos);

// --- Entrada del usuario ---
let nombreUsuario = prompt("¿Cómo te llamas?");
let edadUsuario = prompt("¿Qué edad tienes?");
let ciuadUsuario = prompt("¿En que ciudad vives?");

// --- Salida al usuario ---
alert("Hola " + nombreUsuario + ", tienes " + edadUsuario + " años.");

// --- Verifica en consola ---
console.log("Nombre: ", nombreUsuario);
console.log("Edad: ", edadUsuario);
console.log("Tipo de edad: ", typeof edadUsuario);

// --- Operadores aritméticos ---
let a = 20;
let b = 7;

console.log("Suma:", a + b); // 27
console.log("Resta:", a - b); // 13
console.log("Multiplicación", a * b);
console.log("División", a / b);
console.log("Módulo", a % b);

console.log("5" + 3);
console.log(5 + 3);
console.log("5" - 3);

// Forma 1: Concatenación con +
let saludo1 = "Hola " + nombreUsuario + ", tienes " + edadUsuario + " años.";
console.log(saludo1);

// Forma 2: Template literals con `` (backticks)
let saludo2 = `Hola ${nombreUsuario}, tienes ${edadUsuario} años.`;
console.log(saludo2);

// --- Calculadora de edad ---
let anioActual = 2026;
let anioNacimiento = anioActual - Number(edadUsuario);

// Completa el mensaje usando template literals:
let saludo3 = `Hola ${nombreUsuario}, naciste aproximadamente en ${anioNacimiento}.`;
console.log(saludo3);

//Mensaje que incluye la ciudad
let saludo4 = `Hola ${nombreUsuario}, tienes ${edadUsuario} años y vives en ${ciuadUsuario}.`;
console.log(saludo4);

//calcular en qué año cumplirá 100 años
let edadEnCienAnios = parseInt(edadUsuario) + 100;
console.log(edadEnCienAnios);

if (parseInt(edadUsuario) >= 18) {
  console.log("Eres mayor de edad.");
} else {
  console.log("No eres mayor de edad.");
}