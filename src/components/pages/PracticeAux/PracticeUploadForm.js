import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Input,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Select,
  Container,
  InputLabel,
  FormControl,
  FormControlLabel,
  Typography,
  Paper,
  Link,
} from "@material-ui/core";
import lodash from "lodash";
import * as yup from "yup";

import { makeStyles } from "@material-ui/core/styles";

import { SelectInput } from "../../Shared/SelectInput/SelectInput";

const uploadSchema = yup.object().shape({
  name: yup.string().required("Обязательно для заполнения"),
  author: yup.string().required("Обязательно для заполнения"),
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  formControl: {
    margin: 0,
    fullWidth: true,
    minWidth: "10rem",
    wrap: "wrap",
  },
  input: {
    marginTop: theme.spacing(2),
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
}));

// setLogin = async ({ login, password }) => {
//   const { signIn } = this.props;
//   await signIn(login, password);
// };

export default function PracticeUploadForm(props) {
  let history = useHistory();
  const classes = useStyles();
  const classifiers = useSelector(
    (state) => state.adminReducer.classifiers || state.userReducer.classifiers
  );
  const [place, setPlace] = useState({});
  const [type, setType] = useState("");
  const [topic, setTopic] = useState("");
  const [semester, setSemester] = useState("");
  const [teacher, setTeacher] = useState("");
  const [director, setDirector] = useState("");
  const [file, setFile] = useState(new FormData());

  const addPractice = () => {
    file.append("topic", topic);
    file.append("semester", semester);
    file.append("teacher", teacher);
    if (history.location.pathname === "/internship") {
      file.append("placePractice", place);
      file.append("director", director);
    } else {
      file.append("type", type);
    }

    props.addFile(history.location.pathname, file, props.user.userId);
    props.handleClose();
  };

  console.log(history.location);
  return (
    <Paper className={classes.paper}>
      {/* <Avatar className={classes.avatar}><LockOutlinedIcon /></Avatar> */}
      <Typography component="h1" variant="h5">
        Загрузить файл
      </Typography>

      <Grid container>
        <Grid item xs={10}>
          <TextField
            variant="outlined"
            margin="normal"
            // required
            fullWidth
            id="login"
            label="Тема"
            name="topic"
            autoComplete="topic"
            autoFocus
            onChange={(event) => {
              setTopic(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={10}>
          <FormControl className={classes.formControl}>
            <InputLabel>Семестр</InputLabel>
            <Select
              value={semester}
              onChange={(event) => setSemester(event.target.value)}
              input={<SelectInput />}
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

        {history.location.pathname === "/internship" && (
          <>
            <Grid item xs={10}>
              <FormControl className={classes.formControl}>
                <InputLabel>Место практики</InputLabel>
                <Select
                  value={place}
                  defaultValue=""
                  onChange={(event) => setPlace(event.target.value)}
                  input={<SelectInput />}
                  inputProps={{
                    name: "specialty",
                  }}
                >
                  {classifiers.place.map((plac, index) => {
                    return (
                      <option key={index} value={plac.placePracticeId}>
                        {plac.companyName}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={10}>
              <TextField
                variant="outlined"
                margin="normal"
                // required
                fullWidth
                value={director}
                id="login"
                label="Руководитель с места практики"
                name="topic"
                autoComplete="topic"
                autoFocus
                onChange={(event) => {
                  setDirector(event.target.value);
                }}
              />
            </Grid>
          </>
        )}
        {history.location.pathname === "/learning-activities" && (
          <Grid item xs={10}>
            <FormControl className={classes.formControl}>
              <InputLabel>Тип</InputLabel>
              <Select
                value={type}
                defaultValue=""
                onChange={(event) => setType(event.target.value)}
                input={<SelectInput />}
                inputProps={{
                  name: "type",
                }}
              >
                {classifiers.learning.map((el, index) => {
                  return (
                    <option key={index} value={el}>
                      {el}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
        )}

        <Grid item xs={10}>
          <FormControl className={classes.formControl}>
            <InputLabel>Преподаватель</InputLabel>
            <Select
              value={teacher}
              defaultValue=""
              onChange={(event) => setTeacher(event.target.value)}
              input={<SelectInput />}
              inputProps={{
                name: "specialty",
              }}
            >
              {classifiers.teachers.map((teacher, index) => {
                return (
                  <option key={index} value={teacher.id}>
                    {teacher.fullName}
                  </option>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid container className={classes.input} direction="row">
          <Grid item>
            <Input
              type="file"
              multiple
              onChange={(event) => {
                let formData = new FormData();
                formData.append("file", event.target.files[0]);
                setFile(formData);
              }}
            />
          </Grid>
          <Grid item>
            <Button
              color="inherit"
              variant="outlined"
              onClick={() => addPractice()}
            >
              Загрузить
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
