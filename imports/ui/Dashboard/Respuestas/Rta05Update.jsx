import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import PropTypes from "prop-types"; // ES6
import ContactoPregunta from "/imports/api/contactoPregunta.js";
import ReactDOM from "react-dom";

import LoaderExampleText from "/imports/ui/Dashboard/LoaderExampleText.js";
import "react-s-alert/dist/s-alert-default.css";
import {
  updateRespuestaEspecifique,
  updateContactoPregunta
} from "/api/methods.js";
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

export default class Rta05Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valor: this.props.rta.rtatexto,
      especifique: this.props.rta.especifique,
      hidden: true
    };

    this.handleOnChangeEspecifique = this.handleOnChangeEspecifique.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOnChange = (e, data) => {
    //console.log(data.value);
    this.setState({
      valor: data.value
    });
  };

  handleOnChangeEspecifique(event) {
    this.setState({ especifique: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref

    const one = {
      id: this.props.rta._id,
      rtatexto: this.state.valor,
      activo: this.props.rta.activo,
      especifique: this.state.especifique
    };
    // Call the Method
    //insertLocacion.validate(one);
    updateRespuestaEspecifique.call(one, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({ hidden: false });
      }
    });
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
          <Icon name="pencil alternate" />
          <Header.Content>
            {this.props.pregunta.texto}
            <Header.Subheader>
              Si lo desea, puede modificar la respuesta
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
                options={options[2]}
              />
            </Form.Field>
            {this.state.valor === "Otra" ? (
              <Form.Field>
                <input
                  ref="inputRespuesta"
                  placeholder="Especifique"
                  value={this.state.especifique}
                  onChange={this.handleOnChangeEspecifique}
                />
              </Form.Field>
            ) : null}
          </Form.Group>
          <Button color="pink" type="submit">
            Guardar
          </Button>
        </Form>
        <Message floating hidden={this.state.hidden}>
          <Message.Header>
            <Icon name="heart outline" />
            Respuesta modificada con éxito.
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
