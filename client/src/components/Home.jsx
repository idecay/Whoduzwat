import React, { Component } from "react";
import axios from "axios";
import Families from "./Families";

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
        <h1>Choose a family: </h1>
        <Families />
      </div>
    );
  }
}
