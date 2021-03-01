import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import PropTypes from "prop-types"; // ES6
import { withTracker } from "meteor/react-meteor-data";
import LoaderExampleText from "/imports/ui/Dashboard/LoaderExampleText.js";
import Contacto from "/imports/api/contacto.js";
import Consultas from "./consultas.jsx";

import Reglas from "./reglas.jsx";
import { options } from "./Respuestas/combo";
//import { optionsMúltiple } from "./Respuestas/comboMultiple";
import ReactDOM from "react-dom";
import DatePicker from "react-datepicker";
import NuevaPregunta from "./NuevaPregunta.jsx";
import MostrarProtocola from "./MostrarProtocola.jsx";
import { preguntas } from "./comboPreguntas";
import "react-datepicker/dist/react-datepicker.css";
import { deleteRegla, insertRegla } from "/api/methods.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
import {
  Icon,
  Label,
  Statistic,
  Input,
  Menu,
  Confirm,
  Table,
  TextArea,
  Message,
  Segment,
  List,
  Button,
  Divider,
  Form,
  Grid,
  Dropdown,
  Modal,
  Header
} from "semantic-ui-react";

//const App = () => (
const CONST_PAGINA = 20;
class ReglasHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cantidad: CONST_PAGINA,
      fechaDesde: new Date(),
      fechaHasta: new Date(),
      txt: "Buscar",
      usuarioid: Meteor.userId(),
      hidden: true,
      codigo: null,
      open: false,
      /////////////////////////////

      seleccionTipoOrigen: "",
      seleccionPreguntaOrigen: "",
      seleccionRespuestaOrigen: "",
      seleccionTipoDestino: "",
      seleccionCondicion: "",
      reglaid: "",
      TipoOrigen: "",
      CodigoPreguntaOrigen: "",
      RespuestaOrigen: "",
      TipoDestino: "",
      CodigoPreguntaDestino: "",
      RespuestaDestino: "",
      Condicion: "",
      TextoPreguntaOrigen: "",
      TextoPreguntaDestino: "",
      codigoPreguntaDestino: "",
      codigoPreguntaOrigen: "",
      Mensaje: ""
    };
  }

  handleFila = id => {
    console.log(id);
    this.setState({
      reglaid: id,
      open: true
    });
  };

  handleSubmit(event) {
    event.preventDefault();

    const one = {
      tipoOrigen: this.state.TipoOrigen,
      codigoPreguntaOrigen: String(this.state.codigoPreguntaOrigen),
      rtaOrigen: this.state.RespuestaOrigen,
      tipoDestino: this.state.TipoDestino,
      codigoPreguntaDestino: String(this.state.codigoPreguntaDestino),
      rtaDestino: this.state.RespuestaDestino,
      condicion: this.state.Condicion,
      activo: true,
      textoPreguntaOrigen: this.state.TextoPreguntaOrigen,
      textoPreguntaDestino: this.state.TextoPreguntaDestino,
      mensaje: this.state.Mensaje
    };
    //console.log(one);
    //  if (one.TipoOrigen !== ""){
    insertRegla.call(one, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        //  console.log("insertoooooo");
      }
    });
  }

  handleTipoOrigen = (e, data) => {
    //console.log(data.value);
    this.setState({ TipoOrigen: data.value });
    switch (data.value) {
      case "Niñeces y Adolescencias":
        this.setState({ seleccionPreguntaOrigen: preguntas[0] });
        break;
      case "+18":
        this.setState({ seleccionPreguntaOrigen: preguntas[1] });
        break;
      case "Segundo Momento ILE":
        this.setState({ seleccionPreguntaOrigen: preguntas[2] });
        break;
      case "Segundo Momento FEM":
        this.setState({ seleccionPreguntaOrigen: preguntas[3] });
        break;
    }
  };
  handleTipoDestino = (e, data) => {
    //console.log(data.value);
    this.setState({ TipoDestino: data.value });
    switch (data.value) {
      case "Niñeces y Adolescencias":
        this.setState({ seleccionPreguntaDestino: preguntas[0] });
        break;
      case "+18":
        this.setState({ seleccionPreguntaDestino: preguntas[1] });
        break;
      case "Segundo Momento ILE":
        this.setState({ seleccionPreguntaDestino: preguntas[2] });
        break;
      case "Segundo Momento FEM":
        this.setState({ seleccionPreguntaDestino: preguntas[3] });
        break;
    }
  };

  handlePreguntaOrigen = (e, data) => {
    e.persist();
    this.setState({
      seleccionRespuestaOrigen: options[data.value],
      codigoPreguntaOrigen: data.value,
      TextoPreguntaOrigen: e.target.textContent
    });
  };

  handlePreguntaDestino = (e, data) => {
    e.persist();
    //  console.log(e.target.textContent);
    this.setState({
      seleccionRespuestaDestino: options[data.value],
      codigoPreguntaDestino: data.value,
      TextoPreguntaDestino: e.target.textContent
    });
  };

  handleCondicion = (e, data) => {
    this.setState({ Condicion: data.value });
  };
  handleRespuestaOrigen = (e, data) => {
    this.setState({ RespuestaOrigen: data.value });
  };
  handleRespuestaDestino = (e, data) => {
    this.setState({ RespuestaDestino: data.value });
  };
  handleMensaje = (e, data) => {
    //  console.log(data.value);
    this.setState({ Mensaje: data.value });
    //  console.log(this.state.Mensaje);
  };
  eliminar() {
    const one = { id: this.state.reglaid };
    deleteRegla.call(one, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({ hidden: false });
      }
    });
  }
  //confirm del eliminar
  show = () => this.setState({ open: true });
  handleConfirm = () => {
    this.setState({ open: false });
    this.eliminar();
  };
  handleCancel = () => this.setState({ result: "cancelled", open: false });

  getTipoPregunta() {
    return [
      {
        key: 1,
        text: "Niñeces y Adolescencias",
        value: "Niñeces y Adolescencias"
      },
      {
        key: 2,
        text: "+18",
        value: "+18"
      },
      {
        key: 3,
        text: "Segundo Momento ILE",
        value: "Segundo Momento ILE"
      },
      {
        key: 4,
        text: "Segundo Momento FEM",
        value: "Segundo Momento FEM"
      }
    ];
  }
  getCondicion() {
    return [
      {
        key: 1,
        text: "Igual a",
        value: 1
      },
      {
        key: 2,
        text: "Distinta de",
        value: 2
      }
    ];
  }
  renderForm() {
    return (
      <Form onSubmit={this.handleSubmit.bind(this)}>
        <Header as="h3" dividing>
          <Header.Content>
            Antecedente
            <Header.Subheader>Si se verifica que</Header.Subheader>
          </Header.Content>
        </Header>

        <Form.Group widths="equal">
          <Form.Field>
            <Dropdown
              placeholder="Tipo pregunta antecedente"
              selection
              onChange={this.handleTipoOrigen}
              options={this.getTipoPregunta()}
            />
          </Form.Field>
          <Form.Field>
            <Dropdown
              placeholder="Pregunta antecedente"
              search
              selection
              value={this.state.codigoPreguntaOrigen}
              onChange={this.handlePreguntaOrigen}
              options={this.state.seleccionPreguntaOrigen}
            />
          </Form.Field>
          <Form.Field>
            <Dropdown
              placeholder="Respuesta antecedente"
              search
              selection
              onChange={this.handleRespuestaOrigen}
              options={this.state.seleccionRespuestaOrigen}
            />
          </Form.Field>
        </Form.Group>

        <Header as="h3" dividing>
          <Header.Content>
            Consecuente
            <Header.Subheader>Entonces la respuesta</Header.Subheader>
          </Header.Content>
        </Header>
        <Form.Group widths="equal">
          <Form.Field>
            <Dropdown
              placeholder="Tipo pregunta consecuente"
              selection
              onChange={this.handleTipoDestino}
              options={this.getTipoPregunta()}
            />
          </Form.Field>
          <Form.Field>
            <Dropdown
              placeholder="Pregunta consecuente"
              search
              selection
              //  value={this.state.usuarioid}
              onChange={this.handlePreguntaDestino}
              options={this.state.seleccionPreguntaDestino}
            />
          </Form.Field>
          <Form.Field>
            <Dropdown
              placeholder="Respuesta consecuente"
              search
              selection
              onChange={this.handleRespuestaDestino}
              options={this.state.seleccionRespuestaDestino}
            />
          </Form.Field>
        </Form.Group>
        <Header as="h3" dividing>
          <Header.Content>
            Condición
            <Header.Subheader>Debe ser</Header.Subheader>
          </Header.Content>
        </Header>
        <Form.Group widths="equal">
          <Form.Field>
            <Dropdown
              placeholder="Condición"
              selection
              onChange={this.handleCondicion}
              options={this.getCondicion()}
            />
          </Form.Field>
          <Form.Field>
            <TextArea
              placeholder="Mensaje de validación"
              onChange={this.handleMensaje}
            />
          </Form.Field>
        </Form.Group>
        <Button color="purple" type="submit">
          Guardar
        </Button>
      </Form>
    );
  }

  render() {
    if (this.props.isLoading) {
      return <LoaderExampleText />;
    }

    return (
      <div>
        <Grid>
          <Grid.Column width={1} />
          <Grid.Column width={14}>
            <Grid.Row>
              <Segment raised>
                <Header as="h2" floated="right">
                  <Button size="mini" color="teal" onClick={this.show}>
                    Eliminar
                  </Button>
                  <Confirm
                    open={this.state.open}
                    content="¿Estás segura de que querés eliminar la regla?"
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm}
                    cancelButton="Mejor no"
                    confirmButton="Estoy segura"
                  />
                </Header>
                <Header as="h1">
                  <Icon name="random" />
                  <Header.Content>
                    Reglas
                    <Header.Subheader>
                      Si se verifica <i>antecedente</i> entonces se debe cumplir{" "}
                      <i>consecuente</i>
                    </Header.Subheader>
                  </Header.Content>
                </Header>
                {this.renderForm()}
                <Message
                  color="purple"
                  negative
                  floating
                  hidden={this.state.hidden}
                >
                  <Message.Header>
                    <Icon name="trash alternate" />
                    Esta regla ha sido eliminada.
                  </Message.Header>
                </Message>
              </Segment>
              <Reglas
                cantidad={this.state.cantidad}
                fechaDesde={this.state.fechaDesde}
                fechaHasta={this.state.fechaHasta}
                handleFila={this.handleFila}
                usuarioid={this.state.usuarioid}
                codigo={this.state.codigo}
              />
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={1} />
        </Grid>
        <hr />
      </div>
    );
  }
}
export default withTracker(({}) => {
  const handles = [Meteor.subscribe("reglas")];
  const loading = handles.some(handle => !handle.ready());
  return {
    reglas: Regla.find({}).fetch(),
    isLoading: loading
  };
})(ReglasHome);
