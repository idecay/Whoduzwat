import React, { Component } from "react";
import axios from "axios";

export default class Home extends Component {
  state = {
    family: [],
    familyMembers: [],
    chores: []
  };

  componentDidMount = () => {
    axios
      .get("api/v1/family/")
      .then(res => {
        this.setState({ family: res.data });
      })
      .then(() => {
        axios.get("/api/v1/familymember/").then(res => {
          this.setState({ familyMembers: res.data });
        });
      })
      .then(() => {
        axios.get("/api/v1/chore/").then(res => {
          this.setState({ chores: res.data });
        });
      });
  };

  render() {
    return (
      <div>
        <h1>Families: </h1>
        {this.state.family.map(family => (
          <h3>{family.family_name} </h3>
        ))}
        <h1>Family Members: </h1>
        {this.state.familyMembers.map(member => (
          <h3>{member.full_name} </h3>
        ))}
        <h1>Chores: </h1>
        {this.state.chores.map(chore => (
          <h3>{chore.task} </h3>
        ))}
      </div>
    );
  }
}
