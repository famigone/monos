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

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
