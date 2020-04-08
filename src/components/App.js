import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";


import SignInContainer from "../containers/AuthContainers/SignInContainer";
import SignUpContainer from "../containers/AuthContainers/SignUpContainer";

import * as route from "../global/routes";

export default class App extends Component {
  render() {
    if (localStorage.getItem("token") == null) {
      return (
        <Switch>
          <Route path={route.signin} component={SignInContainer} />
          <Route path={route.signup} component={SignUpContainer} />
          <Route render={() => <Redirect to={"/signin"} />} />
        </Switch>
      );
    } else return <div></div>;
  }
}
