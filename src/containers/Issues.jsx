import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchIssuesFromGH, saveIssues, fetchIssuesFromDB } from '../actions/issue';

import IssueList from '../components/IssueList'

class Issues extends Component {

  componentDidMount() {
    const { dispatch, issues } = this.props;
    if (!issues.data.length && !issues.loading) {
      return dispatch(fetchIssuesFromGH())
    }
  }

  render() {
    const { issues } = this.props;
    return (
      <IssueList issues={issues} />
    );
  }

}

Issues.propTypes = {
  issues: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
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

export default connect(mapStateToProps)(Issues);
