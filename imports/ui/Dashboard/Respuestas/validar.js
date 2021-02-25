export function validar(respuestas, pregunta, rta) {
  console.log("respuestas ", respuestas);
  console.log("pregunta ", pregunta);
  console.log("rta ", rta);
  var valido = false;
  switch (Number(pregunta)) {
    case 120:
      valido =
        buscarRtatexto(respuestas, 110) == "NO" &&
        rta == "Fue acompañadx en un aborto anterior";
      break;
    case 340:
      valido =
        buscarRtatexto(respuestas, 130) ==
          "Sí: Porque estoy en situación de violencia" && rta == "No";
      break;
    case 160:
      valido =
        buscarRtatexto(respuestas, 150) == "Nadie sabe" &&
        rta !== "Nadie me acompaña";
      break;
    default:
      break;
  }
  return !valido;
}

function buscarRtatexto(respuestas, codigo) {
  var i = 0;
  var parar = false;
  while (i < respuestas.length && !parar) {
    //console.log("i: ", i);
    //console.log("Number(respuestas[i].codigo)", Number(respuestas[i].codigo));
    parar = Number(respuestas[i].codigo) == codigo;
    i++;
  }
  //console.log("i ", i);
  //console.log("respuestas[i].rtatexto ", respuestas[i - 1].rtatexto);
  return respuestas[i - 1].rtatexto;
}
