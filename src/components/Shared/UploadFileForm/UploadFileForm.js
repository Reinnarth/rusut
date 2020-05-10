import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Input,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Container,
  FormControl,
  FormControlLabel,
  Typography,
  Paper,
  Link,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import lodash from "lodash";
import * as yup from "yup";

import { makeStyles } from "@material-ui/core/styles";
import { uploadFile, getContentArray } from "../../../store/admin/adminActions";

const uploadSchema = yup.object().shape({
  name: yup.string().required("Обязательно для заполнения"),
  author: yup.string().required("Обязательно для заполнения"),
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(12),
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

export default function UpdateFileForm(props) {
  const { register, handleSubmit, errors } = useForm({
    validationSchema: uploadSchema,
  });
  const dispatch = useDispatch();
  let history = useHistory();
  const classes = useStyles();
  const [authors, setAuthors] = useState([]);
  const [name, setName] = useState("");
  const [file, setFile] = useState(new FormData());

  const onSubmit = async () => {
    file.append("name", name);
    file.append("authors", authors);
    await dispatch(uploadFile(file));
    await dispatch(getContentArray(history.location.pathname, { offset: 0 }));
    props.setOpen(false)
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper className={classes.paper}>
        {/* <Avatar className={classes.avatar}><LockOutlinedIcon /></Avatar> */}
        <Typography component="h1" variant="h5">
          Загрузить файл
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            // required
            fullWidth
            id="login"
            label="Название"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          {errors.login && <p>{errors.login.message}</p>}

          <Button
            color="inherit"
            variant="outlined"
            onClick={() => setAuthors(lodash.concat(authors, ""))}
          >
            Добавить автора
          </Button>
          {authors.map((author, index) => (
            <div key={index}>
              <TextField
                inputRef={register}
                value={author}
                variant="outlined"
                margin="normal"
                // required
                fullWidth
                name="author"
                label="Полное имя автора"
                type="text"
                id="author"
                autoComplete="current-password"
                onChange={(event) =>
                  setAuthors(
                    authors.map((el, ind) => {
                      if (ind === index) {
                        return event.target.value;
                      }
                      return el;
                    })
                  )
                }
              />
              {errors.password && <p>{errors.password.message}</p>}
              <Button
                color="secondary"
                variant="outlined"
                onClick={() => {
                  const newAuthors = authors.filter((el, ind) => ind !== index);
                  setAuthors(newAuthors);
                }}
              >
                Удалить
              </Button>
            </div>
          ))}

          {errors.password && <p>{errors.password.message}</p>}
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
          <Button type="submit" color="inherit" variant="outlined">
            Загрузить
          </Button>
        </form>
      </Paper>
    </Container>
  );
}