import React, { Component } from "react";

import NativeSelect from "@material-ui/core/NativeSelect";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  nameContainer: {
    marginTop: theme.spacing(1),
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
});

class ProfilePage extends Component {
  constructor(props) {
    super();
    const { user } = props;
    this.state = {
      login: user.login,
      name: user.name,
      surname: user.surname,
      middlename: user.middlename,
      email: user.email,
      password: "",
      userId: user.userId,
      edit: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { user } = props;
    if (user.userId !== state.userId) {
      return {
        login: user.login,
        name: user.name,
        surname: user.surname,
        middlename: user.middlename,
        email: user.email,
        userId: user.userId,
        classifiers: props.classifiers,
      };
    }
    return null;
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = () => {};

  render() {
    const {
      login,
      name,
      surname,
      middlename,
      email,
      password,
      edit,
    } = this.state;
    const { user, classes } = this.props;
    console.log(this.state);
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper square className={classes.paper}>
          {/* <Avatar className={classes.avatar}><LockOutlinedIcon /></Avatar> */}
          <Typography component="h1" variant="h5">
            Профиль
          </Typography>
          {edit && (
            <form
              className={classes.form}
              onSubmit={this.handleSubmit}
              noValidate
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    value={login}
                    fullWidth
                    id="login"
                    label="Логин"
                    name="login"
                    onChange={this.handleChange}
                    autoComplete="login"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    value={email}
                    fullWidth
                    onChange={this.handleChange}
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    value={surname}
                    fullWidth
                    onChange={this.handleChange}
                    id="surname"
                    label="Фамилия"
                    name="surname"
                    autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="fname"
                    name="name"
                    variant="outlined"
                    onChange={this.handleChange}
                    value={name}
                    fullWidth
                    id="name"
                    label="Имя"
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    value={middlename}
                    fullWidth
                    onChange={this.handleChange}
                    id="middlename"
                    label="Отчество"
                    name="middlename"
                    autoComplete="middlename"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Подтвердить изменения
              </Button>
            </form>
          )}
          {!edit && (
            <Grid className={classes.nameContainer} container spacing={2}>
              <Grid item xs={3}>
                <Typography component="span">{surname}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography component="span">{name}</Typography>
              </Grid>

              <Grid item xs={3}>
                <Typography component="span">{middlename}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>{login}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>{email}</Typography>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => this.setState({ edit: true })}
              >
                Изменить данные
              </Button>
            </Grid>
          )}
        </Paper>
      </Container>
    );
  }
}

export default withStyles(styles)(ProfilePage);
