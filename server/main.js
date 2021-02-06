import { Meteor } from "meteor/meteor";

import "/api/methods.js";
import "/api/server/publications.js";
import "../imports/api/pregunta.js";
import "../imports/api/contacto.js";
import "../imports/api/contactoPregunta.js";
import "../imports/api/respuesta.js";

Meteor.startup(() => {
  //let server = Meteor.settings.mqttHost;

  //  Events.mqttConnect(server, ["nivel/+"], { insert: true });

  /**
   * Timestamp the data
   */ Accounts._options.forbidClientAccountCreation = false;

  // If the Links collection is empty, add some data.
});
