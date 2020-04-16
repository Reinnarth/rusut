import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import MenuAppBar from "../../components/Menu/AppMenu";


const mapStateToProps = state => ({
  token: null
  //   error: ViewModule.isError(state)
});

const mapDispatchToProps = dispatch => ({
   
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MenuAppBar)
);
