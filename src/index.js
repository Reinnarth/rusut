import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";

import store from "./store";

import App from "./components/App";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider>
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
