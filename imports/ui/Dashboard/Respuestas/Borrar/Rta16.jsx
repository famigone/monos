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

export default class Rta16 extends Component {
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
      if (this.state.valor === "Otros")
        inputRespuesta = ReactDOM.findDOMNode(
          this.refs.inputRespuesta
        ).value.trim();
      //como es múltiple

      this.state.valor.forEach(rta => {
        var one = {
          contactoid: this.props.pregunta.contactoid,
          contactopreguntaid: this.props.pregunta._id,
          codigo: this.props.pregunta.codigo,
          rtatexto: rta,
          especifique: inputRespuesta
          //  activo: true
        };
        insertRespuesta.call(one, (err, res) => {
          if (err) {
            console.log(err);
          }
        });
      });

      if (!(this.state.valor === "")) {
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
  }

  renderForm() {
    var options = [];
    //opciones de pregunta 2
    options[16] = [
      {
        key: 1,
        text: "Pareja",
        value: "Pareja"
      },
      {
        key: 2,
        text: "Ex Pareja",
        value: "Ex Pareja"
      },
      {
        key: 3,
        text: "Persona de la que está embarazadx",
        value: "Persona de la que está embarazadx"
      },
      {
        key: 4,
        text: "Amigxs",
        value: "Amigxs"
      },
      {
        key: 5,
        text: "Amiga",
        value: "Amiga"
      },
      {
        key: 6,
        text: "Madre",
        value: "Madre"
      },
      {
        key: 7,
        text: "Padre",
        value: "Padre"
      },
      {
        key: 8,
        text: "Hija",
        value: "Hija"
      },
      {
        key: 9,
        text: "Hermanxs",
        value: "Hermanxs"
      },
      {
        key: 10,
        text: "Otrxs familiares",
        value: "Otrxs familiares"
      },
      {
        key: 11,
        text: "Otra persona",
        value: "Otra persona"
      },
      {
        key: 12,
        text: "No",
        value: "No"
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
                multiple
                onChange={this.handleOnChange}
                options={options[16]}
              />
            </Form.Field>
            {this.state.valor === "Otros" ? (
              <Form.Field>
                <input ref="inputRespuesta" placeholder="Especifique" />
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
