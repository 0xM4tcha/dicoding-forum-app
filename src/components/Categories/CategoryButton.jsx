import React from 'react';
import PropTypes from 'prop-types';

function CategoryButton({ title, onClick, isActive }) {
  return (
    <button
      type="button"
      className={`category-item ${isActive && 'selected'}`}
      onClick={onClick}>
      <p>#{title}</p>
    </button>
  );
}

CategoryButton.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default CategoryButton;
