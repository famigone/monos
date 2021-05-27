import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import PropTypes from "prop-types"; // ES6
import ReactDOM from "react-dom";
import "react-s-alert/dist/s-alert-default.css";
import { contarContactos } from "/api/methods.js";
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

export default class CuentaContactos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      opcion: {},
      fechaDesde: this.props.fechaDesde,
      fechaHasta: this.props.fechaHasta,
      usuarioid: this.props.usuarioid
      //  username: this.props.username
    };
  }
  componentDidMount() {}

  componentDidUpdate(prevProps) {
    if (

      prevProps.fechaDesde !== this.props.fechaDesde ||
      prevProps.fechaHasta !== this.props.fechaHasta ||
      prevProps.usuarioid !== this.props.usuarioid
    ) {
      this.setState({

        fechaDesde: this.props.fechaDesde,
        fechaHasta: this.props.fechaHasta,
        usuarioid: this.props.usuarioid
        //  username: this.props.username
      });
      const one = {


        fechaDesde: this.props.fechaDesde,
        fechaHasta: this.props.fechaHasta,
        usuarioid: this.props.usuarioid
        //username: this.props.username
      };
      //console.log(one);
      const rta = contarContactos.call(one, (err, res) => {
        //console.log("respuesta en cliente: ", res);
        this.setState({
          loaded: true,
          opcion: res
        });
      });
    }
  }

  render() {
    const content = this.state.loaded ? this.state.opcion : "...";
    return (
      content
    );
  }
}
