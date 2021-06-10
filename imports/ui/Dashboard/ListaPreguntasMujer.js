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
import RtaMultiple from "./Respuestas/RtaMultiple.jsx";
import RtaMultipleUpdate from "./Respuestas/RtaMultipleUpdate.jsx";
import RtaComboUpdate from "./Respuestas/RtaComboUpdate.jsx";
import RtaFinPrimerMomento from "./Respuestas/RtaFinPrimerMomento.jsx";
import RtaFinPrimerMomentoUpdate from "./Respuestas/RtaFinPrimerMomentoUpdate.jsx";
import Rta2doIle630 from "./Respuestas/Rta2doIle630.jsx";
import Rta2doIle630Update from "./Respuestas/Rta2doIle630Update.jsx";
import Respuesta from "/imports/api/respuesta.js";
import Contacto from "/imports/api/contacto.js";
import ReglaMultiple from "/imports/api/reglaMultiple.js";
import ReglaMultipleDetalle from "/imports/api/reglaMultipleDetalle.js";
import { withTracker } from "meteor/react-meteor-data";
import LoaderExampleText from "/imports/ui/Dashboard/LoaderExampleText.js";
import { updateContactoPreguntaSgte } from "/api/methods.js";
class ListaPreguntasMujer extends Component {
  getContentView() {
    return this.props.children;
  }

  ruteadorPreguntas(actual, rtatexto) {
    //RECIBO CÓDIGO ORIGEN Y RETORNO CÓDIGO DESTINO

    var rta;
    switch (actual) {
      case 10:
        rta = 20;
        break;
      case 360:
        if (rtatexto == "NO") rta = 380;
        else rta = actual + 10;
        break;
      case 420:
        if (rtatexto == "NO") rta = 440;
        else rta = actual + 10;
        break;
      case 450:
        if (rtatexto == "NO") rta = 510;
        else rta = actual + 10;
        break;
      case 770:
        if (rtatexto == "NO") rta = 800;
        else rta = actual + 10;
        break;
      case 700:
        rta = actual + 10;
        if (Number(rtatexto) > 12) rta = 720;
        if (rtatexto == "25 o más") rta = 720;
        break;
      case 710:
        rta = 760;
        break;
      case 580:
        if (
          rtatexto == "Procedimiento con medicamentos: Misoprostol" ||
          rtatexto ==
            "Procedimiento con medicamentos: Mifepristona y Misoprostol"
        )
          rta = actual + 10;
        else rta = 600;
        break;
      case 1200:
        rta = 1220;
        break;
      //trabajo remunerado
      case 1220:
        if (
          rtatexto == "No y no estoy buscando" ||
          rtatexto == "No y estoy buscando"
        )
          rta = 1240;
        else rta = actual + 10;
        break;
      //fin 1er momento
      case 1420:
        if (rtatexto == "Decide solicitar ILE/IVE") rta = 520;
        else if (rtatexto == "Resuelve Aborto libre y feminista") rta = 680;
        else rta = actual + 10;
        break;
      case 1330:
        if (rtatexto == "NO") rta = 1350;
        else rta = actual + 10;
        break;
      case 1360:
        if (rtatexto == "NO") rta = 1420;
        else rta = actual + 10;
        break;
      case 720:
        if (rtatexto == "SI") rta = 760;
        else rta = actual + 10;
        break;
      case 1150:
        rtatexto = this.obtenerRtas();
        if (rtatexto[0].rtatexto == "Nadie sabe") rta = actual + 30;
        else rta = actual + 10;
        break;
      case 770:
        if (rtatexto == "NO") rta = 800;
        else rta = actual + 10;
        break;
      case 810:
        if (rtatexto == "No" || rtatexto == "Sin dato") rta = 830;
        else rta = actual + 10;
        break;
      case 630:
        if (rtatexto == "No: La acompañamos con Aborto Libre y Feminista")
          rta = 680;
        else rta = actual + 10;
        break;
      default:
        rta = actual + 10;
    }
    return rta;
  }

