import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import AdminPanel from "../../components/AdminPanel/AdminPanel";
import {
  getContentArray,
  getClassifiers,
  downloadFile,
  uploadFile,
  addPlace,
} from "../../store/admin/adminActions";

const mapStateToProps = (state) => ({
  amount: state.adminReducer.amount,
  content: state.adminReducer.content,
  location: state.adminReducer.location,
  classifiers: state.adminReducer.classifiers,
  error: state.viewReducer.error,
  loading: state.viewReducer.loading,
  //   error: ViewModule.isError(state)
});

const mapDispatchToProps = (dispatch) => ({
  getClassifiers: () => dispatch(getClassifiers()),
  getContentArray: (path, params) => dispatch(getContentArray(path, params)),
  uploadFile: (file, path, endp) => dispatch(uploadFile(file, path, endp)),
  downloadFile: (id) => dispatch(downloadFile(id)),
  addPlace: (path, data) => dispatch(addPlace(path, data)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminPanel)
);
