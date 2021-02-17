import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import PropTypes from "prop-types"; // ES6
import Pregunta from "/imports/api/pregunta.js";
import { Contacto } from "/imports/api/contacto.js";
import ReactDOM from "react-dom";
import SidebarExampleSidebar from "./SidebarExampleSidebar.js";
import ListaPreguntas from "./ListaPreguntas.js";
import NuevaPregunta from "./NuevaPregunta.jsx";
import "react-s-alert/dist/s-alert-default.css";
import { insertContactoPreguntaBase } from "/api/methods.js";
import { insertPregNena } from "/api/insertPreguntasNena.js";
export default class NuevoContacto extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var cabeceraId;
    //creamos la cabecera del nuevo Contacto
    const one = {};
    cabeceraId = insertPregNena.call(one, (err, res) => {
      if (err) {
        console.log(err);
      }
    });

    return <NuevaPregunta id={cabeceraId} />;
  }
}
