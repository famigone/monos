import React, { Component } from "react";
import { Menu, Label } from "semantic-ui-react";

export default class MenuPrincipal extends Component {
  state = {};
  handleItemClick = name => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu vertical inverted color="teal">
        <Menu.Item
          name="inbox"
          active={activeItem === "inbox"}
          onClick={this.handleItemClick}
        >
          <Label color="teal">1</Label>
          Inbox
        </Menu.Item>

        <Menu.Item
          name="spam"
          active={activeItem === "spam"}
          onClick={this.handleItemClick}
        >
          <Label>51</Label>
          Spam
        </Menu.Item>

        <Menu.Item
          name="updates"
          active={activeItem === "updates"}
          onClick={this.handleItemClick}
        >
          <Label>1</Label>
          Updates
        </Menu.Item>
        <Menu.Item
          name="inbox"
          active={activeItem === "inbox"}
          onClick={this.handleItemClick}
        >
          <Label color="black">1</Label>
          Inbox
        </Menu.Item>

        <Menu.Item
          name="spam"
          active={activeItem === "spam"}
          onClick={this.handleItemClick}
        >
          <Label>51</Label>
          Spam
        </Menu.Item>

        <Menu.Item
          name="updates"
          active={activeItem === "updates"}
          onClick={this.handleItemClick}
        >
          <Label>1</Label>
          Updates
        </Menu.Item>
        <Menu.Item
          name="inbox"
          active={activeItem === "inbox"}
          onClick={this.handleItemClick}
        >
          <Label color="black">1</Label>
          Inbox
        </Menu.Item>

        <Menu.Item
          name="spam"
          active={activeItem === "spam"}
          onClick={this.handleItemClick}
        >
          <Label>51</Label>
          Spam
        </Menu.Item>

        <Menu.Item
          name="updates"
          active={activeItem === "updates"}
          onClick={this.handleItemClick}
        >
          <Label>1</Label>
          Updates
        </Menu.Item>
        <Menu.Item
          name="inbox"
          active={activeItem === "inbox"}
          onClick={this.handleItemClick}
        >
          <Label color="teal">1</Label>
          Inbox
        </Menu.Item>

        <Menu.Item
          name="spam"
          active={activeItem === "spam"}
          onClick={this.handleItemClick}
        >
          <Label color="black">51</Label>
          Spam
        </Menu.Item>

        <Menu.Item
          name="updates"
          active={activeItem === "updates"}
          onClick={this.handleItemClick}
        >
          <Label>1</Label>
          Updates
        </Menu.Item>
      </Menu>
    );
  }
}
