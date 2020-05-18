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

import ExamForm from "./ExamForm";

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
    exam: null,
    search: "",
    editFlag: false,
    showConstructor: false,
  };

  componentDidMount() {
    const { getExams, user } = this.props;
    getExams(user.userId);
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClose = () => {
    this.setState({ showConstructor: false, editFlag: false });
  };

  handleEdit = (e, exame) => {
    const { group, semester, subject } = exame;
    const { user, exam, getExam } = this.props;
    getExam({ group, semester, subject }, user.userId, () =>
      this.setState({ editFlag: true, exam: exam })
    );
  };

  render() {
    const { exam, search, editFlag, showConstructor } = this.state;
    const {
      user,
      exams,
      classes,
      loading,
      students,
      getStudents,
      addExam,
      updateExam,
    } = this.props;

    const scroll = "paper";
    if (!loading) {
      let list = exams
        .filter((exam) => {
          if (exam.group.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
            return true;
          }
          return false;
        })
        .map((exam, index) => {
          return (
            <Grid container key={index}>
              <Grid item xs={12}>
                <Grid container className={classes.contentWrapper}>
                  <Grid item xs={2}>
                    <Typography component="h1">{exam.type}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography component="h1">{exam.subject}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    {exam.group}
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      onClick={(event) => this.handleEdit(event, exam)}
                      color="primary"
                      variant="outlined"
                    >
                      Изменить
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
            <Toolbar>
              <Grid
                container
                className={classes.paper}
                spacing={2}
                alignItems="center"
              >
                <Grid item>
                  <SearchIcon className={classes.block} color="inherit" />
                </Grid>
                <Grid item xs>
                  <TextField
                    fullWidth
                    placeholder="Search by name"
                    onChange={this.handleChange}
                    InputProps={{
                      name: "search",
                      disableUnderline: true,
                      className: classes.searchInput,
                    }}
                  />
                </Grid>
                <Grid item xs>
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={() => this.setState({ showConstructor: true })}
                  >
                    Выставить оценки
                  </Button>
                </Grid>
              </Grid>
            </Toolbar>
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
              {" "}
              <DialogContent>
                <ExamForm
                  user={user}
                  exam={exam}
                  getStudents={getStudents}
                  addExam={addExam}
                  handleClose={this.handleClose}
                  students={students}
                ></ExamForm>
              </DialogContent>
            </Dialog>
            {/* <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={showConstructor}
              onClose={this.handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={showConstructor}>
                <ExamForm
                  user={user}
                  exam={exam}
                  getStudents={getStudents}
                  addExam={addExam}
                  handleClose={this.handleClose}
                  students={students}
                ></ExamForm>
              </Fade>
            </Modal> */}
            {/* {loading && <CircularProgress />} */}

            {/* {!loading && <></>} */}
            {editFlag ? (
              <ExamForm
                user={user}
                getStudents={getStudents}
                updateExam={updateExam}
                handleClose={this.handleClose}
                students={students}
                exam={this.props.exam}
              ></ExamForm>
            ) : (
              <>{list}</>
            )}
          </div>
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
