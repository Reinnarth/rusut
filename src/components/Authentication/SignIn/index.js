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

import Copyright from "../Copyright"

const signInSchema = yup.object().shape({
  username: yup.string().required("Обязательно для заполнения"),
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

// setLogin = async ({ username, password }) => {
//   const { signIn } = this.props;
//   await signIn(username, password);
// };

export default function SignIn(props) {
  const { register, handleSubmit, errors } = useForm({
    validationSchema: signInSchema,
  });
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const onSubmit = (data) => {
    props.signIn(data)
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
            id="username"
            label="Логин"
            name="username"
            autoComplete="username"
            autoFocus
            // onChange={(event) => {
            //   setUsername(event.target.value);
            // }}
          />
          {errors.username && <p>{errors.username.message}</p>}

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

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
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
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
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
