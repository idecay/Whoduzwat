import React from "react";
import "./App.css";
import CreateMember from "./components/CreateMember";
import CreateChore from "./components/CreateChore";

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello World</h1>

        <CreateMember />
        <CreateChore />
      </div>
    );
  }
}

export default App;
