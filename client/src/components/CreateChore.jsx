import React, { Component } from "react";
import axios from "axios";
import ChoreList from "./ChoresList";
import { Redirect } from "react-router-dom";

export default class CreateChore extends Component {
  state = {
    chores: [],
    families: [],
    redirect: false,

    newChore: {
      task: "",
      value: "",
      image_url: "",
      family_name: ""
    }
  };

  componentDidMount = async () => {
    axios.get("/api/v1/chore/").then(res => {
      this.setState({ chores: res.data });
    });
    axios.get("/api/v1/family/").then(res => {
      this.setState({ families: res.data });
    });
  };

  updateChores = () => {
    axios
      .get("/api/v1/chore/")
      .then(res => {
        this.setState({ chores: res.data });
      })
      .then(this.setState({ redirect: true }));
  };

  onChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    const newState = { ...this.state };
    newState.newChore[name] = value;
    this.setState(newState);
  };

  onSubmit = event => {
    event.preventDefault();

    axios
      .post("/api/v1/chore/", this.state.newChore)
      .then(() => {
        const newState = { ...this.state };
        newState.newChore = {
          task: "",
          value: "",
          image_url: "",
          family_name: ""
        };
        this.setState(newState);
      })
      .then(() => {
        // this.setState({ redirect: true });
        this.updateChores();
      });
  };

  onCancel = () => {
    this.setState({ cancelRedirect: true });
  };

  render() {
    return (
      <div>
        {this.state.redirect === true ? <Redirect to="/choreslist" /> : null}

        <form onSubmit={this.onSubmit}>
          <h1>Create Chore</h1>
          <input
            type="text"
            placeholder="What is your task?"
            name="task"
            onChange={this.onChange}
            value={this.state.newChore.task}
          />
          <input
            type="number"
            placeholder="$0.00"
            name="value"
            onChange={this.onChange}
            value={this.state.newChore.value}
          />
          <input
            type="text"
            placeholder="Image URL"
            name="image_url"
            onChange={this.onChange}
            value={this.state.newChore.image_url}
          />
          {/* <label>Family: </label>
          <select name="family_name">
            <option>Select your family</option>
            {this.state.families.map(family => (
              <option
                key={family.id}
                value={family.family_name}
                name="family_name"
              >
                {family.family_name}
              </option>
            ))}
          </select> */}
          <input type="Submit" value="Create" />
        </form>
      </div>
    );
  }
}
