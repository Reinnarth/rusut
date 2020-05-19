import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";
import red from "@material-ui/core/colors/red";

import store from "./store";

import AppContainer from "./containers/AppContainer/AppContainer";

const theme = createMuiTheme({
  fontFamily: "Roboto",
  palette: {
    primary: indigo,
    secondary: red,
  },
  status: {
    danger: "orange",
  },
});

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Router>
          <AppContainer />
        </Router>
      </ThemeProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
