import React from 'react';
import PropTypes from 'prop-types';
import CategoryButton from './CategoryButton';

function CategoryList({ categories, selectedCategory, onClick }) {
  return (
    <header>
      <p>Kategori popular</p>
      <div className="category-list">
        {categories.map((category, idx) => (
          <CategoryButton
            title={category}
            key={idx}
            isActive={category === selectedCategory}
            onClick={() => onClick(category)}
          />
        ))}
      </div>
    </header>
  );
}

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CategoryList;
