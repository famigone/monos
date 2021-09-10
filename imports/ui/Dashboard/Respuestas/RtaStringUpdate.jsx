import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import PropTypes from "prop-types"; // ES6
import ContactoPregunta from "/imports/api/contactoPregunta.js";
import ReactDOM from "react-dom";
import { withTracker } from "meteor/react-meteor-data";
import LoaderExampleText from "/imports/ui/Dashboard/LoaderExampleText.js";
import "react-s-alert/dist/s-alert-default.css";
import {
  updateRespuestaString,
  insertRespuesta,
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

export default class RtaStringUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.rta.rtatexto,
      hidden: true,
      hiddenFin: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref

    const inputRespuesta = ReactDOM.findDOMNode(
      this.refs.inputRespuesta
    ).value.trim();

    const one = {
      id: this.props.rta._id,
      rtatexto: this.state.value,
      especifique: ""
      //  activo: this.props.rta.activo
    };
    // Call the Method
    //insertLocacion.validate(one);
    updateRespuestaString.call(one, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({
          hidden: false
        });
      }
    });
    // Clear form
    ReactDOM.findDOMNode(this.refs.inputRespuesta).value = "";
  }
  componentDidMount() {
    if (this.props.pregunta.codigo === "25") {
      this.setState({ hiddenFin: false });
    }
  }
  renderForm() {
    return (
      <div>
      <Container textAlign="right">

        <Label color="red">
          <Icon name="check circle" />
          {this.props.pregunta.seccion}
        </Label>
      </Container>
        <Header as="h2" dividing>
          <Icon name="pencil alternate" />
          <Header.Content>
            {this.props.pregunta.texto}
            <Header.Subheader>Desea modificar la respuesta?</Header.Subheader>
          </Header.Content>
        </Header>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Form.Group widths="equal">
            <Form.Field>
              <input
                ref="inputRespuesta"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </Form.Field>
          </Form.Group>
          <Button color="orange" type="submit">
            Guardar
          </Button>
        </Form>
        <Message color={"yellow"} floating hidden={this.state.hidden}>
          <Message.Header>
            <Icon name="heart outline" />
            Respuesta modificada con éxito.
          </Message.Header>
        </Message>
        <Message floating hidden={this.state.hiddenFin}>
          <Message.Header>
            <Icon name="heart outline" />
            Has finalizado la carga!
          </Message.Header>
        </Message>
      </div>
    );
  }

  render() {
    //console.log(this.props.rta);
    //console.log(this.props.pregunta.orden);
    return this.renderForm();
  }
}
