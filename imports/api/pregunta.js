import { Mongo } from "meteor/mongo";

import { SimpleSchema } from "meteor/aldeed:simple-schema";

export default (Pregunta = new Mongo.Collection("pregunta"));

Pregunta.schema = new SimpleSchema({
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
});

Pregunta.attachSchema(Pregunta.schema);
