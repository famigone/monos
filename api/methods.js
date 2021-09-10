//este código tiene que estar disponible en servidor y cliente, para habilitar Optimistic UI.
import { ValidatedMethod } from "meteor/mdg:validated-method";
import ContactoPregunta from "/imports/api/contactoPregunta.js";
import Respuesta from "/imports/api/respuesta.js";
import Regla from "/imports/api/regla.js";
import ReglaMultiple from "/imports/api/reglaMultiple.js";
import ReglaMultipleDetalle from "/imports/api/reglaMultipleDetalle.js";
import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
import { options } from "./mapeo";
//import { Mongo } from "meteor/mongo";
//import { aggregate } from "meteor/sakulstra:aggregate";

export const exportProtos = new ValidatedMethod({
  name: "exportProtos",
  validate: new SimpleSchema({
    desde: { type: Date },
    hasta: { type: Date },
    usuarioid: {
      type: String
    }
  }).validator(),
  run(one) {
    const desde = new Date(one.desde);
    const hasta = new Date(one.hasta);
    var resul;
    var rtas;
    //obtenemos las respuestas
    //console.log("one.usuarioid: ",one.usuarioid)
    if ((one.usuarioid)){
      rtas = Respuesta.find({activo:true,
                              createdAt: {
                                $gte: desde,
                                $lte: hasta
                              },
                              createdBy:one.usuarioid}
                            ).fetch();
    }

    if (!(one.usuarioid)){
      rtas = Respuesta.find({activo:true,
                              createdAt: {
                                $gte: desde,
                                $lte: hasta
                              }}
                          ).fetch();
    }
    //console.log(rtas)
    //armamos la fila
    return  parsearRtas(rtas);
  }

});

function mapearCodigo(codigoPregunta, rta){
  //esto importa los códigos de mapeo.js (ese archivo le asigna un número único a cada rta)
  //busca la rta parámetro y retorna el código
  var elCodigo = 0;
  if (options[codigoPregunta]){
    var codigos = options[codigoPregunta];
    var i = 0;
    var encontrado = false;
    while ((i < codigos.length) && (!encontrado)) {
      if (codigos[i].text==rta) {
        elCodigo = codigos[i].value;
        encontrado = true;
      }
      i++;
    }
  }
  return elCodigo;
}

function parsearRtas(rtas) {
  var unaFila;
  var resultado;
  resultado = rtas.map(function (rta, index, array) {
        var especifique= ""
        if (rta.activo && rta.activox() && rta.contactoActivo()) {
          if (rta.especifique) especifique = rta.especifique;
          if (rta.rtaFecha){
              unaFila= {grupa: rta.userName(),
                        fechaProtocola: rta.fechaProto(),
                        numeroProtocola: rta.numero(),
                        tipo: rta.tipo(),
                        momento: rta.momento(),
                        seccion: rta.seccion(),
                        pregunta: rta.pregunta(),
                        codigoPregunta: rta.codigo,
                        codigorespuesta: 0,
                        respuesta: moment(rta.rtaFecha).format('DD-MM-YYYY'),
                        especifique: especifique,
                      //  activo: rta.activox(),

              }
          }else{
              unaFila = {grupa: rta.userName(),
                        fechaProtocola: rta.fechaProto(),
                        numeroProtocola: rta.numero(),
                        tipo: rta.tipo(),
                        momento: rta.momento(),
                        seccion: rta.seccion(),
                        pregunta: rta.pregunta(),
                        codigoPregunta: rta.codigo,
                        codigorespuesta: mapearCodigo(rta.codigo, rta.rtatexto),
                        respuesta: rta.rtatexto,
                        especifique: especifique,
                      //  activo: rta.activox()

              }
        }}

        return unaFila;
  });
return resultado;
}

export const analisis = new ValidatedMethod({
  name: "analisis",
  validate: new SimpleSchema({
    codigo: {
      type: String
    },
    rta: {
      type: String
    },
    fechaDesde: {
      type: Date
    },
    fechaHasta: {
      type: Date
    },
    usuarioid: {
      type: String
    }
  }).validator(),
  run(one) {
    const desde = new Date(one.fechaDesde);
    const hasta = new Date(one.fechaHasta);
    const usuarioid = one.usuarioid;
    const bol = one.usuarioid === "";
    resul = 0;
    var rtas;
    if (bol) {
      rtas = Respuesta.find({
        codigo: one.codigo,
        rtatexto: one.rta,
        activo: true,
        createdAt: {
          $gte: desde,
          $lte: hasta
        }
      }).fetch();
    } else {
       rtas = Respuesta.find({
        codigo: one.codigo,
        rtatexto: one.rta,
        activo: true,
        createdBy: usuarioid,
        createdAt: {
          $gte: desde,
          $lte: hasta
        }
      }).fetch();

    }

    resul =  calcularCount(rtas);
    return resul;
  }
});

