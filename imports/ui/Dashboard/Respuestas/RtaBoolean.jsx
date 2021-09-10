import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import PropTypes from "prop-types"; // ES6
import ContactoPregunta from "/imports/api/contactoPregunta.js";
import ReactDOM from "react-dom";
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
  Checkbox,
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

export default class RtaBoolean extends Component {
  state = {
    valor: null,
    hiddeValidar: true,
    mensajeError: ""
  };
  handleChange = (e, { value }) => this.setState({ valor: value });

  handleSubmit(event) {
    event.preventDefault();
    //  console.log("debe mostrar valor: " + this.state.valor);
    // Find the text field via the React ref
    if (!(this.state.valor === null)) {
      const one = {
        contactoid: this.props.pregunta.contactoid,
        contactopreguntaid: this.props.pregunta._id,
        codigo: this.props.pregunta.codigo,
        rtatexto: this.state.valor
        //  activo: true
      };

      let mensaje = validar(
        this.props.respuestas,
        this.props.pregunta.codigo,
        this.state.valor,
        this.props.reglas,
        this.props.pregunta.tipo
      );
      var valido = mensaje == "";
      if (valido) this.setState({ hiddeValidar: true });
      else this.setState({ hiddeValidar: false, mensajeError: mensaje });

      // Call the Method
      //insertLocacion.validate(one);

      if (valido) {
        insertRespuesta.call(one, (err, res) => {
          if (err) {
            console.log(err);
          } else {
            if (res == "") {
              this.setState({ valor: null });
              //marcar la contactoPregunta como contestada
              const two = { id: this.props.pregunta._id };
              updateContactoPregunta.call(two, (err, res) => {
                if (err) {
                  console.log(err);
                } else {
                }
              });
              // seteamos el nuevo Actual
              this.props.cambiarActual(
                this.props.pregunta.codigo,
                one.rtatexto
              );
            } else {
              this.setState({ hiddeValidar: false, mensajeError: res });
            }
          }
        });
      }
    }
    // Clear form
    //  ReactDOM.findDOMNode(this.refs.inputRespuesta).value = "";
  }
  renderForm() {
    //console.log("debe mostrar valor: " + this.state.valor);
    return (
      <div>
      <Container textAlign="right">

        <Label color="red">
          <Icon name="check circle" />
          {this.props.pregunta.seccion}
        </Label>
      </Container>
        <Header as="h2" dividing>
          <Icon name="question circle outline" />
          <Header.Content>
            {this.props.pregunta.texto}
            <Header.Subheader>
              Por favor, seleccione la respuesta correcta
            </Header.Subheader>
          </Header.Content>
        </Header>

        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Form.Field>
            <Checkbox
              radio
              label="SI"
              name="checkboxRadioGroup"
              value="SI"
              checked={this.state.valor === "SI"}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              radio
              label="NO"
              name="checkboxRadioGroup"
              value="NO"
              checked={this.state.valor === "NO"}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Message color="pink" floating hidden={this.state.hiddeValidar}>
            <Message.Header>
              <Icon size="huge" name="meh outline" />
              {this.state.mensajeError}
            </Message.Header>
          </Message>
          <Button color="yellow" type="submit">
            Siguiente
          </Button>
        </Form>
      </div>
    );
  }

  render() {
    //console.log(this.props.pregunta.orden);
    return this.renderForm();
  }
}
