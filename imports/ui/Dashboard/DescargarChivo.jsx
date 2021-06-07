import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import PropTypes from "prop-types"; // ES6
import ReactDOM from "react-dom";
import "react-s-alert/dist/s-alert-default.css";
import { analisis } from "/api/methods.js";
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

export default class DescargarChivo extends Component {
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
      prevProps.codigo !== this.props.codigo ||
      prevProps.fechaDesde !== this.props.fechaDesde ||
      prevProps.fechaHasta !== this.props.fechaHasta ||
      prevProps.usuarioid !== this.props.usuarioid
    ) {
      this.setState({
        codigo: this.props.codigo,
        fechaDesde: this.props.fechaDesde,
        fechaHasta: this.props.fechaHasta,
        usuarioid: this.props.usuarioid
        //  username: this.props.username
      });
      const one = {
        codigo: String(this.props.codigo),
        rta: this.props.opcion,
        fechaDesde: this.props.fechaDesde,
        fechaHasta: this.props.fechaHasta,
        usuarioid: this.props.usuarioid
        //username: this.props.username
      };
      //console.log(one);
      const rta = analisis.call(one, (err, res) => {
        //console.log("respuesta en cliente: ", res);
        this.setState({
          loaded: true,
          opcion: res
        });
      });
    }
  }

  renderFila(){
    <Table.Row>
      <Table.Cell> {this.props.opcion} </Table.Cell>
      <Table.Cell> {content} </Table.Cell>
    </Table.Row>
  }

  render() {
    if (this.props.isLoading) {
      return <LoaderExampleText />;
    }

    return (
      <Table fixed celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <h4>GRUPA</h4>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <h4>NÚMERO</h4>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <h4>FECHA</h4>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <h4>PREGUNTA</h4>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <h4>RESPUESTA</h4>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{this.renderFila()}</Table.Body>
      </Table>


    );
  }
}
export default withTracker(({}) => {
  const handles = [Meteor.subscribe("users")];
  const loading = handles.some(handle => !handle.ready());
  return {
    usuarios: Meteor.users.find({}).fetch(),
    isLoading: loading
  };
})(DescargarChivo);
