import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import PropTypes from "prop-types"; // ES6
import ContactoPregunta from "/imports/api/contactoPregunta.js";
import ReactDOM from "react-dom";

import { options } from "./combo";
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

export default class RtaCombo extends Component {
  state = { valor: "", termino: false };

  handleOnChange = (e, data) => {
    //console.log(data.value);
    this.setState({
      valor: data.value
    });
  };

  handleSubmit(event) {
    event.preventDefault();
    var inputRespuesta;
    if (this.state.valor === "Otro")
      inputRespuesta = ReactDOM.findDOMNode(
        this.refs.inputRespuesta
      ).value.trim();
    // Find the text field via the React ref

    const one = {
      contactoid: this.props.pregunta.contactoid,
      contactopreguntaid: this.props.pregunta._id,
      codigo: this.props.pregunta.codigo,
      rtatexto: this.state.valor,
      especifique: inputRespuesta
      //  activo: true
    };

    if (!(this.state.valor === "")) {
      // Call the Method
      //insertLocacion.validate(one);
      insertRespuesta.call(one, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          //marcar la contactoPregunta como contestada

          const two = { id: this.props.pregunta._id };
          updateContactoPregunta.call(two, (err, res) => {
            if (err) {
              console.log(err);
            } else {
            }
          });
          // seteamos el nuevo Actual
          //this.props.cambiarActual(String(this.props.pregunta.orden + 1));
          //console.log("this.state.valor ", this.state.valor);
          var parar =
            (this.state.valor == "No vuelve a comunicarse" &&
              this.props.pregunta.codigo == 650 &&
              this.props.pregunta.seccion ==
                "Interrupción Legal e Interrupción Voluntaria del Embarazo") ||
            (this.state.valor == "No" &&
              this.props.pregunta.codigo == 660 &&
              this.props.pregunta.seccion ==
                "Interrupción Legal e Interrupción Voluntaria del Embarazo") ||
            (this.state.valor == "Sin dato" &&
              this.props.pregunta.codigo == 660 &&
              this.props.pregunta.seccion ==
                "Interrupción Legal e Interrupción Voluntaria del Embarazo") ||
            (this.props.pregunta.codigo == 830 &&
              this.props.pregunta.seccion ==
                "Acompañamiento Aborto Libre y Feminista");
          //console.log("parar ", parar);
          if (!parar) {
            this.props.cambiarActual(
              this.props.pregunta.codigo,
              this.state.valor
            );
            this.setState({ valor: "" });
          }
        }
      });
    }
    // Clear form
  }

  renderForm() {
    //  console.log(options[this.props.pregunta.orden]);
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
          <Button color="purple" type="submit">
            Siguiente
          </Button>
          <Message color="purple" floating hidden={!this.state.termino}>
            <Message.Header>
              <Icon name="heart outline" />
              Carga finalizada.
            </Message.Header>
          </Message>
        </Form>
      </div>
    );
  }

  render() {
    //console.log("this.props.cambiarActual", this.props.cambiarActual);
    //console.log(this.props.pregunta.orden);
    return this.renderForm();
  }
}
