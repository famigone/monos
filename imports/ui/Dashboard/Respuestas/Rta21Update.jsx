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

export default class Rta21Update extends Component {
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
  handleOnChangeEspecifique(event) {
    this.setState({ especifique: event.target.value });
  }

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
          <Icon name="pencil alternate" />
          <Header.Content>
            {this.props.pregunta.texto}
            <Header.Subheader>
              Puede modificar la respuesta si lo desea
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
                options={options[21]}
              />
            </Form.Field>
            {this.state.valor === "Otro motivo" ? (
              <Form.Field>
                <input
                  ref="inputRespuesta"
                  placeholder="Especificar"
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
