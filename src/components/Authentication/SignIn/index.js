import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Container,
  FormControl,
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
  login: yup.string().required("Обязательно для заполнения"),
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

export default function SignIn(props) {
  const { register, handleSubmit, errors } = useForm({
    validationSchema: signInSchema,
  });
  const classes = useStyles();

  const onSubmit = (data) => {
    props.signIn(data);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}><LockOutlinedIcon /></Avatar> */}
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            // required
            fullWidth
            id="login"
            label="Логин"
            name="login"
            autoComplete="login"
            autoFocus
            // onChange={(event) => {
            //   setlogin(event.target.value);
            // }}
          />
          {errors.login && <p>{errors.login.message}</p>}

          <TextField
            inputRef={register}
            variant="outlined"
            margin="normal"
            // required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
            // onChange={(event) => {
            //   setPassword(event.target.value);
            // }}
          />
          {errors.password && <p>{errors.password.message}</p>}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link
                variant="body2"
                onClick={() => {
                  props.history.push("/signup");
                }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