function calcularCount(rtas){
  var cant = 0;
  rtas.forEach((rta) => {
    if (rta.activo && rta.activox() && rta.contactoActivo()) {
      cant = cant + 1;
    }
  });
 return cant;
}

export const contarContactos = new ValidatedMethod({
  name: "contarContactos",
  validate: new SimpleSchema({
    fechaDesde: {
      type: Date
    },
    fechaHasta: {
      type: Date
    },
    usuarioid: {
      type: String
    }
  }).validator(),
  run(one) {
    const desde = new Date(one.fechaDesde);
    const hasta = new Date(one.fechaHasta);
    const usuarioid = one.usuarioid;
    const bol = one.usuarioid === "";
    if (bol) {
      const rta = Contacto.find({
        activo: true,
        createdAt: {
          $gte: desde,
          $lte: hasta
        }
      }).count();
      return rta;
    } else {
      const rta = Contacto.find({
        activo: true,
        createdBy: usuarioid,
        createdAt: {
          $gte: desde,
          $lte: hasta
        }
      }).count();
      return rta;
    }
    //console.log(rta);
  }
});

//este método inserta las preguntas para una consulta
export const insertContactoPreguntaBase = new ValidatedMethod({
  name: "insertContactoPreguntaBase.insert",
  validate: new SimpleSchema({
    contactoid: {
      type: String,
      regEx: SimpleSchema.RegEx.Id
    } //idContacto
  }).validator(),
  run(one) {}
});

export const updateContactoPregunta = new ValidatedMethod({
  name: "updateContactoPregunta",
  validate: new SimpleSchema({
    //idContacto
    id: {
      type: String,
      regEx: SimpleSchema.RegEx.Id
    }
  }).validator(),
  run(one) {
    ContactoPregunta.update(
      { _id: one.id },
      {
        $set: {
          habilitado: true,
          estado: true
        }
      }
    );
  }
});

export const nuevoUsuario = new ValidatedMethod({
  name: "nuevoUsuario",
  validate: new SimpleSchema({
    username: {
      type: String
    },
    password: {
      type: String
    }
  }).validator(),
  run(one) {
    return Accounts.createUser(
      { username: one.username, password: one.password },
      function(err) {
        if (err) console.log(err);
      }
    );

    ContactoPregunta.update(
      { _id: one.id },
      {
        $set: {
          habilitado: true
        }
      }
    );
  }
});

export const updateContactoPreguntaSgte = new ValidatedMethod({
  name: "updateContactoPreguntaSgte",
  validate: new SimpleSchema({
    //idContacto
    id: {
      type: String,
      regEx: SimpleSchema.RegEx.Id
    }
  }).validator(),
  run(one) {
    ContactoPregunta.update(
      { _id: one.id },
      {
        $set: {
          habilitado: true
        }
      }
    );
  }
});

export const insertRespuesta = new ValidatedMethod({
  name: "respuesta.insert",
  validate: new SimpleSchema({
    contactoid: {
      type: String,
      regEx: SimpleSchema.RegEx.Id
    }, //idContacto
    contactopreguntaid: {
      type: String,
      regEx: SimpleSchema.RegEx.Id
    },
    codigo: {
      type: String
    }, //idContacto
    rtaboolean: {
      type: Boolean,
      optional: true
    },
    rtatexto: {
      type: String,
      optional: true
    }, //aca viene libre, número y combo
    rtaFecha: {
      type: Date,
      optional: true
    },
    especifique: {
      type: String,
      optional: true
    }, //aca viene libre, fecha, número y combo
    especifique1: {
      type: String,
      optional: true
    },
    activo: {
      type: Boolean,
      optional: true,
      autoValue: function() {
        return true;
      }
    }, //borrado lógico
    createdBy: {
      type: String,
      optional: true,
      autoValue: function() {
        return this.userId;
      }
    },
    createdAt: {
      type: Date,
      optional: true,
      autoValue: function() {
        return new Date();
      }
    }
  }).validator(),
  run(one) {
    const actual = {
      codigoPregunta: one.codigo,
      rta: one.rtatexto,
      contactoid: one.contactoid
    };
    //mensaje = validarReglaMultipleX(actual);
    var estaDuplicada = respuestaDuplicada(one.contactoid, one.codigo);
    //console.log("estaDuplicada "+estaDuplicada)

    if ((!estaDuplicada)) {
      one.activo = true;
      Respuesta.insert(one);
      return "";
    } else {
      return mensaje;
    }
  }
});

