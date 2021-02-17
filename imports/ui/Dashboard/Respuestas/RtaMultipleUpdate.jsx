import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import PropTypes from "prop-types"; // ES6
import ContactoPregunta from "/imports/api/contactoPregunta.js";
import ReactDOM from "react-dom";

import LoaderExampleText from "/imports/ui/Dashboard/LoaderExampleText.js";
import "react-s-alert/dist/s-alert-default.css";
import {
  insertRespuesta,
  deleteRespuesta,
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

export default class RtaMultipleUpdate extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.rtas);
    this.state = {
      hiddenFin: true,
      valor: this.armarCadena()
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  armarCadena() {
    var cad = [];
    this.props.rtas.forEach(rta => {
      cad.push(rta.rtatexto);
    });
    return cad;
  }

  handleOnChange = (e, data) => {
    //console.log(data.value);
    this.setState({
      valor: data.value
    });
  };

  //borra todo lo que había para insertar lo nuevo
  eliminarAnteriores() {
    const one = {
      //id: this.props.rtas[0].contactoid
      id: this.props.rtas[0].contactoid,
      codigo: this.props.pregunta.codigo
    };
    //  console.log(one.id);
    // Call the Method
    //primero) insertLocacion.validate(one);
    const ret = deleteRespuesta.call(one, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log("sexitoo: ", ret);
      }
    });
  }
  handleSubmit(event) {
    event.preventDefault();

    this.eliminarAnteriores();
    if (!(this.state.valor === "")) {
      var inputRespuesta;
      if (this.state.valor === "Otros")
        inputRespuesta = ReactDOM.findDOMNode(
          this.refs.inputRespuesta
        ).value.trim();
      //como es múltiple

      this.state.valor.forEach(rta => {
        var one = {
          contactoid: this.props.pregunta.contactoid,
          contactopreguntaid: this.props.pregunta._id,
          codigo: this.props.pregunta.codigo,
          rtatexto: rta,
          especifique: inputRespuesta
          //  activo: true
        };
        insertRespuesta.call(one, (err, res) => {
          if (err) {
            console.log(err);
          } else {
            this.setState({ hiddenFin: false });
          }
        });
      });
      if (!(this.state.valor === "")) {
        null;
      }
    }
    // Clear form
  }

  renderForm() {
    var options = [];
    //opciones de pregunta 2
    options[150] = [
      {
        key: 1,
        text: "La persona de la que estoy embarazadx",
        value: "La persona de la que estoy embarazadx"
      },
      {
        key: 2,
        text: "Amigx",
        value: "Amigx"
      },
      {
        key: 3,
        text: "Madre",
        value: "Madre"
      },
      {
        key: 4,
        text: "Padre",
        value: "Padre"
      },
      {
        key: 5,
        text: "Hermanx",
        value: "Hermanx"
      },
      {
        key: 6,
        text: "Otrxs familiares",
        value: "Otrxs familiares"
      },
      {
        key: 7,
        text: "Docente/alguien de la escuela",
        value: "Docente/alguien de la escuela"
      },
      {
        key: 8,
        text: "Adultx de confianza",
        value: "Adultx de confianza"
      },
      {
        key: 9,
        text: "Novix/pareja",
        value: "Novix/pareja"
      },
      {
        key: 10,
        text: "Amigovix/ pareja no estable",
        value: "Amigovix/ pareja no estable"
      },
      {
        key: 11,
        text: "Ex novix/ ex pareja",
        value: "Ex novix/ ex pareja"
      },
      {
        key: 12,
        text: "Personal de salud",
        value: "Personal de salud"
      },
      {
        key: 13,
        text: "Nadie sabe",
        value: "Nadie sabe"
      },
      {
        key: 14,
        text: "Otrxs",
        value: "Otrxs"
      }
    ];
    options[160] = [
      {
        key: 1,
        text: "La persona de la que estoy embarazadx",
        value: "La persona de la que estoy embarazadx"
      },
      {
        key: 2,
        text: "Amigx",
        value: "Amigx"
      },
      {
        key: 3,
        text: "Madre",
        value: "Madre"
      },
      {
        key: 4,
        text: "Padre",
        value: "Padre"
      },
      {
        key: 5,
        text: "Hermanx",
        value: "Hermanx"
      },
      {
        key: 6,
        text: "Otrxs familiares",
        value: "Otrxs familiares"
      },
      {
        key: 7,
        text: "Docente/alguien de la escuela",
        value: "Docente/alguien de la escuela"
      },
      {
        key: 8,
        text: "Adultx de confianza",
        value: "Adultx de confianza"
      },
      {
        key: 9,
        text: "Novix/pareja",
        value: "Novix/pareja"
      },
      {
        key: 10,
        text: "Amigovix/ pareja no estable",
        value: "Amigovix/ pareja no estable"
      },
      {
        key: 11,
        text: "Ex novix/ ex pareja",
        value: "Ex novix/ ex pareja"
      },
      {
        key: 12,
        text: "Personal de salud",
        value: "Personal de salud"
      },
      {
        key: 13,
        text: "Nadie sabe",
        value: "Nadie sabe"
      },
      {
        key: 14,
        text: "Otrxs",
        value: "Otrxs"
      }
    ];
    options[170] = [
      {
        key: 1,
        text: "La persona de la que estoy embarazadx",
        value: "La persona de la que estoy embarazadx"
      },
      {
        key: 2,
        text: "Amigx",
        value: "Amigx"
      },
      {
        key: 3,
        text: "Madre",
        value: "Madre"
      },
      {
        key: 4,
        text: "Padre",
        value: "Padre"
      },
      {
        key: 5,
        text: "Hermanx",
        value: "Hermanx"
      },
      {
        key: 6,
        text: "Otrxs familiares",
        value: "Otrxs familiares"
      },
      {
        key: 7,
        text: "Docente/alguien de la escuela",
        value: "Docente/alguien de la escuela"
      },
      {
        key: 8,
        text: "Adultx de confianza",
        value: "Adultx de confianza"
      },
      {
        key: 9,
        text: "Novix/pareja",
        value: "Novix/pareja"
      },
      {
        key: 10,
        text: "Amigovix/ pareja no estable",
        value: "Amigovix/ pareja no estable"
      },
      {
        key: 11,
        text: "Ex novix/ ex pareja",
        value: "Ex novix/ ex pareja"
      },
      {
        key: 12,
        text: "Personal de salud",
        value: "Personal de salud"
      },
      {
        key: 13,
        text: "Nadie sabe",
        value: "Nadie sabe"
      },
      {
        key: 14,
        text: "Otrxs",
        value: "Otrxs"
      }
    ];
    //console.log(this.props.rtas;
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
          <Icon name="pencil" />
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
                multiple
                value={this.state.valor}
                onChange={this.handleOnChange}
                options={options[this.props.pregunta.orden]}
              />
            </Form.Field>
            {this.state.valor === "Otros" ? (
              <Form.Field>
                <input ref="inputRespuesta" placeholder="Especifique" />
              </Form.Field>
            ) : null}
          </Form.Group>
          <Button color="teal" type="submit">
            Siguiente
          </Button>
          <Message floating hidden={this.state.hiddenFin}>
            <Message.Header>
              <Icon name="heart outline" />
              Modificación realizada con éxito!
            </Message.Header>
          </Message>
        </Form>
      </div>
    );
  }

  render() {
    return this.renderForm();
  }
}
