import { Mongo } from "meteor/mongo";

import { SimpleSchema } from "meteor/aldeed:simple-schema";

export default (Regla = new Mongo.Collection("regla"));

Regla.schema = new SimpleSchema({
  //si es niñeces, +18, 1er momento, 2do momento,
  tipoOrigen: {
    type: String
  },
  condicion: {
    type: Number
  },
  mensaje: {
    type: String
  },
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
  textoPreguntaOrigen: { type: String },
  textoPreguntaDestino: { type: String },
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
});

Regla.attachSchema(Regla.schema);
