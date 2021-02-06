import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import PropTypes from "prop-types"; // ES6
import ContactoPregunta from "/imports/api/contactoPregunta.js";
import ReactDOM from "react-dom";

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

export default class Rta05 extends Component {
  state = { valor: "" };

  handleOnChange = (e, data) => {
    //console.log(data.value);
    this.setState({
      valor: data.value
    });
  };

  handleSubmit(event) {
    event.preventDefault();
    var inputRespuesta;
    if (this.state.valor === "Otra")
      inputRespuesta = ReactDOM.findDOMNode(
        this.refs.inputRespuesta
      ).value.trim();
    // Find the text field via the React ref
    else inputRespuesta = "";

    const one = {
      contactoid: this.props.pregunta.contactoid,
      contactopreguntaid: this.props.pregunta._id,
      codigo: this.props.pregunta.codigo,
      especifique: inputRespuesta,
      rtatexto: this.state.valor
      //  activo: true
    };
    // Call the Method
    //insertLocacion.validate(one);
    if (!(this.state.valor === "")) {
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
          this.props.cambiarActual(this.props.pregunta.codigo);
        }
      });
    }
    // Clear form
  }

  renderForm() {
    var options = [];
    //opciones de pregunta 2
    options[2] = [
      {
        key: 1,
        text: "Mujer",
        value: "Mujer"
      },
      {
        key: 2,
        text: "Varón Trans",
        value: "Varón Trans"
      },
      {
        key: 3,
        text: "No binare",
        value: "No binare"
      },
      { key: 4, text: "Otra", value: "Otra" }
    ];

    return (
      <div>
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
                onChange={this.handleOnChange}
                options={options[2]}
              />
            </Form.Field>
            {this.state.valor === "Otra" ? (
              <Form.Field>
                <input
                  ref="inputRespuesta"
                  placeholder="Especifique"
                  onChange={this.handleOnChangeEspecifique}
                />
              </Form.Field>
            ) : null}
          </Form.Group>
          <Button color="pink" type="submit">
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
