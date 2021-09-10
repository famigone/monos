import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import PropTypes from "prop-types"; // ES6
import ContactoPregunta from "/imports/api/contactoPregunta.js";
import ReactDOM from "react-dom";
import { withTracker } from "meteor/react-meteor-data";
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
  constructor(props) {
    super(props);
    this.state = {
      hiddenFin: true
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref

    const inputRespuesta = ReactDOM.findDOMNode(
      this.refs.inputRespuesta
    ).value.trim();

    if (inputRespuesta === "") this.setState({ ocultarError: false });
    else {
      const one = {
        contactoid: this.props.pregunta.contactoid,
        contactopreguntaid: this.props.pregunta._id,
        codigo: this.props.pregunta.codigo,
        rtatexto: inputRespuesta
        //  activo: true
      };
      // Call the Method
      //insertLocacion.validate(one);

      insertRespuesta.call(one, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          //si era la última, activo msg de fin

          //marcar la contactoPregunta como contestada
          const two = { id: this.props.pregunta._id };
          updateContactoPregunta.call(two, (err, res) => {
            if (err) {
              console.log(err);
            } else {
            }
          });
          // seteamos el nuevo Actual
          if (!(this.props.pregunta.codigo === "25")) {
            //this.props.cambiarActual(String(this.props.pregunta.orden + 1));
            this.props.cambiarActual(this.props.pregunta.codigo);
            //console.log(this.props.pregunta.orden);
          } else {
            this.setState({ hiddenFin: false });
          }
        }
      });
      // Clear form
      ReactDOM.findDOMNode(this.refs.inputRespuesta).value = "";
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
          <Icon name="question circle outline" />
          <Header.Content>
            {this.props.pregunta.texto}
            <Header.Subheader>
              Por favor, ingrese una respuesta para la pregunta
            </Header.Subheader>
          </Header.Content>
        </Header>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Form.Group widths="equal">
            <Form.Field>
              <input ref="inputRespuesta" placeholder="ingrese una respuesta" />
            </Form.Field>
          </Form.Group>
          <Button color="yellow" type="submit">
            Siguiente
          </Button>
          <Message floating hidden={this.state.hiddenFin}>
            <Message.Header>
              <Icon name="heart outline" />
              Has finalizado con la carga!
            </Message.Header>
          </Message>
        </Form>
      </div>
    );
  }

  render() {
    if (this.props.isLoading) {
      return <LoaderExampleText />;
    }

    //console.log(this.props.pregunta.orden);
    return this.renderForm();
  }
}
