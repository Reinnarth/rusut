import { connect } from "react-redux";

import { withRouter } from "react-router-dom";
import TeacherView from "../../components/pages/SemesterAux/TeacherView";

import {
  getStudents,
  getExams,
  getExam,
  addExam,
  updateExam,
} from "../../store/exam/examActions";

const mapStateToProps = (state) => ({
  loading: state.examReducer.sessionLoading,
  user: state.userReducer.user,
  students: state.examReducer.students,
  exams: state.examReducer.exams,
  exam: state.examReducer.exam,
});

const mapDispatchToProps = (dispatch) => ({
  getExam: (params, id, callback) => dispatch(getExam(params, id, callback)),
  getStudents: (params, callback) => dispatch(getStudents(params, callback)),
  getExams: (id) => dispatch(getExams(id)),
  addExam: (data, id) => dispatch(addExam(data, id)),
  updateExam: (data, id) => dispatch(updateExam(data, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherView);
