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

export default class Rta13Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valor: this.props.rta.rtatexto,
      especifique: this.props.rta.especifique,
      especifique1: this.props.rta.especifique1,
      hidden: true
    };
  }

  handleOnChangeNatural = event => {
    console.log("valorrs:", event.target.value);
    this.setState({
      valor: event.target.value
    });
  };
  handleOnChangeCesarea = event => {
    //console.log(data.value);
    this.setState({
      especifique: event.target.value
    });
  };
  handleOnChangeAdopcion = event => {
    //console.log(data.value);
    this.setState({
      especifique1: event.target.value
    });
  };

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref

    const one = {
      id: this.props.rta._id,
      rtatexto: this.state.valor,
      activo: this.props.rta.activo,
      especifique: this.state.especifique,
      especifique1: this.state.especifique1
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
              <input
                ref="inputNatural"
                placeholder="Parto Natural"
                value={this.state.valor}
                onChange={this.handleOnChangeNatural}
              />
            </Form.Field>
            <Form.Field>
              <input
                ref="inputCesarea"
                placeholder="Cesárea"
                value={this.state.especifique}
                onChange={this.handleOnChangeCesarea}
              />
            </Form.Field>
            <Form.Field>
              <input
                ref="inputAdopcion"
                placeholder="Adopción"
                value={this.state.especifique1}
                onChange={this.handleOnChangeAdopcion}
              />
            </Form.Field>
          </Form.Group>
          <Button color="purple" type="submit">
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
