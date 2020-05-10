import React, { Component } from "react";

import * as yup from "yup";
import { Button, Grid } from "@material-ui/core";

import User from "./UserCards/User";
import Student from "./UserCards/Student";
import Teacher from "./UserCards/Teacher";

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
        if (event.target.value === "ROLE_STUDENT") {
          this.setState({
            user: {
              ...this.state.user,
              [event.target.name]: event.target.value,
              nameSpecialty: classifiers.specialty[0].nameSpecialty,
            },
          });
        } else if (event.target.value === "ROLE_TEACHER") {
          this.setState({
            user: {
              ...this.state.user,
              [event.target.name]: event.target.value,
              namePositions: [],
              nameScienceDegrees: [],
            },
          });
        }

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
    const {
      updateUser,
      getContentArray,
      getOneContent,
      tab,
      location,
    } = this.props;

    await updateUser(user);
    // await getOneContent(user.userId, location.path);
    await getContentArray(`/admin/${tab}`, { offset: 0 });
  };

  render() {
    const { user, editFlag, classifiers } = this.state;
    const { deleteOneContent, location } = this.props;

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
            <User
              user={user}
              classifiers={classifiers}
              editFlag={editFlag}
              handleChange={this.handleChange}
            />

            {user.nameRole === "ROLE_STUDENT" && (
              <Student
                user={user}
                classifiers={classifiers}
                editFlag={editFlag}
                handleChange={this.handleChange}
              />
            )}
            {user.nameRole === "ROLE_TEACHER" && (
              <Teacher
                user={user}
                classifiers={classifiers}
                editFlag={editFlag}
                handleChange={this.handleChange}
                addSTG={this.addSTG}
                updateSTG={(subject, groups, index) =>
                  this.updateSTG(subject, groups, index)
                }
                deleteSTG={(index) => this.deleteSTG(index)}
              />
            )}
            {user.nameRole === "ROLE_ADMIN" && <>admin</>}
            {/* <Typography>{user.studyGroup.numberGroup}</Typography> */}
            {/* <Typography>{user.specialty.nameSpecialty}</Typography> */}

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
          <User
            user={user}
            classifiers={classifiers}
            editFlag={editFlag}
            handleChange={this.handleChange}
          />

          {user.nameRole === "ROLE_STUDENT" && (
            <Student
              user={user}
              classifiers={classifiers}
              editFlag={editFlag}
              handleChange={this.handleChange}
            />
          )}
          {user.nameRole === "ROLE_TEACHER" && (
            <Teacher
              user={user}
              classifiers={classifiers}
              editFlag={editFlag}
              handleChange={this.handleChange}
            />
          )}
          {user.nameRole === "ROLE_ADMIN" && <>admin</>}
          {/* <Typography>{user.studyGroup.numberGroup}</Typography> */}
          {/* <Typography>{user.specialty.nameSpecialty}</Typography> */}
          <Button
            type="button"
            variant="outlined"
            color="primary"
            onClick={() => this.setState({ editFlag: true })}
          >
            Изменить
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            onClick={() => deleteOneContent(user.userId, `${location.path}`)}
          >
            Удалить
          </Button>
        </Grid>
      );
    }
  }
}
