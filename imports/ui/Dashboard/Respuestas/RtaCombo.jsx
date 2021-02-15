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

export default class RtaCombo extends Component {
  state = { valor: "" };

  handleOnChange = (e, data) => {
    //console.log(data.value);
    this.setState({
      valor: data.value
    });
  };

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref

    const one = {
      contactoid: this.props.pregunta.contactoid,
      contactopreguntaid: this.props.pregunta._id,
      codigo: this.props.pregunta.codigo,
      rtatexto: this.state.valor
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
          this.props.cambiarActual(this.props.pregunta.codigo);
          this.setState({ valor: "" });
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
        text: "Necesita información sobre cómo abortar",
        value: "Necesita información sobre cómo abortar"
      },
      {
        key: 2,
        text: "Está en proceso de aborto y necesita orientación",
        value: "Está en proceso de aborto y necesita orientación"
      },
      {
        key: 3,
        text: "Necesita información para alguien cercano",
        value: "Necesita información para alguien cercano"
      },
      { key: 4, text: "Otra razón", value: "Otra razón" }
    ];
    options[6] = [
      {
        key: 1,
        text: "Tierra del Fuego",
        value: "Tierra del Fuego"
      },
      {
        key: 2,
        text: "Santa Cruz",
        value: "Santa Cruz"
      },
      {
        key: 3,
        text: "Chubut",
        value: "Chubut"
      },
      {
        key: 4,
        text: "Neuquén",
        value: "Neuquén"
      },
      {
        key: 5,
        text: "Rio Negro",
        value: "Rio Negro"
      },
      {
        key: 6,
        text: "La Pampa",
        value: "La Pampa"
      },
      {
        key: 7,
        text: "Mendoza",
        value: "Mendoza"
      },
      {
        key: 8,
        text: "San Juan",
        value: "San Juan"
      },
      {
        key: 9,
        text: "San Luis",
        value: "San Luis"
      },
      {
        key: 10,
        text: "Córdoba",
        value: "Córdoba"
      },
      {
        key: 11,
        text: "Santa Fe",
        value: "Santa Fe"
      },
      {
        key: 12,
        text: "Buenos Aires",
        value: "Buenos Aires"
      },
      {
        key: 13,
        text: "Entre Ríos",
        value: "Entre Ríos"
      },
      {
        key: 14,
        text: "Misiones",
        value: "Misiones"
      },
      {
        key: 15,
        text: "Corrientes",
        value: "Corrientes"
      },
      {
        key: 16,
        text: "Santiago del Estero",
        value: "Santiago del Estero"
      },
      {
        key: 17,
        text: "Formosa",
        value: "Formosa"
      },
      {
        key: 18,
        text: "Catamarca",
        value: "Catamarca"
      },
      {
        key: 19,
        text: "Salta",
        value: "Salta"
      },
      {
        key: 20,
        text: "Tucumán",
        value: "Tucumán"
      },
      {
        key: 21,
        text: "Chaco",
        value: "Chaco"
      },
      {
        key: 22,
        text: "La Rioja",
        value: "La Rioja"
      },
      {
        key: 23,
        text: "Jujuy",
        value: "Jujuy"
      }
    ];
    //zona
    options[8] = [
      {
        key: 1,
        text: "Rural",
        value: "Rural"
      },
      {
        key: 2,
        text: "Urbana",
        value: "Urbana"
      }
    ];
    //con quién convive

    //método de comprobación
    options[18] = [
      {
        key: 1,
        text: "Eco",
        value: "Eco"
      },
      {
        key: 2,
        text: "Análisis",
        value: "Análisis"
      },
      {
        key: 3,
        text: "Test",
        value: "Test"
      },
      {
        key: 4,
        text: "Síntomas",
        value: "Síntomas"
      }
    ];
    options[24] = [
      {
        key: 1,
        text: "9:00-10:00hs",
        value: "9:00-10:00hs"
      },
      {
        key: 2,
        text: "10:00-11:00hs",
        value: "10:00-11:00hs"
      },
      {
        key: 3,
        text: "11:00-12:00hs",
        value: "11:00-12:00hs"
      },
      {
        key: 4,
        text: "12:00-13:00hs",
        value: "12:00-13:00hs"
      },
      {
        key: 5,
        text: "13:00-14:00hs",
        value: "13:00-14:00hs"
      },
      {
        key: 6,
        text: "14:00-15:00hs",
        value: "14:00-15:00hs"
      },
      {
        key: 7,
        text: "15:00-16:00hs",
        value: "15:00-16:00hs"
      },
      {
        key: 8,
        text: "16:00-17:00hs",
        value: "16:00-17:00hs"
      },
      {
        key: 9,
        text: "17:00-18:00hs",
        value: "17:00-18:00hs"
      },
      {
        key: 10,
        text: "18:00-19:00hs",
        value: "18:00-19:00hs"
      },
      {
        key: 11,
        text: "19:00-20:00hs",
        value: "19:00-20:00hs"
      },
      {
        key: 12,
        text: "20:00-21:00hs",
        value: "20:00-21:00hs"
      },
      {
        key: 13,
        text: "21:00-00:00hs",
        value: "21:00-00:00hs"
      },
      {
        key: 14,
        text: "00:00-03:00hs",
        value: "00:00-03:00hs"
      },
      {
        key: 15,
        text: "03:00-06:00hs",
        value: "03:00-06:00hs"
      },
      {
        key: 16,
        text: "06:00-09:00hs",
        value: "06:00-09:00hs"
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
                value={this.state.valor}
                onChange={this.handleOnChange}
                options={options[Number(this.props.pregunta.codigo)]}
              />
            </Form.Field>
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
