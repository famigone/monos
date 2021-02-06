import React from "react";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { insertContacto, insertContactoPreguntaBase } from "/api/methods.js";
import NuevaPregunta from "./NuevaPregunta.jsx";
var CabeceraFuncional = props => {
  var cabeceraId;
  //creamos la cabecera del nuevo Contacto
  const one = {};
  cabeceraId = insertContacto.call(one, (err, res) => {
    if (err) {
      console.log(err);
    }
  });

  const rtas = { contactoid: cabeceraId };
  insertContactoPreguntaBase.call(rtas, (err, res) => {
    if (err) {
      console.log(err);
    }
  });

  return <NuevaPregunta id={cabeceraId} />;
};

export default CabeceraFuncional;
