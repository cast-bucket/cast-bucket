import React, { Component } from "react";
import logo from "../../assets/logo/cast-bucket-logo-white.svg";
import "./App.css";
import Home from "../Home/Home";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Home />
      </div>
    );
  }
}

export default App;
