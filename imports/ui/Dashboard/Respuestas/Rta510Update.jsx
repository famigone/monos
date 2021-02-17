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
  insertRespuesta,
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

export default class Rta510 extends Component {
  state = { valor: "", hidden: true };

  handleOnChange = (e, data) => {
    this.setState({
      valor: data.value
    });
  };

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    //  console.log("this.props.rta ", this.props.rta);
    //  console.log("this.state.valor ", this.state.valor);
    const borrarILE =
      this.props.rta.rtatexto == "Decide solicitar ILE/IVE" &&
      this.state.valor != this.props.rta;
    const borrarFEM =
      this.props.rta.rtatexto == "Resuelve Aborto libre y feminista" &&
      this.state.valor != this.props.rta;
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
      contactoid: this.props.pregunta.contactoid,
      contactopreguntaid: this.props.pregunta._id,
      codigo: this.props.pregunta.codigo,
      rtatexto: this.state.valor
      //  activo: true
    };
    // Call the Method
    // insertamos la respuesta y marcamos como contestada
    if (!(this.state.valor === "")) {
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
              if (this.state.valor == "Decide solicitar ILE/IVE") {
                this.props.cambiarActual(this.props.pregunta.codigo);
                this.crearSegundoMomentoIle();
              } else if (
                this.state.valor == "Resuelve Aborto libre y feminista"
              ) {
                this.props.cambiarActual(this.props.pregunta.codigo);
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
      }
    });
  }
  crearSegundoMomentoFem() {
    const one = {};

    one.contactoid = this.props.pregunta.contactoid;
    insertPregNenaSegundoFem.call(one, (err, res) => {
      if (err) {
        console.log(err);
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
                onChange={this.handleOnChange}
                options={options[0]}
              />
            </Form.Field>
          </Form.Group>
          <Button color="teal" type="submit">
            Siguiente
          </Button>
        </Form>
        <Message floating hidden={this.state.hidden}>
          <Message.Header>
            <Icon name="heart outline" /> Carga concluída.
          </Message.Header>
        </Message>
        <Message floating hidden={this.state.hiddenUpdate}>
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
