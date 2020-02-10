import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class CreateMember extends Component {
  state = {
    families: [],
    familyMembers: [],
    chores: [],
    newMember: {
      full_name: "",
      is_parent: Boolean,
      profile_image: "",
      chores: []
    },
    createMember: false,
    cancel: false,
    choreAdded: false
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
      })
      .then(() => {
        axios.get("/api/v1/chore/").then(res => {
          this.setState({ chores: res.data });
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
        this.setState({ createMember: false });
        this.updateFamilyMembers();
      });
  };

  toggleCreateMember = () => {
    const toggle = !this.state.createMember;
    this.setState({ createMember: toggle });
  };

  toggleCancel = () => {
    const toggle = !this.state.cancel;
    this.setState({ cancel: toggle, createMember: false });
  };

  render() {
    const allFamilyMembers = this.state.familyMembers.map(member => {
      return (
        <Link to={`/familymember/${member.id}`}>
          <div>{member.full_name}</div>
        </Link>
      );
    });
    return (
      <div>
        <button onClick={this.toggleCreateMember}>New Family Member</button>
        {this.state.createMember === true ? (
          <div className="createMemberForm">
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

              <select id="chores" name="chores">
                {this.state.chores.map(chore => (
                  <option name="chores" value={this.state.newMember.chores}>
                    {chore.task}{" "}
                  </option>
                ))}
              </select>

              <label>Is this person a parent? </label>
              <input
                type="checkbox"
                name="is_parent"
                onChange={this.handleInputChange}
                checked={this.state.newMember.is_parent}
              />
              <input type="submit" value="Create" />
              <button onClick={this.toggleCancel}>Cancel</button>
            </form>
          </div>
        ) : (
          <div className="membersList">
            <h1>All Family Members</h1>
            {allFamilyMembers}
          </div>
        )}
      </div>
    );
  }
}
