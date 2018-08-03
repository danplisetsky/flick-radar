import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import FlickRadar from "./FlickRadar";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<FlickRadar />, document.getElementById("root"));
registerServiceWorker();
