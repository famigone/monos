import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import PropTypes from "prop-types"; // ES6
import ContactoPregunta from "/imports/api/contactoPregunta.js";
import ReactDOM from "react-dom";
import { validar } from "./validar";
import LoaderExampleText from "/imports/ui/Dashboard/LoaderExampleText.js";
import "react-s-alert/dist/s-alert-default.css";
import {
  insertRespuesta,
  updateContactoPregunta,
  validarReglaMultiple
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
  Checkbox,
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

export default class RtaBoolean extends Component {
  state = {
    valor: null,
    hiddeValidar: true,
    mensajeError: ""
  };
  handleChange = (e, { value }) => this.setState({ valor: value });

  handleSubmit(event) {
    event.preventDefault();
    //  console.log("debe mostrar valor: " + this.state.valor);
    // Find the text field via the React ref
    if (!(this.state.valor === null)) {
      const one = {
        contactoid: this.props.pregunta.contactoid,
        contactopreguntaid: this.props.pregunta._id,
        codigo: this.props.pregunta.codigo,
        rtatexto: this.state.valor
        //  activo: true
      };
      let mensaje = validar(
        this.props.respuestas,
        this.props.pregunta.codigo,
        this.state.valor,
        this.props.reglas,
        this.props.pregunta.tipo
      );

      const preguntaActual = {
        codigoPregunta: this.props.pregunta.codigo,
        rta: this.state.valor,
        contactoid: this.props.pregunta.contactoid
      };
      //determinar si existe regla para esta pregunta y esta rta
      var i = 0;
      var encontro = false;
      var pos = -1;
      if (this.props.reglasMultiples) {
        //console.log(this.props.reglasMultiples);
        while (i < this.props.reglasMultiples.length && !encontro) {
          if (
            this.props.reglasMultiples[i].codigoPreguntaDestino ==
            this.props.pregunta.codigo
          ) {
            encontro = true;
            pos = i;
          }
          i = i + 1;
        }
      }
      var mensajeMultiple = "";
      if (encontro) {
        mensajeMultiple = validarReglaMultiple.call(
          preguntaActual,
          (err, res) => {
            if (err) {
              console.log(err);
            } else {
              console.log("mensajeMultiple: ", mensajeMultiple);
              var valido = mensajeMultiple == "";
              if (valido) {
                this.setState({ hiddeValidar: true });
                this.proceder(valido, one);
              } else
                this.setState({
                  hiddeValidar: false,
                  mensajeError: mensaje + mensajeMultiple
                });
              //console.log("validooooooooo essss: ", valido);
            }
          }
        );
      } else {
        var valido = mensaje == "";
        //console.log(valido);
        if (valido) {
          this.setState({ hiddeValidar: true });
          this.proceder(one);
        } else
          this.setState({
            hiddeValidar: false,
            mensajeError: mensaje + mensajeMultiple
          });
        //console.log("validooooooooo essss: ", valido);
      }

      var valido = mensaje == "";
      if (valido) this.setState({ hiddeValidar: true });
      else this.setState({ hiddeValidar: false, mensajeError: mensaje });

      // Call the Method
      //insertLocacion.validate(one);
      if (valido) {
        this.proceder(one);
      }
    }
    // Clear form
    //  ReactDOM.findDOMNode(this.refs.inputRespuesta).value = "";
  }
  proceder(one) {
    insertRespuesta.call(one, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({ valor: null });
        //marcar la contactoPregunta como contestada
        const two = { id: this.props.pregunta._id };
        updateContactoPregunta.call(two, (err, res) => {
          if (err) {
            console.log(err);
          } else {
          }
        });
        // seteamos el nuevo Actual
        this.props.cambiarActual(this.props.pregunta.codigo, one.rtatexto);
      }
    });
  }
  renderForm() {
    //console.log("debe mostrar valor: " + this.state.valor);
    return (
      <div>
        <Container textAlign="right">
          <Label color="teal">
            <Icon name="time" />
            {this.props.pregunta.momento == 1
              ? "PRIMER MOMENTO"
              : "SEGUNDO MOMENTO"}
          </Label>
          <Label color="teal">
            <Icon name="check circle" />
            {this.props.pregunta.seccion}
          </Label>
        </Container>
        <Header as="h2" dividing>
          <Icon name="question circle outline" />
          <Header.Content>
            {this.props.pregunta.texto}
            <Header.Subheader>
              Por favor, seleccione la respuesta correcta
            </Header.Subheader>
          </Header.Content>
        </Header>

        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Form.Field>
            <Checkbox
              radio
              label="SI"
              name="checkboxRadioGroup"
              value="SI"
              checked={this.state.valor === "SI"}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              radio
              label="NO"
              name="checkboxRadioGroup"
              value="NO"
              checked={this.state.valor === "NO"}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Message color="pink" floating hidden={this.state.hiddeValidar}>
            <Message.Header>
              <Icon size="huge" name="meh outline" />
              {this.state.mensajeError}
            </Message.Header>
          </Message>
          <Button color="purple" type="submit">
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
