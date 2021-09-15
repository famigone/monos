//este código tiene que estar disponible en servidor y cliente, para habilitar Optimistic UI.
import { ValidatedMethod } from "meteor/mdg:validated-method";
import ContactoPregunta from "/imports/api/contactoPregunta.js";
import Respuesta from "/imports/api/respuesta.js";
import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
//import { Mongo } from "meteor/mongo";
//import { aggregate } from "me teor/sakulstra:aggregate";

export const insertPregTexto = new ValidatedMethod({
  name: "insertPregTexto",
  validate: new SimpleSchema({
    activo: {
      type: Boolean,
      optional: true,
      autoValue: function() {
        return true;
      }
    }, //borrado lógico
    momento: {
      type: Number,
      optional: true
    },
    //"Info general", "Momento del Aborto", etc
    seccion: {
      type: String,
      optional: true
    },
    autonumerico: {
      type: Number,
      optional: true,
      autoValue: function() {
        return Contacto.find().count() + 1;
      }
    },
    createdBy: {
      type: String,
      optional: true,
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
  }).validator(),
  run(one) {
    one.activo = true;
    one.createdBy = Meteor.userId();
    one.tipo = 3; //texto
    var contactoid;
    contactoid = Contacto.insert(one);
    // console.log("TATATATA", contactoid);
    //C: choices, F: fecha, L: libre, B: boolean
    //pregunta0
    var pregunta = {
      momento: 1,
      seccion: "TEXTUAL",
      codigo: "3000",
      orden: 3000,
      contactoid: contactoid,
      texto: "¿Cuál actividad hicimos?",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "TEXTUAL",
      codigo: "3010",
      orden: 3010,
      contactoid: contactoid,
      texto: "¿En qué fecha hicimos la actividad?",
      estado: false,
      tipo: "F",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "TEXTUAL",
      codigo: "3020",
      orden: 3020,
      contactoid: contactoid,
      texto: "Del 1 (poco) al 5 (mucho) ¿cuánto interviniste en la resolución?",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "TEXTUAL",
      codigo: "3030",
      orden: 3030,
      contactoid: contactoid,
      texto: "Del 1 (poco) al 5 (mucho) ¿cuánto de divertida sentís que le resultó a tu niñe?",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "TEXTUAL",
      codigo: "3040",
      orden: 3040,
      contactoid: contactoid,
      texto: "¿Logramos resolver de la actividad?",
      estado: false,
      tipo: "B",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "TEXTUAL",
      codigo: "3050",
      orden: 3050,
      contactoid: contactoid,
      texto: "¿Tuvimos alguna de estas dificultades?",
      estado: false,
      tipo: "M",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "TEXTUAL",
      codigo: "3060",
      orden: 3060,
      contactoid: contactoid,
      estado: false,
      texto: "¿Cuánto duró la experiencia?",
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "TEXTUAL",
      codigo: "3070",
      orden: 3070,
      contactoid: contactoid,
      texto: "¿En que momento del día se realizó la experiencia?",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);



    var pregunta = {
      momento: 1,
      seccion: "TEXTUAL",
      codigo: "3080",
      orden: 3080,
      contactoid: contactoid,
      texto: "¿En esta experiencia, cuántas veces se repitió la actividad?",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "TEXTUAL",
      codigo: "3090",
      orden: 3090,
      contactoid: contactoid,
      texto: "¿Cuales distractores estaban presentes en el ambiente mientras transcurría la experiencia?",
      estado: false,
      tipo: "M",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);
    var pregunta = {
      momento: 1,
      seccion: "TEXTUAL",
      codigo: "3100",
      orden: 3100,
      contactoid: contactoid,
      texto: "Del 1 (bajo) al 5 (alto) ¿tuvimos problemas con la motricidad fina del uso del teclado?",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);
    var pregunta = {
      momento: 1,
      seccion: "TEXTUAL",
      codigo: "3110",
      orden: 3110,
      contactoid: contactoid,
      texto: "¿Finalizada esta experiencia, cuál será nuestro siguiente paso?",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    ///////////////////////////////
    ///////////////////////////////
    ///////////////////////////////
    ///////////////////////////////
    ///////////////////////////////
    ///////////////////////////////
    ///////////////////////////////
    ///////////////////////////////
    ///////////////////////////////
    return contactoid;
  }
});
