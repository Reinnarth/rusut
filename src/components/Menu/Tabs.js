import React from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import * as routes from "../../global/routes";

import Can from "../Can";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function CenteredTabs(props) {
  const classes = useStyles();
  const user = useSelector((state) => state.userReducer.user);
  const [value, setValue] = React.useState(props.location.pathname);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.history.push(`${newValue}`);
  };

  return (
    <Paper className={classes.root}>
      <Can
        role={user.nameRole}
        perform="admin-page:visit"
        yes={() => (
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab value={routes.semester} label="Семестр" />
            <Tab value={routes.library} label="Библиотека" />
            <Tab
              value={routes.learningActivities}
              label="Learning activities"
            />
            <Tab value={`${routes.admin}/users`} label="Admin Panel" />
          </Tabs>
        )}
        no={() => <></>}
      />
      <Can
        role={user.nameRole}
        perform="stg-page:visit"
        yes={() => (
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab value={routes.semester} label="Семестр" />
            <Tab value={routes.library} label="Библиотека" />
            <Tab
              value={routes.learningActivities}
              label="Learning activities"
            />
            <Tab value={routes.stg} label="Группы" />
          </Tabs>
        )}
        no={() => (
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab value={routes.semester} label="Семестр" />
            <Tab value={routes.library} label="Библиотека" />
            <Tab
              value={routes.learningActivities}
              label="Learning activities"
            />
          </Tabs>
        )}
      />
    </Paper>
  );
}

export default withRouter(CenteredTabs);
