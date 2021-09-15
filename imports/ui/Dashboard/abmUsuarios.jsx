import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import PropTypes from "prop-types"; // ES6
import { withTracker } from "meteor/react-meteor-data";
import LoaderExampleText from "/imports/ui/Dashboard/LoaderExampleText.js";
import Contactos from "/imports/api/contacto.js";
import Consultas from "./consultas.jsx";
import ReactDOM from "react-dom";
import DatePicker from "react-datepicker";
import NuevaPregunta from "./NuevaPregunta.jsx";
import "react-datepicker/dist/react-datepicker.css";
import { Accounts } from "meteor/accounts-base";
import { AccountsCommon } from "meteor/accounts-base";
//import { nuevoUsuario } from "/api/methods.js";
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
const CONST_PAGINA = 20;

class AbmUsuarios extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usuario: "",
      pass: ""
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const username = ReactDOM.findDOMNode(this.refs.inputUsuario).value.trim();
    const password = ReactDOM.findDOMNode(this.refs.inputPass).value.trim();
    const nene = ReactDOM.findDOMNode(this.refs.inputNene).value.trim();
    const nacimiento = ReactDOM.findDOMNode(this.refs.inputNacimiento).value.trim();
    const tutor = ReactDOM.findDOMNode(this.refs.inputTutor).value.trim();
    const mail = ReactDOM.findDOMNode(this.refs.inputMail).value.trim();
    const profile = { nene: nene
    , nacimiento: nacimiento
    , pass: password
    , tutor: tutor
    , mail: mail };
    const one = { username: username
      , password: password

      };
    //nuevoUsuario.call(one, (err, res) => {
    //  if (err) {
    //    console.log(err);
    //  }
    //});
    Accounts.createUser(
      { username: one.username, password: one.password, profile:profile},
      function(err) {
        if (err) console.log(err);
      }
    );
  }
  renderFila() {

    return this.props.usuarios.map(contact => (
      <Table.Row key={contact.username}>
        <Table.Cell collapsing>{contact.username}</Table.Cell>

      </Table.Row>
    ));
  }

  renderTable() {
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <h4>Usuari@</h4>

            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{this.renderFila()}</Table.Body>
      </Table>
    );
  }
  renderForm() {
    return (
      <Segment raised>
        <Header as="h2" dividing>
          <Icon name="address book outline" />
          <Header.Content>Listado de Usuari@s</Header.Content>
        </Header>

        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Form.Group widths="equal">
            <Form.Field>
              <input ref="inputUsuario" placeholder="Usuario" />
            </Form.Field>

            <Form.Field>
              <input ref="inputPass" placeholder="ingrese una contraseña" />
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field>
              <input ref="inputNene" placeholder="Nombre de niñe" />
            </Form.Field>

            <Form.Field>
              <input ref="inputNacimiento" placeholder="Fecha de nacimiento" />
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field>
              <input ref="inputMail" placeholder="Correo" />
            </Form.Field>

            <Form.Field>
              <input ref="inputTutor" placeholder="Nombre Completo Tut@r" />
            </Form.Field>
          </Form.Group>
          <Button color="brown" type="submit">
            Guardar
          </Button>
        </Form>
      </Segment>
    );
  }
  render() {
    if (this.props.isLoading) {
      return <LoaderExampleText />;
    }

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={4} />
          <Grid.Column width={8}>
            <div>
              {this.renderForm()}
              {this.renderTable()}
            </div>
          </Grid.Column>
          <Grid.Column width={4} />
        </Grid.Row>
      </Grid>
    );
  }
}
export default withTracker(({}) => {
  const handles = [Meteor.subscribe("users")];
  const loading = handles.some(handle => !handle.ready());
  return {
    usuarios: Meteor.users.find({}).fetch(),
    isLoading: loading
  };
})(AbmUsuarios);
