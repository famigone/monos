import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Meteor } from "meteor/meteor";

import { withTracker } from "meteor/react-meteor-data";

import Alert from "react-s-alert";
import {
  Link
} from "react-router-dom";
import {
  Icon,
  Label,
  Menu,
  Message,
  Table,
  Segment,
  Button,
  Divider,
  Form,
  Card,
  Grid,
  Image,
  Dropdown,
  Modal,
  Header
} from "semantic-ui-react";

//const App = () => (

export default class MonoSelector extends Component {
  render() {

      return (
        <Grid >

        <Grid.Row columns={5}>
        <Grid.Column>
        </Grid.Column>
        <Grid.Column>

        <Card>
        <Image  src='/img/mono1.png' size='medium' wrapped ui={false} />
        <Card.Content>
        <Card.Header><center><p>EXPERIENCIA</p> <p>TANGIBLE</p></center></Card.Header>
        <Card.Meta>

        </Card.Meta>
        <Card.Description>

        </Card.Description>
        </Card.Content>
        <Card.Content extra>
        <Link to="/tangible">
          <Button color="orange" fluid> <center><Icon name='plus' /></center></Button>
        </Link>

        </Card.Content>
        </Card>
        </Grid.Column>
        <Grid.Column>
        <Card>
        <Image  src='/img/mono2.png' size='medium' wrapped ui={false} />
        <Card.Content>
        <Card.Header><center><p>EXPERIENCIA</p> <p>BLOQUES</p></center></Card.Header>
        <Card.Meta>

        </Card.Meta>
        <Card.Description>

        </Card.Description>
        </Card.Content>
        <Card.Content extra>
        <Link to="/tangible">
          <Button color="orange" fluid> <center><Icon name='plus' /></center></Button>
        </Link>

        </Card.Content>
        </Card>
        </Grid.Column>
        <Grid.Column>
        <Card>
        <Image  src='/img/mono3.png' size='medium' wrapped ui={false} />
        <Card.Content>
        <Card.Header><center><p>EXPERIENCIA</p> <p>TEXTUAL</p></center></Card.Header>
        <Card.Meta>

        </Card.Meta>
        <Card.Description>

        </Card.Description>
        </Card.Content>
        <Card.Content extra>
        <Link to="/tangible">
          <Button color="orange" fluid> <center><Icon name='plus' /></center></Button>
        </Link>

        </Card.Content>
        </Card>
        </Grid.Column>
        <Grid.Column>
        </Grid.Column>
        </Grid.Row>
        <Grid.Row >
        <Grid.Column width={4}>

        </Grid.Column>
          <Grid.Column width={8}>
            <Message
              icon='thumbtack'
              header='Selecciona un tipo de experiencia para registrar y hace click!'
              content='Es importante que llevemos un registro de nuestras experiencias.'
            />
          </Grid.Column>

        </Grid.Row>

        </Grid>
      );

  }
}
