import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import AdminPanel from "../../components/AdminPanel/AdminPanel";
import { getUsers, getUserAmount } from "../../store/admin/adminActions";

const mapStateToProps = (state) => ({
  amount: state.adminReducer.amount,
  users: state.adminReducer.users,
  location: state.adminReducer.location
  //   error: ViewModule.isError(state)
});

const mapDispatchToProps = (dispatch) => ({
  getUserAmount: () => dispatch(getUserAmount()),
  getUsers: (params) => dispatch(getUsers(params)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminPanel)
);
