import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import ProfilePage from "../../components/pages/ProfilePage";
import { updateSelf } from "../../store/user/userActions";

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
  //   error: ViewModule.isError(state)
});

const mapDispatchToProps = (dispatch) => ({
  updateSelf: (data) => dispatch(updateSelf(data)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
);
