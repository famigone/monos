import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import PropTypes from "prop-types"; // ES6
import ContactoPregunta from "/imports/api/contactoPregunta.js";
import ReactDOM from "react-dom";
import { validar } from "./validar";
import LoaderExampleText from "/imports/ui/Dashboard/LoaderExampleText.js";
import "react-s-alert/dist/s-alert-default.css";
import { updateRespuestaString, updateContactoPregunta } from "/api/methods.js";
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

export default class RtaBooleanUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valor: this.props.rta.rtatexto,
      hidden: true,
      hiddeValidar: true,
      mensajeError: ""
    };
  }
  handleChange = (e, { value }) => {
    //console.log(value);
    this.setState({ valor: value });
  };


  componentDidUpdate(prevProps) {
    //  console.log("estado: ", this.state.valor);
    //  console.log("estado anterior: ", prevProps.rta);
    //  console.log("props actuales: ", this.props.rta);
      if (this.props.rta.rtatexto !== prevProps.rta.rtatexto)
        this.setState({ valor: this.props.rta.rtatexto, hidden:true });
  }


  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref

    const one = {
      id: this.props.rta._id,
      rtatexto: this.state.valor,
      especifique: "",
      codigoPregunta: this.props.pregunta.codigo,
      contactoId: this.props.rta.contactoid
      //  activo: true
    };
    // Call the Method
    //insertLocacion.validate(one);
    let mensaje = validar(
      this.props.respuestas,
      this.props.pregunta.codigo,
      this.state.valor,
      this.props.reglas,
      this.props.pregunta.tipo
    );
    var valido = mensaje == "";
    if (valido) this.setState({ hiddeValidar: true });
    else this.setState({ hiddeValidar: false, mensajeError: mensaje });

    // Call the Method
    //insertLocacion.validate(one);
    if (valido) {
      updateRespuestaString.call(one, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          if (res == "") {
            this.setState({
              hidden: false
            });
            ///////////////////////////////////////////////////////
            //esto lo agregué el 05/05/21 para arreglar lo de el salto en el update
            this.props.cambiarActual(
              this.props.pregunta.codigo,
              this.state.valor
            );
            ///////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////
          } else {
            this.setState({ hiddeValidar: false, mensajeError: res });
          }
        }
      });
      // Clear form
      //  ReactDOM.findDOMNode(this.refs.inputRespuesta).value = "";
    }
  }
  renderForm() {
    //  console.log("prop: " + this.props.rta.rtatexto);
    //  console.log("estado: " + this.state.valor);
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
              Si lo deseas, puedes cambiar la respuesta
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
              onChange={this.handleChange.bind(this)}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              radio
              label="NO"
              name="checkboxRadioGroup"
              value="NO"
              checked={this.state.valor === "NO"}
              onChange={this.handleChange.bind(this)}
            />
          </Form.Field>

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
        <Message color="pink" floating hidden={this.state.hiddeValidar}>
          <Message.Header>
            <Icon size="huge" name="meh outline" />
            {this.state.mensajeError}
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
