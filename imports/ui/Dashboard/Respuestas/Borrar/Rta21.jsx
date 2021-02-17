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

export default class Rta21 extends Component {
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
    if (!(this.state.valor === "")) {
      if (this.state.valor === "Otro motivo")
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
    options[21] = [
      {
        key: 1,
        text: "Nada me atrasó",
        value: "Nada me atrasó"
      },
      {
        key: 2,
        text: "No tenía seguridad si quería abortar",
        value: "No tenía seguridad si quería abortar"
      },
      {
        key: 3,
        text: "No sabía dónde encontrar información sobre cómo abortar",
        value: "No sabía dónde encontrar información sobre cómo abortar"
      },
      {
        key: 4,
        text: "No tenía apoyo de nadie",
        value: "No tenía apoyo de nadie"
      },
      {
        key: 5,
        text: "Tenía miedo a que sea un lugar donde me denuncien",
        value: "Tenía miedo a que sea un lugar donde me denuncien"
      },
      {
        key: 6,
        text: "Tenía miedo porque no conocía a este grupo",
        value: "Tenía miedo porque no conocía a este grupo"
      },
      {
        key: 7,
        text: "Estoy en situación de violencia y no podía comunicarme",
        value: "Estoy en situación de violencia y no podía comunicarme"
      },
      {
        key: 8,
        text: "Otro motivo",
        value: "Otro motivo"
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
                options={options[21]}
              />
            </Form.Field>
            {this.state.valor === "Otro motivo" ? (
              <Form.Field>
                <input ref="inputRespuesta" placeholder="Especificar" />
              </Form.Field>
            ) : null}
          </Form.Group>
          <Button color="purple" type="submit">
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
