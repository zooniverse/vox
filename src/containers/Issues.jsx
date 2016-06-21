import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as issueActions from '../actions/issue';
import * as userVotesActions from '../actions/uservotes';

import IssueList from '../components/IssueList'

class Issues extends Component {

  componentDidMount() {
    const { actions, issues } = this.props;
    if (!issues.data.length && !issues.loading) {
      return actions.issueActions.fetchIssuesFromGH()
    }
  }

  render() {
    const { actions, issues } = this.props;
    return (
      <IssueList
      issues={issues}
      actions={actions}  />
    );
  }
}

Issues.propTypes = {
  issues: PropTypes.object.isRequired,
};

Issues.defaultProps = {
  issues: {
    data: [],
    error: false,
    loading: false,
  },
};

const mapStateToProps = state => ({
  issues: state.issues,
});

const mapDispatchToProps = dispatch => ({
  actions: {
    issueActions: bindActionCreators(issueActions, dispatch),
    userVotesActions: bindActionCreators(userVotesActions, dispatch),
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Issues);
