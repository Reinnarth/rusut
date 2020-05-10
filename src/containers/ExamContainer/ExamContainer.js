import { connect } from "react-redux";

import { withRouter } from "react-router-dom";
import SemesterPage from "../../components/pages/SemesterPage";

import {
  getStudents,
  getExams,
  addExam,
  updateExam,
} from "../../store/exam/examActions";

const mapStateToProps = (state) => ({
  token: null,
  user: state.userReducer.user,
  //   error: ViewModule.isError(state)
});

const mapDispatchToProps = (dispatch) => ({
  getStudents: (group) => dispatch(getStudents(group)),
  getExams: (id) => dispatch(getExams(id)),
  addExam: (data, id) => dispatch(addExam(data, id)),
  updateExam: (data, id) => dispatch(updateExam(data, id)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SemesterPage)
);
