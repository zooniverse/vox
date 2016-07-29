import React, { PropTypes } from 'react';

const AuthButton = ({ action, text }) => {
  const classNames = 'pa2 bg-mid-gray bn br2 f6 white dim btn';
  return (
    <button className={classNames} onClick={action}>{text}</button>
  );
};

AuthButton.propTypes = {
  action: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default AuthButton;
