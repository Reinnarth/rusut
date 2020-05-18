import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import ProfilePage from "../../components/pages/ProfilePage";
import { updateSelf, updatePassword } from "../../store/user/userActions";

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
  //   error: ViewModule.isError(state)
});

const mapDispatchToProps = (dispatch) => ({
  updateSelf: (data) => dispatch(updateSelf(data)),
  updatePassword: (data, id) => dispatch(updatePassword(data,id))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
);
