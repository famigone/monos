import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import PropTypes from "prop-types"; // ES6
import Pregunta from "/imports/api/pregunta.js";
import { Contacto } from "/imports/api/contacto.js";
import ReactDOM from "react-dom";
import SidebarExampleSidebar from "./SidebarExampleSidebar.js";
import ListaPreguntas from "./ListaPreguntas.js";
import NuevaPreguntaMujer from "./NuevaPreguntaMujer.jsx";
import "react-s-alert/dist/s-alert-default.css";
import { insertContactoPreguntaBase } from "/api/methods.js";
import { insertPregMujer } from "/api/insertPreguntasMujer.js";
export default class NuevoContactoMujer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var cabeceraId;
    //creamos la cabecera del nuevo Contacto
    const one = {};
    cabeceraId = insertPregMujer.call(one, (err, res) => {
      if (err) {
        console.log(err);
      }
    });

    return <NuevaPreguntaMujer id={cabeceraId} />;
  }
}
