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
      <div>
        { list.map((item) =>
          <div key={item.number} className="cf mb4">
            <VoteCounter
              count={item.number}
              isActive={this.state.voted}
              activeColor='false'
              handleVotes={this.handleVotes(item.number)}
            />
            <div className="fl w-80">
              <h2 className="mt0 mb1 f3">
                {item.title}
              </h2>
              <a href={item.html_url} target="_blank" className="db f6 link dim gray">
                View issue on GitHub
              </a>
              <p className="f5 lh-copy measure">
                {item.body}
              </p>
            </div>
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
