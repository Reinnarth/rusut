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
import lodash from "lodash";

const styles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
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

class StgForm extends Component {
  constructor(props) {
    super();
    this.state = {
      subject: null,
      specialty: null,
      groups: [],
      active: true,
    };
  }

  addSTG = () => {
    const { user, postSTG } = this.props;
    const { subject, groups } = this.state;
    const newStg = lodash.concat(user.stg, { subject, groups });
    postSTG(newStg);
  };

  handleChange = (event) => {
    if (event.target.name === "specialty") {
      this.setState({ groups: [] });
    }
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { subject, specialty, groups } = this.state;
    const { classifiers, classes } = this.props;
    console.log(groups);
    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Grid item xs={10}>
            <FormControl className={classes.formControl}>
              <InputLabel>Предмет</InputLabel>
              <Select
                value={subject}
                onChange={this.handleChange}
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
                <Grid item xs={10}>
                  <FormControl className={classes.formControl}>
                    <InputLabel>Группы</InputLabel>

                    <Select
                      labelId="demo-mutiple-chip-label"
                      id="demo-mutiple-chip"
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
      </Container>
    );
  }
}

export default withStyles(styles)(StgForm);
