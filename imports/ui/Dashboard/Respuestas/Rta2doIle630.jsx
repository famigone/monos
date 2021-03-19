import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import PropTypes from "prop-types"; // ES6
import ContactoPregunta from "/imports/api/contactoPregunta.js";
import ReactDOM from "react-dom";
import { insertPregNenaSegundoILE } from "/api/insertPreguntasNenaSegundoILE.js";
import { insertPregNenaSegundoFem } from "/api/insertPreguntasNenaSegundoFem.js";
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

export default class Rta2doIle630 extends Component {
  state = { valor: "", termino: false };

  handleOnChange = (e, data) => {
    //console.log(data.value);
    this.setState({
      valor: data.value
    });
  };

  handleSubmit(event) {
    event.preventDefault();
    var inputRespuesta;
    if (this.state.valor === "Otro")
      inputRespuesta = ReactDOM.findDOMNode(
        this.refs.inputRespuesta
      ).value.trim();
    // Find the text field via the React ref

    const one = {
      contactoid: this.props.pregunta.contactoid,
      contactopreguntaid: this.props.pregunta._id,
      codigo: this.props.pregunta.codigo,
      rtatexto: this.state.valor,
      especifique: inputRespuesta
      //  activo: true
    };

    if (!(this.state.valor === "")) {
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
          //console.log("this.state.valor ", this.state.valor);
          var parar =
            (this.props.pregunta.codigo == 630 &&
              this.state.valor == "No: Decide continuar el embarazo") ||
            (this.props.pregunta.codigo == 630 &&
              this.state.valor ==
                "No: Nos cuenta que va a buscar otra solución");

          //console.log("parar ", parar);

          //en este punto estamos en niñas, el 2do momento ILE
          //pero si contesta esto, entonces hay que cargar las preguntas
          //del 2do momento FEM
          if (
            this.props.pregunta.codigo == 630 &&
            this.state.valor ==
              "No: La acompañamos con Aborto Libre y Feminista"
          ) {
            //console.log("entrooooooooooooooooooooooo");
            this.crearSegundoMomentoFem();
          } else {
            if (!parar) {
              this.props.cambiarActual(
                this.props.pregunta.codigo,
                this.state.valor
              );
              this.setState({ valor: "" });
            }
          }
        }
      });
    }
    // Clear form
  }

  crearSegundoMomentoFem() {
    const one = {};

    one.contactoid = this.props.pregunta.contactoid;
    insertPregNenaSegundoFem.call(one, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        this.props.cambiarActual(this.props.pregunta.codigo, this.state.valor);
        this.setState({ valor: "" });
      }
    });
  }
  renderForm() {
    var options = [];
    //opciones de pregunta 2
    options[0] = [
      {
        key: 1,
        text: "No: Decide continuar el embarazo",
        value: "No: Decide continuar el embarazo"
      },
      {
        key: 2,
        text: "No: Nos cuenta que va a buscar otra solución",
        value: "No: Nos cuenta que va a buscar otra solución"
      },
      {
        key: 3,
        text: "No: La acompañamos con Aborto Libre y Feminista",
        value: "No: La acompañamos con Aborto Libre y Feminista"
      },
      {
        key: 4,
        text: "Sí: y no necesitó intervención quirúrgica",
        value: "Sí: y no necesitó intervención quirúrgica"
      },
      {
        key: 5,
        text: "Sí: necesitó intervención quirúrgica AMEU",
        value: "Sí: necesitó intervención quirúrgica AMEU"
      },
      {
        key: 6,
        text: "Sí: necesitó intervención quirúrgica LEGRADO",
        value: "Sí: necesitó intervención quirúrgica LEGRADO"
      }
    ];

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
        <Message color={"purple"} floating hidden={!this.state.termino}>
          <Message.Header>
            <Icon name="heart outline" /> Carga concluída.
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
