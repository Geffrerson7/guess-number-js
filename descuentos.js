// === CALCULADORA DE DESCUENTOS ===

let descuento = 0;
let total = prompt('Ingrese el precio total');
total = Number(total);

if (isNaN(total)) {
    alert('⚠️ Eso no es un número. Por favor ingresa un número del 1 al 100.');
} else if (total > 100) {
    descuento = 0.2;
} else if (total < 100 && total > 50) {
    descuento = 0.1;
} else {
    descuento = 0;
}

let precioFinal = total - (total * descuento);
alert('El precio final es: ' + precioFinal);