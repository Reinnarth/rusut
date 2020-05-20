import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import DialogContent from "@material-ui/core/DialogContent";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/Refresh";

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    maxWidth: 936,
    margin: "auto",
    overflow: "hidden",
  },
  modal: {
    margin: theme.spacing(16),
    position: "absolute",
  },
  searchBar: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: "block",
  },

  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: "20px 16px",
    textAlign: "center",
  },
  paginationWrapper: {
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
  },
});

class TeacherView extends Component {
  state = {
    upload: null,
    search: "",
    mark: "",
    editFlag: false,
    showConstructor: false,
    user: {},
  };

  static getDerivedStateFromProps(props, state) {
    if (props.user.userId !== state.user.userId) {
      props.getStudentUploads(
        props.history.location.pathname,
        props.user.userId
      );
      return {
        user: props.user,
      };
    }
    return null;
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClose = () => {
    this.setState({ showConstructor: false, editFlag: false });
  };

  render() {
    const { mark, upload, showConstructor } = this.state;
    const {
      user,
      uploads,
      classes,
      sessionLoading,
      history,
      setMark,
      downloadFile,
    } = this.props;
    const scroll = "paper";
    if (!sessionLoading) {
      let list = uploads.map((upload, index) => {
        return (
          <Grid container key={index} className={classes.container}>
            <Grid item xs={12}>
              <Grid container className={classes.contentWrapper}>
                <Grid item xs={3}>
                  <Typography component="h1">Тема: {upload.topic}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography component="h1">{upload.student}</Typography>
                </Grid>
                <Grid component="h1" item xs={3}>
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={() =>
                      this.setState({ showConstructor: true, upload: upload })
                    }
                  >
                    Оценить
                  </Button>
                </Grid>
                <Grid component="h1" item xs={3}>
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={() =>
                      downloadFile(
                        history.location.pathname,
                        upload.id
                      )
                    }
                  >
                    Скачать
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        );
      });

      return (
        <Paper className={classes.paper} square>
          <AppBar
            className={classes.searchBar}
            position="static"
            color="default"
            elevation={0}
          ></AppBar>
          <div className={classes.contentWrapper}>
            <Dialog
              className={classes.modal}
              maxWidth="xl"
              open={showConstructor}
              onClose={this.handleClose}
              dividers={scroll === "paper"}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>
                <Grid item xs={3}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    onChange={this.handleChange}
                    value={mark}
                    // required
                    fullWidth
                    name="mark"
                    label="Оценка"
                  ></TextField>
                </Grid>{" "}
                <Grid item xs={3}>
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={() => {
                      setMark(
                        history.location.pathname,
                        { mark: mark },
                        upload.id
                      );
                      this.setState({ showConstructor: false });
                    }}
                  >
                    Подтвердить
                  </Button>
                </Grid>
              </DialogContent>
            </Dialog>
          </div>
          <>{list}</>
        </Paper>
      );
    } else {
      return (
        <Grid container>
          <CircularProgress></CircularProgress>
        </Grid>
      );
    }
  }
}

export default withStyles(styles)(TeacherView);
