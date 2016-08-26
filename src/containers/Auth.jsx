import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as loginActions from '../actions/login';

import AuthButton from '../components/AuthButton';

class Auth extends Component {

//  componentDidMount() {
//    this.props.actions.checkLoginUser(this.props.user);
//  }

  render() {
    const { actions, user } = this.props;
    const text = (user && user.uid) ? `Logout ${user.uid}` : 'Login';
    const action = (user && user.uid) ? actions.logout : actions.login;
    return <AuthButton text={text} action={action} />
  }
}

Auth.propTypes = {
  user: PropTypes.object,
};

Auth.defaultProps = {
  user: {},
};

function mapStateToProps(state, ownProps) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
