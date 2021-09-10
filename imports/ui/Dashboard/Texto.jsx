import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import PropTypes from "prop-types"; // ES6
import Pregunta from "/imports/api/pregunta.js";
import { Contacto } from "/imports/api/contacto.js";
import ReactDOM from "react-dom";
import SidebarExampleSidebar from "./SidebarExampleSidebar.js";
import ListaPreguntasTexto from "./ListaPreguntasTexto.js";
import NuevaPreguntaTexto from "./NuevaPreguntaTexto.jsx";
import "react-s-alert/dist/s-alert-default.css";
import { insertContactoPreguntaBase } from "/api/methods.js";
import { insertPregTexto } from "/api/insertPreguntasTexto.js";
export default class Texto extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var cabeceraId;
    //creamos la cabecera del nuevo Contacto
    const one = {};
    cabeceraId = insertPregTexto.call(one, (err, res) => {
      if (err) {
        console.log(err);
      }
    });

    return <NuevaPreguntaTexto id={cabeceraId} />;
  }
}
