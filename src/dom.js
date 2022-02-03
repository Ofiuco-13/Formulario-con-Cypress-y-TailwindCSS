document.querySelector("#siguiente-paso").onclick = function () {
  const $cantidadIntegrantes = document.querySelector("#cantidad-integrantes");
  const cantidadIntegrantes = Number($cantidadIntegrantes.value);

  mostrarBotonCalculo(cantidadIntegrantes);
  borrarIntegrantesAnteriores(cantidadIntegrantes);
  generarIntegrantes(cantidadIntegrantes);
  mostrarBotonResetear(cantidadIntegrantes);

  return false;
};

document.querySelector("#calcular").onclick = function () {
  const numeros = obtenerEdades();

  ocultarBotonCalculo();
  document.querySelector("#mayor-edad").textContent = obtenerMayorEdad(numeros);
  document.querySelector("#menor-edad").textContent = obtenerMenorEdad(numeros);
  document.querySelector("#promedio-edad").textContent =
    obtenerEdadPromedio(numeros);

  mostrarAnalisis();
  mostrarBotonAgregar();
};

document.querySelector("#resetear").onclick = resetear;

document.querySelector("#agregar-input").onclick = function () {
  generarSalario();
  mostrarBotonCalcularSalarios();
};

document.querySelector("#calcular-salarios").onclick = function () {
  const salarios = obtenerSalarios();

  document.querySelector("#mayor-salario-anual").textContent =
    "Mayor salario anual: " + obtenerMayorSalarioAnual(salarios);
  document.querySelector("#menor-salario-anual").textContent =
    "Menor salario anual: " + obtenerMenorSalarioAnual(salarios);
  document.querySelector("#salario-anual-promedio").textContent =
    "Salario anual promedio: " + obtenerSalarioAnualPromedio(salarios);
  document.querySelector("#salario-mensual-promedio").textContent =
    "Salario mensual promedio: " + obtenerSalarioMensualPromedio(salarios);

  mostrarBotonEnviarFormulario();
};

const $form = document.querySelector("#calculador-edades");
$form.submit.onclick = function () {
  borrarErroresAnteriores();
  validarFormulario();

  return false;
};

function borrarErroresAnteriores() {
  let $errores = document.querySelectorAll("#errores li");

  if ($errores.length > 0) {
    for (let i = 0; i < $errores.length; i++) {
      $errores[i].remove();
    }
  }
}

function validarFormulario() {
  const $form = document.querySelector("#calculador-edades");

  const integrantes = $form.integrantes.value;
  const errorIntegrantes = validarIntegrantes(integrantes);

  const edades = obtenerEdades();
  const errorEdades = validarEdades(edades);

  const salarios = obtenerSalarios;
  const errorSalarios = validarSalarios(salarios);

  const errores = {
    integrantes: errorIntegrantes,
    edades: errorEdades,
    salarios: errorSalarios,
  };

  crearMensajeErrores(errores);
}

function crearMensajeErrores(errores) {
  const keys = Object.keys(errores);
  const $errores = document.querySelector("#errores");
  let cantidadErrores = 0;

  keys.forEach(function (key) {
    const error = errores[key];

    if (error) {
      cantidadErrores++;
      $form[key].className = "error";

      const $error = document.createElement("li");
      $error.innerText = error;
      $errores.appendChild($error);
    } else {
      $form[key].className = "";
    }
  });
  const $erroresAnteriores = document.querySelectorAll("#errores li");
  if ($erroresAnteriores.length === 0) {
    $form.className = "oculto";
    document.querySelector("#exito").className = "";
    redireccionar();
  }

  return cantidadErrores;
}

function redireccionar() {
  setTimeout(() => {
    window.location.replace("datos.html");
  }, 4000);
}

function mostrarBotonCalculo(cantidadIntegrantes) {
  if (cantidadIntegrantes > 0) {
    document.querySelector("#calcular").className = "";
  }
}

function borrarIntegrantesAnteriores() {
  const $integrantes = document.querySelectorAll(".integrante");
  for (let i = 0; i < $integrantes.length; i++) {
    $integrantes[i].remove();
  }
}

function generarIntegrantes(cantidadIntegrantes) {
  for (let i = 0; i < cantidadIntegrantes; i++) {
    generarIntegrante(i);
  }
}

