import { Component, PropTypes } from 'react';
import VoteCounter from './VoteCounter'

export default class IssueList extends Component {
  constructor(props) {
    super(props);
    console.log('PROPS: ', props)
    this.state = {
      voted: false
    };
    this.renderClassroomList = this.renderClassroomList.bind(this);
    this.handleVotes = this.handleVotes.bind(this);
  }

  handleVotes(issueId) {
    console.log('HANDLING VOTES ON ISSUE: ', issueId)

  }

  renderClassroomList(data) {
    const list = (data.length > 0) ? data : [];
    return (
      <div className="list-group">
        { list.map((item) =>
          <div key={item.number} className="list-group-item">
            <h1><a href={item.url} target="_blank">{item.title}</a></h1>
            <p>{item.body}</p>
            <VoteCounter
              count={item.number}
              isActive={this.state.voted}
              activeColor='false'
              handleVotes={this.handleVotes(item.number)}
            />
          </div>
        )}
      </div>
    );
  }

  render() {
    return (
      <div>
      { this.renderClassroomList(this.props.issues.data) }
      </div>
    )
  }
}

IssueList.defaultProps = {
  issues: {
    data: [],
    error: false,
    issue: null,
    loading: false,
  },
};
