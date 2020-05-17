import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import StudentView from "../../components/pages/PracticeAux/StudentView";
import {
  getMyUploads,
  addFile,
  downloadFile,
  uploadFile,
  addPlace,
} from "../../store/internship/internshipActions";

const mapStateToProps = (state) => ({
  exams: state.internshipReducer.exams,
  uploads: state.internshipReducer.uploads,
  user: state.userReducer.user,
  error: state.viewReducer.error,
  loading: state.viewReducer.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getMyUploads: (path, id) => dispatch(getMyUploads(path, id)),
  addFile: (path, file, id) => dispatch(addFile(path, file, id)),
  downloadFile: (path, id) => dispatch(downloadFile(path, id)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(StudentView)
);
