import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import PropTypes from "prop-types"; // ES6
import ContactoPregunta from "/imports/api/contactoPregunta.js";
import ReactDOM from "react-dom";
import { options } from "./combo";
import { validar } from "./validar";
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
    //  console.log("estado anterior: ", prevProps.rta);
    //  console.log("props actuales: ", this.props.rta);
      if (this.props.rta.rtatexto !== prevProps.rta.rtatexto)
        this.setState({ valor: this.props.rta.rtatexto, hidden:true });
  }

  setTermino() {
    var parar =   ((this.props.pregunta.codigo == 1100) && (this.props.pregunta.seccion == "TANGIBLE")
                || (this.props.pregunta.codigo == 2110) && (this.props.pregunta.seccion == "BLOQUES")
                || (this.props.pregunta.codigo == 3110) && (this.props.pregunta.seccion == "TEXTUAL")
  );

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
    //console.log("laaaaaaaapreeeeeeeg", this.props.pregunta);
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
      codigoPregunta: this.props.pregunta.codigo,
      contactoId: this.props.rta.contactoid
      //activo: this.props.rta.activo
      //  activo: true
    };

    let mensaje = validar(
      this.props.respuestas,
      this.props.pregunta.codigo,
      this.state.valor,
      this.props.reglas,
      this.props.pregunta.tipo
    );

    var valido = mensaje == "";
    if (valido) this.setState({ hiddeValidar: true });
    else this.setState({ hiddeValidar: false, mensajeError: mensaje }); //
    //console.log("validooooooooo essss: ", valido);
    if (valido) {
      this.setState({ validar: true });
    } else this.setState({ validar: false });
    //var valido = true;
    if (valido) {
      updateRespuestaString.call(one, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          if (res == "") {
            this.setState({
              hidden: false
            });
            ///////////////////////////////////////////////////////
            //esto lo agregué el 05/05/21 para arreglar lo de el salto en el update
            if (!this.setTermino())
            this.props.cambiarActual(
              this.props.pregunta.codigo,
              this.state.valor
            );
            ///////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////
          } else {
            this.setState({ hiddeValidar: false, mensajeError: res });
          }
        }
      });
    }
    // Clear form
  }

  renderForm() {
    //console.log("RENDER: ", this.state.valor);
    //  console.log("opciones ", options[Number(this.props.pregunta.codigo)]);

    return (
      <div>
        <Container textAlign="right">

          <Label color="red">
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
          <Button color="yellow" type="submit">
            Guardar
          </Button>
        </Form>
        <Message color={"red"} floating hidden={this.state.hidden}>
          <Message.Header>
            <Icon name="heart outline" />
            Muchas gracias! finalizamos el registro de esta experiencia.
          </Message.Header>
        </Message>
        <Message color={"orange"} floating hidden={!this.state.termino}>
          <Message.Header>
            <Icon name="heart outline" />
            Muchas gracias! finalizamos el registro de esta experiencia.
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
