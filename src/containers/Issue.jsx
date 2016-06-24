import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import firebase from 'firebase';

import VoteCounter from '../components/VoteCounter'

class Issue extends Component {

  constructor(props) {
    super();
    this.issueRef = firebase.database().ref(`issues/${props.item.id}`);
  }

  componentDidMount() {
    const { item, actions } = this.props;
    this.issueRef.on('value', dataSnapshot => {
      item.votes = dataSnapshot.val().vote_count ? dataSnapshot.val().vote_count : 0;
      actions.issueActions.updateIssueVoteCount(item.id, item.votes)
    });
  }

  componentWillUnmount() {
    this.issueRef.off();
  }

  render() {
    console.log('this.props', this.props)
    const { item, actions, user, userVotes } = this.props;
    const handleVotes = actions.userVotesActions.toggleVote.bind(this, item.id);
    return (
      <div key={item.id} className="cf mb4">
        <VoteCounter
          count={item.votes}
          isActive={(userVotes[item.id] && user.uid) ? userVotes[item.id] : false}
          handleVotes={handleVotes}
        />
        <div className="fl w-80">
          <h2 className="mt0 mb1 f3">
            {item.title}
          </h2>
          <a href={item.url} target="_blank" className="db f6 link dim gray">
            View issue {item.id} on GitHub
          </a>
          <p className="f5 lh-copy measure">
            {item.body}
          </p>
        </div>
      </div>
    );
  }
}

Issue.propTypes = {
  item: PropTypes.object.isRequired,
  userVotes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  userVotes: state.userVotes,
  user: state.user,
});

export default connect(mapStateToProps)(Issue);
