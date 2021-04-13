import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import PropTypes from "prop-types"; // ES6
import { withTracker } from "meteor/react-meteor-data";
import LoaderExampleText from "/imports/ui/Dashboard/LoaderExampleText.js";
import Contacto from "/imports/api/contacto.js";
import ReactDOM from "react-dom";
import { preguntas } from "./comboPreguntas";
import {
  deleteReglaMultipleDetalle,
  insertReglaMultipleDetalle
} from "/api/methods.js";
import { options } from "./Respuestas/combo";
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
  Confirm,
  Menu,
  Table,
  Message,
  Segment,
  List,
  Button,
  Divider,
  Form,
  Grid,
  TextArea,
  Dropdown,
  Modal,
  Header,
  Container
} from "semantic-ui-react";

//const App = () => (

class ReglasMultipleConsecuente extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hidden: true,
      codigo: null,
      open: false,
      /////////////////////////////
      seleccionTipoOrigen: "",
      seleccionPreguntaOrigen: "",
      seleccionRespuestaOrigen: "",
      TextoPreguntaOrigen: "",
      TextoPreguntaDestino: "",
      codigoPreguntaOrigen: "",
      seleccionCondicion: "",
      reglamultipleid: "",
      RespuestaDestino: "",
      Condicion: "",
      TipoOrigen: ""
    };
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  handleFila = id => {
    console.log(id);
    this.setState({
      reglamultipleid: id,
      open: true
    });
  };

  handleConfirm = () => {
    //console.log("paso por aquiiiiiiiiii");
    this.setState({ open: false });
    const one = { id: this.state.reglamultipleid };
    deleteReglaMultipleDetalle.call(one, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({ hidden: false });
      }
    });
  };
  handleCancel = () => this.setState({ result: "cancelled", open: false });

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

  handlePreguntaOrigen = (e, data) => {
    e.persist();
    //  console.log(e.target.textContent);
    this.setState({
      seleccionRespuestaOrigen: options[data.value],
      codigoPreguntaOrigen: data.value,
      TextoPreguntaOrigen: e.target.textContent
    });
  };

  handleSubmit(event) {
    event.preventDefault();

    const one = {
      tipoOrigen: this.state.TipoOrigen,
      codigoPreguntaOrigen: String(this.state.codigoPreguntaOrigen),
      rtaOrigen: this.state.RespuestaOrigen,
      condicion: Number(this.state.Condicion),
      activo: true,
      textoPreguntaOrigen: this.state.TextoPreguntaOrigen,
      reglaid: this.props.reglaId
    };
    //  console.log(one);

    insertReglaMultipleDetalle.call(one, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        //  blanqueo el formulario
      }
    });
  }

  renderFila() {
    //console.log(this.props.reglas);
    return this.props.reglas.map(regla => (
      <Table.Row key={regla._id} onClick={() => this.handleFila(regla._id)}>
        <Table.Cell>{regla.tipoOrigen}</Table.Cell>
        <Table.Cell>{regla.textoPreguntaOrigen}</Table.Cell>
        <Table.Cell>{regla.rtaOrigen}</Table.Cell>
        <Table.Cell>
          {regla.condicion == 1 ? "Igual a" : "Distinta de"}
        </Table.Cell>
      </Table.Row>
    ));
  }
  handleCondicion = (e, data) => {
    this.setState({ Condicion: data.value });
  };
  handleRespuestaOrigen = (e, data) => {
    this.setState({ RespuestaOrigen: data.value });
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
            <Header.Subheader>Si se cumple</Header.Subheader>
          </Header.Content>
        </Header>

        <Form.Field>
          <Dropdown
            placeholder="Tipo pregunta antecedente"
            selection
            onChange={this.handleTipoOrigen}
            options={this.getTipoPregunta()}
            //value={this.state.TipoOrigen}
          />
        </Form.Field>
        <Form.Field>
          <Dropdown
            placeholder="Pregunta antecedente"
            search
            selection
            //value={this.state.TextoPreguntaOrigen}
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

        <Header as="h3" dividing>
          <Header.Content>
            Condición
            <Header.Subheader>Debe ser</Header.Subheader>
          </Header.Content>
        </Header>

        <Form.Field>
          <Dropdown
            placeholder="Condición"
            selection
            onChange={this.handleCondicion}
            options={this.getCondicion()}
          />
        </Form.Field>

        <Button color="purple" type="submit">
          Guardar
        </Button>
      </Form>
    );
  }
  renderTable() {
    return (
      <Container style={{ overflow: "auto", maxHeight: 500 }}>
        <Table celled fixed striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <h4>Tipo Antecedente</h4>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <h4>Pregunta Antecedente</h4>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <h4>Respuesta Antecedente</h4>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <h4>Condición</h4>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{this.renderFila()}</Table.Body>
        </Table>
      </Container>
    );
  }
  render() {
    if (this.props.isLoading) {
      return <LoaderExampleText />;
    }
    return (
      <Segment raised>
        <Message color="purple">
          <List divided relaxed>
            <List.Item>
              <List.Icon name="bomb" size="big" verticalAlign="middle" />
              <List.Content>
                <List.Header as="a">
                  {this.props.TextoPreguntaDestino}
                </List.Header>
                <List.Description as="a">
                  {this.props.RespuestaDestino}
                </List.Description>
              </List.Content>
            </List.Item>
          </List>
        </Message>

        {this.renderForm()}
        <Header as="h3" dividing>
          <Header.Content>Antecedentes</Header.Content>
        </Header>

        <Confirm
          open={this.state.open}
          content="¿Estás segura/o de que querés eliminar este antecedente?"
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
          cancelButton="Mejor no"
          confirmButton="Estoy segura/o"
        />
        {this.renderTable()}
      </Segment>
    );
  }
}

export default withTracker(
  ({ reglaId, TextoPreguntaDestino, RespuestaDestino }) => {
    //console.log(reglaId);
    const handles = [Meteor.subscribe("reglaMultipleDetalle", reglaId)];
    const loading = handles.some(handle => !handle.ready());
    return {
      reglas: ReglaMultipleDetalle.find({}).fetch(),
      isLoading: loading
    };
  }
)(ReglasMultipleConsecuente);
