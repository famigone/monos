//este código tiene que estar disponible en servidor y cliente, para habilitar Optimistic UI.
import { ValidatedMethod } from "meteor/mdg:validated-method";
import ContactoPregunta from "/imports/api/contactoPregunta.js";
import Respuesta from "/imports/api/respuesta.js";
import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
//import { Mongo } from "meteor/mongo";
//import { aggregate } from "me teor/sakulstra:aggregate";

export const insertPregNenaSegundoILE = new ValidatedMethod({
  name: "insertPregNenaSegundoILE",
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
      seccion: "Interrupción Legal e Interrupción Voluntaria del Embarazo",
      codigo: "520",
      orden: 520,
      contactoid: contactoid,
      texto:
        "Al momento de la solicitud de ILE/IVE: ¿Está acompañadx presencialmente por alguien?",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 2,
      seccion: "Interrupción Legal e Interrupción Voluntaria del Embarazo",
      codigo: "530",
      orden: 530,
      contactoid: contactoid,
      texto: "Concurrió a",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 2,
      seccion: "Interrupción Legal e Interrupción Voluntaria del Embarazo",
      codigo: "540",
      orden: 540,
      contactoid: contactoid,
      texto: "Accedió a un aborto",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 2,
      seccion: "Interrupción Legal e Interrupción Voluntaria del Embarazo",
      codigo: "550",
      orden: 550,
      contactoid: contactoid,
      texto: "¿Firmó el consentimiento informado?",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 2,
      seccion: "Interrupción Legal e Interrupción Voluntaria del Embarazo",
      codigo: "560",
      orden: 560,
      contactoid: contactoid,
      texto: "Semanas de gestación al momento del uso",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 2,
      seccion: "Interrupción Legal e Interrupción Voluntaria del Embarazo",
      codigo: "570",
      orden: 570,
      contactoid: contactoid,
      texto: "¿Lx internaron para acceder al aborto?",
      estado: false,
      tipo: "B",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 2,
      seccion: "Interrupción Legal e Interrupción Voluntaria del Embarazo",
      codigo: "580",
      orden: 580,
      contactoid: contactoid,
      texto: "Método utilizado para abortar/ interrumpir el embarazo",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 2,
      seccion: "Interrupción Legal e Interrupción Voluntaria del Embarazo",
      codigo: "590",
      orden: 590,
      contactoid: contactoid,
      texto:
        "¿Consideramos que recibió indicaciones del uso de la medicación según el protocolo de la OMS?",
      estado: false,
      tipo: "B",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 2,
      seccion: "Interrupción Legal e Interrupción Voluntaria del Embarazo",
      codigo: "600",
      orden: 600,
      contactoid: contactoid,
      texto: "¿Considera que recibió la información que necesitaba?",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 2,
      seccion: "Interrupción Legal e Interrupción Voluntaria del Embarazo",
      codigo: "610",
      orden: 610,
      contactoid: contactoid,
      texto: "¿Se sintió escuchadx?",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 2,
      seccion: "Interrupción Legal e Interrupción Voluntaria del Embarazo",
      codigo: "620",
      orden: 620,
      contactoid: contactoid,
      texto: "¿Cómo se sintió tratadx?",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 2,
      seccion: "Interrupción Legal e Interrupción Voluntaria del Embarazo",
      codigo: "630",
      orden: 630,
      contactoid: contactoid,
      texto: "¿Abortó?",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 2,
      seccion: "Interrupción Legal e Interrupción Voluntaria del Embarazo",
      codigo: "640",
      orden: 640,
      contactoid: contactoid,
      texto: "¿Accedió al aborto de manera gratuita?",
      estado: false,
      tipo: "B",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 2,
      seccion: "Interrupción Legal e Interrupción Voluntaria del Embarazo",
      codigo: "650",
      orden: 650,
      contactoid: contactoid,
      texto: "¿Concurrió/se realizó control médico post-aborto?",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 2,
      seccion: "Interrupción Legal e Interrupción Voluntaria del Embarazo",
      codigo: "660",
      orden: 660,
      contactoid: contactoid,
      texto: "¿Culminó el proceso con método anticonceptivo?",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 2,
      seccion: "Interrupción Legal e Interrupción Voluntaria del Embarazo",
      codigo: "670",
      orden: 670,
      contactoid: contactoid,
      texto: "¿Cuál?",
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
