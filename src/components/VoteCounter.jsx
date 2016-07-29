import React, { PropTypes } from 'react';

const VoteCounter = ({ count, isActive, handleVotes, user }) => {
  const cssClasses = isActive
    ? 'pa2 bg-green white dim bn br2 f6 btn'
    : 'pa2 bg-mid-gray white dim bn br2 f6 btn';

  return (
    <div className="fl w-20">
      { (user.uid)
      ? <button onClick={ handleVotes } className={ cssClasses }>
          <i className="fa fa-thumbs-o-up fa-2x" aria-hidden="true"></i>
        </button>
      : <button className="pa2 white bn br2 disabled notallowed">
          <i className="fa fa-thumbs-o-up fa-2x" aria-hidden="true"></i>
        </button> }
      <p>{ count } votes</p>
    </div>
  );
};

VoteCounter.propTypes = {
  count: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  handleVotes: PropTypes.func,
};

export default VoteCounter;
