import React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Container,
  FormControlLabel,
  Typography,
  Checkbox,
  Link,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { makeStyles } from "@material-ui/core/styles";

import Copyright from "../../Shared/Copyright/Copyright";

const signInSchema = yup.object().shape({
  email: yup
    .string()
    .email("неверный email")
    .required("Обязательно для заполнения"),
  login: yup.string().required("Обязательно для заполнения"),
  name: yup.string().required("Обязательно для заполнения"),
  surname: yup.string().required("Обязательно для заполнения"),
  middlename: yup.string(),
  password: yup.string().required("Обязательно для заполнения"),
});

const useStyles = makeStyles((theme) => ({
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {
  const { register, handleSubmit, errors } = useForm({
    validationSchema: signInSchema,
  });
  const classes = useStyles();

  const onSubmit = (data) => {
    props.signUp(data);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper} onSubmit={handleSubmit(onSubmit)}>
        {/* <Avatar className={classes.avatar}></Avatar> */}
        <Typography component="h1" variant="h5">
         Регистрация
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                inputRef={register}
                fullWidth
                id="login"
                label="Логин"
                name="login"
                autoComplete="login"
                autoFocus
              />
              {errors.login && <p>{errors.login.message}</p>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                inputRef={register}
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
              />
              {errors.email && <p>{errors.email.message}</p>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                inputRef={register}
                fullWidth
                id="surname"
                label="Фамилия"
                name="surname"
                autoComplete="lname"
              />
              {errors.surname && <p>{errors.surname.message}</p>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                inputRef={register}
                fullWidth
                id="name"
                label="Имя"
                autoFocus
              />
              {errors.name && <p>{errors.name.message}</p>}
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                inputRef={register}
                fullWidth
                id="middlename"
                label="Отчество"
                name="middlename"
                autoComplete="middlename"
              />
              {errors.middlename && <p>{errors.middlename.message}</p>}
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                inputRef={register}
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {errors.password && <p>{errors.password.message}</p>}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
           Зарегистрироваться
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link
                onClick={() => {
                  props.history.push("/signin");
                }}
                variant="body2"
              >
                Уже есть аккаунт? Войти
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
