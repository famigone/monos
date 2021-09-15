import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import PropTypes from "prop-types"; // ES6
import { withTracker } from "meteor/react-meteor-data";
import LoaderExampleText from "/imports/ui/Dashboard/LoaderExampleText.js";
import Contacto from "/imports/api/contacto.js";
import ReactDOM from "react-dom";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
import {
  Icon,
  Label,
  Statistic,
  Menu,
  Table,
  Segment,
  List,
  Button,
  Divider,
  Form,
  Grid,
  Dropdown,
  Modal,
  Header
} from "semantic-ui-react";

//const App = () => (

class Consultas extends Component {
  clickFila(id, fecha) {
    this.props.handleFila(id, fecha);
  }
  renderFila() {
    return this.props.contactos.map(contact => (
      <Table.Row
        key={contact._id}
        onClick={() =>
          this.clickFila(
            contact._id,
            moment(contact.createdAt).format("DD-MM-YYYY, h:mm a")
          )
        }
      >
        <Table.Cell collapsing>{contact.userName()}</Table.Cell>
        <Table.Cell collapsing>{this.parsearTipo(contact.tipo)}</Table.Cell>
        <Table.Cell collapsing>{contact.autonumerico}</Table.Cell>
        <Table.Cell >
          {moment(contact.createdAt).format("DD-MM-YYYY")}
        </Table.Cell>
      </Table.Row>
    ));
  }

parsearTipo(tipo) {
  var rta= ""
  if (tipo==1) rta = "Tg"
  else if (tipo ==2) rta = "Bq"
  else rta = "Tx"
  return rta;
}

  renderTable() {
    return (
      <Table fixed celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <h4>USUARI@</h4>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <h4>NIVEL</h4>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <h4>CÓDIGO</h4>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <h4>FECHA DE CARGA</h4>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{this.renderFila()}</Table.Body>
      </Table>
    );
  }
  render() {
    if (this.props.isLoading) {
      return <LoaderExampleText />;
    }
    return <Segment raised>{this.renderTable()}</Segment>;
  }
}

export default withTracker(
  ({ cantidad, fechaDesde, fechaHasta, usuarioid, codigo }) => {
    //console.log(fecha);
    //var desde = new Date(fechaDesde);
    //var hasta = new Date(fechaHasta);
    //console.log(desde);
    //console.log(fechaDesde);
    //console.log(codigo);
    //  console.log(codigo);
    const handles = [
      Meteor.subscribe(
        "contacto",
        cantidad,
        fechaDesde,
        fechaHasta,
        usuarioid,
        codigo
      )
    ];

    const loading = handles.some(handle => !handle.ready());

    return {
      isLoading: loading,
      contactos: Contacto.find({ activo: true }).fetch()
    };
  }
)(Consultas);
