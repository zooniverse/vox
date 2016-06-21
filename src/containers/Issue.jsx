import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import firebase from 'firebase';

import VoteCounter from '../components/VoteCounter'


class Issue extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    // listen for changes in firebase and dispatch actions
    const issueRef = firebase.database().ref(`issues/${this.props.item.id}`);
    issueRef.on('value', dataSnapshot => {
      // dispatch action to update redux with new vote count
    });
  }

  componentWillUnmount() {
    // remove the firebase listener
  }

  render() {
    const { item, actions } = this.props;
    const handleVotes = actions.userVotesActions.toggleVote.bind(this, item.id);
    return (
      <div key={item.id} className="cf mb4">
        <VoteCounter
          count={item.id}
          isActive={true}
          handleVotes={handleVotes}
        />
        <div className="fl w-80">
          <h2 className="mt0 mb1 f3">
            {item.title}
          </h2>
          <a href={item.url} target="_blank" className="db f6 link dim gray">
            View issue on GitHub
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
};

Issue.defaultProps = {
  item: {
    voteCount: '',
  },
};




export default connect()(Issue);
