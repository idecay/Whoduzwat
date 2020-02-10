import React, { Component } from "react";
import Axios from "axios";

export default class SingleMember extends Component {
  state = {
    chores: [],
    familyMember: {
      full_name: "",
      profile_image: "",
      is_parent: false,
      chores: []
    },
    addChoreToggle: false
  };

  componentDidMount = () => {
    Axios.get(`/api/v1/familymember/${this.props.match.params.memberId}/`)
      .then(res => {
        this.setState({ familyMember: res.data });
      })
      .then(
        Axios.get("/api/v1/chore/").then(res =>
          this.setState({ chores: res.data })
        )
      );
  };

  addChoreToggle = () => {
    const toggle = !this.state.addChoreToggle;
    this.setState({ addChoreToggle: toggle });
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
        <img src={this.state.familyMember.profile_image} alt="dreamy" />
        <h2>List of Chores</h2>
        {this.state.familyMember.chores.map(chore => (
          <div className="choresList">
            <img src={chore.image_url} alt="some stuff" />
            <h3>{chore.task} </h3>
          </div>
        ))}
        <button onClick={this.addChoreToggle}>Add Chore</button>
      </div>
    );
  }
}
