//este código tiene que estar disponible en servidor y cliente, para habilitar Optimistic UI.
import { ValidatedMethod } from "meteor/mdg:validated-method";
import ContactoPregunta from "/imports/api/contactoPregunta.js";
import Respuesta from "/imports/api/respuesta.js";
import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
//import { Mongo } from "meteor/mongo";
//import { aggregate } from "me teor/sakulstra:aggregate";

export const insertPregTangible = new ValidatedMethod({
  name: "insertPregTangible",
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
    one.tipo = 1; //mujer
    var contactoid;
    contactoid = Contacto.insert(one);
    // console.log("TATATATA", contactoid);
    //C: choices, F: fecha, L: libre, B: boolean
    //pregunta0
    var pregunta = {
      momento: 1,
      seccion: "TANGIBLE",
      codigo: "1000",
      orden: 1000,
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
      seccion: "TANGIBLE",
      codigo: "1010",
      orden: 1010,
      contactoid: contactoid,
      texto: "¿En cual fecha hicimos la actividad?",
      estado: false,
      tipo: "F",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "TANGIBLE",
      codigo: "1020",
      orden: 1020,
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
      seccion: "TANGIBLE",
      codigo: "1030",
      orden: 1030,
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
      seccion: "TANGIBLE",
      codigo: "1040",
      orden: 1040,
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
      seccion: "TANGIBLE",
      codigo: "1050",
      orden: 1050,
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
      seccion: "TANGIBLE",
      codigo: "1060",
      orden: 1060,
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
      seccion: "TANGIBLE",
      codigo: "1070",
      orden: 1070,
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
      seccion: "TANGIBLE",
      codigo: "1080",
      orden: 1080,
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
      seccion: "TANGIBLE",
      codigo: "1090",
      orden: 1090,
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
      seccion: "TANGIBLE",
      codigo: "1100",
      orden: 1100,
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
