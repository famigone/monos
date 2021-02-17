import { Mongo } from "meteor/mongo";

import { SimpleSchema } from "meteor/aldeed:simple-schema";

export default (ContactoPregunta = new Mongo.Collection("contactopregunta"));

ContactoPregunta.schema = new SimpleSchema({
  codigo: {
    type: String
  }, //código de pregunta...
  orden: {
    type: Number,
    optional: true
  },
  //1, 2 o 3
  momento: {
    type: Number
  },
  //"Info general", "Momento del Aborto", etc
  seccion: {
    type: String
  },
  texto: {
    type: String
  }, //código de pregunta...
  tipo: {
    type: String
  }, //L texto libre, F fecha, N número, C combo, M múltiple, B boolean
  contactoid: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  }, //idContacto
  estado: {
    type: Boolean
  },
  habilitado: {
    type: Boolean
  },
  activo: {
    type: Boolean,
    optional: true
  }
});

ContactoPregunta.attachSchema(ContactoPregunta.schema);
