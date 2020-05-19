import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import SignInContainer from "../containers/AuthContainers/SignInContainer";
import SignUpContainer from "../containers/AuthContainers/SignUpContainer";
import SemesterPage from "./pages/SemesterPage";
import LibraryContainer from "../containers/LibraryContainer/LibraryContainer";
import LearningActivitiesPage from "./pages/LearningActivitiesPage";
import StgPage from "./pages/StgPage";
import PracticePage from "./pages/PracticePage";
import WaitPage from "./pages/WaitPage";
import ProfilePageContainer from "../containers/ProfileContainer/ProfilePageContainer";
import AdminContainer from "../containers/AdminContainer/AdminContainer";
import MenuContainer from "../containers/MenuContainer/MenuContainer.js";
import Can from "./Can";
import * as route from "../global/routes";

export default class App extends Component {
  routes = [
    {
      path: route.semester,
      exact: true,
      page: () => (
        <>
          <MenuContainer /> <SemesterPage />
        </>
      ),
    },
    {
      path: route.library,
      exact: true,
      page: () => (
        <>
          <MenuContainer /> <LibraryContainer />
        </>
      ),
    },
    {
      path: route.learningActivities,
      exact: true,
      page: () => (
        <>
          <MenuContainer /> <LearningActivitiesPage />
        </>
      ),
    },
    {
      path: route.practice,
      exact: true,
      page: () => (
        <>
          <MenuContainer /> <PracticePage />
        </>
      ),
    },
    {
      path: route.profile,
      exact: true,
      page: () => (
        <>
          <MenuContainer /> <ProfilePageContainer />
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
    {
      path: route.stg,
      page: () => (
        <>
          <MenuContainer /> <StgPage />
        </>
      ),
    },
    {
      path: route.wait,
      page: () => (
        <>
          <MenuContainer /> <WaitPage />
        </>
      ),
    },
  ];

  componentDidMount() {
    this.props.getCurrentUser(localStorage.getItem("login"));
  }

  render() {
    const { user } = this.props;
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
              exact
              path="/"
              render={() => <Redirect to={route.semester} />}
            />
            <Route
              path="/signin"
              render={() => <Redirect to={route.semester} />}
            />
            {this.routes.map((route, index) => (
              <Route path={route.path} key={index} children={<route.page />} />
            ))}
            <Can
              role={user.nameRole}
              perform="home-page:visit"
              yes={(props) => {
                return this.routes.map((route, index) => (
                  <>
                    <Route
                      exact
                      path="/"
                      render={() => <Redirect to={route.semester} />}
                    />
                    <Route
                      path={route.path}
                      key={index}
                      children={<route.page />}
                    />
                  </>
                ));
              }}
              no={() => (
                <Route path="/" render={() => <Redirect to={route.wait} />} />
              )}
            />
          </Switch>
        </div>
      );
    }
  }
}
