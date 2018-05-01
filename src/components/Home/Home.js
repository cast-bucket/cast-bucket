import React, { Component } from "react";
import "./Home.css";
import "../Login/Login";
import Login from "../Login/Login";

class Home extends Component {
  render() {
    return (
      <div className="greeting">
        <h1>Play All Podcasts, free.</h1>
        <Login />
      </div>
    );
  }
}

export default Home;
