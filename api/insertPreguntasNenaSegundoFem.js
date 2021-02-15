//este código tiene que estar disponible en servidor y cliente, para habilitar Optimistic UI.
import { ValidatedMethod } from "meteor/mdg:validated-method";
import ContactoPregunta from "/imports/api/contactoPregunta.js";
import Respuesta from "/imports/api/respuesta.js";
import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
//import { Mongo } from "meteor/mongo";
//import { aggregate } from "me teor/sakulstra:aggregate";

export const insertPregNenaSegundoFem = new ValidatedMethod({
  name: "insertPregNenaSegundoFem",
  validate: new SimpleSchema({
    contactoid: {
      type: String,
      regEx: SimpleSchema.RegEx.Id
    } //idContacto
  }).validator(),
  run(one) {
    var contactoid;
    contactoid = one.contactoid;

    var pregunta = {
      momento: 2,
      seccion: "Acompañamiento Aborto Libre y Feminista",
      codigo: "520",
      orden: 520,
      contactoid: contactoid,
      texto: "Semanas de gestación al momento del uso",
      estado: false,
      tipo: "C",
      habilitado: false
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 2,
      seccion: "Acompañamiento Aborto Libre y Feminista",
      codigo: "530",
      orden: 530,
      contactoid: contactoid,
      texto: "Medicamento utilizado",
      estado: false,
      tipo: "C",
      habilitado: false
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 2,
      seccion: "Acompañamiento Aborto Libre y Feminista",
      codigo: "540",
      orden: 540,
      contactoid: contactoid,
      texto:
        "¿Estás acompañadx al momento del uso de la medicación por alguien que sabe que estás abortando?",
      estado: false,
      tipo: "C",
      habilitado: false
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 2,
      seccion: "Acompañamiento Aborto Libre y Feminista",
      codigo: "550",
      orden: 550,
      contactoid: contactoid,
      texto: "Sobre la expulsión",
      estado: false,
      tipo: "C",
      habilitado: false
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 2,
      seccion: "Acompañamiento Aborto Libre y Feminista",
      codigo: "560",
      orden: 560,
      contactoid: contactoid,
      texto:
        "¿Se comunica con su acompañante de la colectiva durante el uso de la medicación?",
      estado: false,
      tipo: "C",
      habilitado: false
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 2,
      seccion: "Acompañamiento Aborto Libre y Feminista",
      codigo: "570",
      orden: 570,
      contactoid: contactoid,
      texto:
        "¿Concurrió a guardia médica dentro de las 72 hs del uso de la medicación? ",
      estado: false,
      tipo: "B",
      habilitado: false
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 2,
      seccion: "Acompañamiento Aborto Libre y Feminista",
      codigo: "580",
      orden: 580,
      contactoid: contactoid,
      texto: "¿Le contó al personal de salud que usó medicación?",
      estado: false,
      tipo: "B",
      habilitado: false
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 2,
      seccion: "Acompañamiento Aborto Libre y Feminista",
      codigo: "590",
      orden: 590,
      contactoid: contactoid,
      texto: "¿Cómo fue en tratadx en la guardia médica? ",
      estado: false,
      tipo: "C",
      habilitado: false
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 2,
      seccion: "Acompañamiento Aborto Libre y Feminista",
      codigo: "600",
      orden: 600,
      contactoid: contactoid,
      texto: "¿Cómo fue en tratadx en la guardia médica?",
      estado: false,
      tipo: "C",
      habilitado: false
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 2,
      seccion: "Acompañamiento Aborto Libre y Feminista",
      codigo: "610",
      orden: 610,
      contactoid: contactoid,
      texto: "¿Concurrió a control médico post-aborto?",
      estado: false,
      tipo: "C",
      habilitado: false
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 2,
      seccion: "Acompañamiento Aborto Libre y Feminista",
      codigo: "620",
      orden: 620,
      contactoid: contactoid,
      texto: "¿Culminó el proceso con método anticonceptivo?",
      estado: false,
      tipo: "C",
      habilitado: false
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 2,
      seccion: "Acompañamiento Aborto Libre y Feminista",
      codigo: "630",
      orden: 630,
      contactoid: contactoid,
      texto: "¿Cuál?",
      estado: false,
      tipo: "C",
      habilitado: false
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 2,
      seccion: "Acompañamiento Aborto Libre y Feminista",
      codigo: "640",
      orden: 640,
      contactoid: contactoid,
      texto: "¿Abortó?",
      estado: false,
      tipo: "C",
      habilitado: false
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
