import { connect } from "react-redux";

import SingleSwitch from "../../components/AdminPanel/SingleContent/SingleSwitch";
import {
  getClassifiers,
  getUser,
  updateUser,
  getContentArray,
} from "../../store/admin/adminActions";

const mapStateToProps = (state) => ({
  user: state.adminReducer.user,
  users: state.adminReducer.users,
  tab: state.adminReducer.tab,
  location: state.adminReducer.location,
  classifiers: state.adminReducer.classifiers,
  loading: state.viewReducer.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getUser: (id) => dispatch(getUser(id)),
  getContentArray: (path, params) => dispatch(getContentArray(path, params)),
  getClassifiers: () => dispatch(getClassifiers()),
  updateUser: (data) => dispatch(updateUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleSwitch);
