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
import { exportProtos } from "/api/methods.js";
import DatePicker from "react-datepicker";
import { options } from "./Respuestas/combo";
import { preguntas } from "./comboPreguntas";
import "react-datepicker/dist/react-datepicker.css";
import Papa from 'papaparse';
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

class Descargar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fechaDesde: new Date(),
      fechaHasta: new Date(),
      usuarioid: Meteor.userId(),
      username: Meteor.user().username,
      descargando: false
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


  renderForm() {
    return (
      <Segment raised color="brown">
        <Header as="h2" dividing>
          <Icon name="cloud download" />
          <Header.Content>
            Descarga
            <Header.Subheader>
            archivo .csv
            </Header.Subheader>
          </Header.Content>
        </Header>


        <Form onSubmit={this.handleSubmit.bind(this)}>
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
              <label>Usuari@ </label>
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
          <Header dividing/>
          <Button color="brown" type="submit">
            <Icon name="file excel" /> Descargar
          </Button>
        </Form>
        <Message  floating hidden={!this.state.descargando}>
            <LoaderExampleText />
        </Message>
      </Segment>
    );
  }
  handleSubmit(event) {
    event.preventDefault();
    const one = {
      desde: this.state.fechaDesde,
      hasta: this.state.fechaHasta,
      usuarioid: this.state.usuarioid
    };
    this.setState({descargando:true});
    //console.log(one);
    const rta = exportProtos.call(one, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        var csv = Papa.unparse(res);
        //console.log(csv);
        var usuario = "";
        if (this.state.username) usuario = this.state.username;
        var hiddenElement = document.createElement('a');
         hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
         hiddenElement.target = '_blank';
         hiddenElement.download = usuario +" "+ moment(one.desde).format('DD-MM-YYYY')+' hasta '+moment(one.hasta).format('DD-MM-YYYY')+'.csv';
         hiddenElement.click();
         this.setState({descargando:false})
      }
    });



  }

  render() {
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
        <Grid.Row/>
        <Grid.Row/>
        <Grid.Row/>
        <Grid.Row/>
        <Grid.Row/>
        <Grid.Row/>
        <Grid.Row/>
        <Grid.Row/>
        <Grid.Row/>
        <Grid.Row/>
        <Grid.Row/>
        <Grid.Row/>
        <Grid.Row/>
        <Grid.Row/>
        <Grid.Row/>

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
})(Descargar);
