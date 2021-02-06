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

export default class Rta20 extends Component {
  state = { valor: "" };

  handleOnChange = (e, data) => {
    //console.log(data.value);
    this.setState({
      valor: data.value
    });
  };

  handleSubmit(event) {
    event.preventDefault();
    if (!(this.state.valor === "")) {
      var inputRespuesta;
      if (this.state.valor === "Más de 21 días")
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

          this.props.cambiarActual(this.props.pregunta.codigo);
        }
      });
    }
    // Clear form
  }

  renderForm() {
    var options = [];
    //edad gestacional
    options[20] = [
      {
        key: 1,
        text: "Ya lo conocía",
        value: "Ya lo conocía"
      },
      {
        key: 2,
        text: "Una semana (hasta 7 días)",
        value: "Una semana (hasta 7 días)"
      },
      {
        key: 3,
        text: "Más de una semana (hasta 14 días)",
        value: "Más de una semana (hasta 14 días)"
      },
      {
        key: 4,
        text: "Más de dos semanas (hasta 21 días)",
        value: "Más de dos semanas (hasta 21 días)"
      },
      {
        key: 5,
        text: "Más de 21 días",
        value: "Más de 21 días"
      }
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
                options={options[20]}
              />
            </Form.Field>
            {this.state.valor === "Más de 21 días" ? (
              <Form.Field>
                <input ref="inputRespuesta" placeholder="Especificar cuántos" />
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
