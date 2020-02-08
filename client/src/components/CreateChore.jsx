import React, { Component } from "react";
import axios from "axios";

export default class CreateChore extends Component {
  state = {
    chores: [],
    families: [],
    newChore: {
      task: "",
      value: "",
      image_url: ""
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
    axios.get("/api/v1/chore/").then(res => {
      this.setState({ chores: res.data });
    });
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
          image_url: ""
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
          <label>Family: </label>
          <select>
            <option value="Select a genre">Select a genre</option>
            {this.state.families.map(family => (
              <option key={family.value} value={family.value}>
                {family.name}
              </option>
            ))}
          </select>
          <input type="Submit" value="Create" />
        </form>

        {this.state.chores.map(chore => (
          <h3>{chore.task} </h3>
        ))}
      </div>
    );
  }
}
