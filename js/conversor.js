document.addEventListener("DOMContentLoaded", () => {
  // Definir las unidades para cada tipo de conversión
  const unidades = {
    metrico: { "metros": 1, "kilómetros": 0.001, "centímetros": 100, "milímetros": 1000 },
    peso: { "kilogramos": 1, "gramos": 1000, "libras": 2.20462 },
    velocidad: { "km/h": 1, "m/s": 0.277778, "mph": 0.621371 }
  };

  // Elementos del DOM
  const tipoConversion = document.getElementById("tipoConversion");
  const fromUnit = document.getElementById("fromUnit");
  const toUnit = document.getElementById("toUnit");
  const inputValue = document.getElementById("inputValue");
  const result = document.getElementById("result");

  // Función para cargar las unidades según el tipo de conversión
  function cargarUnidades(tipo) {
    // Limpiar las opciones anteriores
    fromUnit.innerHTML = "";
    toUnit.innerHTML = "";

    // Añadir nuevas opciones basadas en el tipo de conversión
    Object.keys(unidades[tipo]).forEach(u => {
      fromUnit.add(new Option(u, u));
      toUnit.add(new Option(u, u));
    });
  }

  // Función para realizar la conversión de unidades
  function convertir() {
    const tipo = tipoConversion.value;  // Obtener tipo de conversión
    const valor = parseFloat(inputValue.value);  // Obtener el valor ingresado
    const de = fromUnit.value;  // Unidad desde la que se convierte
    const a = toUnit.value;  // Unidad a la que se convierte

    // Verificar que el valor ingresado sea válido
    if (!isNaN(valor)) {
      // Realizar la conversión
      const resultado = valor * (unidades[tipo][a] / unidades[tipo][de]);
      result.textContent = `Resultado: ${resultado.toFixed(4)}`;
    } else {
      result.textContent = "Resultado: -";
    }
  }

  // Inicializar los eventos de cambio y entrada de datos
  tipoConversion.addEventListener("change", () => cargarUnidades(tipoConversion.value));
  inputValue.addEventListener("input", convertir);
  fromUnit.addEventListener("change", convertir);
  toUnit.addEventListener("change", convertir);

  // Cargar las unidades de tipo 'metrico' al cargar la página
  cargarUnidades("metrico");
});
