import { Mongo } from "meteor/mongo";
import { SimpleSchema } from "meteor/aldeed:simple-schema";

export default (Contacto = new Mongo.Collection("contacto"));

Contacto.schema = new SimpleSchema({
  activo: {
    type: Boolean,
    optional: true
  }, //borrado lógico
  tipo: {
    type: Number,
    optional: true
  }, //1 nena, 2 mujer
  autonumerico: {
    type: Number,
    optional: true,
    autoValue: function() {
      return Contacto.find().count() + 1;
    }
  },
  createdBy: {
    type: String,
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
});

Contacto.helpers({
  userName() {
    return Meteor.users.findOne(this.createdBy).username;
  }
});

Contacto.attachSchema(Contacto.schema);