function respuestaDuplicada(contactoid, codigo){
  //codigos de rtas múltiples, estas deben retornar falso
  var multiples = ["1050"];
  estaDuplicada = false;
  if (!(multiples.includes(codigo)))
  {
    var rtas = Respuesta.find({contactoid:contactoid, codigo:codigo}).fetch();
    estaDuplicada = rtas.length > 0;
  }
  return estaDuplicada;
}


export const insertPregunta = new ValidatedMethod({
  name: "pregunta.insert",
  validate: new SimpleSchema({
    pregunta: {
      type: String
    },
    momento: {
      type: Number
    },
    seccion: {
      type: String
    },
    orden: {
      type: Number,
      optional: true
    },
    siguiente: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
      optional: true
    },
    activo: {
      type: Boolean,
      optional: true,
      autoValue: function() {
        return true;
      }
    } //borrado lógico
  }).validator(),
  run(one) {
    one.activo = true;
    Pregunta.insert(one);
  }
});

export const insertRegla = new ValidatedMethod({
  name: "regla.insert",
  validate: new SimpleSchema({
    tipoOrigen: {
      type: String
    },
    condicion: {
      type: Number
    },
    mensaje: {
      type: String
    },
    textoPreguntaOrigen: { type: String },
    textoPreguntaDestino: { type: String },
    codigoPreguntaOrigen: {
      type: String
    }, //idContacto
    rtaOrigen: { type: String },

    tipoDestino: {
      type: String
    },
    codigoPreguntaDestino: {
      type: String
    }, //idContacto
    rtaDestino: { type: String },

    activo: {
      type: Boolean
    }, //borrado lógico
    createdBy: {
      type: String,
      optional: true,
      autoValue: function() {
        return this.userId;
      }
    },
    createdAt: {
      type: Date,
      optional: true,
      autoValue: function() {
        return new Date();
      }
    }
  }).validator(),
  run(one) {
    one.activo = true;
    Regla.insert(one);
  }
});

export const insertReglaMultiple = new ValidatedMethod({
  name: "reglaMultiple.insert",
  validate: new SimpleSchema({
    condicion: {
      type: Number
    },
    mensaje: {
      type: String
    },
    textoPreguntaDestino: { type: String },

    tipoDestino: {
      type: String
    },
    codigoPreguntaDestino: {
      type: String
    }, //idContacto
    rtaDestino: { type: String },

    activo: {
      type: Boolean
    }, //borrado lógico
    createdBy: {
      type: String,
      optional: true,
      autoValue: function() {
        return this.userId;
      }
    },
    createdAt: {
      type: Date,
      optional: true,
      autoValue: function() {
        return new Date();
      }
    }
  }).validator(),
  run(one) {
    one.activo = true;
    var id = ReglaMultiple.insert(one);
    return id;
  }
});

export const insertReglaMultipleDetalle = new ValidatedMethod({
  name: "reglaMultipleDetalle.insert",
  validate: new SimpleSchema({
    reglaid: {
      type: String,
      regEx: SimpleSchema.RegEx.Id
    },
    tipoOrigen: {
      type: String
    },
    condicion: {
      type: Number
    },
    codigoPreguntaOrigen: {
      type: String
    }, //idContacto
    rtaOrigen: { type: String },

    textoPreguntaOrigen: { type: String },
    activo: {
      type: Boolean
    }, //borrado lógico
    createdBy: {
      type: String,
      optional: true,
      autoValue: function() {
        return this.userId;
      }
    },
    createdAt: {
      type: Date,
      optional: true,
      autoValue: function() {
        return new Date();
      }
    }
  }).validator(),
  run(one) {
    one.activo = true;
    ReglaMultipleDetalle.insert(one);
  }
});
export const deleteReglaMultipleDetalle = new ValidatedMethod({
  name: "deleteReglaMultipleDetalle",
  validate: new SimpleSchema({
    id: { type: String, regEx: SimpleSchema.RegEx.Id }
  }).validator(),
  run(one) {
    //console.log("one.contactoid ", one.contactoid);
    return ReglaMultipleDetalle.update(
      { _id: one.id },
      {
        $set: {
          activo: false
        }
      }
    );
  }
});

