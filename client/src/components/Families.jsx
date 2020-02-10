import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

export default class Families extends Component {
  state = {
    family: []
  };

  componentDidMount = () => {
    Axios.get("/api/v1/family/").then(res => {
      this.setState({ family: res.data });
    });
  };

  render() {
    const allFamilies = this.state.family.map(oneFamily => {
      return (
        <Link to={`/family/${oneFamily.id}`}>
          <div>{oneFamily.family_name}</div>
        </Link>
      );
    });
    return <div>{allFamilies}</div>;
  }
}
