import { Mongo } from "meteor/mongo";

import { SimpleSchema } from "meteor/aldeed:simple-schema";

export default (ReglaMultiple = new Mongo.Collection("reglaMultiple"));

ReglaMultiple.schema = new SimpleSchema({
  //si es niñeces, +18, 1er momento, 2do momento,
  tipoDestino: {
    type: String
  },

  codigoPreguntaDestino: {
    type: String
  },

  rtaDestino: { type: String },

  textoPreguntaDestino: { type: String },

  condicion: {
    type: Number
  },

  mensaje: {
    type: String
  },

  activo: {
    type: Boolean
  },

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

ReglaMultiple.attachSchema(ReglaMultiple.schema);
