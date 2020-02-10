import React, { Component } from "react";
import Axios from "axios";

export default class SingleMember extends Component {
  state = {
    familyMember: {
      full_name: "",
      profile_image: "",
      is_parent: false,
      chores: []
    }
  };

  componentDidMount = () => {
    Axios.get(`/api/v1/familymember/${this.props.match.params.memberId}/`).then(
      res => {
        this.setState({ familyMember: res.data });
      }
    );
  };
  render() {
    return (
      <div>
        <h1>{this.state.familyMember.full_name}</h1>
        {this.state.familyMember.is_parent === true ? (
          <div>Parent</div>
        ) : (
          <div>Child</div>
        )}
        {this.state.familyMember.chores.map(chore => (
          <h3>{chore.task} </h3>
        ))}
        {/* <h3>{this.state.familyMember.chores[0].task}</h3> */}
      </div>
    );
  }
}
