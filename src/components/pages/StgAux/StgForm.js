import React, { Component } from "react";
import {
  Grid,
  Checkbox,
  ListItemText,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Container,
  Input,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { SelectInput } from "../../Shared/SelectInput/SelectInput";

const styles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: "80%",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const initialState = {
  subject: "",
  specialty: "",
  groups: [],
  active: true,
  semesters: [],
};

class StgForm extends Component {
  constructor(props) {
    super();
    this.state = initialState;
  }

  addSTG = () => {
    const { user, postSTG } = this.props;
    const { subject, groups, semesters } = this.state;
    // console.log(user.stg, { subject, groups, semesters });
    // const newStg = lodash.concat(user.stg, {
    //   subject: subject,
    //   groups: groups,
    //   semesters: semesters,
    // });
    // console.log(newStg);
    postSTG({ subject, groups, semesters });
    this.setState(initialState);
  };

  handleChange = (event) => {
    if (event.target.name === "specialty") {
      this.setState({ groups: [], semesters: [] });
    }
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { subject, specialty, groups, semesters } = this.state;
    const { classifiers, classes } = this.props;
    let ceiling = 0;
    let semesterNumbers = [];
    if (specialty) {
      ceiling = classifiers.specialty.find(
        (el) => el.nameSpecialty === specialty
      ).amount;

      for (let i = 1; i <= ceiling; i++) {
        semesterNumbers.push(i);
      }
    }

    return (
      <div className={classes.paper}>
        <Grid item xs={10}>
          <FormControl className={classes.formControl}>
            <InputLabel>Предмет</InputLabel>
            <Select
              value={subject}
              onChange={this.handleChange}
              multiline={true}
              input={<SelectInput />}
              inputProps={{
                name: "subject",
              }}
            >
              {classifiers.subject.map((subj, index) => {
                return (
                  <option key={index} value={subj}>
                    {subj}
                  </option>
                );
              })}
            </Select>
          </FormControl>
        </Grid>

        {subject && (
          <>
            <Grid item xs={10}>
              <FormControl className={classes.formControl}>
                <InputLabel>Специальность</InputLabel>
                <Select
                  value={specialty}
                  onChange={this.handleChange}
                  multiline={true}
                  input={<SelectInput />}
                  inputProps={{
                    name: "specialty",
                  }}
                >
                  {classifiers.specialty.map((el, index) => {
                    return (
                      <option key={index} value={el.nameSpecialty}>
                        {el.nameSpecialty}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            {specialty && (
              <>
                <Grid item xs={5}>
                  <FormControl className={classes.formControl}>
                    <InputLabel>Группы</InputLabel>

                    <Select
                      multiple
                      inputProps={{
                        name: "groups",
                      }}
                      value={groups}
                      onChange={this.handleChange}
                      input={<Input id="select-multiple-chip" />}
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={MenuProps}
                    >
                      {classifiers.specialty
                        .find((el) => el.nameSpecialty === specialty)
                        .numberGroup.map((el, index) => (
                          <MenuItem key={index} value={el}>
                            <Checkbox checked={groups.indexOf(el) > -1} />
                            <ListItemText primary={el} />
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={5}>
                  <FormControl className={classes.formControl}>
                    <InputLabel>Семестры</InputLabel>
                    <Select
                      value={semesters}
                      onChange={this.handleChange}
                      multiple
                      input={<Input id="select-multiple-sems" />}
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={MenuProps}
                      inputProps={{
                        name: "semesters",
                      }}
                    >
                      {semesterNumbers.map((el, index) => (
                        <MenuItem key={index} value={el}>
                          <Checkbox checked={semesters.indexOf(el) > -1} />
                          <ListItemText primary={el} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </>
            )}
          </>
        )}

        <Button
          className={classes.submit}
          color="inherit"
          variant="outlined"
          onClick={this.addSTG}
        >
          Подтвердить
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(StgForm);
