import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  createMuiTheme,
  ThemeProvider,
  withStyles,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Hidden from "@material-ui/core/Hidden";

import Error from "../Error";
import Navigator from "./Navigator";
import Content from "./Content";
import Header from "./Header";
import Copyright from "../Shared/Copyright/Copyright";

let theme = createMuiTheme({
  palette: {
    primary: {
      light: "#3f51b5",
      main: "#3f51b5",
      dark: "#3f51b5",
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: "#18202c",
      },
    },
    MuiButton: {
      label: {
        textTransform: "none",
      },
      contained: {
        boxShadow: "none",
        "&:active": {
          boxShadow: "none",
        },
      },
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing(1),
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.white,
      },
    },
    MuiTab: {
      root: {
        textTransform: "none",
        margin: "0 16px",
        minWidth: 0,
        padding: 0,
        [theme.breakpoints.up("md")]: {
          padding: 0,
          minWidth: 0,
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing(1),
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: "#404854",
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    MuiListItemIcon: {
      root: {
        color: "inherit",
        marginRight: 0,
        "& svg": {
          fontSize: 20,
        },
      },
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32,
      },
    },
  },
};

const drawerWidth = 256;

const styles = {
  root: {
    display: "flex",
    minHeight: "100vh",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  app: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  main: {
    flex: 1,
    padding: theme.spacing(6, 4),
    background: "#eaeff1",
  },
  footer: {
    padding: theme.spacing(2),
    background: "#eaeff1",
  },
};

function AdminPanel(props) {
  const { classes, error, loading } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      {error && <Error />}
      {!error && (
        <ThemeProvider theme={theme}>
          <div className={classes.root}>
            <CssBaseline />
            <nav className={classes.drawer}>
              <Hidden smUp implementation="js">
                <Navigator
                  PaperProps={{ style: { width: drawerWidth } }}
                  getContentArray={props.getContentArray}
                  variant="temporary"
                  open={mobileOpen}
                  onClose={handleDrawerToggle}
                />
              </Hidden>
              <Hidden xsDown implementation="css">
                <Navigator
                  PaperProps={{ style: { width: drawerWidth } }}
                  getContentArray={props.getContentArray}
                />
              </Hidden>
            </nav>
            <div className={classes.app}>
              <Header
                onDrawerToggle={handleDrawerToggle}
                getContentArray={props.getContentArray}
              />
              <main className={classes.main}>
                <Content
                  classifiers={props.classifiers}
                  getClassifiers={props.getClassifiers}
                  loading={loading}
                  uploadFile={props.uploadFile}
                  getContentArray={props.getContentArray}
                  addPlace={props.addPlace}
                  amount={props.amount}
                />
              </main>
              <footer className={classes.footer}>
                <Copyright />
              </footer>
            </div>
          </div>
        </ThemeProvider>
      )}
    </>
  );
}

AdminPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminPanel);
