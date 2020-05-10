import React, { Component } from "react";

import { Button, Grid, Typography } from "@material-ui/core";

export default class SingleBook extends Component {
  constructor(props) {
    super();

    this.state = {
      book: props.book ? props.book : {},
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.classifiers !== prevProps.classifiers) {
      this.setState({ classifiers: this.props.classifiers });
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.book.libraryId !== state.user.libraryId) {
      return {
        book: props.book,
        classifiers: props.classifiers,
      };
    }
    return null;
  }

  componentWillUnmount() {
    this.setState = {
      editFlag: false,
      book: {},
    };
  }

  render() {
    const { book } = this.state;

    return (
      <Grid>
        <Typography>Название: {book.name}</Typography>
        <Typography>
          Авторы:{" "}
          {book.authors.map((author, index) => (
            <Typography key={index}> {author}</Typography>
          ))}
        </Typography>
        <Button
          type="button"
          variant="outlined"
          color="primary"
          onClick={() => this.props.downloadFile(book.libraryId)}
        >
          Загрузить
        </Button>
   
      </Grid>
    );
  }
}
