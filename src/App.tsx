import * as React from "react";
import "./App.css";
import Home from "./home/Home";

// import {
//   BrowserRouter as Router,
//   Route,
//   Link
// } from "react-router-dom";

const logo = require("./logo.svg");

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Home something="typescript!" />
      </div>
    );
  }
}

export default App;
