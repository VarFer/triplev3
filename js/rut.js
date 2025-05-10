document.getElementById("rutForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const rutInput = document.getElementById("rutInput").value.trim();
  const resultado = document.getElementById("rutResultado");

  if (validarRUT(rutInput)) {
    resultado.textContent = "✅ RUT válido.";
    resultado.className = "text-success fw-bold";
  } else {
    resultado.textContent = "❌ RUT inválido.";
    resultado.className = "text-danger fw-bold";
  }
});

function validarRUT(rut) {
  rut = rut.replace(/\./g, "").replace(/-/g, ""); // Eliminar puntos y guiones

  // Verificar que el RUT tenga la longitud mínima (8 caracteres)
  if (rut.length < 8) return false;

  const cuerpo = rut.slice(0, -1); // Parte numérica
  let dv = rut.slice(-1).toUpperCase(); // Dígito verificador

  // Validar que el dígito verificador sea un carácter válido
  if (dv !== "K" && (isNaN(dv) || dv.length !== 1)) return false;

  let suma = 0;
  let multiplo = 2;

  // Realizar la sumatoria con los dígitos del cuerpo del RUT
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i]) * multiplo;
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }

  // Calcular el dígito verificador esperado
  const dvEsperado = 11 - (suma % 11);
  const dvCalculado = dvEsperado === 11 ? "0" : dvEsperado === 10 ? "K" : dvEsperado.toString();

  return dv === dvCalculado; // Comparar el dígito verificador
}
