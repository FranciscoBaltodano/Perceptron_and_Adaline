// Binarias
const entradas = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1] 
];

// // Bipolares
// const entradas = [
//     [-1, -1],
//     [-1,  1],
//     [ 1, -1],
//     [ 1,  1] 
// ];

const salidasEsperadas = [-1, -1, -1, 1]; // Para la puerta AND
// const salidasEsperadas = [-1, 1, 1, 1]; // Para la puerta OR
// const salidasEsperadas = [1, 1, 1, -1]; // Para la puerta AND-NOT    


// Paso 0: Inicializar pesos y sesgo en 0
let pesos = [0, 0];
let sesgo = 0;
const tasaDeAprendizaje = 1;
const tolerancia = 0.1; // Ajustado para ser más sensible

// El número de épocas es para evitar bucles infinitos
const maxEpocas = 1000;
let epoca = 0; // Contador de épocas

// Función de activación
function activacion(y_in) {
    return y_in >= 0 ? 1 : -1;
}

// Paso 1: Mientras la condición de parar sea falsa
let parar = false;
while (!parar && epoca < maxEpocas) {
    let cambiosEnPesos = false;
    let cambiosMaximos = [0, 0]; // Para guardar el cambio máximo en cada peso

    // Paso 2: Por cada par de entrenamiento s:t
    for (let i = 0; i < entradas.length; i++) {
        // Paso 3: Asignar valores a las unidades de entrada
        let x = entradas[i];
        let salidaEsperada = salidasEsperadas[i];

        // Paso 4: Computar la entrada de la unidad de salida
        let y_in = sesgo;
        for (let j = 0; j < pesos.length; j++) {
            y_in += x[j] * pesos[j];
        }

        // Aplicar función de activación
        let y = activacion(y_in);

        // Paso 5: Actualizar los pesos y el sesgo
        let error = salidaEsperada - y;
        for (let j = 0; j < pesos.length; j++) {
            let cambioPeso = tasaDeAprendizaje * error * x[j];
            pesos[j] += cambioPeso;
            cambiosMaximos[j] = Math.max(cambiosMaximos[j], Math.abs(cambioPeso));
        }

        sesgo += tasaDeAprendizaje * error;
    }

    // Paso 6: Revisar condición de parado
    parar = cambiosMaximos.every(cambio => cambio < tolerancia);

    epoca++;
}

console.log('Pesos finales:', pesos);
console.log('Sesgo final:', sesgo);
console.log('Número de épocas:', epoca);

// Función para calcular la salida del ADALINE
function calcularSalida(entrada, pesos, sesgo) {
    let y_in = sesgo;
    for (let i = 0; i < entrada.length; i++) {
        y_in += entrada[i] * pesos[i];
    }
    return y_in; // Salida continua
}

// Función de activación
function activarSalida(y_in) {
    return y_in >= 0 ? 1 : -1;
}

// Verificar el ADALINE con las entradas de prueba
let todosCorrectos = true;

for (let i = 0; i < entradas.length; i++) {
    let salidaCalculadaContinua = calcularSalida(entradas[i], pesos, sesgo);
    let salidaCalculada = activarSalida(salidaCalculadaContinua);
    let salidaEsperada = salidasEsperadas[i];
    console.log(`Entrada: ${entradas[i]} → Salida Esperada: ${salidaEsperada}, Salida Calculada: ${salidaCalculadaContinua} (activada: ${salidaCalculada})`);
    
    if (salidaEsperada !== salidaCalculada) {
        todosCorrectos = false;
    }
}

if (todosCorrectos) {
    console.log('El ADALINE ha aprendido correctamente.');
} else {
    console.log('El ADALINE NO ha aprendido correctamente.');
}