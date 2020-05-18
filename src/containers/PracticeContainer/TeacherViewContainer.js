import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import TeacherView from "../../components/pages/PracticeAux/TeacherView";
import {
  addFile,
  downloadFile,
  setMark,
  getStudentUploads,
} from "../../store/internship/internshipActions";

const mapStateToProps = (state) => ({
  uploads: state.internshipReducer.uploads,
  user: state.userReducer.user,
  error: state.viewReducer.error,
  loading: state.viewReducer.loading,
  sessionLoading: state.internshipReducer.sessionLoading
});

const mapDispatchToProps = (dispatch) => ({
  getStudentUploads: (path, id) => dispatch(getStudentUploads(path, id)),
  addFile: (path, file, id) => dispatch(addFile(path, file, id)),
  downloadFile: (path, id) => dispatch(downloadFile(path, id)),
  setMark: (path, data, id) => dispatch(setMark(path, data, id)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TeacherView)
);
