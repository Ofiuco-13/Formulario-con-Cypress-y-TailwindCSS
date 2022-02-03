function obtenerMayorEdad (salarios) {
    let mayorNumero = salarios[0];
    for (let i = 0; i < salarios.length; i++) {
        if (salarios[i] > mayorNumero) {
            mayorNumero = salarios[i];
        }
    }
    return mayorNumero;
}

function obtenerMenorEdad (salarios) {
    let menorNumero = salarios[0];
    for (let i = 0; i < salarios.length; i++) {
        if (salarios[i] < menorNumero) {
            menorNumero = salarios[i];
        }
    }
    return menorNumero;
}

function obtenerEdadPromedio (salarios) {
    let acumulador = 0;
    for (let i =0; i < salarios.length; i++) {
        acumulador += salarios[i];
    }
    return acumulador / salarios.length;
}

function obtenerMayorSalarioAnual (salarios) {
    let mayorSalarioAnual = salarios[0];
    for (let i = 0; i < salarios.length; i++) {
        if (salarios[i] > mayorSalarioAnual) {
            mayorSalarioAnual = salarios[i];
        }
    }
    return mayorSalarioAnual;
}

function obtenerMenorSalarioAnual (salarios) {
    let menorSalarioAnual = salarios[0];
    for (let i = 0; i < salarios.length; i++) {
        if (salarios[i] < menorSalarioAnual) {
            menorSalarioAnual = salarios[i];
        }
    }
    return menorSalarioAnual;
}

function obtenerSalarioAnualPromedio (salarios) {
    let acumulador = 0;
    for (let i =0; i < salarios.length; i++) {
        acumulador += salarios[i];
    }
    return Math.round(acumulador / salarios.length);
}

function obtenerSalarioMensualPromedio (salarios) {
    let acumulador = 0;
    for (let i = 0; i < salarios.length; i++) {
        acumulador += salarios[i];
    }
    return Math.round(acumulador / 12);
}
