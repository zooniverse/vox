import {PropTypes } from 'react';


const VoteCounter = ({count, isActive, handleVotes}) => (
  <div className="fl w-20">
    <button onClick={handleVotes} className="pa2 bg-mid-gray white dim bn br2 f6 btn">
      <i className="fa fa-thumbs-o-up fa-2x" aria-hidden="true"></i>
    </button>
    <p>{count} votes</p>
  </div>
);

VoteCounter.propTypes = {
  count: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
  handleVotes: PropTypes.func
};

export default VoteCounter;
