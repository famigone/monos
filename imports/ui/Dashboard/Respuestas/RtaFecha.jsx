import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import PropTypes from "prop-types"; // ES6
import ContactoPregunta from "/imports/api/contactoPregunta.js";
import ReactDOM from "react-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LoaderExampleText from "/imports/ui/Dashboard/LoaderExampleText.js";
import "react-s-alert/dist/s-alert-default.css";
import { insertRespuesta, updateContactoPregunta } from "/api/methods.js";
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

export default class RtaString extends Component {
  state = {
    startDate: new Date()
  };
  handleChange = date => {
    this.setState({
      startDate: date
    });
  };
  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref

    const one = {
      contactoid: this.props.pregunta.contactoid,
      contactopreguntaid: this.props.pregunta._id,
      codigo: this.props.pregunta.codigo,
      rtaFecha: this.state.startDate
      //  activo: true
    };
    // Call the Method
    //insertLocacion.validate(one);
    insertRespuesta.call(one, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        //marcar la contactoPregunta como contestada
        const two = { id: this.props.pregunta._id };
        updateContactoPregunta.call(two, (err, res) => {
          if (err) {
            console.log(err);
          } else {
          }
        });
        // seteamos el nuevo Actual
        //this.props.cambiarActual(String(this.props.pregunta.orden + 1));
        this.props.cambiarActual(this.props.pregunta.codigo);
      }
    });
    // Clear form
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
          <Icon name="question circle outline" />
          <Header.Content>
            {this.props.pregunta.texto}
            <Header.Subheader>Por favor, ingrese una fecha</Header.Subheader>
          </Header.Content>
        </Header>

        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Form.Group widths="equal">
            <Form.Field>
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
                showTimeSelect
                showTimeInput
                dateFormat="dd/MM/yyyy h:mm aa"
              />
            </Form.Field>
          </Form.Group>
          <Button color="yellow" type="submit">
            Siguiente
          </Button>
        </Form>
      </div>
    );
  }

  render() {
    //console.log(this.props.pregunta.orden);
    return this.renderForm();
  }
}
