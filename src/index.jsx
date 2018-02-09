import React from "react";
import ReactDom from "react-dom";
import AppController from "./components/appController.jsx";
import Polyfills from "./polyfills";

ReactDom.render(<AppController/>, document.getElementById("react-app"));