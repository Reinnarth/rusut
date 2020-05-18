import React, { Component } from "react";

import {
  Grid,
  Paper,
  ListItemText,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  AppBar,
  CircularProgress,
} from "@material-ui/core";

import Typography from "@material-ui/core/Typography";

import { withStyles } from "@material-ui/core/styles";

import ExamForm from "./ExamForm";

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    maxWidth: 936,
    margin: "auto",
    overflow: "hidden",
  },
  modal: {
    margin: theme.spacing(16),
    overflow: "scroll",
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
    user: {},
    exam: null,
    semester: 1,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.user.userId !== state.user.userId) {
      props.getMyExams({ semester: 1 }, props.user.userId);
      return {
        user: props.user,
      };
    }
    return null;
  }

  handleChange = (event) => {
    this.setState({ [event.taget.name]: event.target.value });
  };

  render() {
    const { semester } = this.state;
    const { exams, classes, sessionLoading } = this.props;

    if (!sessionLoading) {
      let list = exams.map((exam, index) => {
        return (
          <Grid container key={index} className={classes.container}>
            <Grid item xs={12}>
              <Grid container className={classes.contentWrapper}>
                <Grid item xs={3}>
                  <Typography component="h1">{exam.type}</Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography component="h1">{exam.subject}</Typography>
                </Grid>
                <Grid component="h1" item xs={3}>
                  {exam.mark}
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
            <Grid item xs={3}>
              <FormControl className={classes.formControl}>
                <InputLabel>Семестр</InputLabel>
                <Select
                  value={semester}
                  onChange={this.handleChange}
                  inputProps={{
                    name: "subject",
                  }}
                >
                  {new Array(8).map((el, index) => {
                    return (
                      <option key={index} value={index}>
                        {index}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          </AppBar>

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
