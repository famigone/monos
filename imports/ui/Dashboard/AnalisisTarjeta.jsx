import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import PropTypes from "prop-types"; // ES6
import ReactDOM from "react-dom";
import AnalisisFila from "./AnalisisFila.jsx";
import AnalisisFilaSub from "./AnalisisFilaSub.jsx";
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
  Statistic,
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

export default class AnalisisTarjeta extends Component {
  constructor(props) {
    super(props);
  }

  calcularFilas() {
    if (this.props.lista)
      return this.props.lista.map(rta => (
        <AnalisisFila
          codigo={this.props.codigo}
          opcion={rta.text}
          fechaDesde={this.props.desde}
          fechaHasta={this.props.hasta}
          usuarioid={this.props.usuarioid}
          username={this.props.username}
        />
      ));
  }
  render() {
    return (
      <Segment color="teal" raised>
        <Header as="h3" dividing>
          {this.props.pregunta}
        </Header>

        <Table celled>
          <Table.Body>{this.calcularFilas()}</Table.Body>
        </Table>
      </Segment>
    );
  }
}
