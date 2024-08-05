const entradas = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1] 
];

// const salidasEsperadas = [0, 0, 0, 1]; // Para la puerta AND
// const salidasEsperadas = [0, 1, 1, 1]; // Para la puerta OR
const salidasEsperadas = [1, 1, 1, 0]; // Para la puerta AND-NOT    


// Paso 0 : Inicializar pesos y bias en 0
let pesos = [0, 0]; 
let sesgo = 0;
const tasaDeAprendizaje = 1;
const theta = 0;

// El numero de epocas es para evitar bucles infinitos
const maxEpocas = 1000; 
let epoca = 0; // Contador de épocas

// Paso 1: Mientras la condicion de para sea falsa   
let parar = false;
while (!parar && epoca < maxEpocas) {
    let cambiosEnPesos = false;

    // Paso 2: Por cada par de entrenamiento s:t 
    for (let i = 0; i < entradas.length; i++) {

        // Paso 3: Asignar valores a las unidades de entrada
        let x = entradas[i];
        let salidaEsperada = salidasEsperadas[i];

        // Paso 4: Calcular la respuesta de la unidad de entrada
        let y_in = sesgo;
        for (let j = 0; j < x.length; j++) {
            y_in += x[j] * pesos[j];
        }

        let y = y_in > 0 ? 1 : 0; 

        // Paso 5: Actualizar pesos y sesgo si ocurre un error
        if (y !== salidaEsperada) {
            for (let j = 0; j < x.length; j++) {
                pesos[j] += tasaDeAprendizaje * (salidaEsperada - y) * x[j];
            }
            sesgo += tasaDeAprendizaje * (salidaEsperada - y);
            cambiosEnPesos = true;
        }
    }

    // Detener el entrenamiento si no hay cambios en los pesos
    if (!cambiosEnPesos) {
        parar = true;
    }

    // Incrementar el contador de épocas
    epoca++;
}

// Imprimir los pesos y el sesgo finales después de completar el entrenamiento
console.log(`Pesos finales: ${pesos}`);
console.log(`Sesgo final: ${sesgo}`);
console.log(`Número de épocas: ${epoca}`);

// Función para calcular la salida del perceptrón
function calcularSalida(entrada, pesos, sesgo) {
    let y_in = sesgo;
    for (let i = 0; i < entrada.length; i++) {
        y_in += entrada[i] * pesos[i];
    }
    return y_in > 0 ? 1 : 0; // Usar activación de paso (0 o 1) para la puerta AND
}

// Verificar el perceptrón con las entradas de prueba
let todosCorrectos = true;

for (let i = 0; i < entradas.length; i++) {
    let salidaCalculada = calcularSalida(entradas[i], pesos, sesgo);
    let salidaEsperada = salidasEsperadas[i];
    console.log(`Entrada: ${entradas[i]} → Salida Esperada: ${salidaEsperada}, Salida Calculada: ${salidaCalculada}`);
    if (salidaCalculada !== salidaEsperada) {
        todosCorrectos = false;
    }
}

if (todosCorrectos) {
    console.log('El perceptrón ha aprendido correctamente.');
} else {
    console.log('El perceptrón NO ha aprendido correctamente.');
}
