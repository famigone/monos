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

export default class Rta17 extends Component {
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
    //opciones de pregunta 2
    options[17] = [
      {
        key: 1,
        text: "Persona de la que está embarazadx",
        value: "Persona de la que está embarazadx"
      },
      {
        key: 2,
        text: "Pareja",
        value: "Pareja"
      },
      {
        key: 3,
        text: "Ex Pareja",
        value: "Ex Pareja"
      },
      {
        key: 4,
        text: "Hijxs",
        value: "Hijxs"
      },
      {
        key: 5,
        text: "Madre",
        value: "Madre"
      },
      {
        key: 6,
        text: "Padre",
        value: "Padre"
      },
      {
        key: 7,
        text: "Abuelxs",
        value: "Abuelxs"
      },
      {
        key: 8,
        text: "Hermanxs",
        value: "Hermanxs"
      },
      {
        key: 9,
        text: "Otrxs familiares",
        value: "Otrxs familiares"
      },
      {
        key: 10,
        text: "Amigxs",
        value: "Amigxs"
      },
      {
        key: 11,
        text: "Activista",
        value: "Activista"
      },
      {
        key: 12,
        text: "Pareja no estable",
        value: "Pareja no estable"
      },
      {
        key: 13,
        text: "Amigovix-amante",
        value: "Amigovix-amante"
      },
      {
        key: 14,
        text: "Internet/rede sociales",
        value: "Internet/rede sociales"
      },
      {
        key: 15,
        text: "App de Socorristas",
        value: "App de Socorristas"
      },
      {
        key: 16,
        text: "Talleres/charlas",
        value: "Talleres/charlas"
      },
      {
        key: 17,
        text: "Intervenciones callejeras",
        value: "Intervenciones callejeras"
      },
      {
        key: 18,
        text: "Folletos/cartelería",
        value: "Folletos/cartelería"
      },
      {
        key: 19,
        text: "Personal de salud",
        value: "Personal de salud"
      },
      {
        key: 20,
        text: "Medios de Comunicación",
        value: "Medios de Comunicación"
      },
      {
        key: 21,
        text: "jefe/jefa-empleador/empleadora",
        value: "jefe/jefa-empleador/empleadora"
      },
      {
        key: 22,
        text: "Es ex usuaria",
        value: "Es ex usuaria"
      },
      {
        key: 23,
        text: "Amigo-x",
        value: "Amigo-x"
      },
      {
        key: 23,
        text: "Otra/e Usuaria/e",
        value: "Otra/e Usuaria/e"
      },
      {
        key: 24,
        text: "Otros",
        value: "Otros"
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
                options={options[17]}
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