export const deleteReglaMultiple = new ValidatedMethod({
  name: "deleteReglaMultiple",
  validate: new SimpleSchema({
    id: { type: String, regEx: SimpleSchema.RegEx.Id }
  }).validator(),
  run(one) {
    //console.log("one.contactoid ", one.contactoid);
    //borro los antecedentes que dependan de del consecuente
    ReglaMultipleDetalle.update(
      { reglaid: one.id },
      {
        $set: {
          activo: false
        }
      }
    );

    return ReglaMultiple.update(
      { _id: one.id },
      {
        $set: {
          activo: false
        }
      }
    );
  }
});

export const deleteRegla = new ValidatedMethod({
  name: "deleteRegla",
  validate: new SimpleSchema({
    id: { type: String, regEx: SimpleSchema.RegEx.Id }
  }).validator(),
  run(one) {
    //console.log("one.contactoid ", one.contactoid);
    return Regla.update(
      { _id: one.id },
      {
        $set: {
          activo: false
        }
      }
    );
  }
});

export const updateRespuestaString = new ValidatedMethod({
  name: "updateRespuestaString",
  validate: new SimpleSchema({
    id: { type: String, regEx: SimpleSchema.RegEx.Id },
    rtatexto: { type: String },
    especifique: { type: String },
    codigoPregunta: { type: String },
    contactoId: { type: String, regEx: SimpleSchema.RegEx.Id }
    //activo: { type: Boolean }
  }).validator(),
  run(one) {
    const actual = {
      codigoPregunta: one.codigoPregunta,
      rta: one.rtatexto,
      contactoid: one.contactoId
    };
    mensaje = validarReglaMultipleX(actual);
    if (mensaje == "") {
      Respuesta.update(
        { _id: one.id },
        {
          $set: {
            rtatexto: one.rtatexto,
            especifique: one.especifique
            //activo: one.activo
          }
        }
      );
      return "";
    } else {
      return mensaje;
    }
  }
});

export const deleteILE = new ValidatedMethod({
  name: "deleteILE",
  validate: new SimpleSchema({
    contactoid: { type: String, regEx: SimpleSchema.RegEx.Id }
  }).validator(),
  run(one) {
    //console.log("one.contactoid ", one.contactoid);
    return ContactoPregunta.update(
      {
        contactoid: one.contactoid,
        seccion: "Interrupción Legal e Interrupción Voluntaria del Embarazo"
      },
      {
        $set: {
          activo: false
        }
      },
      { multi: true }
    );
  }
});

export const deleteFEM = new ValidatedMethod({
  name: "deleteFEM",
  validate: new SimpleSchema({
    contactoid: { type: String, regEx: SimpleSchema.RegEx.Id }
  }).validator(),
  run(one) {
    return ContactoPregunta.update(
      {
        contactoid: one.contactoid,
        seccion: "Acompañamiento Aborto Libre y Feminista"
      },
      {
        $set: {
          activo: false
        }
      },
      { multi: true }
    );
  }
});

export const deleteRespuesta = new ValidatedMethod({
  name: "deleteRespuesta",
  validate: new SimpleSchema({
    id: { type: String, regEx: SimpleSchema.RegEx.Id },
    codigo: { type: String }
  }).validator(),
  run(one) {
    return Respuesta.update(
      { contactoid: one.id, codigo: one.codigo },
      {
        $set: {
          activo: false
        }
      },
      { multi: true }
    );
  }
});
export const deleteOneRespuesta = new ValidatedMethod({
  name: "deleteOneRespuesta",
  validate: new SimpleSchema({
    id: { type: String, regEx: SimpleSchema.RegEx.Id }
  }).validator(),
  run(one) {
    return Respuesta.update(
      { _id: one.id },
      {
        $set: {
          activo: false
        }
      }
    );
  }
});
export const updateRespuestaEspecifique = new ValidatedMethod({
  name: "updateRespuestaEspecifique",
  validate: new SimpleSchema({
    id: { type: String, regEx: SimpleSchema.RegEx.Id },
    rtatexto: { type: String },
    rtaFecha: { type: Date },
    especifique: { type: String, optional: true },
    especifique1: { type: String, optional: true },
    activo: { type: Boolean }
  }).validator(),
  run(one) {
    Respuesta.update(
      { _id: one.id },
      {
        $set: {
          rtatexto: one.rtatexto,
          activo: one.activo,
          rtaFecha: one.rtaFecha,
          especifique: one.especifique,
          especifique1: one.especifique1
        }
      }
    );
  }
});

