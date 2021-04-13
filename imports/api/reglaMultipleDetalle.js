import { Mongo } from "meteor/mongo";

import { SimpleSchema } from "meteor/aldeed:simple-schema";

export default (ReglaMultipleDetalle = new Mongo.Collection(
  "reglaMultipleDetalle"
));

ReglaMultipleDetalle.schema = new SimpleSchema({
  //si es niñeces, +18, 1er momento, 2do momento,
  reglaid: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  tipoOrigen: {
    type: String
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
  condicion: {
    type: Number
  },
  createdAt: {
    type: Date,
    optional: true,
    autoValue: function() {
      return new Date();
    }
  }
});

ReglaMultipleDetalle.attachSchema(ReglaMultipleDetalle.schema);
