console.log('¡Hola desde JavaScript!');
// --- Variables con let (pueden cambiar) ---
let nombre = 'Gefferon Casasola';
let edad = 32;
let estaAprendiendo = true;

// --- Imprime cada variable ---
console.log('Nombre: ', nombre);
console.log('Edad: ',edad);
console.log('Está aprendiendo: ', estaAprendiendo);

// --- Verifica los tipos de dato ---
console.log('Tipo de dato de nombre: ', typeof nombre); 
console.log('Tipo de dato de edad: ', typeof edad);
console.log('Tipo de dato de estaAprendiendo: ', typeof estaAprendiendo);

// --- Variables con const (no pueden cambiar) ---
const curso = 'Code 101';
const maxIntentos = 10;
console.log('Curso: ',curso);
console.log('Máximo número de intentos: ', maxIntentos);

// --- Entrada del usuario ---
let nombreUsuario = prompt('¿Cómo te llamas?');
let edadUsuario = prompt('¿Qué edad tienes?');

// --- Salida al usuario ---
alert("Hola " + nombreUsuario + ", tienes " + edadUsuario + " años.");

// --- Verifica en consola ---
console.log('Nombre: ', nombreUsuario);
console.log('Edad: ', edadUsuario);
console.log('Tipo de edad: ', typeof edadUsuario);