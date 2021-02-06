import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import PropTypes from "prop-types"; // ES6
import ContactoPregunta from "/imports/api/contactoPregunta.js";
import ReactDOM from "react-dom";

import LoaderExampleText from "/imports/ui/Dashboard/LoaderExampleText.js";
import "react-s-alert/dist/s-alert-default.css";
import {
  deleteRespuesta,
  insertRespuesta,
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

export default class Rta22Up extends Component {
  state = {
    rtas: this.props.rtas,
    hidden: true
  };

  handleSubmit(event) {
    event.preventDefault();
    //console.log("va a borrar: " + this.props.rtas[0].contactoid);
    //primero borro todas las rtas anteriores sin importar Nada
    const one = {
      //id: this.props.rtas[0].contactoid
      id: this.props.rtas[0].contactoid,
      codigo: "22"
    };
    //  console.log(one.id);
    // Call the Method
    //primero) insertLocacion.validate(one);
    const ret = deleteRespuesta.call(one, (err, res) => {
      if (err) {
        console.log(err);
      }
    });
    //  console.log("borro: " + ret);
    //segundo) inserto lo nuevo
    var arrayLength = this.state.rtas.length;
    //  console.log("va a insertar CANTIDAD: " + arrayLength);
    for (var i = 0; i < arrayLength; i++) {
      const one = {
        contactoid: this.props.pregunta.contactoid,
        contactopreguntaid: this.props.pregunta._id,
        codigo: this.props.pregunta.codigo,
        rtatexto: this.state.rtas[i].rtatexto
        //  activo: true
      };
      // Call the Method
      //insertLocacion.validate(one);
      insertRespuesta.call(one, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          this.setState({ hidden: false });
        }
      });
    }
  }

  //el estado es un array de valores, cada valor representa un Dropdown. Si hay 4 valores, dibujo 4
  //Dropdowns. Con el className de cada dropdown llevo el índice en el arreglo, y en el evento de
  //change del dropdown actualizo el arreglo con ese índice. Luego creo una rta para cada elto del
  //arreglo.
  addAborto = e => {
    const one = {
      rtatexto: ""
    };
    this.setState(prevState => ({
      rtas: [...prevState.rtas, one]
    }));
  };
  removeAborto = e => {
    this.setState(prevState => ({
      rtas: [...prevState.rtas.splice(0, 1)],
      rtas: [...prevState.rtas.splice(0, 1)]
    }));
  };

  handleOnChange = (e, data) => {
    //console.log(this.state.rtas);
    var lasRtas;
    lasRtas = this.state.rtas;
    lasRtas[Number.parseInt(data.className)].rtatexto = data.value;
    this.setState(prevState => ({
      rtas: lasRtas
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
          <Icon name="pencil alternate" />
          <Header.Content>
            {this.props.pregunta.texto}
            <Header.Subheader>
              Puede modificar la respuesta si lo desea.
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
          {this.state.rtas.map((val, index) => (
            <Form.Field key={index}>
              <Dropdown
                className={String(index)}
                placeholder="Seleccionar"
                search
                selection
                value={this.state.rtas[String(index)].rtatexto}
                onChange={this.handleOnChange}
                options={options[22]}
              />
            </Form.Field>
          ))}

          <Button color="pink" type="submit">
            Guardar
          </Button>
        </Form>
        <Message floating hidden={this.state.hidden}>
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
