import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import lodash from "lodash";

const styles = (theme) => ({
  container: { width: "40.625rem" },
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    width: "40.5rem",
    display: "flex",
    justifyContent: "space-between",
    color: theme.palette.text.primary,
  },
  buttonRow: { textAlign: "center", justifyContent: "center" },
  searchBar: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  },

  selectEmpty: {
    minWidth: "6.25rem",
    marginTop: theme.spacing(2),
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

  paginationWrapper: {
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
  },
});

class ExamForm extends Component {
  constructor(props) {
    super();
    this.state = {
      typeExam: props.exam ? props.exam.type : null,
      hours: props.exam ? props.exam.hours : null,
      group: props.exam ? props.exam.group : null,
      subject: props.exam ? props.exam.subject : null,
      semester: props.exam ? props.exam.semester : null,
      students: props.exam ? props.exam.students : [],
    };
  }

  handleChange = (event, index) => {
    const { getStudents } = this.props;
    const { students } = this.state;
    switch (event.target.name) {
      case "students":
        const newStudents = students.map((student, ind) =>
          ind === index ? { ...student, mark: event.target.value } : student
        );
        this.setState({ students: newStudents });
        break;

      case "group":
        this.setState(
          {
            [event.target.name]: event.target.value,
          },
          getStudents({ group: event.target.value }, () => {
            const newStudents = this.props.students.map((el) => {
              return { ...el, mark: 2 };
            });
            this.setState({ students: newStudents });
          })
        );
        break;

      default:
        this.setState({
          [event.target.name]: event.target.value,
        });
        break;
    }
  };

  handleSubmit = () => {
    const { user, addExam, updateExam, handleClose } = this.props;
    const { typeExam, hours, group, subject, semester, students } = this.state;
    const exam = {
      typeExam,
      hours,
      group,
      subject,
      semester,
      students,
    };
    this.props.exam
      ? updateExam(exam, user.userId)
      : addExam(exam, user.userId);
    handleClose();
  };

  render() {
    const { typeExam, hours, group, subject, semester, students } = this.state;
    const { user, classes, handleClose } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <Paper className={classes.paper}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={1}
          >
            <DialogContent>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                spacing={1}
              >
                <Grid item xs={2}>
                  <FormControl>
                    <InputLabel>Формат аттестации</InputLabel>
                    <Select
                      autoWidth={true}
                      className={classes.selectEmpty}
                      value={typeExam}
                      defaultValue={"Экзамен"}
                      onChange={this.handleChange}
                      inputProps={{
                        name: "typeExam",
                      }}
                    >
                      <option key={0} value={"Экзамен"}>
                        Экзамен
                      </option>
                      <option key={1} value={"Зачет"}>
                        Зачет
                      </option>
                      <option key={2} value={"Диф. Зачет"}>
                        Диф. Зачет
                      </option>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={2}>
                  <FormControl>
                    <InputLabel>Предмет</InputLabel>
                    <Select
                      className={classes.selectEmpty}
                      value={subject}
                      autoWidth={true}
                      onChange={this.handleChange}
                      inputProps={{
                        name: "subject",
                      }}
                    >
                      {lodash.uniqBy(user.stg, "subject").map((el, index) => (
                        <option key={index} value={el.subject}>
                          {el.subject}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {subject && (
                  <>
                    <Grid item xs={2}>
                      <FormControl>
                        <InputLabel>Группа</InputLabel>
                        <Select
                          className={classes.selectEmpty}
                          value={group}
                          autoWidth={true}
                          onChange={this.handleChange}
                          inputProps={{
                            name: "group",
                          }}
                        >
                          {user.stg
                            .find((el) => el.subject === subject)
                            .groups.map((group, index) => (
                              <option key={index} value={group}>
                                {group}
                              </option>
                            ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                      <FormControl>
                        <InputLabel>Семестр</InputLabel>
                        <Select
                          className={classes.selectEmpty}
                          autoWidth={true}
                          value={semester}
                          onChange={this.handleChange}
                          inputProps={{
                            name: "semester",
                          }}
                        >
                          {user.stg
                            .find((el) => el.subject === subject)
                            .semesters.map((semester, index) => (
                              <option key={index} value={semester}>
                                {semester}
                              </option>
                            ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                      <FormControl>
                        <InputLabel>Кол-во часов</InputLabel>
                        <Input
                          value={hours}
                          onChange={this.handleChange}
                          name="hours"
                        />
                      </FormControl>
                    </Grid>
                  </>
                )}
              </Grid>
              {group && students && (
                <>
                  {students.map((student, index) => (
                    <Grid item xs={12} key={index}>
                      <Grid container>
                        <Grid item xs={6}>
                          <p>{student.nameStudent}</p>
                        </Grid>

                        <Grid item xs={3}>
                          {student.middlename && <p>{student.numberBook}</p>}
                        </Grid>
                        <Grid item xs={3}>
                          <FormControl>
                            <InputLabel>Оценка</InputLabel>
                            <Input
                              value={student.mark}
                              name="students"
                              onChange={(event) =>
                                this.handleChange(event, index)
                              }
                            />
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                </>
              )}
              <Grid container className={classes.buttonRow} direction="row">
                <Grid item>
                  <Button onClick={() => handleClose()}>Отмена</Button>
                </Grid>
                <Grid item>
                  <Button type="submit" color="primary">
                    Подтвердить
                  </Button>
                </Grid>
              </Grid>
            </DialogContent>
          </Grid>
        </Paper>
      </form>
    );
  }
}

export default withStyles(styles)(ExamForm);
