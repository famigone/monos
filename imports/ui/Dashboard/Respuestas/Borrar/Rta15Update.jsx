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

export default class Rta15Update extends Component {
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
      codigo: "15"
    };
    //  console.log(one.id);
    // Call the Method
    //primero) insertLocacion.validate(one);
    const ret = deleteRespuesta.call(one, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log("sexitoo EN 15: ", one.id);
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
    options[15] = [
      {
        key: 1,
        text: "Sola",
        value: "Sola"
      },
      {
        key: 2,
        text: "Pareja",
        value: "Pareja"
      },
      {
        key: 3,
        text: "Ex Pareja",
        value: "Ex Pareja"
      },
      {
        key: 4,
        text: "Hijxs",
        value: "Hijxs"
      },
      {
        key: 5,
        text: "Madre",
        value: "Madre"
      },
      {
        key: 6,
        text: "Padre",
        value: "Padre"
      },
      {
        key: 7,
        text: "Abuelxs",
        value: "Abuelxs"
      },
      {
        key: 8,
        text: "Hermanxs",
        value: "Hermanxs"
      },
      {
        key: 9,
        text: "Otrxs familiares",
        value: "Otrxs familiares"
      },
      {
        key: 10,
        text: "Amigxs",
        value: "Amigxs"
      },
      {
        key: 11,
        text: "jefe/jefa-empleador/empleadora",
        value: "jefe/jefa-empleador/empleadora"
      },
      {
        key: 12,
        text: "Otros",
        value: "Otros"
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
                options={options[15]}
              />
            </Form.Field>
            {this.state.valor === "Otros" ? (
              <Form.Field>
                <input ref="inputRespuesta" placeholder="Especifique" />
              </Form.Field>
            ) : null}
          </Form.Group>
          <Button color="purple" type="submit">
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
