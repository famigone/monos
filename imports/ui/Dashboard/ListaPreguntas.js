import React, { Component } from "react";
import {
  Grid,
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
  Statistic,
  Divider,
  Segment,
  Form,
  Header
} from "semantic-ui-react";
import RtaString from "./Respuestas/RtaString.jsx";
import RtaStringUpdate from "./Respuestas/RtaStringUpdate.jsx";
import RtaBoolean from "./Respuestas/RtaBoolean.jsx";
import RtaBooleanUpdate from "./Respuestas/RtaBooleanUpdate.jsx";
import RtaFecha from "./Respuestas/RtaFecha.jsx";
import RtaFechaUpdate from "./Respuestas/RtaFechaUpdate.jsx";
import RtaCombo from "./Respuestas/RtaCombo.jsx";
import RtaComboUpdate from "./Respuestas/RtaComboUpdate.jsx";
import Rta02 from "./Respuestas/Rta02.jsx";
import Rta02Update from "./Respuestas/Rta02Update.jsx";
import Rta05 from "./Respuestas/Rta05.jsx";
import Rta05Update from "./Respuestas/Rta05Update.jsx";
import Rta13 from "./Respuestas/Rta13.jsx";
import Rta13Update from "./Respuestas/Rta13Update.jsx";
import Rta15 from "./Respuestas/Rta15.jsx";
import Rta15Update from "./Respuestas/Rta15Update.jsx";
import Rta16 from "./Respuestas/Rta16.jsx";
import Rta16Update from "./Respuestas/Rta16Update.jsx";
import Rta17 from "./Respuestas/Rta17.jsx";
import Rta17Update from "./Respuestas/Rta17Update.jsx";
import Rta19 from "./Respuestas/Rta19.jsx";
import Rta19Update from "./Respuestas/Rta19Update.jsx";
import Rta20 from "./Respuestas/Rta20.jsx";
import Rta20Update from "./Respuestas/Rta20Update.jsx";
import Rta21 from "./Respuestas/Rta21.jsx";
import Rta21Update from "./Respuestas/Rta21Update.jsx";
import Rta22 from "./Respuestas/Rta22.jsx";

//import Rta22Update from "./Respuestas/Rta22Update.jsx";
import Rta22Up from "./Respuestas/Rta22Up.jsx";
import Rta23 from "./Respuestas/Rta23.jsx";
import Rta23Update from "./Respuestas/Rta23Update.jsx";
import Respuesta from "/imports/api/respuesta.js";
import Contacto from "/imports/api/contacto.js";
import { withTracker } from "meteor/react-meteor-data";
import LoaderExampleText from "/imports/ui/Dashboard/LoaderExampleText.js";
import { updateContactoPreguntaSgte } from "/api/methods.js";
class ListaPreguntas extends Component {
  getContentView() {
    return this.props.children;
  }

  ruteadorPreguntas(actual) {
    //RECIBO CÓDIGO ORIGEN Y RETORNO CÓDIGO DESTINO
    switch (actual) {
      case "0": {
        return "1";
      }
      case "1": {
        return "2";
      }
      case "2": {
        return "4";
      }
      case "4": {
        return "5";
      }
      case "5": {
        return "6";
      }
      case "6": {
        return "7";
      }
      case "7": {
        return "8";
      }
      case "8": {
        return "9";
      }
      case "9": {
        return "10";
      }
      case "10": {
        return "11";
      }
      case "11": {
        return "12";
      }
      case "12": {
        return "13";
      }
      case "13": {
        return "14";
      }
      case "14": {
        return "15";
      }
      case "15": {
        return "16";
      }
      case "16": {
        return "17";
      }
      case "17": {
        return "18";
      }
      case "18": {
        return "19";
      }
      case "19": {
        return "20";
      }
      case "20": {
        return "21";
      }
      case "21": {
        return "22";
      }
      case "22": {
        return "23";
      }
      case "23": {
        return "24";
      }
      case "24": {
        return "25";
      }
      case "25": {
        return "26";
      }
    }
  }

  posicionCodigo(codigo) {
    var i = 0;
    var pos = 0;
    this.props.preguntas.forEach(pregunta => {
      if (pregunta.codigo == codigo) pos = i;
      i += 1;
    });
    return pos;
  }

