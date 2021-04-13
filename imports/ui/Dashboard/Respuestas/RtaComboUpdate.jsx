import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import PropTypes from "prop-types"; // ES6
import ContactoPregunta from "/imports/api/contactoPregunta.js";
import ReactDOM from "react-dom";
import { options } from "./combo";
import { validar } from "./validar";
import LoaderExampleText from "/imports/ui/Dashboard/LoaderExampleText.js";
import "react-s-alert/dist/s-alert-default.css";
import {
  updateRespuestaString,
  updateContactoPregunta,
  validarReglaMultiple
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

export default class RtaComboUpdate extends Component {
  //state = { valor: this.props.rta.rtatexto, hidden: true };
  constructor(props) {
    super(props);
    //console.log("props desde adentro: ", this.props.rta.rtatexto);
    this.state = {
      valor: this.props.rta.rtatexto,
      otro: this.props.rta.especifique,
      hiddeValidar: true,
      mensajeError: "",
      termino: this.setTermino(),
      validar: false,
      hidden: true
    };
  }

  componentDidUpdate(prevProps) {
    //  console.log("estado: ", this.state.valor);
    //  console.log("estado anterior: ", prevProps.rta.rtatexto);
    if (this.props.rta.rtatexto !== prevProps.rta.rtatexto)
      this.setState({ valor: this.props.rta.rtatexto });
  }

  setTermino() {
    var parar =
      (this.props.rta.rtatexto == "No vuelve a comunicarse" &&
        this.props.pregunta.codigo == 800) ||
      (this.props.rta.rtatexto == "No vuelve a comunicarse" &&
        this.props.pregunta.codigo == 650 &&
        this.props.pregunta.seccion ==
          "Interrupción Legal e Interrupción Voluntaria del Embarazo") ||
      (this.props.rta.rtatexto == "No" &&
        this.props.pregunta.codigo == 660 &&
        this.props.pregunta.seccion ==
          "Interrupción Legal e Interrupción Voluntaria del Embarazo") ||
      (this.props.rta.rtatexto == "Sin dato" &&
        this.props.pregunta.codigo == 660 &&
        this.props.pregunta.seccion ==
          "Interrupción Legal e Interrupción Voluntaria del Embarazo") ||
      (this.props.pregunta.codigo == 830 &&
        this.props.pregunta.seccion ==
          "Acompañamiento Aborto Libre y Feminista");
    //console.log("termino: ", rta);
    return parar;
  }

  handleOnChange = (e, data) => {
    //console.log(data);
    this.setState({
      valor: data.value
    });
  };
  handleOnChangeOtro = event => {
    this.setState({
      otro: event.target.value
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
      especifique: inputRespuesta
      //activo: this.props.rta.activo
      //  activo: true
    };
    const preguntaActual = {
      codigoPregunta: this.props.pregunta.codigo,
      rta: this.state.valor,
      contactoid: this.props.pregunta.contactoid
    };
    let mensaje = validar(
      this.props.respuestas,
      this.props.pregunta.codigo,
      this.state.valor,
      this.props.reglas,
      this.props.pregunta.tipo
    );
    //determinar si existe regla para esta pregunta y esta rta
    var i = 0;
    var encontro = false;
    var pos = -1;
    if (this.props.reglasMultiples) {
      //console.log(this.props.reglasMultiples);
      while (i < this.props.reglasMultiples.length && !encontro) {
        if (
          this.props.reglasMultiples[i].codigoPreguntaDestino ==
          this.props.pregunta.codigo
        ) {
          encontro = true;
          pos = i;
        }
        i = i + 1;
      }
    }
    var mensajeMultiple = "";
    if (encontro) {
      mensajeMultiple = validarReglaMultiple.call(
        preguntaActual,
        (err, res) => {
          if (err) {
            console.log(err);
          } else {
            var valido = mensajeMultiple == "";
            if (valido) {
              this.setState({ hiddeValidar: true });
              updateRespuestaString.call(one, (err, res) => {
                if (err) {
                  console.log(err);
                } else {
                  this.setState({
                    hidden: false
                  });
                }
              });
            } else
              this.setState({
                hiddeValidar: false,
                mensajeError: mensaje + mensajeMultiple
              });
          }
        }
      );
    } else {
      var valido = mensaje == "";
      if (valido) this.setState({ hiddeValidar: true });
      else this.setState({ hiddeValidar: false, mensajeError: mensaje }); //
      //console.log("validooooooooo essss: ", valido);
      if (valido) {
        this.setState({ validar: true });
      } else this.setState({ validar: false });
      var valido = true;
      if (valido) {
        updateRespuestaString.call(one, (err, res) => {
          if (err) {
            console.log(err);
          } else {
            this.setState({
              hidden: false
            });
          }
        });
      }
      // Clear form
    }
  }

  renderForm() {
    //console.log("RENDER: ", this.state.valor);
    //  console.log("opciones ", options[Number(this.props.pregunta.codigo)]);

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
          <Icon name="pencil alternate" />
          <Header.Content>
            {this.props.pregunta.texto}
            <Header.Subheader>
              Si lo deseas, puedes seleccionar otra respuesta
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
                options={options[Number(this.props.pregunta.codigo)]}
              />
            </Form.Field>
            {this.state.valor === "Otro" ? (
              <Form.Field>
                <input
                  ref="inputRespuesta"
                  placeholder="Especifique"
                  value={this.props.rta.especifique}
                  onChange={this.handleOnChangeOtro}
                />
              </Form.Field>
            ) : null}
          </Form.Group>
          <Button color="teal" type="submit">
            Guardar
          </Button>
        </Form>
        <Message color={"violet"} floating hidden={this.state.hidden}>
          <Message.Header>
            <Icon name="heart outline" />
            Respuesta modificada con éxito.
          </Message.Header>
        </Message>
        <Message color={"purple"} floating hidden={!this.state.termino}>
          <Message.Header>
            <Icon name="heart outline" />
            Carga finalizada.
          </Message.Header>
        </Message>
        <Message color="pink" floating hidden={this.state.hiddeValidar}>
          <Message.Header>
            <Icon size="huge" name="meh outline" />
            {this.state.mensajeError}
          </Message.Header>
        </Message>
      </div>
    );
  }

  render() {
    //console.log(this.props.pregunta.contactoid);
    return this.renderForm();
  }
}
