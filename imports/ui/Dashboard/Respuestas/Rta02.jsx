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

export default class Rta02 extends Component {
  state = { valor: "", hidden: true };

  handleOnChange = (e, data) => {
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
    // Call the Method
    // insertamos la respuesta y marcamos como contestada
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
            }
          });
        }
      });
      if (
        this.state.valor == "Necesita información sobre cómo abortar" ||
        this.state.valor == "Está en proceso de aborto y necesita orientación"
      ) {
        //todo sigue como siempre
        //le sumo 2 en vez de 1 porque borre la pregunta siguiente... la del
        //nro de identificación
        //this.props.cambiarActual(String(this.props.pregunta.orden + 1));
        this.props.cambiarActual(this.props.pregunta.codigo);
      } else {
        this.setState({
          hidden: false
        });
      }
    }
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
                options={options[Number(this.props.pregunta.codigo)]}
              />
            </Form.Field>
          </Form.Group>
          <Button color="purple" type="submit">
            Siguiente
          </Button>
        </Form>
        <Message floating hidden={this.state.hidden}>
          <Message.Header>
            <Icon name="heart outline" /> Carga concluída.
          </Message.Header>
        </Message>
      </div>
    );
  }

  render() {
    //console.log(this.props.pregunta.orden);
    return this.renderForm();
  }
}
