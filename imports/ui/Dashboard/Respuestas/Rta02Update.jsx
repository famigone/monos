import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import PropTypes from "prop-types"; // ES6
import ContactoPregunta from "/imports/api/contactoPregunta.js";
import ReactDOM from "react-dom";

import LoaderExampleText from "/imports/ui/Dashboard/LoaderExampleText.js";
import "react-s-alert/dist/s-alert-default.css";
import { updateRespuestaString, updateContactoPregunta } from "/api/methods.js";
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

export default class Rta02Update extends Component {
  state = { valor: this.props.rta.rtatexto, hidden: true, hiddenUpdate: true };

  componentDidMount() {
    const mostrar =
      this.props.rta.rtatexto == "Necesita información sobre cómo abortar" ||
      this.props.rta.rtatexto ==
        "Está en proceso de aborto y necesita orientación";
    if (!mostrar) this.setState({ hidden: false });
  }

  handleOnChange = (e, data) => {
    this.setState({
      valor: data.value
    });
  };

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref

    const one = {
      id: this.props.rta._id,
      rtatexto: this.state.valor
      //activo: this.props.rta.activo
    };
    // Call the Method
    //insertLocacion.validate(one);

    const nuevaSigue =
      this.state.valor == "Necesita información sobre cómo abortar" ||
      this.state.valor == "Está en proceso de aborto y necesita orientación";
    const anteriorSigue =
      this.props.rta.rtatexto == "Necesita información sobre cómo abortar" ||
      this.props.rta.rtatexto ==
        "Está en proceso de aborto y necesita orientación";

    updateRespuestaString.call(one, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({
          hiddenUpdate: false
        });
      }
    });
    if (!nuevaSigue) {
      this.setState({
        hidden: false
      });
    }

    //tengo que eliminar todas las rtas que siguen
    if (!nuevaSigue && anteriorSigue) {
      null;
    }

    if (nuevaSigue && !anteriorSigue) {
      //  console.log("entretretreooooooooo");
      // todo lo que sigue esta cerrado, debo abrir la sgte pregunta
      //this.props.cambiarActual(String(this.props.pregunta.orden + 1));
      this.props.cambiarActual(String(this.props.pregunta.orden));
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
                options={options[Number(this.props.pregunta.codigo)]}
              />
            </Form.Field>
          </Form.Group>
          <Button color="pink" type="submit">
            Siguiente
          </Button>
        </Form>
        <Message floating hidden={this.state.hidden}>
          <Message.Header>
            <Icon name="heart outline" /> Carga concluída.
          </Message.Header>
        </Message>
        <Message floating hidden={this.state.hiddenUpdate}>
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
