import { PropTypes } from 'react';

const AuthButton = (props) => {
  const classNames = 'pa2 bg-mid-gray bn br2 f6 white dim btn';
  const { action, text } = props;
  return (
    <button className={classNames} onClick={action}>{text}</button>
  );
}

AuthButton.propTypes = {
  action: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

export { AuthButton as default }
