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
      newUser: props.user ? props.user : {},
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
    if (props.user.userId !== state.newUser.userId) {
      return {
        newUser: props.user,
        classifiers: props.classifiers,
      };
    }
    return null;
  }

  componentWillUnmount() {
    this.setState = {
      editFlag: false,
      newUser: {},
    };
  }

  handleChange = (event) => {
    const { classifiers, newUser } = this.state;
    switch (event.target.name) {
      case "nameRole":
        if (event.target.value === "ROLE_STUDENT") {
          this.setState({
            newUser: {
              ...newUser,
              [event.target.name]: event.target.value,
              nameSpecialty: classifiers.specialty[0].nameSpecialty,
            },
          });
        } else if (event.target.value === "ROLE_TEACHER") {
          this.setState({
            newUser: {
              ...newUser,
              [event.target.name]: event.target.value,
              namePositions: [],
              nameScienceDegrees: [],
            },
          });
        } else {
          const aux = newUser;
          delete aux.namePositions;
          delete aux.nameScienceDegrees;
          delete aux.nameSpecialty;
          delete aux.numberGroup;
          delete aux.numberBook;
          delete aux.entryDate;
          this.setState({
            newUser: { ...aux, [event.target.name]: event.target.value },
          });
        }

        break;
      default:
        this.setState({
          newUser: {
            ...newUser,
            [event.target.name]: event.target.value,
          },
        });
        break;
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { newUser } = this.state;
    const { updateContent, tab, handleClose } = this.props;

    await updateContent(`/admin/${tab}`, newUser);
    handleClose();
  };

  render() {
    const { newUser, editFlag, classifiers } = this.state;
    const { deleteOneContent, location, user } = this.props;
    console.log(newUser);
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
              newUser={newUser}
              classifiers={classifiers}
              editFlag={editFlag}
              handleChange={this.handleChange}
            />

            {newUser.nameRole === "ROLE_STUDENT" && (
              <Student
                user={user}
                newUser={newUser}
                classifiers={classifiers}
                editFlag={editFlag}
                handleChange={this.handleChange}
              />
            )}
            {newUser.nameRole === "ROLE_TEACHER" && (
              <Teacher
                newUser={newUser}
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
            {newUser.nameRole === "ROLE_ADMIN" && <>admin</>}

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
            newUser={newUser}
            classifiers={classifiers}
            editFlag={editFlag}
            handleChange={this.handleChange}
          />

          {newUser.nameRole === "ROLE_STUDENT" && (
            <Student
              newUser={newUser}
              classifiers={classifiers}
              editFlag={editFlag}
              handleChange={this.handleChange}
            />
          )}
          {newUser.nameRole === "ROLE_TEACHER" && (
            <Teacher
              newUser={newUser}
              classifiers={classifiers}
              editFlag={editFlag}
              handleChange={this.handleChange}
            />
          )}
          {newUser.nameRole === "ROLE_ADMIN" && <>admin</>}

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
            onClick={() => deleteOneContent(newUser.userId, `${location.path}`)}
          >
            Удалить
          </Button>
        </Grid>
      );
    }
  }
}
