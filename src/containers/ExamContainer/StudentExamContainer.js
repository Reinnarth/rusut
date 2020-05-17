import { connect } from "react-redux";

import StudentView from "../../components/pages/SemesterAux/StudentView";

import { getMyExams } from "../../store/exam/examActions";

const mapStateToProps = (state) => ({
  loading: state.viewReducer.loading,
  sessionLoading: state.examReducer.sessionLoading,
  user: state.userReducer.user,
  exams: state.examReducer.exams,
});

const mapDispatchToProps = (dispatch) => ({
  getMyExams: (semester, id, callback) =>
    dispatch(getMyExams(semester, id, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentView);
