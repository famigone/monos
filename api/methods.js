//este código tiene que estar disponible en servidor y cliente, para habilitar Optimistic UI.
import { ValidatedMethod } from "meteor/mdg:validated-method";
import ContactoPregunta from "/imports/api/contactoPregunta.js";
import Respuesta from "/imports/api/respuesta.js";
import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
//import { Mongo } from "meteor/mongo";
//import { aggregate } from "meteor/sakulstra:aggregate";

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
    if (bol) {
      const rta = Respuesta.find({
        codigo: one.codigo,
        rtatexto: one.rta,
        activo: true,
        createdAt: {
          $gte: desde,
          $lte: hasta
        }
      }).count();
      return rta;
    } else {
      const rta = Respuesta.find({
        codigo: one.codigo,
        rtatexto: one.rta,
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
    one.activo = true;
    return Respuesta.insert(one);
  }
});

export const insertPregunta = new ValidatedMethod({
  name: "pregunta.insert",
  validate: new SimpleSchema({
    pregunta: {
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

export const updateRespuestaString = new ValidatedMethod({
  name: "updateRespuestaString",
  validate: new SimpleSchema({
    id: { type: String, regEx: SimpleSchema.RegEx.Id },
    rtatexto: { type: String }
    //activo: { type: Boolean }
  }).validator(),
  run(one) {
    Respuesta.update(
      { _id: one.id },
      {
        $set: {
          rtatexto: one.rtatexto
          //activo: one.activo
        }
      }
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

export const insertContacto = new ValidatedMethod({
  name: "contacto.insert",
  validate: new SimpleSchema({
    activo: {
      type: Boolean,
      optional: true,
      autoValue: function() {
        return true;
      }
    }, //borrado lógico
    autonumerico: {
      type: Number,
      optional: true,
      autoValue: function() {
        return Contacto.find().count() + 1;
      }
    },
    createdBy: {
      type: String,
      optional: true,
      autoValue: function() {
        return Meteor.userId();
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
    one.createdBy = Meteor.userId();
    var contactoid;
    contactoid = Contacto.insert(one);

    //pregunta10
    var pregunta = {
      codigo: "0",
      orden: 0,
      contactoid: contactoid,
      texto: "Atención a cargo de:",
      estado: false,
      tipo: "L",
      habilitado: true
    };
    ContactoPregunta.insert(pregunta);

    //pregunta20
    var pregunta = {
      codigo: "1",
      orden: 10,
      contactoid: contactoid,
      texto: "Fecha de llamada",
      estado: false,
      tipo: "F",
      habilitado: false
    };
    ContactoPregunta.insert(pregunta);

    //pregunta30
    var pregunta = {
      codigo: "2",
      orden: 20,
      contactoid: contactoid,
      texto: "Motivo",
      estado: false,
      tipo: "C",
      habilitado: false
    };
    ContactoPregunta.insert(pregunta);

    //pregunta30
    var pregunta = {
      codigo: "4",
      orden: 40,
      contactoid: contactoid,
      texto: "Nombre de Pila",
      estado: false,
      tipo: "L",
      habilitado: false
    };
    ContactoPregunta.insert(pregunta);
    //pregunta30
    var pregunta = {
      codigo: "5",
      orden: 50,
      contactoid: contactoid,
      texto: "Cómo te identificas?",
      estado: false,
      tipo: "C",
      habilitado: false
    };
    ContactoPregunta.insert(pregunta);
    //pregunta30
    var pregunta = {
      codigo: "6",
      orden: 60,
      contactoid: contactoid,
      texto: "Provincia desde donde llama",
      estado: false,
      tipo: "C",
      habilitado: false
    };
    ContactoPregunta.insert(pregunta);
    //pregunta30
    var pregunta = {
      codigo: "7",
      orden: 70,
      contactoid: contactoid,
      texto: "Ciudad desde donde está llamando",
      estado: false,
      tipo: "L",
      habilitado: false
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      codigo: "8",
      orden: 80,
      contactoid: contactoid,
      texto: "Zona",
      estado: false,
      tipo: "C",
      habilitado: false
    };
    ContactoPregunta.insert(pregunta);
    //pregunta30
    var pregunta = {
      codigo: "9",
      orden: 90,
      contactoid: contactoid,
      texto: "¿Reside en la ciudad capital?",
      estado: false,
      tipo: "B",
      habilitado: false
    };
    ContactoPregunta.insert(pregunta);
    //pregunta30
    var pregunta = {
      codigo: "10",
      orden: 100,
      contactoid: contactoid,
      texto: "Edad",
      estado: false,
      tipo: "L",
      habilitado: false
    };
    ContactoPregunta.insert(pregunta);
    //pregunta30
    var pregunta = {
      codigo: "11",
      orden: 110,
      contactoid: contactoid,
      texto: "Estudia?",
      estado: false,
      tipo: "B",
      habilitado: false
    };
    ContactoPregunta.insert(pregunta);
    //pregunta30
    var pregunta = {
      codigo: "12",
      orden: 120,
      contactoid: contactoid,
      texto: "¿Tiene trabajo remunerado?",
      estado: false,
      tipo: "B",
      habilitado: false
    };
    ContactoPregunta.insert(pregunta);
    //pregunta30
    var pregunta = {
      codigo: "13",
      orden: 130,
      contactoid: contactoid,
      texto: "Hijxs",
      estado: false,
      tipo: "C", //porque si responde SI tiene un campo adicional, por eso no la hice boolean
      habilitado: false
    };
    ContactoPregunta.insert(pregunta);
    //pregunta30
    var pregunta = {
      codigo: "14",
      orden: 140,
      contactoid: contactoid,
      texto: "¿Tiene obra social?",
      estado: false,
      tipo: "B",
      habilitado: false
    };
    ContactoPregunta.insert(pregunta);
    //pregunta30
    var pregunta = {
      codigo: "15",
      orden: 150,
      contactoid: contactoid,
      texto: "¿Con quién convive?",
      estado: false,
      tipo: "C",
      habilitado: false
    };
    ContactoPregunta.insert(pregunta);
    //pregunta30
    var pregunta = {
      codigo: "16",
      orden: 160,
      contactoid: contactoid,
      texto: "¿Le contó a alguien de su entorno que quiere abortar?",
      estado: false,
      tipo: "C",
      habilitado: false
    };
    ContactoPregunta.insert(pregunta);
    //pregunta30
    var pregunta = {
      codigo: "17",
      orden: 170,
      contactoid: contactoid,
      texto: "¿Cómo consiguió nuestro número o contacto?",
      estado: false,
      tipo: "C",
      habilitado: false
    };
    ContactoPregunta.insert(pregunta);
    //pregunta30
    var pregunta = {
      codigo: "18",
      orden: 180,
      contactoid: contactoid,
      texto: "Método de comprobación de embarazo",
      estado: false,
      tipo: "C",
      habilitado: false
    };
    ContactoPregunta.insert(pregunta);
    //pregunta30
    var pregunta = {
      codigo: "19",
      orden: 190,
      contactoid: contactoid,
      texto: "¿Sabe la edad gestacional?",
      estado: false,
      tipo: "C",
      habilitado: false
    };
    ContactoPregunta.insert(pregunta);
    //pregunta30
    var pregunta = {
      codigo: "20",
      orden: 200,
      contactoid: contactoid,
      texto:
        "¿Cuánto tiempo pasó desde que decidió abortar hasta que logró encontrar nuestro número?",
      estado: false,
      tipo: "C",
      habilitado: false
    };
    ContactoPregunta.insert(pregunta);
    //pregunta30
    var pregunta = {
      codigo: "21",
      orden: 210,
      contactoid: contactoid,
      texto: "¿Hubo algo que le atrasó en llamar a esta línea?",
      estado: false,
      tipo: "C",
      habilitado: false
    };
    ContactoPregunta.insert(pregunta);
    //pregunta30
    var pregunta = {
      codigo: "22",
      orden: 220,
      contactoid: contactoid,
      texto: "¿Abortó antes?",
      estado: false,
      tipo: "C",
      habilitado: false
    };
    ContactoPregunta.insert(pregunta);
    //pregunta30
    var pregunta = {
      codigo: "23",
      orden: 230,
      contactoid: contactoid,
      texto: "INDICACIÓN:",
      estado: false,
      tipo: "C",
      habilitado: false
    };
    ContactoPregunta.insert(pregunta);
    var pregunta = {
      codigo: "24",
      orden: 240,
      contactoid: contactoid,
      texto: "Hora de la llamada",
      estado: false,
      tipo: "C",
      habilitado: false
    };
    ContactoPregunta.insert(pregunta);
    //pregunta30
    var pregunta = {
      codigo: "25",
      orden: 250,
      contactoid: contactoid,
      texto: "Duración de llamada (en minutos) y observaciones:",
      estado: false,
      tipo: "L",
      habilitado: false
    };
    ContactoPregunta.insert(pregunta);

    return contactoid;
  }
});
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
