import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import PropTypes from "prop-types"; // ES6
import Pregunta from "/imports/api/pregunta.js";
import { Contacto } from "/imports/api/contacto.js";
import ReactDOM from "react-dom";
import SidebarExampleSidebar from "./SidebarExampleSidebar.js";
import AnalisisTarjeta from "./AnalisisTarjeta.jsx";
import NuevaPregunta from "./NuevaPregunta.jsx";
import LoaderExampleText from "/imports/ui/Dashboard/LoaderExampleText.js";
import { withTracker } from "meteor/react-meteor-data";
import "react-s-alert/dist/s-alert-default.css";
import { analisis } from "/api/methods.js";
import DatePicker from "react-datepicker";
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
      username: Meteor.user().username
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
  codigoPregunta(codigo) {
    switch (codigo.codigo) {
      case "2":
        return "Motivo";
      case "5":
        return "Cómo te identificas?";
      case "8":
        return "Zona";
      case "13":
        return "Hijxs";
      case "15":
        return "¿Con quién convive?";
      case "16":
        return "¿Le contó a alguien de su entorno que quiere abortar?";
      case "17":
        return "¿Cómo consiguió nuestro número o contacto?";
      case "18":
        return "Método de comprobación de embarazo";
      case "19":
        return "¿Sabe la edad gestacional?";
      case "20":
        return "¿Cuánto tiempo pasó desde que decidió abortar hasta que logró encontrar nuestro número?";
      case "21":
        return "¿Hubo algo que le atrasó en llamar a esta línea?";
      case "23":
        return "INDICACIÓN:";
      case "22":
        return "¿Abortó antes?";
      case "24":
        return "Hora de la llamada";
    }
  }

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
  renderForm() {
    return (
      <Segment raised color="teal">
        <Header as="h2" dividing>
          <Icon name="chart pie" />
          <Header.Content>
            Totales
            <Header.Subheader>
              Primero debes filtrar un rango de fechas para ver resultados{" "}
              <Icon name="info circle" />
            </Header.Subheader>
          </Header.Content>
        </Header>

        <Form>
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
              <label>Usuaria </label>
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

  render() {
    if (this.props.isLoading) {
      return <LoaderExampleText />;
    }
    const rta24 = [
      {
        codigo: "24",
        respuesta: "9:00-10:00hs"
      },
      {
        codigo: "24",
        respuesta: "10:00-11:00hs"
      },
      {
        codigo: "24",
        respuesta: "11:00-12:00hs"
      },
      {
        codigo: "24",
        respuesta: "12:00-13:00hs"
      },
      {
        codigo: "24",
        respuesta: "13:00-14:00hs"
      },
      {
        codigo: "24",
        respuesta: "14:00-15:00hs"
      },
      {
        codigo: "24",
        respuesta: "15:00-16:00hs"
      },
      {
        codigo: "24",
        respuesta: "16:00-17:00hs"
      },
      {
        codigo: "24",
        respuesta: "17:00-18:00hs"
      },
      {
        codigo: "24",
        respuesta: "18:00-19:00hs"
      },
      {
        codigo: "24",
        respuesta: "19:00-20:00hs"
      },
      {
        codigo: "24",
        respuesta: "20:00-21:00hs"
      },
      {
        codigo: "24",
        respuesta: "21:00-00:00hs"
      },
      {
        codigo: "24",
        respuesta: "00:00-03:00hs"
      },
      {
        codigo: "24",
        respuesta: "03:00-06:00hs"
      },
      {
        codigo: "24",
        respuesta: "06:00-09:00hs"
      }
    ];
    const rta2 = [
      { codigo: "2", respuesta: "Necesita información sobre cómo abortar" },
      {
        codigo: "2",
        respuesta: "Está en proceso de aborto y necesita orientación"
      },
      { codigo: "2", respuesta: "Necesita información para alguien cercano" },
      { codigo: "2", respuesta: "Otra razón" }
    ];
    const rta5 = [
      { codigo: "5", respuesta: "Mujer" },
      { codigo: "5", respuesta: "Varón Trans" },
      { codigo: "5", respuesta: "No binare" },
      { codigo: "5", respuesta: "Otra" }
    ];

    const rta17 = [
      {
        codigo: "17",
        respuesta: "Persona de la que está embarazadx"
      },
      {
        codigo: "17",
        respuesta: "Pareja"
      },
      {
        codigo: "17",
        respuesta: "Ex Pareja"
      },
      {
        codigo: "17",
        respuesta: "Hijxs"
      },
      {
        codigo: "17",
        respuesta: "Madre"
      },
      {
        codigo: "17",
        respuesta: "Padre"
      },
      {
        codigo: "17",
        respuesta: "Abuelxs"
      },
      {
        codigo: "17",
        respuesta: "Hermanxs"
      },
      {
        codigo: "17",
        respuesta: "Otrxs familiares"
      },
      {
        codigo: "17",
        respuesta: "Amigxs"
      },
      {
        codigo: "17",
        respuesta: "Activista"
      },
      {
        codigo: "17",
        respuesta: "Pareja no estable"
      },
      {
        codigo: "17",
        respuesta: "Amigovix-amante"
      },
      {
        codigo: "17",
        respuesta: "Internet/rede sociales"
      },
      {
        codigo: "17",
        respuesta: "App de Socorristas"
      },
      {
        codigo: "17",
        respuesta: "Talleres/charlas"
      },
      {
        codigo: "17",
        respuesta: "Intervenciones callejeras"
      },
      {
        codigo: "17",
        respuesta: "Folletos/cartelería"
      },
      {
        codigo: "17",
        respuesta: "Personal de salud"
      },
      {
        codigo: "17",
        respuesta: "Medios de Comunicación"
      },
      {
        codigo: "17",
        respuesta: "jefe/jefa-empleador/empleadora"
      },
      {
        codigo: "17",
        respuesta: "Es ex usuaria"
      },
      {
        codigo: "17",
        respuesta: "Amigo-x"
      },
      {
        codigo: "17",
        respuesta: "Otra/e Usuaria/e"
      },
      {
        codigo: "17",
        respuesta: "Otros"
      }
    ];
    const rta19 = [
      { codigo: "19", respuesta: "Sí, sabe" },
      { codigo: "19", respuesta: "Se le ayuda a calcular" },
      { codigo: "19", respuesta: "No sabe la fecha de la última menstruación" }
    ];
    const rta20 = [
      { codigo: "20", respuesta: "Ya lo conocía" },
      { codigo: "20", respuesta: "Una semana (hasta 7 días)" },
      { codigo: "20", respuesta: "Más de una semana (hasta 14 días)" },
      { codigo: "20", respuesta: "Más de dos semanas (hasta 21 días)" },
      { codigo: "20", respuesta: "Más de 21 días" }
    ];
    const rta21 = [
      { codigo: "21", respuesta: "Nada me atrasó" },
      { codigo: "21", respuesta: "No tenía seguridad si quería abortar" },
      {
        codigo: "21",
        respuesta: "No sabía dónde encontrar información sobre cómo abortar"
      },
      { codigo: "21", respuesta: "No tenía apoyo de nadie" },
      {
        codigo: "21",
        respuesta: "Tenía miedo a que sea un lugar donde me denuncien"
      },
      { codigo: "21", respuesta: "Tenía miedo porque no conocía a este grupo" },
      {
        codigo: "21",
        respuesta: "Estoy en situación de violencia y no podía comunicarme"
      },
      { codigo: "21", respuesta: "Otro motivo" }
    ];
    const rta22 = [
      { codigo: "22", respuesta: "No" },
      { codigo: "22", respuesta: "Espontáneo" },
      { codigo: "22", respuesta: "Provocado - Medicamentos" },
      { codigo: "22", respuesta: "Provocado - Intervención Quirúrgica" },
      { codigo: "22", respuesta: "Provocado - Sonda" },
      { codigo: "22", respuesta: "Provocado - Hierbas" },
      { codigo: "22", respuesta: "Otro" }
    ];
    const rta23 = [
      { codigo: "23", respuesta: "Se acompaña en taller socorrista" },
      { codigo: "23", respuesta: "Se acompaña solicitud ILE" },

      { codigo: "23", respuesta: "Se comunica con otra grupa socorrista" },
      { codigo: "23", respuesta: "Se acompaña a distancia" },
      {
        codigo: "23",
        respuesta:
          "El acompañamiento se hace con compañera/compañere que colabora con SenRed en ese lugar de residencia"
      },
      {
        codigo: "23",
        respuesta: "Se le dio información de acompañamiento durante la llamada"
      }
    ];
    const rta8 = [
      { codigo: "8", respuesta: "Rural" },
      { codigo: "8", respuesta: "Urbana" }
    ];
    const rta15 = [
      { codigo: "15", respuesta: "Sola" },
      { codigo: "15", respuesta: "Pareja" },
      { codigo: "15", respuesta: "Ex Pareja" },
      { codigo: "15", respuesta: "Hijxs" },
      { codigo: "15", respuesta: "Madre" },
      { codigo: "15", respuesta: "Padre" },
      { codigo: "15", respuesta: "Abuelxs" },
      { codigo: "15", respuesta: "Hermanxs" },
      { codigo: "15", respuesta: "Otrxs familiares" },
      { codigo: "15", respuesta: "Amigxs" },
      { codigo: "15", respuesta: "jefe/jefa-empleador/empleadora" },
      { codigo: "15", respuesta: "Otros" }
    ];
    const rta16 = [
      {
        codigo: "16",
        respuesta: "Pareja"
      },
      {
        codigo: "16",
        respuesta: "Ex Pareja"
      },
      {
        codigo: "16",
        respuesta: "Persona de la que está embarazadx"
      },
      {
        codigo: "16",
        respuesta: "Amigxs"
      },
      {
        codigo: "16",
        respuesta: "Amiga"
      },
      {
        codigo: "16",
        respuesta: "Madre"
      },
      {
        codigo: "16",
        respuesta: "Padre"
      },
      {
        codigo: "16",
        respuesta: "Hija"
      },
      {
        codigo: "16",
        respuesta: "Hermanxs"
      },
      {
        codigo: "16",
        respuesta: "Otrxs familiares"
      },

      {
        codigo: "16",
        respuesta: "Otra persona"
      },

      {
        codigo: "16",
        respuesta: "No"
      }
    ];
    const rta18 = [
      { codigo: "18", respuesta: "Eco" },
      { codigo: "18", respuesta: "Análisis" },
      { codigo: "18", respuesta: "Test" },
      { codigo: "18", respuesta: "Síntomas" }
    ];
    if (this.props.isLoading) {
      return <LoaderExampleText />;
    }
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={1}></Grid.Column>
          <Grid.Column width={14}>{this.renderForm()}</Grid.Column>
          <Grid.Column width={1}></Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={1}> </Grid.Column>
          <Grid.Column width={7}>
            <AnalisisTarjeta
              pregunta={this.codigoPregunta(rta2[0])}
              lista={rta2}
              desde={this.state.fechaDesde}
              hasta={this.state.fechaHasta}
              usuarioid={this.state.usuarioid}
              username={this.state.username}
            />
            <AnalisisTarjeta
              pregunta={this.codigoPregunta(rta5[0])}
              lista={rta5}
              desde={this.state.fechaDesde}
              hasta={this.state.fechaHasta}
              usuarioid={this.state.usuarioid}
              username={this.state.username}
            />
            <AnalisisTarjeta
              pregunta={this.codigoPregunta(rta8[0])}
              lista={rta8}
              desde={this.state.fechaDesde}
              hasta={this.state.fechaHasta}
              usuarioid={this.state.usuarioid}
              username={this.state.username}
            />
            <AnalisisTarjeta
              pregunta={this.codigoPregunta(rta18[0])}
              lista={rta18}
              desde={this.state.fechaDesde}
              hasta={this.state.fechaHasta}
              usuarioid={this.state.usuarioid}
              username={this.state.username}
            />
            <AnalisisTarjeta
              pregunta={this.codigoPregunta(rta15[0])}
              lista={rta15}
              desde={this.state.fechaDesde}
              hasta={this.state.fechaHasta}
              usuarioid={this.state.usuarioid}
              username={this.state.username}
            />
            <AnalisisTarjeta
              pregunta={this.codigoPregunta(rta16[0])}
              lista={rta16}
              desde={this.state.fechaDesde}
              hasta={this.state.fechaHasta}
              usuarioid={this.state.usuarioid}
              username={this.state.username}
            />
            <AnalisisTarjeta
              pregunta={this.codigoPregunta(rta23[0])}
              lista={rta23}
              desde={this.state.fechaDesde}
              hasta={this.state.fechaHasta}
              usuarioid={this.state.usuarioid}
              username={this.state.username}
            />
            <AnalisisTarjeta
              pregunta={this.codigoPregunta(rta20[0])}
              lista={rta20}
              desde={this.state.fechaDesde}
              hasta={this.state.fechaHasta}
              usuarioid={this.state.usuarioid}
              username={this.state.username}
            />
          </Grid.Column>
          <Grid.Column width={7}>
            <AnalisisTarjeta
              pregunta={this.codigoPregunta(rta17[0])}
              lista={rta17}
              desde={this.state.fechaDesde}
              hasta={this.state.fechaHasta}
              usuarioid={this.state.usuarioid}
              username={this.state.username}
            />

            <AnalisisTarjeta
              pregunta={this.codigoPregunta(rta19[0])}
              lista={rta19}
              desde={this.state.fechaDesde}
              hasta={this.state.fechaHasta}
              usuarioid={this.state.usuarioid}
              username={this.state.username}
            />

            <AnalisisTarjeta
              pregunta={this.codigoPregunta(rta24[0])}
              lista={rta24}
              desde={this.state.fechaDesde}
              hasta={this.state.fechaHasta}
              usuarioid={this.state.usuarioid}
              username={this.state.username}
            />
            <AnalisisTarjeta
              pregunta={this.codigoPregunta(rta21[0])}
              lista={rta21}
              desde={this.state.fechaDesde}
              hasta={this.state.fechaHasta}
              usuarioid={this.state.usuarioid}
              username={this.state.username}
            />
            <AnalisisTarjeta
              pregunta={this.codigoPregunta(rta22[0])}
              lista={rta22}
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
