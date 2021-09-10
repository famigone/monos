import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import PropTypes from "prop-types"; // ES6
import ContactoPregunta from "/imports/api/contactoPregunta.js";
import ReactDOM from "react-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LoaderExampleText from "/imports/ui/Dashboard/LoaderExampleText.js";
import "react-s-alert/dist/s-alert-default.css";
import { updateRespuestaFecha, updateContactoPregunta } from "/api/methods.js";
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
  state = {
    startDate: this.props.rta.rtaFecha,
    hidden: true
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
      id: this.props.rta._id,
      rtaFecha: this.state.startDate,
      activo: this.props.rta.activo
      //  activo: true
    };
    // Call the Method
    //insertLocacion.validate(one);
    updateRespuestaFecha.call(one, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({
          hidden: false
        });
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
          <Icon name="pencil alternate" />
          <Header.Content>
            {this.props.pregunta.texto}
            <Header.Subheader>
              Si lo desea, ingrese una nueva fecha y hora
            </Header.Subheader>
          </Header.Content>
        </Header>

        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Form.Group widths="equal">
            <Form.Field>
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
                //value={this.state.startDate}
                showTimeSelect
                showTimeInput
                dateFormat="dd/MM/yyyy h:mm aa"
              />
            </Form.Field>
          </Form.Group>
          <Button color="yellow" type="submit">
            Guardar
          </Button>
        </Form>
        <Message color={"violet"} floating hidden={this.state.hidden}>
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
