import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import PropTypes from "prop-types"; // ES6
import { withTracker } from "meteor/react-meteor-data";
import LoaderExampleText from "/imports/ui/Dashboard/LoaderExampleText.js";
import Contacto from "/imports/api/contacto.js";
import Consultas from "./consultas.jsx";
import ReactDOM from "react-dom";
import DatePicker from "react-datepicker";
import NuevaPregunta from "./NuevaPregunta.jsx";
import CuentaContactos from "./CuentaContactos.jsx";
import MostrarProtocola from "./MostrarProtocola.jsx";
import "react-datepicker/dist/react-datepicker.css";
import { deleteContacto } from "/api/methods.js";
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
class ListadoConsultas extends Component {
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
      open: false
    };
    this.cargarMas = this.cargarMas.bind(this);
  }
  cargarMas() {
    this.setState({
      cantidad: this.state.cantidad + CONST_PAGINA,
      txt: "Ver más resultados"
    });
    //console.log(this.state.cantidad);
  }
  handleFila = (id, fecha) => {
    this.setState({
      consultaid: id,
      consultafecha: fecha,
      hidden: true
    });
  };
  handleChangeDesde = date => {
    this.setState({
      fechaDesde: date,
      txt: "Más resultados"
    });
    //console.log(date);
  };
  handleOnChangeCodigo = event => {
    this.setState({
      codigo: event.target.value
    });
  };
  handleChangeHasta = date => {
    this.setState({
      fechaHasta: date,
      txt: "Más resultados"
    });
    //console.log(date);
  };

  handleSubmit(event) {
    event.preventDefault();
    const inputCodigo = ReactDOM.findDOMNode(
      this.refs.inputCodigo
    ).value.trim();
    console.log(inputCodigo);
    this.setState({
      codigo: Number(inputCodigo)
    });

    this.setState({
      cantidad: this.state.cantidad + CONST_PAGINA,
      txt: "Más resultados"
    });
  }

  handleOnChange = (e, data) => {
    //console.log(data.value);
    this.setState({
      usuarioid: data.value
    });
  };
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
  renderForm() {
    return (
      <Segment.Group>
      <Segment raised>
        <Header as="h2" dividing>
          <Icon name="clock" />
          <Header.Content>
            Listado de Registros
            <Header.Subheader>
              Puede filtrar por fecha de carga
            </Header.Subheader>
          </Header.Content>
        </Header>

        <Form onSubmit={this.handleSubmit.bind(this)}>
          {Meteor.user().username === "admin" ? (
            <Form.Group widths="equal">
              <Form.Field>
                <Dropdown
                  placeholder="Seleccionar"
                  search
                  selection
                  clearable
                  value={this.state.usuarioid}
                  onChange={this.handleOnChange}
                  options={this.options()}
                />
              </Form.Field>
              <Form.Field>
                <input
                  placeholder="CÓDIGO"
                  ref="inputCodigo"
                  //value={this.state.codigo}
                  //onChange={this.handleOnChangeCodigo}
                />
              </Form.Field>
            </Form.Group>
          ) : (
            <Form.Field>
              <input
                placeholder="CÓDIGO"
                ref="inputCodigo"
                //value={this.state.codigo}
                //onChange={this.handleOnChangeCodigo}
              />
            </Form.Field>
          )}
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
          </Form.Group>
          <Button color="yellow" type="submit">
            {this.state.txt}
          </Button>
        </Form>
      </Segment>
      <Segment align="right">
      Total: <CuentaContactos
                fechaDesde={this.state.fechaDesde}
                fechaHasta={this.state.fechaHasta}
                usuarioid={this.state.usuarioid}
              />
      </Segment>
     </Segment.Group>
    );
  }
  eliminar() {
    const one = { id: this.state.consultaid };
    deleteContacto.call(one, (err, res) => {
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
  render() {
    if (this.props.isLoading) {
      return <LoaderExampleText />;
    }

    return (
      <Grid>
        <Grid.Row>
            <Grid.Column width={1}>
            </Grid.Column>
          <Grid.Column width={4}>
            <div>
              {this.renderForm()}
              <Consultas
                cantidad={this.state.cantidad}
                fechaDesde={this.state.fechaDesde}
                fechaHasta={this.state.fechaHasta}
                handleFila={this.handleFila}
                usuarioid={this.state.usuarioid}
                codigo={this.state.codigo}
              />
            </div>
          </Grid.Column>
          <Grid.Column width={10}>
            <Segment raised>
              <Header as="h2" floated="right">
                <Button size="mini" color="brown" onClick={this.show}>
                  Eliminar
                </Button>
                <Confirm
                  open={this.state.open}
                  content="¿Estás segur@ que querés eliminar este registro?"
                  onCancel={this.handleCancel}
                  onConfirm={this.handleConfirm}
                />
              </Header>
              <Header as="h2" dividing>
                <Icon name="tty" />
                <Header.Content>
                  Registro del {this.state.consultafecha}
                  <Header.Subheader>
                    Podes modificar el registro
                  </Header.Subheader>
                </Header.Content>
              </Header>
              <Message
                negative
                color="yellow"
                floating
                hidden={this.state.hidden}
              >
                <Message.Header>
                  <Icon name="trash alternate" />
                  Este registro ha sido eliminado.
                </Message.Header>
              </Message>
              {this.state.consultaid && this.state.hidden ? (
                <MostrarProtocola id={this.state.consultaid} />
              ) : null}
            </Segment>
          </Grid.Column>
          <Grid.Column width={1}>
          </Grid.Column>
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
})(ListadoConsultas);
