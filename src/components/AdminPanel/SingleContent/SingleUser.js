import React, { Component } from "react";

import * as yup from "yup";
import {
  Button,
  Grid,
  Input,
  FormControl,
  InputLabel,
  MenuItem,
  NativeSelect,
} from "@material-ui/core";

export default class SingleUser extends Component {
  constructor(props) {
    super();

    this.state = {
      user: props.user ? props.user : {},
      classifiers: props.classifiers ? props.classifiers : [],
      editFlag: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.classifiers !== prevProps.classifiers) {
      this.setState({ classifiers: this.props.classifiers });
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.user.userId !== state.user.userId) {
      return {
        user: props.user,
        classifiers: props.classifiers,
      };
    }
    return null;
  }

  componentWillUnmount() {
    this.setState = {
      editFlag: false,
      user: {},
    };
  }

  handleChange = (event) => {
    const { classifiers } = this.state;
    switch (event.target.name) {
      case "nameRole":
        this.setState({
          user: {
            ...this.state.user,
            [event.target.name]: event.target.value,
            nameSpecialty: classifiers.specialty[0].nameSpecialty,
          },
        });
        break;
      default:
        this.setState({
          user: {
            ...this.state.user,
            [event.target.name]: event.target.value,
          },
        });
        break;
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { user } = this.state;
    const { tab, updateUser, getContentArray } = this.props;

    await updateUser(user);
    await getContentArray(`admin/${tab}`, { offset: 0 });
  };

  render() {
    const { user, editFlag, classifiers } = this.state;

    if (editFlag) {
      return (
        <form onSubmit={this.handleSubmit}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={1}
          >
            <Grid item xs={10}>
              <FormControl>
                <InputLabel>Фамилия</InputLabel>
                <Input
                  value={user.surname}
                  onChange={this.handleChange}
                  name="surname"
                />
              </FormControl>
            </Grid>
            <Grid item xs={10}>
              <FormControl>
                <InputLabel>Имя</InputLabel>
                <Input
                  value={user.name}
                  name="name"
                  onChange={this.handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={10}>
              <FormControl>
                <InputLabel>Отчество</InputLabel>
                <Input
                  value={user.middlename}
                  name="middlename"
                  onChange={this.handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={10}>
              <FormControl>
                <InputLabel>Логин</InputLabel>
                <Input
                  value={user.login}
                  name="login"
                  onChange={this.handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={10}>
              <FormControl>
                <InputLabel>Email</InputLabel>
                <Input
                  value={user.email}
                  name="email"
                  onChange={this.handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={10}>
              <FormControl>
                <InputLabel>Роль</InputLabel>
                <NativeSelect
                  value={user.nameRole}
                  onChange={this.handleChange}
                  inputProps={{
                    name: "nameRole",
                  }}
                >
                  {classifiers.role.map((el, index) => (
                    <option key={index} value={el}>
                      {el}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
            </Grid>
            {user.nameRole === "ROLE_USER" && <></>}
            {user.nameRole === "ROLE_STUDENT" && (
              <>
                <Grid item xs={10}>
                  <FormControl>
                    <InputLabel>Специальность</InputLabel>
                    <NativeSelect
                      value={
                        user.nameSpecialty
                          ? user.nameSpecialty
                          : classifiers.specialty[0]
                      }
                      onChange={this.handleChange}
                      inputProps={{
                        name: "nameSpecialty",
                        id: "age-native-helper",
                      }}
                    >
                      {classifiers.specialty.map((el, index) => {
                        return (
                          <option key={index} value={el.nameSpecialty}>
                            {el.nameSpecialty}
                          </option>
                        );
                      })}
                    </NativeSelect>
                  </FormControl>
                </Grid>
                <Grid item xs={10}>
                  <FormControl>
                    <InputLabel>Группа</InputLabel>
                    <Input
                      value={user.numberGroup}
                      name="numberGroup"
                      onChange={this.handleChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={10}>
                  <FormControl>
                    <InputLabel>Номер зачетной книжки</InputLabel>
                    <Input
                      value={user.numberBook}
                      name="numberBook"
                      onChange={this.handleChange}
                    />
                  </FormControl>
                </Grid>
              </>
            )}
            {user.nameRole === "ROLE_TEACHER" && <>teacher</>}
            {user.nameRole === "ROLE_ADMIN" && <>admin</>}
            {/* <p>{user.studyGroup.numberGroup}</p> */}
            {/* <p>{user.specialty.nameSpecialty}</p> */}

            <Grid container direction="row">
              <Grid item>
                <Button onClick={() => this.setState({ editFlag: false })}>
                  Отмена
                </Button>
              </Grid>
              <Grid item>
                <Button type="submit" color="primary">
                  Подтвердить
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      );
    } else {
      return (
        <Grid>
          <p>{user.surname}</p>
          <p>{user.name}</p>
          <p>{user.middlename}</p>
          <p>Логин: {user.login}</p>
          <p>Роль: {user.nameRole}</p>
          <p>Email:{user.email}</p>
          {user.nameRole === "ROLE_USER" && <></>}
          {user.nameRole === "ROLE_STUDENT" && (
            <>
              <p>Специальность: {user.nameSpecialty}</p>
              <p>Группа {user.numberGroup}</p>
              <p>Номер зачетной книжки: {user.numberBook}</p>
            </>
          )}
          {user.nameRole === "ROLE_TEACHER" && <>teacher</>}
          {user.nameRole === "ROLE_ADMIN" && <>admin</>}
          {/* <p>{user.studyGroup.numberGroup}</p> */}
          {/* <p>{user.specialty.nameSpecialty}</p> */}
          <Button
            type="button"
            variant="outlined"
            color="primary"
            onClick={() => this.setState({ editFlag: true })}
          >
            change
          </Button>
        </Grid>
      );
    }
  }
}
