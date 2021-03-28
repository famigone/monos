//este código tiene que estar disponible en servidor y cliente, para habilitar Optimistic UI.
import { ValidatedMethod } from "meteor/mdg:validated-method";
import ContactoPregunta from "/imports/api/contactoPregunta.js";
import Respuesta from "/imports/api/respuesta.js";
import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
//import { Mongo } from "meteor/mongo";
//import { aggregate } from "me teor/sakulstra:aggregate";

export const insertPregMujer = new ValidatedMethod({
  name: "insertPregMujer",
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
      seccion: "Información General",
      codigo: "1000",
      orden: 1000,
      contactoid: contactoid,
      texto: "Autopercepción de género",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "Información General",
      codigo: "1010",
      orden: 1010,
      contactoid: contactoid,
      texto: "Fecha de consulta",
      estado: false,
      tipo: "F",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "Información General",
      codigo: "1020",
      orden: 1020,
      contactoid: contactoid,
      texto: "País de nacimiento",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "Información General",
      codigo: "1030",
      orden: 1030,
      contactoid: contactoid,
      texto: "Provincia de Residencia",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "Información General",
      codigo: "1040",
      orden: 1040,
      contactoid: contactoid,
      texto: "Zona",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "Información General",
      codigo: "1050",
      orden: 1050,
      contactoid: contactoid,
      texto: "Edad",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "Información General",
      codigo: "1060",
      orden: 1060,
      contactoid: contactoid,
      estado: false,
      texto: "Forma de encuentro",
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "Información General",
      codigo: "1070",
      orden: 1070,
      contactoid: contactoid,
      texto: "Tipo de encuentro",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "Información General",
      codigo: "1080",
      orden: 1080,
      contactoid: contactoid,
      texto: "¿Tiene alguna condición de discapacidad/diversidad funcional?",
      estado: false,
      tipo: "B",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "Información General",
      codigo: "1090",
      orden: 1090,
      contactoid: contactoid,
      texto: "¿Requiere ajustes en el acompañamiento?",
      estado: false,
      tipo: "B",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "Contacto con la Colectiva y acompañamiento",
      codigo: "1100",
      orden: 1100,
      contactoid: contactoid,
      texto:
        "¿Te contactaste en otra ocasión con esta colectiva? (por el motivo que fuera)",
      estado: false,
      tipo: "B",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "Contacto con la Colectiva y acompañamiento",
      codigo: "1110",
      orden: 1110,
      contactoid: contactoid,
      texto: "¿Cómo llegaste a esta colectiva?",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "Contacto con la Colectiva y acompañamiento",
      codigo: "1120",
      orden: 1120,
      contactoid: contactoid,
      texto:
        "Desde que te enteraste que estás embarazadx hasta que te comunicaste con esta colectiva, ¿hubo algo que te demoró en conectarnos?",
      estado: false,
      tipo: "M",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "Sobre el aborto",
      codigo: "1130",
      orden: 1130,
      contactoid: contactoid,
      texto: "¿Sabías que se podía hacer un aborto con pastillas?",
      estado: false,
      tipo: "B",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "Sobre el aborto",
      codigo: "1140",
      orden: 1140,
      contactoid: contactoid,
      texto:
        "¿Sabías que podías solicitar un aborto voluntario y legal en el hospital?",
      estado: false,
      tipo: "B",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "Sobre el aborto",
      codigo: "1150",
      orden: 1150,
      contactoid: contactoid,
      texto: "¿Quién/es saben que estás embarazadx?",
      estado: false,
      tipo: "M",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "Sobre el aborto",
      codigo: "1160",
      orden: 1160,
      contactoid: contactoid,
      texto: "¿Quién/es saben de tu decisión de abortar?",
      estado: false,
      tipo: "M",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "Sobre el aborto",
      codigo: "1170",
      orden: 1170,
      contactoid: contactoid,
      texto: "¿Quiénes te acompañan en esta decisión?",
      estado: false,
      tipo: "M",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "Escolaridad y Activismos",
      codigo: "1180",
      orden: 1180,
      contactoid: contactoid,
      texto: "¿Estudias actualmente?",
      estado: false,
      tipo: "B",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "Escolaridad y Activismos",
      codigo: "1190",
      orden: 1190,
      contactoid: contactoid,
      texto: "Mayor nivel de instrucción alcanzado",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "Escolaridad y Activismos",
      codigo: "1200",
      orden: 1200,
      contactoid: contactoid,
      texto: "¿Participas de organizaciones comunitarias / estás organizadx?",
      estado: false,
      tipo: "B",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "Aspectos de su vida cotidiana",
      codigo: "1220",
      orden: 1220,
      contactoid: contactoid,
      texto: "¿Tenés trabajo remunerado?",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "Aspectos de su vida cotidiana",
      codigo: "1230",
      orden: 1230,
      contactoid: contactoid,
      texto: "¿Qué salario percibís mensualmente?",
      estado: false,
      tipo: "L",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "Aspectos de su vida cotidiana",
      codigo: "1240",
      orden: 1240,
      contactoid: contactoid,
      texto: "¿Tenés algún otro tipo de ingreso económico?",
      estado: false,
      tipo: "B",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "Aspectos de su vida cotidiana",
      codigo: "1250",
      orden: 1250,
      contactoid: contactoid,
      texto: "¿Sos el principal sostén económico del hogar?",
      estado: false,
      tipo: "B",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "Aspectos de su vida cotidiana",
      codigo: "1260",
      orden: 1260,
      contactoid: contactoid,
      texto: "¿Sos creyente en alguna religión o en Dios?",
      estado: false,
      tipo: "B",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);
    var pregunta = {
      momento: 1,
      seccion: "Aspectos de su vida cotidiana",
      codigo: "1270",
      orden: 1270,
      contactoid: contactoid,
      texto: "¿Alguna vez sufriste violencias machistas?",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "Información ginecológica previa a este embarazo",
      codigo: "1280",
      orden: 1280,
      contactoid: contactoid,
      texto: "¿Tenés cobertura médica/obra social?",
      estado: false,
      tipo: "B",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);
    var pregunta = {
      momento: 1,
      seccion: "Información ginecológica previa a este embarazo",
      codigo: "1290",
      orden: 1290,
      contactoid: contactoid,
      texto: "¿Tuviste embarazos anteriores?",
      estado: false,
      tipo: "B",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);
    var pregunta = {
      momento: 1,
      seccion: "Información ginecológica previa a este embarazo",
      codigo: "1300",
      orden: 1300,
      contactoid: contactoid,
      texto: "¿Tenés hijxs?",
      estado: false,
      tipo: "B",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "Información ginecológica previa a este embarazo",
      codigo: "1310",
      orden: 1310,
      contactoid: contactoid,
      texto: "¿Tenés abortos provocados?",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "Embarazo actual",
      codigo: "1320",
      orden: 1320,
      contactoid: contactoid,
      texto: "Edad gestacional (expresada en semanas)",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "Embarazo actual",
      codigo: "1330",
      orden: 1330,
      contactoid: contactoid,
      texto: "¿Vos querías tener esa relación sexual?",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "Embarazo actual",
      codigo: "1340",
      orden: 1340,
      contactoid: contactoid,
      texto: "¿Usaste algún método anticonceptivo?",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "Embarazo actual",
      codigo: "1350",
      orden: 1350,
      contactoid: contactoid,
      texto: "¿Hiciste algo para interrumpir este embarazo?",
      estado: false,
      tipo: "B",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "Embarazo actual",
      codigo: "1360",
      orden: 1360,
      contactoid: contactoid,
      texto:
        "¿Realizaste alguna consulta en el sistema de salud por tu embarazo actual? ",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "Embarazo actual",
      codigo: "1370",
      orden: 1370,
      contactoid: contactoid,
      texto: "¿Alguien te acompañó?",
      estado: false,
      tipo: "B",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "Embarazo actual",
      codigo: "1380",
      orden: 1380,
      contactoid: contactoid,
      texto: "¿Considerás que recibiste la información que necesitabas?",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "Embarazo actual",
      codigo: "1390",
      orden: 1390,
      contactoid: contactoid,
      texto: "¿Te sentiste escuchadx? ",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "Embarazo actual",
      codigo: "1400",
      orden: 1400,
      contactoid: contactoid,
      texto: "¿Cómo te sentiste tratadx?",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "Embarazo actual",
      codigo: "1410",
      orden: 1410,
      contactoid: contactoid,
      texto:
        "¿Recibiste información sobre cómo acceder a tu derecho a una ILE/IVE?",
      estado: false,
      tipo: "B",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);
    var pregunta = {
      momento: 1,
      seccion: "Embarazo actual",
      codigo: "1420",
      orden: 1420,
      contactoid: contactoid,
      texto: "Síntesis/ cierre DEL PRIMER MOMENTO",
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
