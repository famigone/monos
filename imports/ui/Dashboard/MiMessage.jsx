import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Meteor } from "meteor/meteor";
import Locacion from "/imports/api/locaciones.js";
import { withTracker } from "meteor/react-meteor-data";
import { updateLocacion } from "/api/methods.js";
import Alert from "react-s-alert";
import {
  Icon,
  Label,
  Menu,
  Message,
  Table,
  Segment,
  Button,
  Divider,
  Form,
  Grid,
  Dropdown,
  Modal,
  Header
} from "semantic-ui-react";

//const App = () => (

export default class MiMessage extends Component {
  render() {
    if (this.props.visible) {
      return (
        <Message color={this.props.color} visible>
          {this.props.message}
        </Message>
      );
    } else {
      return <Message color={this.props.color} hidden></Message>;
    }
  }
}
