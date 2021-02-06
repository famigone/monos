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

export default class Rta16Update extends Component {
  constructor(props) {
    super(props);

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
      codigo: "16"
    };
    //  console.log(one.id);
    // Call the Method
    //primero) insertLocacion.validate(one);
    const ret = deleteRespuesta.call(one, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log("sexitoo: ", one.id);
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
    options[16] = [
      {
        key: 1,
        text: "Pareja",
        value: "Pareja"
      },
      {
        key: 2,
        text: "Ex Pareja",
        value: "Ex Pareja"
      },
      {
        key: 3,
        text: "Persona de la que está embarazadx",
        value: "Persona de la que está embarazadx"
      },
      {
        key: 4,
        text: "Amigxs",
        value: "Amigxs"
      },
      {
        key: 5,
        text: "Amiga",
        value: "Amiga"
      },
      {
        key: 6,
        text: "Madre",
        value: "Madre"
      },
      {
        key: 7,
        text: "Padre",
        value: "Padre"
      },
      {
        key: 8,
        text: "Hija",
        value: "Hija"
      },
      {
        key: 9,
        text: "Hermanxs",
        value: "Hermanxs"
      },
      {
        key: 10,
        text: "Otrxs familiares",
        value: "Otrxs familiares"
      },

      {
        key: 11,
        text: "Otra persona",
        value: "Otra persona"
      },
      {
        key: 12,
        text: "No",
        value: "No"
      }
    ];
    //console.log(this.props.rtas;
    return (
      <div>
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
              <Dropdown
                placeholder="Seleccionar"
                search
                selection
                multiple
                value={this.state.valor}
                onChange={this.handleOnChange}
                options={options[16]}
              />
            </Form.Field>
            {this.state.valor === "Otros" ? (
              <Form.Field>
                <input ref="inputRespuesta" placeholder="Especifique" />
              </Form.Field>
            ) : null}
          </Form.Group>
          <Button color="pink" type="submit">
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
