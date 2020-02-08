import React, { Component } from "react";
import axios from "axios";

export default class CreateMember extends Component {
  state = {
    families: [],
    familyMembers: [],
    newMember: {
      full_name: "",
      is_parent: Boolean,
      profile_image: ""
    }
  };

  componentDidMount = async () => {
    axios
      .get("/api/v1/familymember/")
      .then(res => {
        this.setState({ familyMembers: res.data });
      })
      .then(() => {
        axios.get("/api/v1/family/").then(res => {
          this.setState({ families: res.data });
        });
      });
  };

  updateFamilyMembers = () => {
    axios.get("/api/v1/familymember/").then(res => {
      this.setState({ familyMembers: res.data });
    });
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const newState = { ...this.state };
    newState.newMember[name] = value;
    this.setState(newState);
  };

  onChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    const newState = { ...this.state };
    newState.newMember[name] = value;
    this.setState(newState);
  };

  onSubmit = event => {
    event.preventDefault();

    axios
      .post("/api/v1/familymember/", this.state.newMember)
      .then(() => {
        const newState = { ...this.state };
        newState.newMember = {
          full_name: "",
          is_parent: Boolean,
          profile_image: ""
        };
        this.setState(newState);
      })
      .then(() => {
        // this.setState({ redirect: true });
        this.updateFamilyMembers();
      });
  };

  onCancel = () => {
    this.setState({ cancelRedirect: true });
  };

  render() {
    return (
      <div>
        <h1>Create Family Member</h1>
        <form onSubmit={this.onSubmit}>
          <label>Full Name: </label>
          <input
            type="text"
            placeholder="enter full name here"
            name="full_name"
            onChange={this.onChange}
            value={this.state.newMember.full_name}
          />
          <label>Profile Picture: </label>
          <input
            type="text"
            placeholder="input image URL"
            name="profile_image"
            onChange={this.onChange}
            value={this.state.newMember.profile_image}
          />
          <label>Is this person a parent? </label>
          <input
            type="checkbox"
            name="is_parent"
            onChange={this.handleInputChange}
            checked={this.state.newMember.is_parent}
          />
          {/* TODO: figure out why the submit button wont work with box is checked */}
          <input type="submit" value="Create" />
        </form>

        {this.state.familyMembers.map(member => (
          <h3>{member.full_name} </h3>
        ))}
      </div>
    );
  }
}
