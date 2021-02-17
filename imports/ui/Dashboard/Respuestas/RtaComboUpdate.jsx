import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import PropTypes from "prop-types"; // ES6
import ContactoPregunta from "/imports/api/contactoPregunta.js";
import ReactDOM from "react-dom";

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
  state = {
    valor: this.props.rta.rtatexto,
    otro: this.props.rta.especifique,
    hidden: true
  };
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
    // Call the Method
    //insertLocacion.validate(one);
    updateRespuestaString.call(one, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({
          hidden: false
        });
      }
    });
    // Clear form
  }

  renderForm() {
    var options = [];
    options[10] = [
      {
        key: 1,
        text: "mujer",
        value: "mujer"
      },
      {
        key: 2,
        text: "varón trans",
        value: "varón trans"
      },
      {
        key: 3,
        text: "no binarie",
        value: "no binarie"
      },
      {
        key: 4,
        text: "lesbiana",
        value: "lesbiana"
      },

      {
        key: 5,
        text: "ningún género/ sin género",
        value: "ningún género/ sin género"
      },
      {
        key: 6,
        text: "Otro",
        value: "Otro"
      },
      {
        key: 7,
        text: "no quiere contestar esta pregunta",
        value: "no quiere contestar esta pregunta"
      }
    ];
    //país de residencia
    options[30] = [
      {
        key: 1,
        text: "Argentina",
        value: "Argentina"
      },
      {
        key: 2,
        text: "Chile",
        value: "Chile"
      },
      {
        key: 3,
        text: "Uruguay",
        value: "Uruguay"
      },

      {
        key: 4,
        text: "Brasil",
        value: "Brasil"
      },

      {
        key: 5,
        text: "Paraguay",
        value: "Paraguay"
      },

      {
        key: 6,
        text: "Bolivia",
        value: "Bolivia"
      },
      {
        key: 7,
        text: "Colombia",
        value: "Colombia"
      },
      {
        key: 8,
        text: "Perú",
        value: "Perú"
      },
      {
        key: 9,
        text: "México",
        value: "México"
      },
      {
        key: 10,
        text: "Venezuela",
        value: "Venezuela"
      },
      {
        key: 11,
        text: "Otro",
        value: "Otro"
      }
    ];

    options[40] = [
      {
        key: 1,
        text: "Tierra del Fuego",
        value: "Tierra del Fuego"
      },
      {
        key: 2,
        text: "Santa Cruz",
        value: "Santa Cruz"
      },
      {
        key: 3,
        text: "Chubut",
        value: "Chubut"
      },
      {
        key: 4,
        text: "Neuquén",
        value: "Neuquén"
      },
      {
        key: 5,
        text: "Rio Negro",
        value: "Rio Negro"
      },
      {
        key: 6,
        text: "La Pampa",
        value: "La Pampa"
      },
      {
        key: 7,
        text: "Mendoza",
        value: "Mendoza"
      },
      {
        key: 8,
        text: "San Juan",
        value: "San Juan"
      },
      {
        key: 9,
        text: "San Luis",
        value: "San Luis"
      },
      {
        key: 10,
        text: "Córdoba",
        value: "Córdoba"
      },
      {
        key: 11,
        text: "Santa Fe",
        value: "Santa Fe"
      },
      {
        key: 12,
        text: "Buenos Aires",
        value: "Buenos Aires"
      },
      {
        key: 13,
        text: "Entre Ríos",
        value: "Entre Ríos"
      },
      {
        key: 14,
        text: "Misiones",
        value: "Misiones"
      },
      {
        key: 15,
        text: "Corrientes",
        value: "Corrientes"
      },
      {
        key: 16,
        text: "Santiago del Estero",
        value: "Santiago del Estero"
      },
      {
        key: 17,
        text: "Formosa",
        value: "Formosa"
      },
      {
        key: 18,
        text: "Catamarca",
        value: "Catamarca"
      },
      {
        key: 19,
        text: "Salta",
        value: "Salta"
      },
      {
        key: 20,
        text: "Tucumán",
        value: "Tucumán"
      },
      {
        key: 21,
        text: "Chaco",
        value: "Chaco"
      },
      {
        key: 22,
        text: "La Rioja",
        value: "La Rioja"
      },
      {
        key: 23,
        text: "Jujuy",
        value: "Jujuy"
      }
    ];
    //zona
    options[50] = [
      {
        key: 1,
        text: "Rural",
        value: "Rural"
      },
      {
        key: 2,
        text: "Urbana",
        value: "Urbana"
      },
      {
        key: 3,
        text: "Semiurbana",
        value: "Semiurbana"
      }
    ];
    //con quién convive

    //método de comprobación
    options[60] = [
      {
        key: 1,
        text: "10",
        value: "10"
      },
      {
        key: 2,
        text: "11",
        value: "11"
      },
      {
        key: 3,
        text: "12",
        value: "12"
      },
      {
        key: 4,
        text: "13",
        value: "13"
      },
      {
        key: 5,
        text: "14",
        value: "14"
      },
      {
        key: 6,
        text: "15",
        value: "15"
      },
      {
        key: 7,
        text: "16",
        value: "16"
      },
      {
        key: 8,
        text: "17",
        value: "17"
      }
    ];
    options[70] = [
      {
        key: 1,
        text: "presencial",
        value: "presencial"
      },
      {
        key: 2,
        text: "no presencial",
        value: "no presencial"
      }
    ];

    options[80] = [
      {
        key: 1,
        text: "grupal",
        value: "grupal"
      },
      {
        key: 2,
        text: "individual",
        value: "individual"
      }
    ];

    options[120] = [
      {
        key: 1,
        text: "Fue acompañadx en un aborto anterior",
        value: "Fue acompañadx en un aborto anterior"
      },
      {
        key: 2,
        text: "Por otra persona que fue acompañada",
        value: "Por otra persona que fue acompañada"
      },
      {
        key: 3,
        text: "Por amigx",
        value: "Por amigx"
      },
      {
        key: 4,
        text: "Por familiar",
        value: "Por familiar"
      },
      {
        key: 5,
        text: "Por activista",
        value: "Por activista"
      },
      {
        key: 6,
        text: "Por unx docente/ alguien en la escuela",
        value: "Por unx docente/ alguien en la escuela"
      },
      {
        key: 7,
        text: "Por adultx de confianza (vecinx, madre de amigx)",
        value: "Por adultx de confianza (vecinx, madre de amigx)"
      },
      {
        key: 8,
        text: "Por novix/ pareja",
        value: "Por novix/ pareja"
      },
      {
        key: 9,
        text: "Por amigovix/ pareja no estable",
        value: "Por amigovix/ pareja no estable"
      },
      {
        key: 10,
        text: "Por ex novix/ ex pareja",
        value: "Por ex novix/ ex pareja"
      },
      {
        key: 11,
        text: "Por internet/ redes sociales",
        value: "Por internet/ redes sociales"
      },
      {
        key: 12,
        text: "Por talleres/ charlas",
        value: "Por talleres/ charlas"
      },
      {
        key: 13,
        text: "Por intervenciones callejeras",
        value: "Por intervenciones callejeras"
      },
      {
        key: 14,
        text: "Por folletos/cartelería",
        value: "Por folletos/cartelería"
      },
      {
        key: 15,
        text: "Por personal de salud",
        value: "Por personal de salud"
      },
      {
        key: 16,
        text: "Por medios de comunicación",
        value: "Por medios de comunicación"
      },
      {
        key: 17,
        text: "Otro",
        value: "Otro"
      }
    ];

    options[130] = [
      {
        key: 1,
        text: "No",
        value: "No"
      },
      {
        key: 2,
        text: "Sí: Porque no estaba segurx si quería abortar",
        value: "Sí: Porque no estaba segurx si quería abortar"
      },
      {
        key: 3,
        text:
          "Sí: Porque no sabía dónde encontrar información sobre cómo abortar",
        value:
          "Sí: Porque no sabía dónde encontrar información sobre cómo abortar"
      },
      {
        key: 4,
        text: "Sí: Porque no tenía / no tengo apoyo de nadie",
        value: "Sí: Porque no tenía / no tengo apoyo de nadie"
      },
      {
        key: 5,
        text:
          "Sí: Porque tenía miedo (porque no conozco la colectiva, no sabía qué iba a pasar, con quién me iba a encontrar, no sabía si me iban a denunciar)",
        value:
          "Sí: Porque tenía miedo (porque no conozco la colectiva, no sabía qué iba a pasar, con quién me iba a encontrar, no sabía si me iban a denunciar)"
      },
      {
        key: 6,
        text: "Sí: Porque estoy en situación de violencia ",
        value: "Sí: Porque estoy en situación de violencia "
      },
      {
        key: 7,
        text: "Sí: Porque me controlan el celular",
        value: "Sí: Porque me controlan el celular"
      },
      {
        key: 8,
        text: "Sí: Porque no tengo celular propio",
        value: "Sí: Porque no tengo celular propio"
      },
      {
        key: 9,
        text:
          "Sí: Porque no sabía cómo decirle a mi madre/padre/adultx de confianza",
        value:
          "Sí: Porque no sabía cómo decirle a mi madre/padre/adultx de confianza"
      },
      {
        key: 10,
        text: "Otro",
        value: "Otro"
      }
    ];
    options[19] = [
      {
        key: 1,
        text: "Primaria incompleta ",
        value: "Primaria incompleta "
      },
      {
        key: 2,
        text: "Primaria completa",
        value: "Primaria completa"
      },
      {
        key: 3,
        text: "Secundario incompleto ",
        value: "Secundario incompleto "
      },
      {
        key: 4,
        text: "Secundario completo ",
        value: "Secundario completo "
      },
      {
        key: 5,
        text: "Terciario / Universitario incompleto ",
        value: "Terciario / Universitario incompleto "
      }
    ];

    options[200] = [
      {
        key: 1,
        text: "No",
        value: "No"
      },
      {
        key: 2,
        text: "Sí",
        value: "Sí"
      },
      {
        key: 3,
        text: "No quiere responder",
        value: "No quiere responder"
      }
    ];

    options[210] = [
      {
        key: 1,
        text: "No",
        value: "No"
      },
      {
        key: 2,
        text: "Sí",
        value: "Sí"
      },
      {
        key: 3,
        text: "No quiere responder",
        value: "No quiere responder"
      }
    ];

    options[220] = [
      {
        key: 1,
        text: "No",
        value: "No"
      },
      {
        key: 2,
        text: "Sí",
        value: "Sí"
      },
      {
        key: 3,
        text: "No quiere responder",
        value: "No quiere responder"
      }
    ];
    options[230] = [
      {
        key: 1,
        text: "No",
        value: "No"
      },
      {
        key: 2,
        text: "Sí",
        value: "Sí"
      },
      {
        key: 3,
        text: "No quiere responder",
        value: "No quiere responder"
      }
    ];
    options[240] = [
      {
        key: 1,
        text: "No",
        value: "No"
      },
      {
        key: 2,
        text: "Sí",
        value: "Sí"
      },
      {
        key: 3,
        text: "No quiere responder",
        value: "No quiere responder"
      }
    ];
    options[250] = [
      {
        key: 1,
        text: "No",
        value: "No"
      },
      {
        key: 2,
        text: "Sí",
        value: "Sí"
      },
      {
        key: 3,
        text: "No quiere responder",
        value: "No quiere responder"
      }
    ];
    options[260] = [
      {
        key: 1,
        text: "No",
        value: "No"
      },
      {
        key: 2,
        text: "Sí",
        value: "Sí"
      },
      {
        key: 3,
        text: "No quiere responder",
        value: "No quiere responder"
      }
    ];
    options[270] = [
      {
        key: 1,
        text: "No",
        value: "No"
      },
      {
        key: 2,
        text: "Sí",
        value: "Sí"
      },
      {
        key: 3,
        text: "No quiere responder",
        value: "No quiere responder"
      }
    ];
    options[280] = [
      {
        key: 1,
        text: "En la escuela",
        value: "En la escuela"
      },
      {
        key: 2,
        text: "En Otro espacio",
        value: "En Otro espacio"
      },
      {
        key: 3,
        text:
          "No puede definir dónde recibió la mayor parte de esta información",
        value:
          "No puede definir dónde recibió la mayor parte de esta información"
      }
    ];
    options[320] = [
      {
        key: 1,
        text: "No",
        value: "No"
      },
      {
        key: 2,
        text: "Sí",
        value: "Sí"
      },
      {
        key: 3,
        text: "No Trabaja",
        value: "No Trabaja"
      }
    ];

    options[340] = [
      {
        key: 1,
        text: "No",
        value: "No"
      },
      {
        key: 2,
        text: "Sí, pero no hice denuncia",
        value: "Sí, pero no hice denuncia"
      },
      {
        key: 3,
        text: "Sí, hice denuncia",
        value: "Sí, hice denuncia"
      }
    ];
    options[400] = [
      {
        key: 1,
        text: "No",
        value: "No"
      },
      {
        key: 2,
        text: "Uno",
        value: "Uno"
      },
      {
        key: 3,
        text: "Dos",
        value: "Dos"
      },
      {
        key: 4,
        text: "Tres",
        value: "Tres"
      },
      {
        key: 5,
        text: "Más de tres",
        value: "Más de tres"
      }
    ];
    options[410] = [
      {
        key: 1,
        text: "4",
        value: "4"
      },
      {
        key: 2,
        text: "5",
        value: "5"
      },
      {
        key: 3,
        text: "6",
        value: "6"
      },
      {
        key: 4,
        text: "7",
        value: "7"
      },
      {
        key: 5,
        text: "8",
        value: "8"
      },
      {
        key: 6,
        text: "9",
        value: "9"
      },
      {
        key: 7,
        text: "10",
        value: "10"
      },
      {
        key: 8,
        text: "11",
        value: "11"
      },
      {
        key: 9,
        text: "12",
        value: "12"
      },
      {
        key: 10,
        text: "13",
        value: "13"
      },
      {
        key: 11,
        text: "14",
        value: "14"
      },
      {
        key: 12,
        text: "15",
        value: "15"
      },
      {
        key: 13,
        text: "16",
        value: "16"
      },
      {
        key: 14,
        text: "17",
        value: "17"
      },
      {
        key: 15,
        text: "18",
        value: "18"
      },
      {
        key: 16,
        text: "19",
        value: "19"
      },
      {
        key: 17,
        text: "20",
        value: "20"
      },
      {
        key: 18,
        text: "21",
        value: "21"
      },
      {
        key: 19,
        text: "22",
        value: "22"
      },
      {
        key: 20,
        text: "23",
        value: "23"
      },
      {
        key: 21,
        text: "24",
        value: "24"
      },
      {
        key: 21,
        text: "25 o más",
        value: "24 o más"
      }
    ];

    options[430] = [
      {
        key: 1,
        text: "No usé/ no pude usar: No quisimos usar MAC",
        value: "No usé/ no pude usar: No quisimos usar MAC"
      },
      {
        key: 2,
        text:
          "No usé/ no pude usar: La persona con la que estuve no quiso usar MAC",
        value:
          "No usé/ no pude usar: La persona con la que estuve no quiso usar MAC"
      },
      {
        key: 3,
        text: "No usé/ no pude usar: Yo no quise usar MAC",
        value: "No usé/ no pude usar: Yo no quise usar MAC"
      },
      {
        key: 4,
        text:
          "No usé/ no pude usar: La persona con la que estuve no quiere que yo use MAC",
        value:
          "No usé/ no pude usar: La persona con la que estuve no quiere que yo use MAC"
      },
      {
        key: 5,
        text: "No usé/ no pude usar: Deseo concepcional",
        value: "No usé/ no pude usar: Deseo concepcional"
      },
      {
        key: 6,
        text:
          "No usé/ no pude usar: No tengo acceso porque el Sistema de Salud no me lo garantizó",
        value:
          "No usé/ no pude usar: No tengo acceso porque el Sistema de Salud no me lo garantizó"
      },
      {
        key: 7,
        text: "No usé/ no pude usar: No sabía que tenía que usar",
        value: "No usé/ no pude usar: No sabía que tenía que usar"
      },
      {
        key: 8,
        text:
          "No usé/ no pude usar: No sabía que estaba garantizado desde el Sistema de Salud",
        value:
          "No usé/ no pude usar: No sabía que estaba garantizado desde el Sistema de Salud"
      },
      {
        key: 9,
        text:
          "No usé/ no pude usar: Pensé que estaba usando preservativo/se lo sacó",
        value:
          "No usé/ no pude usar: Pensé que estaba usando preservativo/se lo sacó"
      },
      {
        key: 10,
        text: "Otro",
        value: "Otro"
      },
      {
        key: 11,
        text: "Sí usé: Falló el MAC (usé correctamente)",
        value: "Sí usé: Falló el MAC (usé correctamente)"
      },
      {
        key: 12,
        text: "Sí usé: Me equivoqué en el uso MAC",
        value: "Sí usé: Me equivoqué en el uso MAC"
      },
      {
        key: 13,
        text: "Me cuido con práctica anticonceptiva: Con los días",
        value: "Me cuido con práctica anticonceptiva: Con los días"
      },
      {
        key: 14,
        text: "Me cuido con práctica anticonceptiva: Con coito interrumpido",
        value: "Me cuido con práctica anticonceptiva: Con coito interrumpido"
      }
    ];

    options[470] = [
      {
        key: 1,
        text: "No",
        value: "No"
      },
      {
        key: 2,
        text: "Si",
        value: "Si"
      },
      {
        key: 3,
        text: "No estoy segurx",
        value: "No estoy segurx"
      }
    ];
    options[480] = [
      {
        key: 1,
        text: "No",
        value: "No"
      },
      {
        key: 2,
        text: "Si",
        value: "Si"
      },
      {
        key: 3,
        text: "En parte",
        value: "En parte"
      }
    ];
    options[490] = [
      {
        key: 1,
        text: "Muy bien",
        value: "Muy bien"
      },
      {
        key: 2,
        text: "Bien",
        value: "Bien"
      },
      {
        key: 3,
        text: "Regular",
        value: "Regular"
      },
      {
        key: 4,
        text: "Mal",
        value: "Mal"
      }
    ];
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
                  value={this.state.otro}
                  onChange={this.handleOnChangeOtro}
                />
              </Form.Field>
            ) : null}
          </Form.Group>
          <Button color="purple" type="submit">
            Guardar
          </Button>
        </Form>
        <Message floating hidden={this.state.hidden}>
          <Message.Header>
            <Icon name="heart outline" />
            Respuesta modificada con éxito.
          </Message.Header>
        </Message>
      </div>
    );
  }

  render() {
    console.log(this.props.pregunta.contactoid);
    return this.renderForm();
  }
}
