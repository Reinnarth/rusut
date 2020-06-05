import { connect } from "react-redux";

import SingleSwitch from "../../components/AdminPanel/SingleContent/SingleSwitch";
import {
  getClassifiers,
  getOneContent,
  updateContent,
  getContentArray,
  deleteOneContent,
  downloadFile,
} from "../../store/admin/adminActions";

const mapStateToProps = (state) => ({
  oneContent: state.adminReducer.oneContent,
  users: state.adminReducer.users,
  tab: state.adminReducer.tab,
  location: state.adminReducer.location,
  classifiers: state.adminReducer.classifiers,
  loading: state.viewReducer.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getOneContent: (id, path) => dispatch(getOneContent(id, path)),
  getContentArray: (path, params) => dispatch(getContentArray(path, params)),
  getClassifiers: () => dispatch(getClassifiers()),
  updateContent: (path, data) => dispatch(updateContent(path, data)),
  deleteOneContent: (id, path, callbackPath) => dispatch(deleteOneContent(id, path, callbackPath)),
  downloadFile: (id) => dispatch(downloadFile(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleSwitch);
