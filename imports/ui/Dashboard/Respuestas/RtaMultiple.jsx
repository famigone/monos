import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import PropTypes from "prop-types"; // ES6
import ContactoPregunta from "/imports/api/contactoPregunta.js";
import ReactDOM from "react-dom";
import { options } from "./comboMultiple";
import { validar } from "./validar";
import LoaderExampleText from "/imports/ui/Dashboard/LoaderExampleText.js";
import "react-s-alert/dist/s-alert-default.css";
import { insertRespuesta, updateContactoPregunta } from "/api/methods.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import {
  Grid,
  Dropdown,
  Input,
  Table,
  Label,
  Menu,
  Card,
  Icon,
  Image,
  Rating,
  Button,
  Progress,
  Message,
  Container,
  Divider,
  Segment,
  Form,
  Header
} from "semantic-ui-react";

//const App = () => (

export default class RtaMultiple extends Component {
  state = { valor: "", hiddeValidar: true, mensajeError: "" };

  renderForm() {
    return (
      <div>
        <Container textAlign="right">
          <Label color="teal">
            <Icon name="time" />
            {this.props.pregunta.momento == 1
              ? "PRIMER MOMENTO"
              : "SEGUNDO MOMENTO"}
          </Label>
          <Label color="teal">
            <Icon name="check circle" />
            {this.props.pregunta.seccion}
          </Label>
        </Container>
        <Header as="h2" dividing>
          <Icon name="question circle outline" />
          <Header.Content>
            {this.props.pregunta.texto}
            <Header.Subheader>
              Por favor, ingrese una respuesta para la pregunta
            </Header.Subheader>
          </Header.Content>
        </Header>

        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Form.Group widths="equal">
            <Form.Field>
              <Dropdown
                placeholder="Seleccionar"
                search
                selection
                multiple
                value={this.state.valor}
                onChange={this.handleOnChange}
                options={options[this.props.pregunta.orden]}
              />
            </Form.Field>
            {this.state.valor === "Otro" ? (
              <Form.Field>
                <input ref="inputRespuesta" placeholder="Especifique" />
              </Form.Field>
            ) : null}
          </Form.Group>
          <Message color="pink" floating hidden={this.state.hiddeValidar}>
            <Message.Header>
              <Icon size="huge" name="meh outline" />
              {this.state.mensajeError}
            </Message.Header>
          </Message>
          <Button color="teal" type="submit">
            Siguiente
          </Button>
        </Form>
      </div>
    );
  }
  clearDropdown() {
    this.setState({
      valor: []
    });
  }
  handleOnChange = (e, data) => {
    this.setState({
      valor: data.value
    });
    //console.log(this.state.valor);
  };

  handleSubmit(event) {
    event.preventDefault();
    var valido = true;
    if (!(this.state.valor === "")) {
      var inputRespuesta;
      if (this.state.valor === "Otros")
        inputRespuesta = ReactDOM.findDOMNode(
          this.refs.inputRespuesta
        ).value.trim();
      //como es múltiple

      this.state.valor.forEach(rta => {
        let mensaje = validar(
          this.props.respuestas,
          this.props.pregunta.codigo,
          this.state.valor,
          this.props.reglas
        );
        valido = mensaje == "";
        console.log("VALIDOOO ", valido);
        if (!valido) this.setState({ hiddeValidar: false });
        else {
          this.setState({ hiddeValidar: true, mensajeError: mensaje });
          var one = {
            contactoid: this.props.pregunta.contactoid,
            contactopreguntaid: this.props.pregunta._id,
            codigo: this.props.pregunta.codigo,
            rtatexto: rta,
            especifique: inputRespuesta
            //  activo: true
          };
          console.log("INSERTO UN MÚLTIPLE");
          insertRespuesta.call(one, (err, res) => {
            if (err) {
              console.log(err);
            }
          });
        }
      });

      if (!(this.state.valor === "") && valido) {
        const two = { id: this.props.pregunta._id };
        updateContactoPregunta.call(two, (err, res) => {
          if (err) {
            console.log(err);
          } else {
          }
        });
        this.props.cambiarActual(this.props.pregunta.codigo);
      }
    }
    // Clear form
    this.setState({
      valor: []
    });
  }
  componentDidMount() {
    this.setState({ valor: [] });
  }
  render() {
    //console.log(this.props.pregunta.orden);

    return this.renderForm();
  }
}
