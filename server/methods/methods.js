import { Meteor } from "meteor/meteor";
import { _ } from "meteor/underscore";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { DDPRateLimiter } from "meteor/ddp-rate-limiter";

Meteor.publish("locations", function() {
  return Locations.find({ activo: true });
});

Meteor.publish("wells", function(dl) {
  return Wells.find({ activo: true, drylocation: dl });
});

export const insertLocacion = new ValidatedMethod({
  name: "locacion.insert",
  validate: new SimpleSchema({
    codigo: { type: String },
    latitud: { type: String },
    longitud: { type: String },
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
    //console.log(oneTask)
    one.activo = true;
    Locaciones.insert(one);
  }
});

const TODOS_METHODS = _.pluck([insertLocacion], "name");

if (Meteor.isServer) {
  // Only allow 5 todos operations per connection per second
  DDPRateLimiter.addRule(
    {
      name(name) {
        return _.contains(TODOS_METHODS, name);
      },

      // Rate limit per connection ID
      connectionId() {
        return true;
      }
    },
    50,
    1000
  );
}
