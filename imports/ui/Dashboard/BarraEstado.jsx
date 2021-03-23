import React, { Component } from "react";
import { Icon, Input, Menu, Container, Image } from "semantic-ui-react";
import { Session } from "meteor/session";
import { Link } from "react-router-dom";
import { Meteor } from "meteor/meteor";

export default class MenuExampleSecondary extends Component {
  state = { activeItem: "home", dl_id: Session.get("dl") };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  handleItemAsset = (e, { name }) => {
    this.setState({ activeItem: name });
  };
  handleDl = (e, { dl_id }) => {
    this.setState({ dl_id: dl_id });
  };
  handleItemLogout = (e, { name }) => {
    this.setState({ activeItem: name });
    Meteor.logout();
  };
  handleItemUsuarios = (e, { name }) => {
    this.setState({ activeItem: name });
  };
  render() {
    const { activeItem } = this.state;

    return (
      <Menu inverted color="purple">
        <Menu.Item>
          {/*<Image centered size="tiny" src="/img/ripioh_white.png" />*/}
          SOCORRISTAS EN RED
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/listadoconsultas"
          onClick={this.handleItemClick}
        >
          <Icon name="th list" />
        </Menu.Item>

        <Menu.Item as={Link} to="/nuevocontacto" onClick={this.handleItemClick}>
          <Icon name="child" />
        </Menu.Item>

        <Menu.Item
          as={Link}
          to="/nuevocontactomujer"
          onClick={this.handleItemClick}
        >
          <b>+18</b>
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item
            name="consultasadmin"
            as={Link}
            to="/analisis"
            onClick={this.handleItemClick}
            active={activeItem === "consultasadmin"}
          >
            <Icon name="pie chart" />
          </Menu.Item>
          {Meteor.user().username === "admin" ? (
            <Menu.Item
              name="users"
              as={Link}
              to="/reglas"
              active={activeItem === "map"}
              onClick={this.handleItemMap}
            >
              <Icon name="random" />
            </Menu.Item>
          ) : null}
          {Meteor.user().username === "admin" ? (
            <Menu.Item
              name="users"
              as={Link}
              to="/usuarios"
              active={activeItem === "map"}
              onClick={this.handleItemMap}
            >
              <Icon name="users" />
            </Menu.Item>
          ) : null}
          <Menu.Item
            active={activeItem === "Logout"}
            as={Link}
            to="#"
            onClick={this.handleItemLogout}
          >
            Salir
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
