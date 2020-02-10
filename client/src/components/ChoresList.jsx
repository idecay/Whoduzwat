import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class ChoresList extends Component {
  state = {
    chores: []
  };
  componentDidMount = () => {
    fetch("/api/v1/chore/")
      .then(res => res.json())
      .then(data => {
        this.setState({ chores: data });
      });
  };
  render() {
    return (
      <div>
        {this.state.chores.map(chore => (
          <h3>{chore.task} </h3>
        ))}
      </div>
    );
  }
}
