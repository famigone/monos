import React from "react";
import {
  Router,
  Route,
  IndexRoute,
  Switch,
  Redirect,
  useParams
} from "react-router-dom";

//import createBrowserHistory from "history/createBrowserHistory";
import { createBrowserHistory } from "history";
// route components
import App from "../../ui/Dashboard/App.jsx";

import LoginForm from "../../ui/Dashboard/LoginForm.jsx";

import PrivateRoute from "./PrivateRoute.jsx";
////////////////////////////////
import NuevoContacto from "../../ui/Dashboard/NuevoContacto.jsx";
import ListadoConsultas from "../../ui/Dashboard/listadoConsultas.jsx";
import AbmUsuarios from "../../ui/Dashboard/abmUsuarios.jsx";
import NuevaPregunta from "../../ui/Dashboard/NuevaPregunta.jsx";
import Analisis from "../../ui/Dashboard/Analisis.jsx";
import CabeceraFuncional from "../../ui/Dashboard/cabecerafuncional.js";
////////////////////////////////
const browserHistory = createBrowserHistory();
export const requireAuth = (nextState, replace) => {
  // No user is authenticated redirect ro index
  return Meteor.user() === null;
};
function ChildMonitor() {
  let { id } = useParams();
  return <WellMonitor id={id} />;
}
function ChildConfig() {
  let { id } = useParams();
  return <WellConfig id={id} />;
}
function ChildOperational() {
  let { id } = useParams();
  return <OperationalHome id={id} />;
}
export const Ruteador = () => (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/login" component={LoginForm} />

      <App>
        <Route exact path="/nuevocontacto/" component={NuevoContacto} />
        <Route exact path="/listadoconsultas/" component={ListadoConsultas} />
        <Route exact path="/nuevapregunta/:id" children={<NuevaPregunta />} />
        <Route exact path="/nuevapregunta" component={NuevaPregunta} />
        <Route exact path="/analisis" component={Analisis} />
        <Route exact path="/usuarios" component={AbmUsuarios} />
        <Route exact path="/cabecerafuncional" component={CabeceraFuncional} />
      </App>
    </Switch>
  </Router>
);
