import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import SignUp from "../../components/Authentication/SignUp";
import { signUp } from "../../store/auth/authActions";

const mapStateToProps = (state) => ({
  token: state.authReducer.token,
  //   error: ViewModule.isError(state)
});

const mapDispatchToProps = (dispatch) => ({
  signUp: (data) => dispatch(signUp(data)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));
