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

Respuesta.helpers({
  userName() {
    return ContactoPregunta.findOne(this.contactopreguntaid).userName();
  },
  pregunta() {
    return ContactoPregunta.findOne(this.contactopreguntaid).texto;
  },
  momento() {
    return ContactoPregunta.findOne(this.contactopreguntaid).momento;
  },
  seccion() {
    return ContactoPregunta.findOne(this.contactopreguntaid).seccion;
  },
  fechaProto() {
    return ContactoPregunta.findOne(this.contactopreguntaid).fechaProto();
  },
  numero() {
    return ContactoPregunta.findOne(this.contactopreguntaid).numero();
  },
  tipo() {
    return ContactoPregunta.findOne(this.contactopreguntaid).tipox();
  },
  activox() {
    return ContactoPregunta.findOne(this.contactopreguntaid).activo;
  },
  contactoActivo() {
    return ContactoPregunta.findOne(this.contactopreguntaid).contactoActivo();
  }
});

Respuesta.attachSchema(Respuesta.schema);
