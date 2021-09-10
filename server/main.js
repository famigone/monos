import { Meteor } from "meteor/meteor";

import "/api/methods.js";
import "/api/insertPreguntasMujer.js";
import "/api/insertPreguntasNena.js";
import "/api/insertPreguntasNenaSegundoFem.js";
import "/api/insertPreguntasNenaSegundoILE.js";
import "/api/server/publications.js";
import "../imports/api/pregunta.js";
import "../imports/api/contacto.js";
import "../imports/api/contactoPregunta.js";
import "../imports/api/respuesta.js";
import "../imports/api/regla.js";
import "../imports/api/reglaMultiple.js";
import "../imports/api/reglaMultipleDetalle.js";
import "/api/insertPreguntasTangible.js";
import "/api/insertPreguntasBloques.js";
import "/api/insertPreguntasTexto.js";

Meteor.startup(() => {
  //let server = Meteor.settings.mqttHost;

  //  Events.mqttConnect(server, ["nivel/+"], { insert: true });

  /**
   * Timestamp the data
   */ Accounts._options.forbidClientAccountCreation = false;

  // If the Links collection is empty, add some data.
});
