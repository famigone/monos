//este código tiene que estar disponible en servidor y cliente, para habilitar Optimistic UI.
import { ValidatedMethod } from "meteor/mdg:validated-method";
import ContactoPregunta from "/imports/api/contactoPregunta.js";
import Respuesta from "/imports/api/respuesta.js";
import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
//import { Mongo } from "meteor/mongo";
//import { aggregate } from "me teor/sakulstra:aggregate";

export const insertPregBloques = new ValidatedMethod({
  name: "insertPregBloques",
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
    one.tipo = 2; //mujer
    var contactoid;
    contactoid = Contacto.insert(one);
    // console.log("TATATATA", contactoid);
    //C: choices, F: fecha, L: libre, B: boolean
    //pregunta0
    var pregunta = {
      momento: 1,
      seccion: "BLOQUES",
      codigo: "2000",
      orden: 2000,
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
      seccion: "BLOQUES",
      codigo: "2010",
      orden: 2010,
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
      seccion: "BLOQUES",
      codigo: "2020",
      orden: 2020,
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
      seccion: "BLOQUES",
      codigo: "2030",
      orden: 2030,
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
      seccion: "BLOQUES",
      codigo: "2040",
      orden: 2040,
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
      seccion: "BLOQUES",
      codigo: "2050",
      orden: 2050,
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
      seccion: "BLOQUES",
      codigo: "2060",
      orden: 2060,
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
      seccion: "BLOQUES",
      codigo: "2070",
      orden: 2070,
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
      seccion: "BLOQUES",
      codigo: "2080",
      orden: 2080,
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
      seccion: "BLOQUES",
      codigo: "2090",
      orden: 2090,
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
      seccion: "BLOQUES",
      codigo: "2100",
      orden: 2100,
      contactoid: contactoid,
      texto: "Del 1 (bajo) al 5 (alto) ¿tuvimos problemas con la motricidad fina del uso del mouse (ratón) de la computadora?",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);
    var pregunta = {
      momento: 1,
      seccion: "BLOQUES",
      codigo: "2110",
      orden: 2110,
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
