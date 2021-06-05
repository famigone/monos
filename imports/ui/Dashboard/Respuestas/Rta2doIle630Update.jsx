import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import PropTypes from "prop-types"; // ES6
import ContactoPregunta from "/imports/api/contactoPregunta.js";
import ReactDOM from "react-dom";
import { insertPregNenaSegundoILE } from "/api/insertPreguntasNenaSegundoILE.js";
import {
  insertPregNenaSegundoFem,
  deletePregNenaSegundoFem
} from "/api/insertPreguntasNenaSegundoFem.js";
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

export default class Rta2doIle630Update extends Component {
  state = {
    valor: this.props.rta.rtatexto,
    hidden: true,
    termino: this.setTermino()
  };

  setTermino() {
    var parar =
      (this.props.pregunta.codigo == 630 &&
        this.props.pregunta.seccion ==
          "Interrupción Legal e Interrupción Voluntaria del Embarazo" &&
        this.props.rta.rtatexto == "No: Decide continuar el embarazo") ||
      (this.props.pregunta.codigo == 630 &&
        this.props.pregunta.seccion ==
          "Interrupción Legal e Interrupción Voluntaria del Embarazo" &&
        this.props.rta.rtatexto ==
          "No: Nos cuenta que va a buscar otra solución");
    //console.log("termino: ", rta);
    return parar;
  }

  handleOnChange = (e, data) => {
    this.setState({
      valor: data.value
    });
  };

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    var inputRespuesta = "";
    if (this.state.valor === "Otro")
      inputRespuesta = ReactDOM.findDOMNode(
        this.refs.inputRespuesta
      ).value.trim();
    const one = {
      id: this.props.rta._id,
      rtatexto: this.state.valor,
      especifique: inputRespuesta,
      codigoPregunta: this.props.rta.codigo,
      contactoId: this.props.rta.contactoid
      //activo: this.props.rta.activo
      //  activo: true
    };
    // Call the Method
    //insertLocacion.validate(one);
    updateRespuestaString.call(one, (err, res) => {
      var fueServer=false;
      if (err) {
        console.log(err);
      } else {
        this.setState({
          hidden: false
        });
        if (
          this.props.pregunta.codigo == 630 &&
          this.props.pregunta.seccion ==
            "Interrupción Legal e Interrupción Voluntaria del Embarazo" &&
          this.state.valor == "No: La acompañamos con Aborto Libre y Feminista"
        ) {
          //console.log("entrooooooooooooooooooooooo");
          this.crearSegundoMomentoFem();
          fueServer=true;
        }
        if (
          this.props.pregunta.codigo == 630 &&
          this.props.pregunta.seccion ==
            "Interrupción Legal e Interrupción Voluntaria del Embarazo" &&
          this.props.rta.rtatexto ==
            "No: La acompañamos con Aborto Libre y Feminista" &&
          !(
            this.state.valor ==
            "No: La acompañamos con Aborto Libre y Feminista"
          )
        ) {
          //console.log("BORRARRRRRRRRRRRRRRRRRRRRRRRRRR");
          this.borrarSegundoMomentoFem();
          fueServer=true;
        }
        if (!fueServer && (!this.setTermino())){
          console.log("adentrooo fueServer")
          ///////////////////////////////////////////////////////
          //esto lo agregué el 05/05/21 para arreglar lo de el salto en el update
          this.props.cambiarActual(
            this.props.pregunta.codigo,
            this.state.valor
          );
          ///////////////////////////////////////////////////////
          ///////////////////////////////////////////////////////
        }




      }
    });
    // Clear form
  }
  borrarSegundoMomentoFem() {
    const one = {};
    //console.log("BORRARRRRRRRRRRRRRRRRRRRRRRRRRR");
    one.contactoid = this.props.pregunta.contactoid;
    var rta = deletePregNenaSegundoFem.call(one, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        ///////////////////////////////////////////////////////
        //esto lo agregué el 05/05/21 para arreglar lo de el salto en el update
        if (!this.setTermino())
          this.props.cambiarActual(
            this.props.pregunta.codigo,
            this.state.valor
          );
        ///////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////
      }
    });
  }
  crearSegundoMomentoFem() {
    const one = {};

    one.contactoid = this.props.pregunta.contactoid;
    insertPregNenaSegundoFem.call(one, (err, res) => {
      if (err) {
        console.log(err);
      }else{
        ///////////////////////////////////////////////////////
        //esto lo agregué el 05/05/21 para arreglar lo de el salto en el update
        if (!this.setTermino())
          this.props.cambiarActual(
            this.props.pregunta.codigo,
            this.state.valor
          );
        ///////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////
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
        <Message color={"violet"} floating hidden={this.state.hidden}>
          <Message.Header>
            <Icon name="heart outline" />
            Carga concluída
          </Message.Header>
        </Message>
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
