import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";

import PracticeUploadForm from "./PracticeUploadForm";
import Typography from "@material-ui/core/Typography";

import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    margin: "40px 16px",
    textAlign: "center",
  },
  paginationWrapper: {
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
  },
});

class StudentView extends Component {
  state = {
    exam: null,
    showConstructor: false,
  };

  componentDidMount() {
    const { getMyUploads, user, history } = this.props;

    getMyUploads(history.location.pathname, user.userId);
  }

  handleClose = () => {
    this.setState({ showConstructor: false });
  };

  render() {
    const { showConstructor } = this.state;
    const {
      user,
      history,
      uploads,
      classes,
      loading,
      addFile,
      downloadFile,
    } = this.props;
    const scroll = "paper";
    console.log(uploads);
    if (!loading) {
      let list = uploads.map((upload, index) => {
        return (
          <Grid container key={index} className={classes.container}>
            <Grid item xs={12}>
              <Grid container className={classes.contentWrapper}>
                <Grid item xs={3}>
                  <Typography component="h1">{upload.topic}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography component="h1">{upload.nameTeacher}</Typography>
                </Grid>
                <Grid component="h1" item xs={3}>
                  <Typography component="h1"> {upload.mark}</Typography>
                </Grid>
                <Grid component="h1" item xs={3}>
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={() =>
                      downloadFile(history.location.pathname, upload.internshipId)
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
          >
            {" "}
            <Grid item xs>
              <Button
                color="primary"
                variant="outlined"
                onClick={() => this.setState({ showConstructor: true })}
              >
                Загрузить работу
              </Button>
            </Grid>
          </AppBar>
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
              <PracticeUploadForm
                user={user}
                addFile={addFile}
                handleClose={this.handleClose}
              ></PracticeUploadForm>
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

export default withStyles(styles)(StudentView);
