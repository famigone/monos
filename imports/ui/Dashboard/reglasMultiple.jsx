import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import PropTypes from "prop-types"; // ES6
import { withTracker } from "meteor/react-meteor-data";
import LoaderExampleText from "/imports/ui/Dashboard/LoaderExampleText.js";
import Contacto from "/imports/api/contacto.js";
import ReactDOM from "react-dom";
import { deleteReglaMultiple } from "/api/methods.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
import {
  Icon,
  Label,
  Confirm,
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

class ReglasMultiple extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hidden: true,
      open: false,
      reglaId: ""
    };
  }
  clickFila(regla) {
    this.setState({ reglaId: regla._id });
    this.props.handleFila(regla);
  }
  show = () => this.setState({ open: true });
  handleConfirm = () => {
    this.setState({ open: false });
    this.eliminar();
  };
  eliminar() {
    const one = { id: this.state.reglaId };
    deleteReglaMultiple.call(one, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({ hidden: false });
        this.props.limpiar();
      }
    });
  }
  handleCancel = () => this.setState({ result: "cancelled", open: false });

  renderFila() {
    return this.props.reglas.map(regla => (
      <Table.Row key={regla._id} onClick={() => this.clickFila(regla)}>
        <Table.Cell>{regla.tipoDestino}</Table.Cell>
        <Table.Cell>{regla.textoPreguntaDestino}</Table.Cell>
        <Table.Cell>{regla.rtaDestino}</Table.Cell>
        <Table.Cell>
          {regla.condicion == 1 ? "Igual a" : "Distinta de"}
        </Table.Cell>
        <Table.Cell>{regla.mensaje}</Table.Cell>
        <Table.Cell>
          <center>
            <Button size="mini" color="teal" onClick={this.show}>
              Borrar
            </Button>
            <Confirm
              open={this.state.open}
              content="¿Estás segura de que querés eliminar la regla?"
              onCancel={this.handleCancel}
              onConfirm={this.handleConfirm}
              cancelButton="Mejor no"
              confirmButton="Estoy segura"
            />
          </center>
        </Table.Cell>
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
              <Table.HeaderCell>
                <h4>Acción</h4>
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
  const handles = [Meteor.subscribe("reglaMultiple")];
  const loading = handles.some(handle => !handle.ready());
  return {
    reglas: ReglaMultiple.find({}).fetch(),
    isLoading: loading
  };
})(ReglasMultiple);
