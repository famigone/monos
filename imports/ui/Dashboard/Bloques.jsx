import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import PropTypes from "prop-types"; // ES6
import Pregunta from "/imports/api/pregunta.js";
import { Contacto } from "/imports/api/contacto.js";
import ReactDOM from "react-dom";
import SidebarExampleSidebar from "./SidebarExampleSidebar.js";
import ListaPreguntasBloques from "./ListaPreguntasBloques.js";
import NuevaPreguntaBloques from "./NuevaPreguntaBloques.jsx";
import "react-s-alert/dist/s-alert-default.css";
import { insertContactoPreguntaBase } from "/api/methods.js";
import { insertPregBloques } from "/api/insertPreguntasBloques.js";
export default class Bloques extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var cabeceraId;
    //creamos la cabecera del nuevo Contacto
    const one = {};
    cabeceraId = insertPregBloques.call(one, (err, res) => {
      if (err) {
        console.log(err);
      }
    });

    return <NuevaPreguntaBloques id={cabeceraId} />;
  }
}
