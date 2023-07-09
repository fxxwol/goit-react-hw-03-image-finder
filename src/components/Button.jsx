import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick }) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <button type="button" className="Button" onClick={handleClick}>
      Load More
    </button>
  );
};

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default Button;
