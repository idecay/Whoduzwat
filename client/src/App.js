import React from "react";
import "./App.css";
import CreateMember from "./components/CreateMember";
import CreateChore from "./components/CreateChore";
import ChoreList from "./components/ChoresList";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ChoresList from "./components/ChoresList";
import Home from "./components/Home";
import SingleMember from "./components/SingleMember";
import SingleFamily from "./components/SingleFamily";
import Welcome from "./components/Welcome";

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <nav>
            <Link to="/home"> Home</Link> \\
            <Link to="/createmember"> Family Members</Link> \\
            <Link to="/createchore"> Create Chore</Link>
          </nav>

          <Switch>
            <div className="body">
              <Route exact path="/choreslist" component={ChoresList} />
              <Route exact path="/createmember" component={CreateMember} />
              <Route exact path="/createchore" component={CreateChore} />
              <Route exact path="/home" component={Home} />
              <Route
                exact
                path="/familymember/:memberId"
                component={SingleMember}
              ></Route>
              <Route
                exact
                path="/family/:oneFamilyId"
                component={SingleFamily}
              />
              <Route exact path="/welcome" component={Welcome} />
            </div>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
