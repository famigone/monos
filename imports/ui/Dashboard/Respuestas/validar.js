export function validar(respuestas, codigoPreguntaDestino, rta, reglas) {
  console.log("respuestas ", respuestas);
  console.log("codigoPreguntaDestino ", codigoPreguntaDestino);
  console.log("rta ", rta);
  console.log("reglas ", reglas);
  var valido = true;

  //obtengo todas las reglas que correspondan a la pregunta actual.
  const misReglas = obtenerReglas(reglas, codigoPreguntaDestino);
  console.log("mis reglas filtradas: ", misReglas);
  var i = 0;
  var reglaActual;
  //itero sobre las reglas de la pregunta actual y valido que se cumplan todas
  while (i < misReglas.length && valido) {
    reglaActual = misReglas[i];
    console.log("reglaActual: ", reglaActual);

    //obtengo la respuesta que dió en la pregunta Antecedente
    rtaAntecedente = buscarRtatexto(
      respuestas,
      reglaActual.codigoPreguntaOrigen
    );
    console.log("rtaAntecedente: ", rtaAntecedente);
    //determino si la rta está alcanzada por la regla
    var cumpleAntecedente = rtaAntecedente == reglaActual.rtaOrigen;
    console.log("cumpleAntecedente: ", cumpleAntecedente);
    //si cumple antecedente, debe cumplir consecuente
    if (cumpleAntecedente) {
      switch (reglaActual.condicion) {
        //igual a
        case 1:
          valido = rta == reglaActual.rtaDestino;
        //distinto de
        case 2:
          valido = rta !== reglaActual.rtaDestino;
      }
    }
    i++;
  }
  var mensaje = "";
  if (!valido) mensaje = reglaActual.mensaje;
  console.log("mensaje: ", mensaje);
  return mensaje;
}

function buscarRtatexto(respuestas, codigo) {
  var i = 0;
  var parar = false;
  while (i < respuestas.length && !parar) {
    //console.log("i: ", i);
    //console.log("Number(respuestas[i].codigo)", Number(respuestas[i].codigo));
    parar = respuestas[i].codigo == codigo;
    i++;
  }
  //console.log("i ", i);
  //console.log("respuestas[i].rtatexto ", respuestas[i - 1].rtatexto);
  return respuestas[i - 1].rtatexto;
}

function obtenerReglas(reglas, codigoPreguntaDestino) {
  const misReglas = [];
  for (var i = 0; i < reglas.length; i++) {
    if (Number(reglas[i].codigoPreguntaDestino) == codigoPreguntaDestino)
      misReglas.push(reglas[i]);
  }
  return misReglas;
}
