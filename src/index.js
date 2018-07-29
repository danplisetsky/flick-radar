import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import FlickRadar from "./FlickRadar";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <BrowserRouter>
    <FlickRadar />
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
