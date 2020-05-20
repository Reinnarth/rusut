import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Input,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Container,
  InputLabel,
  Select,
  FormControl,
  InputBase,
  Typography,
  Paper,
  Link,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import lodash from "lodash";
import * as yup from "yup";

import { SelectInput } from "../../Shared/SelectInput/SelectInput";
import { makeStyles } from "@material-ui/core/styles";

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
    marginBottom: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  formControl: {
    margin: 0,
    fullWidth: true,
    minWidth: "8rem",
  },

  form: {
    width: "100%", // Fix IE 11 issue.

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
  let history = useHistory();
  const classes = useStyles();
  const classifiers = useSelector(
    (state) => state.adminReducer.classifiers || state.userReducer.classifiers
  );
  const [authors, setAuthors] = useState([]);
  const [specialty, setSpecialty] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState(new FormData());

  const onSubmit = () => {
    file.append("name", name);
    file.append("authors", authors);

    props.uploadFile(file, specialty, history.location.pathname);
    props.setOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}><LockOutlinedIcon /></Avatar> */}
        <Typography component="h1" variant="h5">
          Загрузить файл
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
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
                    const newAuthors = authors.filter(
                      (el, ind) => ind !== index
                    );
                    setAuthors(newAuthors);
                  }}
                >
                  Удалить
                </Button>
              </div>
            ))}

            {errors.password && <p>{errors.password.message}</p>}
            <Grid item xs={10}>
              <FormControl className={classes.formControl}>
                <InputLabel>Специальность</InputLabel>
                <Select
                  value={specialty}
                  defaultValue=""
                  onChange={(event) => setSpecialty(event.target.value)}
               
                  multiline={true}
                  input={<SelectInput />}
                  inputProps={{
                    name: "specialty",
                  }}
                >
                  {classifiers.specialty.map((spec, index) => {
                    return (
                      <option key={index} value={spec.nameSpecialty}>
                        {spec.nameSpecialty}
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
            <Button type="submit" color="inherit" variant="outlined">
              Загрузить
            </Button>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
