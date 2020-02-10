import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

export default class SingleFamily extends Component {
  state = {
    family: {
      family_name: "",
      chores: [],
      family_members: []
    }
  };

  componentDidMount = () => {
    Axios.get(`/api/v1/family/${this.props.match.params.oneFamilyId}/`).then(
      res => {
        this.setState({ family: res.data });
      }
    );
  };

  render() {
    const allFamilyMembers = this.state.family.family_members.map(member => {
      return (
        <Link to={`/familymember/${member.id}`}>
          <div>{member.full_name}</div>
        </Link>
      );
    });
    return (
      <div>
        <h1>{this.state.family.family_name} Family</h1>
        {allFamilyMembers}
      </div>
    );
  }
}