  handleItemClick = (e, { name }) => {
    const pos = this.posicionCodigo(name);
    this.setState({
      activeItem: pos,
      menuActivo: this.props.preguntas[pos].texto,
      tipo: this.props.preguntas[pos].tipo
    });
    //  console.log("itema actual: ", this.props.preguntas[pos].texto);
    //this.onUpdateActual(name);
  };
  constructor(props) {
    super(props);

    let i = 0;
    let cont = true;
    //console.log("las pinches:" + this.props.preguntas);
    //while (this.props.preguntas[i].estado) {
    //  console.log(i);
    //  i++;
    //  }

    this.state = {
      activeItem: String(0)
      //activeItem: String(i)
    };
    //this.actualizarREP = this.actualizarREP.bind(this);
  }
  onUpdateActual = orden => {
    //////////////////////////////////////////
    var sgteCodigo = this.ruteadorPreguntas(orden);
    var sgtePos = this.posicionCodigo(sgteCodigo);
    const tree = { id: this.props.preguntas[sgtePos]._id };
    //////////////////////////////////////////

    //activo la siguiente si está desactivada....
    //  console.log("ORDEN ", orden);
    if (!this.props.preguntas[parseInt(sgtePos)].estado) {
      //const two = { id: this.props.preguntas[orden]._id };
      //    console.log("orden ", orden);
      //    console.log("sgteCodigo ", sgteCodigo);
      //    console.log("sgtePos ", sgtePos);
      updateContactoPreguntaSgte.call(tree, (err, res) => {
        if (err) {
          console.log(err);
        } else {
        }
      });
    }
    this.setState({
      activeItem: sgtePos,
      tipo: this.props.preguntas[sgtePos].tipo,
      menuActivo: this.props.preguntas[sgtePos].texto
    });
    //console.log("tado posterior: " + this.state.activeItem);
  };