export const deleteContacto = new ValidatedMethod({
  name: "deleteContacto",
  validate: new SimpleSchema({
    id: { type: String, regEx: SimpleSchema.RegEx.Id }
  }).validator(),
  run(one) {
    return Contacto.update(
      { _id: one.id },
      {
        $set: {
          activo: false
        }
      }
    );
  }
});

export const updateRespuestaFecha = new ValidatedMethod({
  name: "updateRespuestaFecha",
  validate: new SimpleSchema({
    id: { type: String, regEx: SimpleSchema.RegEx.Id },
    rtaFecha: { type: Date },
    activo: { type: Boolean }
  }).validator(),
  run(one) {
    Respuesta.update(
      { _id: one.id },
      {
        $set: {
          rtaFecha: one.rtaFecha,
          activo: one.activo
        }
      }
    );
  }
});


function validarReglaMultipleX(preguntaActual) {
  //  console.log(preguntaActual);
  //1- obtener todas las reglas para este CÓDIGO
  var reglasMultiples = ReglaMultiple.find({
    codigoPreguntaDestino: preguntaActual.codigoPregunta,
    activo: true
  }).fetch();
  var i = 0;
  //bandera de antecedentes
  var seValidanAntecedentes = true;
  //bandera de reglas
  var valida = true;
  var mensajeError = "";
  //console.log("reglasMultiples ", reglasMultiples.length);
  while (i < reglasMultiples.length && seValidanAntecedentes && valida) {
    //2- para cada regla recuperar los antecedentes
    //console.log("reglaMultiple _id", reglasMultiples[i]._id);
    var antecedentes = ReglaMultipleDetalle.find({
      reglaid: reglasMultiples[i]._id,
      activo: true
    }).fetch();
    //3- obtener cada rta de ese concecuente y determinar si se cumple las conjunciones
    var j = 0;
    //console.log("antecedentesX ", antecedentes);
    if (antecedentes) {
      while (j < antecedentes.length && seValidanAntecedentes) {
        var laRespuesta = Respuesta.findOne({
          contactoid: preguntaActual.contactoid,
          codigo: antecedentes[j].codigoPreguntaOrigen
        });
        //  console.log("laRespuesta.rtatexto", laRespuesta.rtatexto);
        //  console.log("antecedentes[j].rtaOrigen", antecedentes[j].rtaOrigen);

        seValidanAntecedentes =
          laRespuesta.rtatexto.toUpperCase() ==
          antecedentes[j].rtaOrigen.toUpperCase();
        //  console.log("______", j);
        //  console.log("laRespuesta.rtatexto:", laRespuesta.rtatexto);
        //  console.log("antecedentes[j].rtaOrigen:", antecedentes[j].rtaOrigen);
        j = j + 1;
      }
    }
    //console.log(" seValidanAntecedentes: ", seValidanAntecedentes);
    //4- si se cumplen, validar la rta de la pregunta actual
    //console.log("seValidanAntecedentes", seValidanAntecedentes);
    if (antecedentes && seValidanAntecedentes) {
      switch (reglasMultiples[i].condicion) {
        case 1:
          valida =
            preguntaActual.rta.toUpperCase() ==
            reglasMultiples[i].rtaDestino.toUpperCase();
          break;
        case 2:
          valida = !(
            preguntaActual.rta.toUpperCase() ==
            reglasMultiples[i].rtaDestino.toUpperCase()
          );
          break;
      }
    }

    if (!valida && seValidanAntecedentes) {
      mensajeError = reglasMultiples[i].mensaje;
    }
    i = i + 1;
  }
  //console.log(" mensajeErrorServerX: ", mensajeError);
  return mensajeError;
}
