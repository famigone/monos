import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import PropTypes from "prop-types"; // ES6
import Pregunta from "/imports/api/pregunta.js";
import { Contacto } from "/imports/api/contacto.js";
import ReactDOM from "react-dom";
import SidebarExampleSidebar from "./SidebarExampleSidebar.js";
import AnalisisTarjeta from "./AnalisisTarjeta.jsx";
import AnalisisFila from "./AnalisisFila.jsx";
import NuevaPregunta from "./NuevaPregunta.jsx";
import LoaderExampleText from "/imports/ui/Dashboard/LoaderExampleText.js";
import { withTracker } from "meteor/react-meteor-data";
import "react-s-alert/dist/s-alert-default.css";
import { analisis } from "/api/methods.js";
import DatePicker from "react-datepicker";
import { options } from "./Respuestas/combo";
import { preguntas } from "./comboPreguntas";
import "react-datepicker/dist/react-datepicker.css";
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
  Statistic,
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

class Analisis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fechaDesde: new Date(),
      fechaHasta: new Date(),
      usuarioid: Meteor.userId(),
      username: Meteor.user().username,
      TextoPregunta: "",
      codigoPregunta: "",
      seleccionTipo: "",
      seleccionPregunta: ""
      //seleccionRespuesta: ""
    };
  }

  options = () => {
    var options = [];

    this.props.usuarios.forEach(function(element) {
      options.push({
        key: element._id,
        text: element.username,
        value: element._id
      });
    });
    //console.log(Meteor.users.find({}));
    //console.log(options);
    return options;
  };

  handleChangeDesde = date => {
    this.setState({
      fechaDesde: date
    });
    //console.log(date);
  };
  handleChangeHasta = date => {
    this.setState({
      fechaHasta: date
    });
    //console.log(date);
  };
  handleOnChange = (e, data) => {
    this.setState({
      usuarioid: data.value,
      username: data.text
    });
  };

  handleTipo = (e, data) => {
    //console.log(data.value);
    this.setState({ TipoOrigen: data.value });
    switch (data.value) {
      case "Niñeces y Adolescencias":
        this.setState({ seleccionPregunta: preguntas[0] });
        break;
      case "+18":
        this.setState({ seleccionPregunta: preguntas[1] });
        break;
      case "Segundo Momento ILE":
        this.setState({ seleccionPregunta: preguntas[2] });
        break;
      case "Segundo Momento FEM":
        this.setState({ seleccionPregunta: preguntas[3] });
        break;
    }
  };
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
  handlePregunta = (e, data) => {
    //console.log("entro a hanldePregunta");
    e.persist();
    this.setState({
      seleccionRespuesta: options[data.value],
      codigoPregunta: data.value,
      TextoPregunta: e.target.textContent
    });
  };

  renderForm() {
    return (
      <Segment raised color="violet">
        <Header as="h2" dividing>
          <Icon name="chart pie" />
          <Header.Content>
            Totales
            <Header.Subheader>
              Seleccionar una pregunta y luego establecer el rango de fechas
            </Header.Subheader>
          </Header.Content>
        </Header>

        <Form>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Tipo </label>
              <Dropdown
                placeholder="Tipo pregunta antecedente"
                selection
                onChange={this.handleTipo}
                options={this.getTipoPregunta()}
              />
            </Form.Field>

            <Form.Field>
              <label>Pregunta </label>
              <Dropdown
                placeholder="Pregunta antecedente"
                search
                selection
                value={this.state.codigoPregunta}
                onChange={this.handlePregunta}
                options={this.state.seleccionPregunta}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Desde </label>
              <DatePicker
                selected={this.state.fechaDesde}
                onChange={this.handleChangeDesde}
                dateFormat="dd/MM/yyyy"
              />
            </Form.Field>
            <Form.Field>
              <label>Hasta </label>
              <DatePicker
                selected={this.state.fechaHasta}
                onChange={this.handleChangeHasta}
                dateFormat="dd/MM/yyyy"
              />
            </Form.Field>
            <Form.Field>
              <label>Grupa </label>
              {Meteor.user().username === "admin" ? (
                <Dropdown
                  placeholder="Seleccionar"
                  search
                  selection
                  clearable
                  value={this.state.usuarioid}
                  onChange={this.handleOnChange}
                  options={this.options()}
                />
              ) : (
                <Dropdown
                  placeholder="Seleccionar"
                  disabled
                  value={this.state.usuarioid}
                  onChange={this.handleOnChange}
                  options={this.options()}
                />
              )}
            </Form.Field>
          </Form.Group>
        </Form>
      </Segment>
    );
  }

  renderAnalisis() {
    <Segment color="teal" raised>
      <Header as="h3" dividing>
        {this.props.pregunta}
      </Header>

      <Table celled>
        <Table.Body>{this.calcularFilas()}</Table.Body>
      </Table>
    </Segment>;
  }
  calcularFilas() {
    console.log(options[this.state.codigoPregunta]);
    if (!this.state.codigoPregunta) return "";
    else {
      console.log(
        options[this.state.codigoPregunta].map(unaRta => (
          <AnalisisFila
            codigo={this.state.codigoPregunta}
            opcion={unaRta.respuesta}
            fechaDesde={this.props.desde}
            fechaHasta={this.props.hasta}
            usuarioid={this.props.usuarioid}
            username={this.props.username}
          />
        ))
      );
      return options[this.state.codigoPregunta].map(unaRta => (
        <AnalisisFila
          codigo={this.state.codigoPregunta}
          opcion={unaRta.respuesta}
          fechaDesde={this.props.desde}
          fechaHasta={this.props.hasta}
          usuarioid={this.props.usuarioid}
          username={this.props.username}
        />
      ));
    }
  }
  render() {
    if (this.props.isLoading) {
      return <LoaderExampleText />;
    }

    const rta120 = [
      { codigo: "120", respuesta: "Fue acompañadx en un aborto anterior" },
      { codigo: "120", respuesta: "Por otra persona que fue acompañada" }
    ];

    if (this.props.isLoading) {
      return <LoaderExampleText />;
    }
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={1} />
          <Grid.Column width={14}>{this.renderForm()}</Grid.Column>
          <Grid.Column width={1} />
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={1}> </Grid.Column>
          <Grid.Column width={14}>
            <AnalisisTarjeta
              pregunta={this.state.TextoPregunta}
              codigo={this.state.codigoPregunta}
              lista={options[this.state.codigoPregunta]}
              desde={this.state.fechaDesde}
              hasta={this.state.fechaHasta}
              usuarioid={this.state.usuarioid}
              username={this.state.username}
            />
          </Grid.Column>
          <Grid.Column width={1}> </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
export default withTracker(({}) => {
  const handles = [Meteor.subscribe("users")];
  const loading = handles.some(handle => !handle.ready());
  return {
    usuarios: Meteor.users.find({}).fetch(),
    isLoading: loading
  };
})(Analisis);
