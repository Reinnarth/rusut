import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Toolbar from "@material-ui/core/Toolbar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import { menuTabs, roles } from "./constants";
import { setTab } from "../../store/admin/adminActions";

const lightColor = "rgba(255, 255, 255, 0.7)";

const styles = (theme) => ({
  secondaryBar: {
    zIndex: 0,
  },
  menuButton: {
    marginLeft: -theme.spacing(1),
  },
  iconButtonAvatar: {
    padding: 4,
  },
  link: {
    textDecoration: "none",
    color: lightColor,
    "&:hover": {
      color: theme.palette.common.white,
    },
  },
  button: {
    borderColor: lightColor,
  },
});

function Header(props) {
  const { classes, onDrawerToggle } = props;
  const dispatch = useDispatch();
  let history = useHistory();
  const location = useSelector((state) => state.adminReducer.location);

  let tabs = menuTabs.find((el) => el.path === history.location.pathname);

  const [tab, setActiveTab] = useState(tabs.tabs[0] ? tabs.tabs[0].name : "");

  useEffect(() => {
    setActiveTab(
      menuTabs.find((el) => el.path === history.location.pathname).tabs[0].name
    );
  }, [history.location.pathname]);

  useEffect(() => {
    dispatch(setTab(tab));
  }, [tab]);

  const handleTabChange = async (event, activeTab) => {
    setActiveTab(activeTab);
    dispatch(setTab(activeTab));
    await props.getContentArray(`/admin/${activeTab}`, { offset: 0 });
  };

  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Hidden smUp>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={onDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            <Grid item xs />

            <Grid item>
              <IconButton color="inherit" className={classes.iconButtonAvatar}>
                <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
              </IconButton>
            </Grid>

            <Grid item>
              <ExitToAppIcon
                className={classes.iconButtonAvatar}
              ></ExitToAppIcon>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                {location.name}
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Tabs value={tab} textColor="inherit" onChange={handleTabChange}>
          {tabs.tabs.map((tab, index) => (
            <Tab
              key={index}
              value={tab.name}
              textColor="inherit"
              label={tab.label}
            />
          ))}
        </Tabs>
      </AppBar>
    </React.Fragment>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.func.isRequired,
};

export default withStyles(styles)(Header);
