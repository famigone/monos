import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import PropTypes from "prop-types"; // ES6
import LoginForm from "./LoginForm.jsx";
import BarraEstado from "./BarraEstado.jsx";
import MenuPrincipal from "./MenuPrincipal.jsx";
import ContactoPregunta from "/imports/api/contactoPregunta.js";
import ReactDOM from "react-dom";
import { withTracker } from "meteor/react-meteor-data";
import SidebarExampleSidebar from "./SidebarExampleSidebar.js";
import ListaPreguntas from "./ListaPreguntas.js";
import ListaPreguntasMujer from "./ListaPreguntasMujer.js";
import LoaderExampleText from "/imports/ui/Dashboard/LoaderExampleText.js";
import "react-s-alert/dist/s-alert-default.css";
import { insertPregunta } from "/api/methods.js";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";

//const App = () => (

class NuevaPreguntaMujer extends Component {
  getContentView() {
    return this.props.children;
  }

  render() {
    if (this.props.isLoading) {
      return <LoaderExampleText />;
    }

    return (
      <div>
        <ListaPreguntasMujer
          preguntas={this.props.preguntas}
          id={this.props.id}
        />
      </div>
    );
  }
}
export default withTracker(({ id }) => {
  const handles = [Meteor.subscribe("contactopreguntatodes", id)];
  const loading = handles.some(handle => !handle.ready());
  var lasPreguntas;
  if (!loading) lasPreguntas = ContactoPregunta.find({ activo: true }).fetch();
  //console.log(lasPreguntas);
  return {
    preguntas: lasPreguntas,
    id: id,
    isLoading: loading
  };
})(NuevaPreguntaMujer);
