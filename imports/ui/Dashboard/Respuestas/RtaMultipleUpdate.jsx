import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import PropTypes from "prop-types"; // ES6
import ContactoPregunta from "/imports/api/contactoPregunta.js";
import ReactDOM from "react-dom";
import { options } from "./comboMultiple";
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
    //  console.log("entrooooooooooo de nuevo");
    //  console.log(this.props.rtas);
    this.state = {
      hiddenFin: true,
      valor: this.armarCadena(),
      hiddeErrorSePaso: true
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.rtas !== prevProps.rtas)
      this.setState({ valor: this.armarCadena(), hidden:true });
  }

  //  componentDidUpdate(prevProps) {
  //    return this.props.rtas !== prevProps.rtas;
  //  }

  armarCadena() {
    var cad = [];
    this.props.rtas.forEach(rta => {
      cad.push(rta.rtatexto);
    });
    //console.log("Armo cadena: ", cad);
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

      }
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ hiddeErrorSePaso: true });


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
              ///////////////////////////////////////////////////////
              //esto lo agregué el 05/05/21 para arreglar lo de el salto en el update
              this.props.cambiarActual(
                this.props.pregunta.codigo,
                this.state.valor
              );
              ///////////////////////////////////////////////////////
              ///////////////////////////////////////////////////////
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
    //console.log(this.props.rtas;
    return (
      <div>
      <Container textAlign="right">

        <Label color="red">
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
          <Button color="brown" type="submit">
            Guardar
          </Button>
          <Message color={"yellow"} floating hidden={this.state.hiddenFin}>
            <Message.Header>
              <Icon name="heart outline" />
              Modificación realizada con éxito!
            </Message.Header>
          </Message>
          <Message color="pink" floating hidden={this.state.hiddeErrorSePaso}>
            <Message.Header>
              <Icon size="huge" name="meh outline" />
              "Solo podes seleccionar un máximo de tres respuestas..."
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