  posicionCodigo(codigo) {
    var i = 0;
    var pos = 0;
    //si es la última del primer momento, que salte a la 520
    //if (codigo == 510) pos = this.props.preguntas.length;
    //else
    //console.log("codigo: ", codigo);
    //console.log("length: ", this.props.preguntas.length);
    this.props.preguntas.forEach(pregunta => {
      if (pregunta.codigo == codigo) pos = i;
      i += 1;
    });

    //console.log("pos: ", pos);
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
  onUpdateActual = (orden, rtatexto) => {
    //console.log("contactoid: ", this.props.id);
    //console.log("orden: ", orden);
    //console.log("rtatexto: ", rtatexto);
    //////////////////////////////////////////
    var sgteCodigo = this.ruteadorPreguntas(Number(orden), rtatexto);
    //console.log("sgteCodigo", sgteCodigo);
    var sgtePos = this.posicionCodigo(sgteCodigo);
    //console.log("sgtePos", sgtePos);
    //console.log("arreglo de preguntas: ", this.props.preguntas);
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
    //console.log("RATATATATAA ", laPregunta.contactoid);
    //  console.log("laPregunta.estado ", laPregunta.estado);
    if (laPregunta.codigo == "1420")
      return laPregunta.estado ? (
        <RtaFinPrimerMomentoUpdate
          pregunta={laPregunta}
          rta={this.obtenerRtaActual()}
          cambiarActual={this.onUpdateActual}
        />
      ) : (
        <RtaFinPrimerMomento
          pregunta={laPregunta}
          cambiarActual={this.onUpdateActual}
        />
      );
    else if (
      laPregunta.codigo == "630" &&
      laPregunta.momento == 2 &&
      laPregunta.seccion ==
        "Interrupción Legal e Interrupción Voluntaria del Embarazo"
    )
      return laPregunta.estado ? (
        <Rta2doIle630Update
          pregunta={laPregunta}
          rta={this.obtenerRtaActual()}
          cambiarActual={this.onUpdateActual}
        />
      ) : (
        <Rta2doIle630
          pregunta={laPregunta}
          cambiarActual={this.onUpdateActual}
        />
      );
    else {
      var laRta = this.obtenerRtaActual();
      //console.log("rta desde afuera: ", nono);
      return (laPregunta.estado && laRta) ? (
        <RtaComboUpdate
          pregunta={laPregunta}
          cambiarActual={this.onUpdateActual}
          respuestas={this.props.respuestas}
          rta={laRta}
          reglas={this.props.reglas}
          //reglasMultiples={this.props.reglasMultiples}
        />
      ) : (
        <RtaCombo
          pregunta={laPregunta}
          cambiarActual={this.onUpdateActual}
          respuestas={this.props.respuestas}
          reglas={this.props.reglas}
          //reglasMultiples={this.props.reglasMultiples}
        />
      );
    }
  }
  obtenerRtaActual() {
    //console.log("itema activo " + this.state.activeItem);
    //console.log(Respuestas.findOne({ codigo: String(this.state.activeItem) }));
    //console.log("codigo que va a buscar: " + String(this.props.preguntas[this.state.activeItem].codigo));
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
    //console.log("this.state.activeItem:", this.state.activeItem);
    if (this.state.activeItem) actual = this.state.activeItem;
    const laPregunta = this.props.preguntas[this.state.activeItem];
    //console.log("this.props.preguntas: ", this.props.preguntas);
    //console.log("laPregunta: ", this.props.preguntas[this.state.activeItem]);
    if (laPregunta){
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
        return laPregunta.estado ? (
          <RtaMultipleUpdate
            pregunta={laPregunta}
            cambiarActual={this.onUpdateActual}
            rtas={this.obtenerRtas()}
          />
        ) : (
          <RtaMultiple
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
            reglas={this.props.reglas}
            //reglasMultiples={this.props.reglasMultiples}
            respuestas={this.props.respuestas}
          />
        ) : (
          <RtaBoolean
            pregunta={laPregunta}
            cambiarActual={this.onUpdateActual}
            reglas={this.props.reglas}
            //reglasMultiples={this.props.reglasMultiples}
            respuestas={this.props.respuestas}
          />
        );
        break;
    }
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
            <br />

            <h2>
              <Statistic.Label>{"+18"}</Statistic.Label>
            </h2>
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
          disabled={!pregunta.habilitado}
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
            <Header textAlign="center">
              Primer Momento: Información General
            </Header>
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
              {this.renderMenu(this.props.preguntas.slice(18, 21))}
            </Menu>

            <Header textAlign="center">Aspectos de su vida cotidiana</Header>
            <Menu vertical fluid>
              {this.renderMenu(this.props.preguntas.slice(21, 27))}
            </Menu>

            <Header textAlign="center">
              Información ginecológica previa a este embarazo
            </Header>
            <Menu vertical fluid>
              {this.renderMenu(this.props.preguntas.slice(27, 31))}
            </Menu>

            <Header textAlign="center">Embarazo actual</Header>
            <Menu vertical fluid>
              {this.renderMenu(this.props.preguntas.slice(31, 42))}
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
          <Header textAlign="center">Segundo Momento</Header>
          <Menu vertical fluid>
            {this.renderMenu(this.props.preguntas.slice(42))}
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
    Meteor.subscribe("contactoOne", id),
    Meteor.subscribe("reglas")
    //Meteor.subscribe("reglaMultiple"),
    //Meteor.subscribe("reglaMultipleDetalleTodes")
    //  Meteor.subscribe("reglaMultipleDetalleTodes")
  ];
  console.log("contactoid:" + id);
  const loading = handles.some(handle => !handle.ready());
  return {
    preguntas: preguntas,
    isLoading: loading,
    contacto: Contacto.findOne(id),
    respuestas: Respuesta.find().fetch(),
    reglas: Regla.find().fetch()
    //  reglasMultiples: ReglaMultiple.find().fetch(),
    //  reglasMultiplesDetalle: ReglaMultipleDetalle.find().fetch()
  };
})(ListaPreguntasMujer);
