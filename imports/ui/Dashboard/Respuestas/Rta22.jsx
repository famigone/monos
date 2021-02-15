import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import PropTypes from "prop-types"; // ES6
import ContactoPregunta from "/imports/api/contactoPregunta.js";
import ReactDOM from "react-dom";

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

export default class Rta22 extends Component {
  state = {
    abortos: [{ valor: "" }],
    valores: []
  };

  handleSubmit(event) {
    event.preventDefault();

    var arrayLength = this.state.valores.length;
    for (var i = 0; i < arrayLength; i++) {
      const one = {
        contactoid: this.props.pregunta.contactoid,
        contactopreguntaid: this.props.pregunta._id,
        codigo: this.props.pregunta.codigo,
        rtatexto: this.state.valores[i]
        //  activo: true
      };
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
              console.log("sertó ");
            }
          });
          // seteamos el nuevo Actual
        }
      });
    }
    this.props.cambiarActual(this.props.pregunta.codigo);
  }

  //el estado es un array de valores, cada valor representa un Dropdown. Si hay 4 valores, dibujo 4
  //Dropdowns. Con el className de cada dropdown llevo el índice en el arreglo, y en el evento de
  //change del dropdown actualizo el arreglo con ese índice. Luego creo una rta para cada elto del
  //arreglo.
  addAborto = e => {
    this.setState(prevState => ({
      abortos: [...prevState.abortos, { valor: "" }]
    }));
  };
  removeAborto = e => {
    this.setState(prevState => ({
      abortos: [...prevState.abortos.splice(0, 1)],
      valores: [...prevState.abortos.splice(0, 1)]
    }));
  };

  handleOnChange = (e, data) => {
    var onevalores;
    onevalores = this.state.valores;
    onevalores[data.className] = data.value;
    this.setState(prevState => ({
      valores: onevalores
    }));
  };

  renderForm() {
    var options = [];
    let { abortos } = this.state;
    //edad gestacional
    options[22] = [
      {
        key: 1,
        text: "No",
        value: "No"
      },
      {
        key: 2,
        text: "Espontáneo",
        value: "Espontáneo"
      },
      {
        key: 3,
        text: "Provocado - Medicamentos",
        value: "Provocado - Medicamentos"
      },
      {
        key: 4,
        text: "Provocado - Intervención Quirúrgica",
        value: "Provocado - Intervención Quirúrgica"
      },
      {
        key: 5,
        text: "Provocado - Sonda",
        value: "Provocado - Sonda"
      },
      {
        key: 6,
        text: "Provocado - Hierbas",
        value: "Provocado - Hierbas"
      },
      {
        key: 7,
        text: "Otro",
        value: "Otro"
      }
    ];

    return (
      <div>
        <Header as="h2" dividing>
          <Icon name="question circle outline" />
          <Header.Content>
            {this.props.pregunta.texto}
            <Header.Subheader>
              Presione el botón <b>+</b> por cada aborto indicado. Ej: si indica
              3 abortos, presionar 3 veces <b>+</b>
            </Header.Subheader>
          </Header.Content>
        </Header>
        <center align="right">
          <Button.Group>
            <Button size="mini" onClick={this.removeAborto} color="teal">
              -
            </Button>
            <Button size="mini" onClick={this.addAborto} color="teal">
              +
            </Button>
          </Button.Group>
        </center>
        <br />
        <Form onSubmit={this.handleSubmit.bind(this)}>
          {abortos.map((val, index) => (
            <Form.Field key={index}>
              <Dropdown
                className={String(index)}
                placeholder="Seleccionar"
                search
                selection
                onChange={this.handleOnChange}
                options={options[22]}
              />
            </Form.Field>
          ))}

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
