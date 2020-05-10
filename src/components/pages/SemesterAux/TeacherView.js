import React, { Component } from "react";

export default class TeacherView extends Component {
  state = {
    type: "",
    hours: "",
    group: "",
    subject: "",
    semester: "",
    students: [],
  };

  render() {
    const { type, hours, group, subject, semester, students } = this.state;
    const { user } = this.props;
    return <div></div>;
  }
}
