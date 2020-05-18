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
  const [topic, setTopic] = useState("");
  const [semester, setSemester] = useState("");
  const [teacher, setTeacher] = useState("");
  const [director, setDirector] = useState("");
  const [file, setFile] = useState(new FormData());

  const addPractice = () => {
    file.append("topic", topic);
    file.append("semester", semester);
    file.append("placePractice", place);
    file.append("teacher", teacher);
    file.append("director", director);

    props.addFile(history.location.pathname, file, props.user.userId);
    props.handleClose();
  };

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
            label="Тема практики"
            name="topic"
            autoComplete="topic"
            autoFocus
            onChange={(event) => {
              setTopic(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={10}>
          <InputLabel>Семестр</InputLabel>
          <Select
            value={semester}
            onChange={(event) => setSemester(event.target.value)}
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
        </Grid>

        <Grid item xs={10}>
          <FormControl className={classes.formControl}>
            <InputLabel>Место практики</InputLabel>
            <Select
              value={place}
              defaultValue=""
              onChange={(event) => setPlace(event.target.value)}
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
        <Grid item xs={10}>
          <FormControl className={classes.formControl}>
            <InputLabel>Преподаватель</InputLabel>
            <Select
              value={teacher}
              defaultValue=""
              onChange={(event) => setTeacher(event.target.value)}
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
        <Input
          type="file"
          multiple
          className={classes.input}
          onChange={(event) => {
            let formData = new FormData();
            formData.append("file", event.target.files[0]);
            setFile(formData);
          }}
        ></Input>
        <Button
          color="inherit"
          variant="outlined"
          onClick={() => addPractice()}
        >
          Загрузить
        </Button>
      </Grid>
    </Paper>
  );
}
