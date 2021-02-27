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
  Header,
  Container
} from "semantic-ui-react";

//const App = () => (

class Reglas extends Component {
  clickFila(id, fecha) {
    this.props.handleFila(id, fecha);
  }
  renderFila() {
    return this.props.reglas.map(regla => (
      <Table.Row key={regla._id} onClick={() => this.clickFila(regla._id)}>
        <Table.Cell>{regla.tipoOrigen}</Table.Cell>
        <Table.Cell>{regla.textoPreguntaOrigen}</Table.Cell>
        <Table.Cell>{regla.rtaOrigen}</Table.Cell>
        <Table.Cell>{regla.tipoDestino}</Table.Cell>
        <Table.Cell>{regla.textoPreguntaDestino}</Table.Cell>
        <Table.Cell>{regla.rtaDestino}</Table.Cell>
        <Table.Cell>
          {regla.condicion == 1 ? "Igual a" : "Distinta de"}
        </Table.Cell>
        <Table.Cell>{regla.mensaje}</Table.Cell>
      </Table.Row>
    ));
  }

  renderTable() {
    return (
      <Container style={{ overflow: "auto", maxHeight: 500 }}>
        <Table celled fixed striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <h4>Tipo Antecedente</h4>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <h4>Pregunta Antecedente</h4>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <h4>Respuesta Antecedente</h4>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <h4>Tipo Consecuente</h4>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <h4>Pregunta Consecuente</h4>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <h4>Respuesta Consecuente</h4>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <h4>Condición</h4>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <h4>Mensaje</h4>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{this.renderFila()}</Table.Body>
        </Table>
      </Container>
    );
  }
  render() {
    if (this.props.isLoading) {
      return <LoaderExampleText />;
    }
    return <Segment raised>{this.renderTable()}</Segment>;
  }
}

export default withTracker(() => {
  const handles = [Meteor.subscribe("reglas")];
  const loading = handles.some(handle => !handle.ready());
  return {
    reglas: Regla.find({}).fetch(),
    isLoading: loading
  };
})(Reglas);
