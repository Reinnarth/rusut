import { connect } from "react-redux";

import { withRouter } from "react-router-dom";
import App from "../../components/App";

import { getCurrentUser } from "../../store/user/userActions";

const mapStateToProps = (state) => ({
  token: null,
  user: state.userReducer.user,
  //   error: ViewModule.isError(state)
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentUser: (login) => dispatch(getCurrentUser(login)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(App)
);
