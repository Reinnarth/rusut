import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import SignIn from "../../components/Authentication/SignIn";
import { signIn } from "../../store/auth/authActions";

const mapStateToProps = state => ({
  token: null
  //   error: ViewModule.isError(state)
});

const mapDispatchToProps = dispatch => ({
  signIn: (data) => dispatch(signIn(data))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SignIn)
);
