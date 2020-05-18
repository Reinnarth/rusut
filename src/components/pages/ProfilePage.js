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
      editInfo: false,
      editPassword: false,
      oldPassword: "",
      newPassword: "",
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

  handlePwChange = () => {
    const { user, updatePassword } = this.props;
    const { oldPassword, newPassword } = this.state;
    const data = { oldPassword, newPassword };
    updatePassword(data, user.userId);
    this.setState({ editPassword: false });
  };

  handleSubmit = () => {
    const { user } = this.props;
    const { name, surname, middlename, email } = this.state;
    const data = { ...user, name, surname, middlename, email };
    this.props.updateSelf(data);
  };

  render() {
    const {
      name,
      surname,
      middlename,
      email,
      editPassword,
      editInfo,
      oldPassword,
      newPassword,
    } = this.state;
    const { user, classes, updatePassword } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper square className={classes.paper}>
          {/* <Avatar className={classes.avatar}><LockOutlinedIcon /></Avatar> */}
          <Typography component="h1" variant="h5">
            Профиль
          </Typography>
          {editPassword && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  value={oldPassword}
                  fullWidth
                  onChange={this.handleChange}
                  type="password"
                  id="oldpw"
                  label="Старый пароль"
                  name="oldPassword"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  value={newPassword}
                  fullWidth
                  onChange={this.handleChange}
                  type="password"
                  id="newpw"
                  label="Новый пароль"
                  name="newPassword"
                />
              </Grid>
              <Grid className={classes.nameContainer} container spacing={2}>
                <Grid xs={6}>
                  {" "}
                  <Button
                    onClick={() => this.setState({ editPassword: false })}
                    fullWidth
                    variant="contained"
                    color="inherit"
                    className={classes.submit}
                  >
                    Отмена
                  </Button>
                </Grid>
                <Grid xs={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={this.handlePwChange}
                  >
                    Подтвердить изменения
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          )}
          {editInfo && (
            <form
              className={classes.form}
              onSubmit={this.handleSubmit}
              noValidate
            >
              <Grid container spacing={2}>
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
              <Grid className={classes.nameContainer} container spacing={2}>
                <Grid xs={6}>
                  <Button
                    onClick={() => this.setState({ editInfo: false })}
                    fullWidth
                    variant="contained"
                    color="inherit"
                    className={classes.submit}
                  >
                    Отмена
                  </Button>
                </Grid>
                <Grid xs={6}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Подтвердить изменения
                  </Button>
                </Grid>
              </Grid>
              >
            </form>
          )}
          {!editInfo && !editPassword && (
            <>
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
                  <Typography>{email}</Typography>
                </Grid>
              </Grid>
              <Grid className={classes.nameContainer} container spacing={2}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={() => this.setState({ editInfo: true })}
                >
                  Изменить данные
                </Button>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={() => this.setState({ editPassword: true })}
                >
                  Изменить пароль
                </Button>
              </Grid>
            </>
          )}
        </Paper>
      </Container>
    );
  }
}

export default withStyles(styles)(ProfilePage);
