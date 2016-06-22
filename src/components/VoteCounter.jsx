import {PropTypes } from 'react';


const VoteCounter = ({count, isActive, handleVotes}) => {
  const cssClasses = isActive
    ? 'pa2 bg-green white dim bn br2 f6 btn'
    : 'pa2 bg-mid-gray white dim bn br2 f6 btn';

  return (
    <div className="fl w-20">
      <button onClick={handleVotes} className={cssClasses}>
        <i className="fa fa-thumbs-o-up fa-2x" aria-hidden="true"></i>
      </button>
      <p>{count} votes</p>
    </div>
  );
}

VoteCounter.propTypes = {
  count: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
  handleVotes: PropTypes.func
};

export default VoteCounter;
