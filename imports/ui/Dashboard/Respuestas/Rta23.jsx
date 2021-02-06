import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import PropTypes from "prop-types"; // ES6
import ContactoPregunta from "/imports/api/contactoPregunta.js";
import ReactDOM from "react-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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

export default class Rta23 extends Component {
  state = { valor: "", startDate: new Date() };

  handleOnChange = (e, data) => {
    //console.log(data.value);
    this.setState({
      valor: data.value
    });
  };

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  handleSubmit(event) {
    event.preventDefault();
    var inputRespuesta = "";
    // Find the text field via the React ref
    if (this.state.valor == "Se acompaña solicitud ILE") {
      inputRespuesta = ReactDOM.findDOMNode(
        this.refs.inputRespuesta
      ).value.trim();
    }
    // Find the text field via the React ref

    const one = {
      contactoid: this.props.pregunta.contactoid,
      contactopreguntaid: this.props.pregunta._id,
      codigo: this.props.pregunta.codigo,
      rtatexto: this.state.valor,
      rtaFecha: this.state.startDate,
      especifique: inputRespuesta
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
          }
        });
        // seteamos el nuevo Actual

        this.props.cambiarActual(this.props.pregunta.codigo);
      }
    });
    // Clear form
  }

  renderForm() {
    var options = [];
    //edad gestacional
    options[23] = [
      {
        key: 1,
        text: "Se acompaña en taller socorrista", //va con fecha
        value: "Se acompaña en taller socorrista"
      },
      {
        key: 2,
        text: "Se acompaña solicitud ILE", //(especificar lugar, referencias dadas y nombre de
        value: "Se acompaña solicitud ILE"
      },
      {
        key: 3,
        text: "Se comunica con otra grupa socorrista",
        value: "Se comunica con otra grupa socorrista"
      },
      {
        key: 4,
        text: "Se acompaña a distancia",
        value: "Se acompaña a distancia"
      },
      {
        key: 5,
        text:
          "El acompañamiento se hace con compañera/compañere que colabora con SenRed en ese lugar de residencia",
        value:
          "El acompañamiento se hace con compañera/compañere que colabora con SenRed en ese lugar de residencia"
      },
      {
        key: 6,
        text: "Se le dio información de acompañamiento durante la llamada",
        value: "Se le dio información de acompañamiento durante la llamada"
      }
    ];

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
                onChange={this.handleOnChange}
                options={options[23]}
              />
            </Form.Field>
            {this.state.valor === "Se acompaña en taller socorrista" ? (
              <Form.Field>
                <DatePicker
                  selected={this.state.startDate}
                  onChange={this.handleChange}
                  selected={this.state.startDate}
                  dateFormat="dd/MM/yyyy"
                />
              </Form.Field>
            ) : null}
            {this.state.valor === "Se acompaña solicitud ILE" ? (
              <Form.Field>
                <Form.Field>
                  <input
                    ref="inputRespuesta"
                    placeholder="Especificar Lugar, Referencias dadas y Nombre de acompañante de la Grupa"
                  />
                </Form.Field>
              </Form.Field>
            ) : null}
          </Form.Group>
          <Button color="pink" type="submit">
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