  routerCombos() {
    const laPregunta = this.props.preguntas[this.state.activeItem];
    if (laPregunta.codigo == "2")
      return laPregunta.estado ? (
        <Rta02Update
          pregunta={laPregunta}
          rta={this.obtenerRtaActual()}
          cambiarActual={this.onUpdateActual}
        />
      ) : (
        <Rta02 pregunta={laPregunta} cambiarActual={this.onUpdateActual} />
      );
    else if (laPregunta.codigo == "5")
      return laPregunta.estado ? (
        <Rta05Update pregunta={laPregunta} rta={this.obtenerRtaActual()} />
      ) : (
        <Rta05 pregunta={laPregunta} cambiarActual={this.onUpdateActual} />
      );
    else if (laPregunta.codigo == "13")
      return laPregunta.estado ? (
        <Rta13Update pregunta={laPregunta} rta={this.obtenerRtaActual()} />
      ) : (
        <Rta13 pregunta={laPregunta} cambiarActual={this.onUpdateActual} />
      );
    else if (laPregunta.codigo == "15")
      return laPregunta.estado ? (
        <Rta15Update pregunta={laPregunta} rtas={this.obtenerRtas()} />
      ) : (
        <Rta15 pregunta={laPregunta} cambiarActual={this.onUpdateActual} />
      );
    else if (laPregunta.codigo == "16")
      return laPregunta.estado ? (
        <Rta16Update pregunta={laPregunta} rtas={this.obtenerRtas()} />
      ) : (
        <Rta16 pregunta={laPregunta} cambiarActual={this.onUpdateActual} />
      );
    else if (laPregunta.codigo == "17")
      return laPregunta.estado ? (
        <Rta17Update pregunta={laPregunta} rta={this.obtenerRtaActual()} />
      ) : (
        <Rta17 pregunta={laPregunta} cambiarActual={this.onUpdateActual} />
      );
    else if (laPregunta.codigo == "19")
      return laPregunta.estado ? (
        <Rta19Update pregunta={laPregunta} rta={this.obtenerRtaActual()} />
      ) : (
        <Rta19 pregunta={laPregunta} cambiarActual={this.onUpdateActual} />
      );
    else if (laPregunta.codigo == "20")
      return laPregunta.estado ? (
        <Rta20Update pregunta={laPregunta} rta={this.obtenerRtaActual()} />
      ) : (
        <Rta20 pregunta={laPregunta} cambiarActual={this.onUpdateActual} />
      );
    else if (laPregunta.codigo == "21")
      return laPregunta.estado ? (
        <Rta21Update pregunta={laPregunta} rta={this.obtenerRtaActual()} />
      ) : (
        <Rta21 pregunta={laPregunta} cambiarActual={this.onUpdateActual} />
      );
    else if (laPregunta.codigo == "22")
      return laPregunta.estado ? (
        <Rta22Up pregunta={laPregunta} rtas={this.obtenerLasRtaActuales()} />
      ) : (
        <Rta22 pregunta={laPregunta} cambiarActual={this.onUpdateActual} />
      );
    else if (laPregunta.codigo == "23")
      return laPregunta.estado ? (
        <Rta23Update
          pregunta={laPregunta}
          cambiarActual={this.onUpdateActual}
          rta={this.obtenerRtaActual()}
        />
      ) : (
        <Rta23 pregunta={laPregunta} cambiarActual={this.onUpdateActual} />
      );
    else {
      return laPregunta.estado ? (
        <RtaComboUpdate
          pregunta={laPregunta}
          cambiarActual={this.onUpdateActual}
          rta={this.obtenerRtaActual()}
        />
      ) : (
        <RtaCombo pregunta={laPregunta} cambiarActual={this.onUpdateActual} />
      );
    }
  }
  obtenerRtaActual() {
    //console.log("itema activo " + this.state.activeItem);
    //console.log(Respuestas.findOne({ codigo: String(this.state.activeItem) }));
    //console.log("codigo que pincha: " + String(this.state.activeItem));
    return Respuesta.findOne({
      //contactoid: this.props.id,
      codigo: String(this.props.preguntas[this.state.activeItem].codigo)
    });
  }
  obtenerRtas() {
    //console.log("itema activo " + this.state.activeItem);
    //console.log(Respuestas.findOne({ codigo: String(this.state.activeItem) }));
    //console.log("codigo que pincha: " + String(this.state.activeItem));
    return Respuesta.find({
      //contactoid: this.props.id,
      codigo: String(this.props.preguntas[this.state.activeItem].codigo),
      activo: true
    }).fetch();
  }
  obtenerLasRtaActuales() {
    return Respuesta.find({
      codigo: String(this.props.preguntas[this.state.activeItem].codigo),
      //codigoid: this.props.id,
      activo: true
    }).fetch();
  }
  renderSwitch() {
    //L texto libre, F fecha, N número, C combo, M múltiple, B boolean
    var actual = 0;
    if (this.state.activeItem) actual = this.state.activeItem;
    const laPregunta = this.props.preguntas[this.state.activeItem];
    switch (laPregunta.tipo) {
      case "L": {
        //console.log("la borrega: "+)
        return laPregunta.estado ? (
          <RtaStringUpdate
            pregunta={laPregunta}
            cambiarActual={this.onUpdateActual}
            rta={this.obtenerRtaActual()}
          />
        ) : (
          <RtaString
            pregunta={laPregunta}
            cambiarActual={this.onUpdateActual}
          />
        );
        break;
      }
      //L texto libre, F fecha, N número, C combo, M múltiple, B boolean
      case "F": {
        return laPregunta.estado ? (
          <RtaFechaUpdate
            pregunta={laPregunta}
            cambiarActual={this.onUpdateActual}
            rta={this.obtenerRtaActual()}
          />
        ) : (
          <RtaFecha pregunta={laPregunta} cambiarActual={this.onUpdateActual} />
        );
        break;
      }
      //L texto libre, F fecha, N número, C combo, M múltiple, B boolean
      case "N":
        return (
          <RtaString
            pregunta={laPregunta}
            cambiarActual={this.onUpdateActual}
          />
        );
        break;
      //L texto libre, F fecha, N número, C combo, M múltiple, B boolean
      case "C":
        return this.routerCombos();
        break;
      //L texto libre, F fecha, N número, C combo, M múltiple, B boolean
      case "M":
        return (
          <RtaString
            pregunta={laPregunta}
            cambiarActual={this.onUpdateActual}
          />
        );
        break;
      //L texto libre, F fecha, N número, C combo, M múltiple, B boolean
      case "B":
        return laPregunta.estado ? (
          <RtaBooleanUpdate
            pregunta={laPregunta}
            cambiarActual={this.onUpdateActual}
            rta={this.obtenerRtaActual()}
          />
        ) : (
          <RtaBoolean
            pregunta={laPregunta}
            cambiarActual={this.onUpdateActual}
          />
        );
        break;
    }
  }
  renderAutonumerico() {
    return (
      <Segment inverted color="purple">
        <center>
          <div />

          <br />
          <br />
          <Statistic inverted size="small">
            <Statistic.Value>
              <Icon name="heart" />
              {this.props.contacto.autonumerico}
            </Statistic.Value>
            <Statistic.Label>IDENTIFICACIÓN</Statistic.Label>
          </Statistic>
        </center>
      </Segment>
    );
  }
  renderMenu(preguntas) {
    const { menuActivo } = this.state;
    //console.log(activeItem);

    if (preguntas) {
      return preguntas.map(pregunta => (
        <Menu.Item
          key={pregunta._id}
          name={pregunta.codigo}
          active={menuActivo === pregunta.texto}
          onClick={this.handleItemClick}
          //cambiar para habilitar
          //disabled={!pregunta.habilitado}
        >
          <Label circular color={pregunta.estado ? "purple" : "teal"} />
          {pregunta.texto}
        </Menu.Item>
      ));
    }
  }

