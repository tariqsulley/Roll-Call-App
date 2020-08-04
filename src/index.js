import React from "react";
import ReactDOM from "react-dom";
import { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Logiin from './Login.jsx';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Login />
      </React.Fragment>
    );
  }
}
if(module.hot){
  module.hot.accept();
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