function generarIntegrante(i) {
  const $div = document.createElement("div");
  $div.className = "integrante";

  const $label = document.createElement("label");
  $label.textContent = "Edad del integrante # " + (i + 1);

  const $input = document.createElement("input");
  $input.type = "number";
  $input.name = "edades";

  $div.appendChild($label);
  $div.appendChild($input);

  const $integrantes = document.querySelector("#integrantes");
  $integrantes.appendChild($div);
}

function obtenerEdades() {
  const $integrantes = document.querySelectorAll(".integrante input");
  const edades = [];

  for (let i = 0; i < $integrantes.length; i++) {
    edades.push(Number($integrantes[i].value));
  }
  return edades;
}

function mostrarAnalisis() {
  document.querySelector("#analisis").className = "";
}

function resetear() {
  borrarIntegrantesAnteriores();
  ocultarBotonCalculo();
  ocultarAnalisis();
  ocultarBotonResetear();
  ocultarBotonAgregar();
  borrarSalariosAnteriores();
  ocultarBotonCalcularSalarios();
  ocultarResultadoSalarios();
  ocultarBotonEnviarFormulario();
  ocultarMensajesDeError();
}

function generarSalario() {
  const $div = document.createElement("div");
  $div.className = "salario";

  const $label = document.createElement("label");
  $label.textContent = "Salario # ";

  const $input = document.createElement("input");
  $input.type = "number";
  $input.placeholder = "Ej: 350000";
  $input.min = "0";
  $input.name = "salarios";

  $div.appendChild($label);
  $div.appendChild($input);

  const $salarios = document.querySelector("#salarios");
  $salarios.appendChild($div);
}

function obtenerSalarios() {
  const $salarios = document.querySelectorAll(".salario input");
  const salarios = [];

  for (let i = 0; i < $salarios.length; i++) {
    salarios.push(Number($salarios[i].value));
  }
  return salarios;
}

function borrarSalariosAnteriores() {
  const $salarios = document.querySelectorAll(".salario");
  for (let i = 0; i < $salarios.length; i++) {
    $salarios[i].remove();
  }
}

function validarIntegrantes(integrantes) {
  if (integrantes.length === 0) {
    return "Para seguir necesita poner su cantidad de integrantes";
  }

  if (integrantes > 10) {
    return "Este campo solo admite 10 integrantes";
  }

  if (!/^[0-9]+$/i.test(integrantes)) {
    return "Este campo solo acepta numeros";
  }

  return "";
}

function validarEdades(edades) {
  const edadesInt = parseInt(edades);

  for (let i = 0; i < edades.length; i++) {
    if (!/[0-9]/.test(edadesInt)) {
      return "Error: no se pudieron calcular las edades, ingrese un valor correcto";
    }
  }

  return "";
}

function validarSalarios(salarios) {
  const salariosInt = parseInt(salarios);

  for (let i = 0; i < salarios.length; i++) {
    if (!/[0-9]/.test(salariosInt) && isNaN(salariosInt)) {
      return "Error: no se pudieron calcular los salarios, ingrese un valor valido";
    }

    if (salariosInt === 0) {
      return "Error: el salario no puede valer 0";
    }
  }

  return "";
}

function ocultarBotonCalculo() {
  document.querySelector("#calcular").className = "oculto";
}

function ocultarAnalisis() {
  document.querySelector("#analisis").className = "oculto";
}

function mostrarBotonResetear(cantidadIntegrantes) {
  if (cantidadIntegrantes > 0) {
    document.querySelector("#resetear").className = "";
  }
}

function ocultarBotonResetear() {
  document.querySelector("#resetear").className = "oculto";
}

function mostrarBotonAgregar() {
  document.querySelector("#agregar-input").className = "";
}

function ocultarBotonAgregar() {
  document.querySelector("#agregar-input").className = "oculto";
}

function mostrarBotonCalcularSalarios() {
  document.querySelector("#calcular-salarios").className = "";
}

function ocultarBotonCalcularSalarios() {
  document.querySelector("#calcular-salarios").className = "oculto";
}

function ocultarResultadoSalarios() {
  document.querySelector("#analisis-salarios").className = "oculto";
}

function mostrarBotonEnviarFormulario() {
  document.querySelector("#enviar-form").className = "";
}

function ocultarBotonEnviarFormulario() {
  document.querySelector("#enviar-form").className = "oculto";
}

function ocultarMensajesDeError() {
  document.querySelector("#errores").className = "oculto";
}
