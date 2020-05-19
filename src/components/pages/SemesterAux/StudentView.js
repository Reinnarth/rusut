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
    semester: "1",
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
    console.log("change triggered", event.target.value);
    this.setState({ [event.target.name]: event.target.value });
    this.props.getMyExams(
      { semester: event.target.value },
      this.props.user.userId
    );
  };

  render() {
    const { semester } = this.state;
    const { exams, classes, sessionLoading } = this.props;
    console.log(semester);
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
                name="semester"
                onChange={this.handleChange}
                defaultValue="1"
                inputProps={{
                  name: "subject",
                }}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
              </Select>
            </FormControl>
          </Grid>
        </AppBar>
        {sessionLoading && (
          <Grid container>
            <CircularProgress></CircularProgress>
          </Grid>
        )}
        {!sessionLoading && (
          <>
            {exams.map((exam, index) => {
              return (
                <Grid container key={index} className={classes.container}>
                  <Grid item xs={12}>
                    <Grid container className={classes.contentWrapper}>
                      <Grid item xs={3}>
                        <Typography component="h1">{exam.typeExam}</Typography>
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
            })}
          </>
        )}
      </Paper>
    );
  }
}

export default withStyles(styles)(StudentView);
