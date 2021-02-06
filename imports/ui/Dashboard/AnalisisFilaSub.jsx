import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import PropTypes from "prop-types"; // ES6
import ReactDOM from "react-dom";
import "react-s-alert/dist/s-alert-default.css";
import Respuesta from "/imports/api/respuesta.js";
import LoaderExampleText from "/imports/ui/Dashboard/LoaderExampleText.js";
import { withTracker } from "meteor/react-meteor-data";
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

class AnalisisFilaSub extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.isLoading) {
      return <LoaderExampleText />;
    }

    return (
      <Table.Row>
        <Table.Cell> {this.props.opcion} </Table.Cell>
        <Table.Cell> {this.props.cantidad} </Table.Cell>
      </Table.Row>
    );
  }
}
export default withTracker(({ codigo, opcion }) => {
  const handles = [Meteor.subscribe("respuestacount", codigo, opcion)];
  const loading = handles.some(handle => !handle.ready());
  return {
    cantidad: Respuesta.find({ codigo: codigo, rtatexto: opcion }).count(),
    isLoading: loading
    //rtas: Respuesta.find({}).fetch()
  };
})(AnalisisFilaSub);
