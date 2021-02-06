import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import PropTypes from "prop-types"; // ES6
import LoginForm from "./LoginForm.jsx";
import BarraEstado from "./BarraEstado.jsx";
import MenuPrincipal from "./MenuPrincipal.jsx";
import Footer from "./Footer.jsx";
import SidebarExampleSidebar from "./SidebarExampleSidebar.js";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import "react-s-alert/dist/s-alert-css-effects/scale.css";
import "react-s-alert/dist/s-alert-css-effects/bouncyflip.css";
import "react-s-alert/dist/s-alert-css-effects/flip.css";
import "react-s-alert/dist/s-alert-css-effects/genie.css";
import "react-s-alert/dist/s-alert-css-effects/jelly.css";
import "react-s-alert/dist/s-alert-css-effects/stackslide.css";

import ReactDOM from "react-dom";
import { withTracker } from "meteor/react-meteor-data";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  List,
  useRouteMatch
} from "react-router-dom";
import {
  Grid,
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

export default class App extends Component {
  getContentView() {
    return this.props.children;
  }

  render() {
    return (
      //#FBFCFC
      //#F7F9F9
      <div
        style={{ backgroundColor: "#F4F6F6", width: "100%", height: "100%" }}
      >
        <BarraEstado />
        {this.getContentView()}
        <Segment />
        <Alert stack={{ limit: 3 }} html={true} />
        <Footer />
      </div>
    );
  }
}
