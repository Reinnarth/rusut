import React, { Component } from "react";

import * as yup from "yup";
import {
  Grid,
  FormControl,
  InputLabel,
  Typography,
  Input,
  Button,
} from "@material-ui/core";

export default class SinglePracticePlace extends Component {
  constructor(props) {
    super();

    this.state = {
      newPlace: props.place ? props.place : {},
      classifiers: props.classifiers ? props.classifiers : [],
      editFlag: props.editFlag ? props.editFlag : false,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.classifiers !== prevProps.classifiers) {
      this.setState({ classifiers: this.props.classifiers });
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.place) {
      if (props.place.placePracticeId !== state.newPlace.placePracticeId) {
        return {
          newPlace: props.place,
          classifiers: props.classifiers,
        };
      }
    }

    return null;
  }

  componentWillUnmount() {
    this.setState = {
      editFlag: false,
      newPlace: {},
    };
  }

  handleChange = (event) => {
    this.setState({
      newPlace: {
        ...this.state.newPlace,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { newPlace } = this.state;
    const { updateContent, tab, handleClose } = this.props;

    await updateContent(`/admin/${tab}`, newPlace);
    handleClose();
  };

  render() {
    const { newPlace, editFlag, classifiers } = this.state;
    const { deleteOneContent, location, place } = this.props;

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
                <InputLabel>Компания</InputLabel>
                <Input
                  value={newPlace.companyName}
                  onChange={this.handleChange}
                  name="companyName"
                />
              </FormControl>
            </Grid>
            <Grid item xs={10}>
              <FormControl>
                <InputLabel>Адрес</InputLabel>
                <Input
                  value={newPlace.address}
                  name="address"
                  onChange={this.handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={10}>
              <FormControl>
                <InputLabel>Телефон</InputLabel>
                <Input
                  value={newPlace.phone}
                  name="phone"
                  onChange={this.handleChange}
                />
              </FormControl>
            </Grid>
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
          <Typography>Компания: {newPlace.companyName}</Typography>
          <Typography>Адрес: {newPlace.address}</Typography>
          <Typography>Телефон: {newPlace.phone}</Typography>
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
            onClick={() => {
              if (window.confirm("Вы уверены?")) {
                deleteOneContent(newPlace.placePracticeId, `${location.path}`);
              }
            }}
          >
            Удалить
          </Button>
        </Grid>
      );
    }
  }
}
