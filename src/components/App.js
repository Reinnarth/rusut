import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import SignInContainer from "../containers/AuthContainers/SignInContainer";
import SignUpContainer from "../containers/AuthContainers/SignUpContainer";
import SemesterPage from "./pages/SemesterPage";
import LibraryPage from "./pages/LibraryPage";
import LearningActivitiesPage from "./pages/LearningActivitiesPage";
import MenuAppBar from "./Menu/AppMenu";
import AdminContainer from "../containers/AdminContainer/AdminContainer";
import * as route from "../global/routes";

export default class App extends Component {
  routes = [
    {
      path: route.semester,
      exact: true,
      page: () => (
        <>
          <MenuAppBar /> <SemesterPage />
        </>
      ),
    },
    {
      path: route.library,
      exact: true,
      page: () => (
        <>
          <MenuAppBar /> <LibraryPage />
        </>
      ),
    },
    {
      path: route.learningActivities,
      exact: true,
      page: () => (
        <>
          <MenuAppBar /> <LearningActivitiesPage />
        </>
      ),
    },
    {
      path: route.admin,
      page: () => (
        <>
          <AdminContainer />
        </>
      ),
    },
  ];
  render() {
    if (localStorage.getItem("token") === null) {
      return (
        <Switch>
          <Route exact path={route.signup} component={SignUpContainer} />
          <Route exact path={route.signin} component={SignInContainer} />

          <Route render={() => <Redirect to={"/signin"} />} />
        </Switch>
      );
    } else {
      return (
        <div>
          <Switch>
            <Route
              path="/signin"
              render={() => <Redirect to={"/semester"} />}
            />

            {this.routes.map((route, index) => (
              <Route path={route.path} key={index} children={<route.page />} />
            ))}
            {/* 
            <Route path={route.semester} component={SemesterPage} />
            <Route path={route.library} component={LibraryPage} />
            <Route
              path={route.learningActivities}
              component={LearningActivitiesPage}
            />
            <Route path={route.admin} component={AdminPanel} /> */}
          </Switch>
        </div>
      );
    }
  }
}
