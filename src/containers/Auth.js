import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { checkLoginUser, setLoginUser, loginToGithub, logoutFromGithub, upsertUser } from '../actions/login';

import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';

class Auth extends Component {

  constructor() {
    super();
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    if (!this.props.initialised) {
      this.props.dispatch(checkLoginUser(this.props.user));
    }
  }

  login() {
    const { dispatch } = this.props;
    return this.props.dispatch(loginToGithub())
      .then(user => {dispatch(upsertUser(user))});
  }

  logout() {
    this.props.dispatch(logoutFromGithub());
  }

  render() {
    return (this.props.user)
    ? <LogoutButton user={this.props.user.displayName} logout={this.logout} />
    : <LoginButton login={this.login} />;
  }
}

Auth.propTypes = {
  user: PropTypes.object,
  initialised: PropTypes.bool
};
Auth.defaultProps = {
  user: null,
  initialised: false
};
function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user,
    initialised: state.login.initialised
  };
}
export default connect(mapStateToProps)(Auth);
