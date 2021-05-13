//este código tiene que estar disponible en servidor y cliente, para habilitar Optimistic UI.
import { ValidatedMethod } from "meteor/mdg:validated-method";
import ContactoPregunta from "/imports/api/contactoPregunta.js";
import Respuesta from "/imports/api/respuesta.js";
import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
//import { Mongo } from "meteor/mongo";
//import { aggregate } from "me teor/sakulstra:aggregate";

export const deletePregNenaSegundoFem = new ValidatedMethod({
  name: "deletePregNenaSegundoFem",
  validate: new SimpleSchema({
    contactoid: { type: String, regEx: SimpleSchema.RegEx.Id }
  }).validator(),
  run(one) {
    //console.log("one.contactoid ", one.contactoid);
    return ContactoPregunta.update(
      {
        contactoid: one.contactoid,
        seccion: "Acompañamiento Aborto Libre y Feminista"
      },
      {
        $set: {
          activo: false
        }
      },
      { multi: true }
    );
  }
});

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
      codigo: "680",
      orden: 680,
      contactoid: contactoid,
      texto: "Medicamento utilizado",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 2,
      seccion: "Acompañamiento Aborto Libre y Feminista",
      codigo: "690",
      orden: 690,
      contactoid: contactoid,
      texto:
        "¿Estás acompañadx al momento del uso de la medicación por alguien que sabe que estás abortando?",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 2,
      seccion: "Acompañamiento Aborto Libre y Feminista",
      codigo: "700",
      orden: 700,
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
      seccion: "Acompañamiento Aborto Libre y Feminista",
      codigo: "710",
      orden: 710,
      contactoid: contactoid,
      texto: "Expulsa saco gestacional",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };

    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 2,
      seccion: "Acompañamiento Aborto Libre y Feminista",
      codigo: "720",
      orden: 720,
      contactoid: contactoid,
      texto: "Expulsa en bloque en el segundo trimestre",
      estado: false,
      tipo: "B",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 2,
      seccion: "Acompañamiento Aborto Libre y Feminista",
      codigo: "730",
      orden: 730,
      contactoid: contactoid,
      texto: "Rompe bolsa en el segundo trimestre",
      estado: false,
      tipo: "B",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 2,
      seccion: "Acompañamiento Aborto Libre y Feminista",
      codigo: "740",
      orden: 740,
      contactoid: contactoid,
      texto: "Expulsa el feto en el segundo trimestre",
      estado: false,
      tipo: "B",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 2,
      seccion: "Acompañamiento Aborto Libre y Feminista",
      codigo: "750",
      orden: 750,
      contactoid: contactoid,
      texto: "Expulsa placenta en el segundo trimestre",
      estado: false,
      tipo: "B",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 2,
      seccion: "Acompañamiento Aborto Libre y Feminista",
      codigo: "760",
      orden: 760,
      contactoid: contactoid,
      texto:
        "¿Se comunica con su acompañante de la colectiva durante el uso de la medicación?",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 2,
      seccion: "Acompañamiento Aborto Libre y Feminista",
      codigo: "770",
      orden: 770,
      contactoid: contactoid,
      texto:
        "¿Concurrió a guardia médica dentro de las 72 hs del uso de la medicación? ",
      estado: false,
      tipo: "B",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 2,
      seccion: "Acompañamiento Aborto Libre y Feminista",
      codigo: "780",
      orden: 780,
      contactoid: contactoid,
      texto: "¿Le contó al personal de salud que usó medicación?",
      estado: false,
      tipo: "B",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 2,
      seccion: "Acompañamiento Aborto Libre y Feminista",
      codigo: "790",
      orden: 790,
      contactoid: contactoid,
      texto: "¿Cómo fue en tratadx en la guardia médica?",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 2,
      seccion: "Acompañamiento Aborto Libre y Feminista",
      codigo: "800",
      orden: 800,
      contactoid: contactoid,
      texto: "¿Concurrió a control médico post-aborto?",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 2,
      seccion: "Acompañamiento Aborto Libre y Feminista",
      codigo: "810",
      orden: 810,
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
      seccion: "Acompañamiento Aborto Libre y Feminista",
      codigo: "820",
      orden: 820,
      contactoid: contactoid,
      texto: "¿Cuál?",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 2,
      seccion: "Acompañamiento Aborto Libre y Feminista",
      codigo: "830",
      orden: 830,
      contactoid: contactoid,
      texto: "¿Abortó?",
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
