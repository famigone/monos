import { Mongo } from "meteor/mongo";

import { SimpleSchema } from "meteor/aldeed:simple-schema";

export default Respuesta = new Mongo.Collection("respuesta");

Respuesta.schema = new SimpleSchema({
  contactoid: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  }, //idContacto
  contactopreguntaid: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  }, //idContacto
  codigo: {
    type: String
  },
  rtaboolean: {
    type: Boolean,
    optional: true
  },
  rtatexto: {
    type: String,
    optional: true
  }, //aca viene libre, fecha, número y combo
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
  }, //aca viene libre, fecha, número y combo

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

Respuesta.attachSchema(Respuesta.schema);
