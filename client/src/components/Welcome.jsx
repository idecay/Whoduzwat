import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Welcome extends Component {
  render() {
    return (
      <div>
        <Link to="/home">
          {" "}
          <img
            src="https://dysfunctionalrequirements.com/wp-content/uploads/2015/05/Highly-polished-turd.jpg"
            alt="a polished turd"
          />
        </Link>
      </div>
    );
  }
}
