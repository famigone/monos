import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import PropTypes from "prop-types"; // ES6
import ContactoPregunta from "/imports/api/contactoPregunta.js";
import ReactDOM from "react-dom";
import { insertPregNenaSegundoILE } from "/api/insertPreguntasNenaSegundoILE.js";
import { insertPregNenaSegundoFem } from "/api/insertPreguntasNenaSegundoFem.js";
import LoaderExampleText from "/imports/ui/Dashboard/LoaderExampleText.js";
import "react-s-alert/dist/s-alert-default.css";
import {
  //insertRespuesta,
  updateRespuestaString,
  updateContactoPregunta,
  deleteILE,
  deleteFEM
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
  Dropdown,
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

export default class RtaFinPrimerMomentoUpdate extends Component {
  state = {
    valor: this.props.rta.rtatexto,
    hidden: true,
    termino: this.setTermino()
  };

  handleOnChange = (e, data) => {
    this.setState({
      valor: data.value
    });
  };

  setTermino() {
    var parar =
      this.props.rta.rtatexto == "No vuelve a conectarse" ||
      this.props.rta.rtatexto == "Decide continuar su embarazo" ||
      this.props.rta.rtatexto == "Aborto espontáneo";
    //console.log("termino: ", rta);
    return parar;
  }
  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    //console.log("this.props.rta ", this.props.rta);
    //console.log("this.props.rta.rtatexto ", this.props.rta.rtatexto);
    //console.log("this.state.valor ", this.state.valor);
    const borrarILE =
      this.props.rta.rtatexto == "Decide solicitar ILE/IVE" &&
      this.state.valor !== this.props.rta.rtatexto;
    const borrarFEM =
      this.props.rta.rtatexto == "Resuelve Aborto libre y feminista" &&
      this.state.valor !== this.props.rta.rtatexto;
    console.log("borrarILE", borrarILE);
    console.log("borrarFEM", borrarFEM);
    console.log("this.props.rta.contactoid", this.props.rta.contactoid);
    const onedelete = { contactoid: this.props.rta.contactoid };

    if (borrarILE) {
      //  console.log(this.props.rta.contactoid);
      deleteILE.call(onedelete, (err, res) => {
        if (err) {
          console.log(err);
        }
      });
    }
    if (borrarFEM) {
      deleteFEM.call(onedelete, (err, res) => {
        if (err) {
          console.log(err);
        }
      });
    }
    const one = {
      id: this.props.rta._id,
      rtatexto: this.state.valor,
      especifique: "",
      codigoPregunta: this.props.pregunta.codigo,
      contactoId: this.props.rta.contactoid
    };
    // Call the Method
    // actualizamos la respuesta y marcamos como contestada
    if (!(this.state.valor === "")) {
      updateRespuestaString.call(one, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          //marcar la contactoPregunta como contestada
          const two = { id: this.props.pregunta._id };
          //console.log(this.state.valor);
          updateContactoPregunta.call(two, (err, res) => {
            if (err) {
              console.log(err);
            } else {
              if (this.state.valor == "Decide solicitar ILE/IVE") {
                this.crearSegundoMomentoIle();
              } else if (
                this.state.valor == "Resuelve Aborto libre y feminista"
              ) {
                this.crearSegundoMomentoFem();
              } else if (
                this.state.valor == "No vuelve a conectarse" ||
                this.state.valor == "Decide continuar su embarazo" ||
                this.state.valor == "Aborto espontáneo"
              ) {
                this.setState({ hidden: false });
              }
            }
          });
        }
      });
    }
  }
  crearSegundoMomentoIle() {
    const one = {};
    one.contactoid = this.props.pregunta.contactoid;
    insertPregNenaSegundoILE.call(one, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        //console.log("cambia actual: ", this.props.pregunta.codigo);
        this.props.cambiarActual(this.props.pregunta.codigo, this.state.valor);
      }
    });
  }
  crearSegundoMomentoFem() {
    const one = {};
    one.contactoid = this.props.pregunta.contactoid;
    insertPregNenaSegundoFem.call(one, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log("cambia actual: ", this.props.pregunta.codigo);
        this.props.cambiarActual(this.props.pregunta.codigo, this.state.valor);
      }
    });
  }
  renderForm() {
    var options = [];
    //opciones de pregunta 2
    options[0] = [
      {
        key: 1,
        text: "No vuelve a conectarse",
        value: "No vuelve a conectarse"
      },
      {
        key: 2,
        text: "Decide continuar su embarazo",
        value: "Decide continuar su embarazo"
      },
      {
        key: 3,
        text: "Aborto espontáneo",
        value: "Aborto espontáneo"
      },
      {
        key: 4,
        text: "Decide solicitar ILE/IVE",
        value: "Decide solicitar ILE/IVE"
      },
      {
        key: 5,
        text: "Resuelve Aborto libre y feminista",
        value: "Resuelve Aborto libre y feminista"
      }
    ];

    return (
      <div>
        <Container textAlign="right">
          <Label color="teal">
            {this.props.pregunta.momento == 1
              ? "PRIMER MOMENTO"
              : "SEGUNDO MOMENTO"}
          </Label>
          <Label color="teal">{this.props.pregunta.seccion}</Label>
        </Container>
        <Header as="h2" dividing>
          <Header.Content>
            {this.props.pregunta.texto}
            <Header.Subheader>
              Si lo desea, puede modificar la respuesta.
            </Header.Subheader>
          </Header.Content>
        </Header>

        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Form.Group widths="equal">
            <Form.Field>
              <Dropdown
                placeholder="Seleccionar"
                search
                selection
                value={this.state.valor}
                onChange={this.handleOnChange}
                options={options[0]}
              />
            </Form.Field>
          </Form.Group>
          <Button color="teal" type="submit">
            Guardar
          </Button>
        </Form>
        <Message floating color="purple" hidden={!this.state.termino}>
          <Message.Header>
            <Icon name="heart outline" /> Carga concluída.
          </Message.Header>
        </Message>
        <Message floating hidden={this.state.hidden}>
          <Message.Header>
            <Icon name="heart outline" color="violet" />
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
