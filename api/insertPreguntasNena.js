//este código tiene que estar disponible en servidor y cliente, para habilitar Optimistic UI.
import { ValidatedMethod } from "meteor/mdg:validated-method";
import ContactoPregunta from "/imports/api/contactoPregunta.js";
import Respuesta from "/imports/api/respuesta.js";
import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
//import { Mongo } from "meteor/mongo";
//import { aggregate } from "me teor/sakulstra:aggregate";

export const insertPregNena = new ValidatedMethod({
  name: "insertPregNena",
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
    one.tipo = 1; //nena
    var contactoid;
    contactoid = Contacto.insert(one);
    // console.log("TATATATA", contactoid);
    //C: choices, F: fecha, L: libre, B: boolean
    //pregunta0

    var pregunta = {
      momento: 1,
      seccion: "Información General",
      codigo: "10",
      orden: 10,
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
      codigo: "20",
      orden: 20,
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
      codigo: "30",
      orden: 30,
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
      codigo: "40",
      orden: 40,
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
      codigo: "50",
      orden: 50,
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
      codigo: "60",
      orden: 60,
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
      codigo: "70",
      orden: 70,
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
      codigo: "80",
      orden: 80,
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
      codigo: "90",
      orden: 90,
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
      codigo: "100",
      orden: 100,
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
      codigo: "110",
      orden: 110,
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
      codigo: "120",
      orden: 120,
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
      codigo: "130",
      orden: 130,
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
      codigo: "140",
      orden: 140,
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
      codigo: "150",
      orden: 150,
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
      codigo: "160",
      orden: 160,
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
      codigo: "170",
      orden: 170,
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
      codigo: "180",
      orden: 180,
      contactoid: contactoid,
      texto: "¿Vas a la escuela?",
      estado: false,
      tipo: "B",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "Escolaridad y Activismos",
      codigo: "190",
      orden: 190,
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
      codigo: "200",
      orden: 200,
      contactoid: contactoid,
      texto:
        "¿Recibiste información sobre Métodos Anticonceptivos y de cuidados?",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);
    var pregunta = {
      momento: 1,
      seccion: "Escolaridad y Activismos",
      codigo: "210",
      orden: 210,
      contactoid: contactoid,
      texto: "¿Recibiste información sobre el ciclo menstrual?",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "Escolaridad y Activismos",
      codigo: "220",
      orden: 220,
      contactoid: contactoid,
      texto:
        "¿Recibiste información sobre el Derecho a la atención en el sistema de salud desde los 13 años sin compañía de unx adultx?",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "Escolaridad y Activismos",
      codigo: "230",
      orden: 230,
      contactoid: contactoid,
      texto: "¿Recibiste información sobre Derechos lgbtttiqnb+?",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "Escolaridad y Activismos",
      codigo: "240",
      orden: 240,
      contactoid: contactoid,
      texto:
        "¿Recibiste información sobre el consentimiento en las relaciones sexuales?",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "Escolaridad y Activismos",
      codigo: "250",
      orden: 250,
      contactoid: contactoid,
      texto: "¿Recibiste información sobre violencias por motivos de género?",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "Escolaridad y Activismos",
      codigo: "260",
      orden: 260,
      contactoid: contactoid,
      texto: "¿Recibiste información sobre aborto con medicamentos?",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);
    var pregunta = {
      momento: 1,
      seccion: "Escolaridad y Activismos",
      codigo: "270",
      orden: 270,
      contactoid: contactoid,
      texto:
        "¿Recibiste información sobre el derecho a la interrupción legal del embarazo?",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "Escolaridad y Activismos",
      codigo: "280",
      orden: 280,
      contactoid: contactoid,
      texto: "¿Dónde recibiste la mayor parte de esta información?",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);
    var pregunta = {
      momento: 1,
      seccion: "Escolaridad y Activismos",
      codigo: "290",
      orden: 290,
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
      codigo: "300",
      orden: 300,
      contactoid: contactoid,
      texto:
        "¿Estás a cargo del cuidado de personas de tu familia cotidianamente, en un número importante de horas?",
      estado: false,
      tipo: "B",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);
    var pregunta = {
      momento: 1,
      seccion: "Aspectos de su vida cotidiana",
      codigo: "310",
      orden: 310,
      contactoid: contactoid,
      texto: "¿Hacés algún tipo de trabajo fuera de tu casa?",
      estado: false,
      tipo: "B",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "Aspectos de su vida cotidiana",
      codigo: "320",
      orden: 320,
      contactoid: contactoid,
      texto:
        "¿Recibís algún tipo de pago por los trabajos que haces (de cuidados o fuera de tu casa)?",
      estado: false,
      tipo: "C",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "Aspectos de su vida cotidiana",
      codigo: "330",
      orden: 330,
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
      codigo: "340",
      orden: 340,
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
      codigo: "350",
      orden: 350,
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
      codigo: "360",
      orden: 360,
      contactoid: contactoid,
      texto: "¿Realizaste alguna vez una consulta por su salud sexual?",
      estado: false,
      tipo: "B",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);
    var pregunta = {
      momento: 1,
      seccion: "Información ginecológica previa a este embarazo",
      codigo: "370",
      orden: 370,
      contactoid: contactoid,
      texto: "¿Te dieron información sobre métodos anticonceptivos?",
      estado: false,
      tipo: "B",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);
    var pregunta = {
      momento: 1,
      seccion: "Información ginecológica previa a este embarazo",
      codigo: "380",
      orden: 380,
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
      codigo: "390",
      orden: 390,
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
      codigo: "400",
      orden: 400,
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
      codigo: "410",
      orden: 410,
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
      codigo: "415",
      orden: 415,
      contactoid: contactoid,
      texto: "¿Fue tu primera relación sexual?",
      estado: false,
      tipo: "B",
      habilitado: false,
      activo: true
    };
    ContactoPregunta.insert(pregunta);

    var pregunta = {
      momento: 1,
      seccion: "Embarazo actual",
      codigo: "420",
      orden: 420,
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
      codigo: "430",
      orden: 430,
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
      codigo: "440",
      orden: 440,
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
      codigo: "450",
      orden: 450,
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
      codigo: "460",
      orden: 460,
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
      codigo: "470",
      orden: 470,
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
      codigo: "480",
      orden: 480,
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
      codigo: "490",
      orden: 490,
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
      codigo: "500",
      orden: 500,
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
      codigo: "510",
      orden: 510,
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