  renderPrimerMomento() {
    return (
      <div>
        <Segment.Group raised>
          <Segment>
            <Header as="h2" textAlign="center">
              <Icon name="paw" size="big" />
            </Header>
          </Segment>

          <Segment style={{ overflow: "auto", maxHeight: 500 }}>
            <Header textAlign="center">Información General</Header>
            <Menu vertical fluid>
              {this.renderMenu(this.props.preguntas.slice(0, 10))}
            </Menu>

            <Header textAlign="center">
              Contacto con la Colectiva y acompañamiento
            </Header>
            <Menu vertical fluid>
              {this.renderMenu(this.props.preguntas.slice(10, 13))}
            </Menu>

            <Header textAlign="center">Sobre el aborto</Header>
            <Menu vertical fluid>
              {this.renderMenu(this.props.preguntas.slice(13, 18))}
            </Menu>

            <Header textAlign="center">Escolaridad y Activismos</Header>
            <Menu vertical fluid>
              {this.renderMenu(this.props.preguntas.slice(18, 30))}
            </Menu>

            <Header textAlign="center">Aspectos de su vida cotidiana</Header>
            <Menu vertical fluid>
              {this.renderMenu(this.props.preguntas.slice(30, 35))}
            </Menu>

            <Header textAlign="center">
              Información ginecológica previa a este embarazo
            </Header>
            <Menu vertical fluid>
              {this.renderMenu(this.props.preguntas.slice(35, 41))}
            </Menu>

            <Header textAlign="center">Embarazo actual</Header>
            <Menu vertical fluid>
              {this.renderMenu(this.props.preguntas.slice(41, 52))}
            </Menu>
          </Segment>
        </Segment.Group>
      </div>
    );
  }

  renderSegundoMomento() {
    return (
      <Segment.Group raised>
        <Segment>
          <Header as="h2" textAlign="center">
            <Header as="h2" textAlign="center">
              <center>
                <Icon name="paw" size="large" />
                <Icon name="paw" size="large" />
              </center>
            </Header>
          </Header>
        </Segment>

        <Segment style={{ overflow: "auto", maxHeight: 500 }}>
          <Header textAlign="center">Información General</Header>
          <Menu vertical fluid>
            {this.renderMenu(this.props.preguntas.slice(0, 10))}
          </Menu>
        </Segment>
      </Segment.Group>
    );
  }

  render() {
    if (this.props.isLoading) {
      return <LoaderExampleText />;
    }
    return (
      <div>
        <Grid textAlign="left">
          <Grid.Row>
            <Grid.Column width={1} />
            <Grid.Column stretched width={3}>
              {this.renderAutonumerico()}
            </Grid.Column>
            <Grid.Column width={11}>
              <Segment raised>{this.renderSwitch()}</Segment>
            </Grid.Column>
            <Grid.Column width={1} />
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={1} />
            <Grid.Column width={7}>{this.renderPrimerMomento()}</Grid.Column>
            <Grid.Column width={7}>{this.renderSegundoMomento()}</Grid.Column>
            <Grid.Column width={1} />
          </Grid.Row>
        </Grid>
        <br />
        <br />
      </div>
    );
  }
}
export default withTracker(({ preguntas, id }) => {
  const handles = [
    //Meteor.subscribe("contactopregunta", id),
    Meteor.subscribe("respuestaOne", id),
    Meteor.subscribe("contactoOne", id)
  ];
  //  console.log("contactoid:" + id);
  const loading = handles.some(handle => !handle.ready());
  return {
    preguntas: preguntas,
    isLoading: loading,
    contacto: Contacto.findOne(id)
  };
})(ListaPreguntas);
