import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./components/App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import store from "./store";

ReactDOM.render(
  // <React.StrictMode> // Conflict with @material-ui v4
  <Provider store={ store }>
    <App/>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById("root"),
);

reportWebVitals();
