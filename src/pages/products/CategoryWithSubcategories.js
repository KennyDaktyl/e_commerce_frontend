import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CategoryItem from './CategoryItem';

const CategoryWithSubcategories = ({ category, parentPath, fetchProducts, categoryData, activeLink, setActiveLink, handleClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <li className={`col-12 m-0 p-0 mt-3 pl-2 has-subcategories`} key={category.id}>
      <Link
        to={`/${categoryData.slug}${parentPath}/${category.slug}/`}
        data-toggle='collapse'
        aria-expanded={isExpanded}
        className={`col-12 text-left ml-0 collapsed ${category.subcategories ? 'dropdown-toggle' : ''}`}
        onClick={() => {
          handleToggle();
          handleClick();
        }}
      >
        <span className={category.slug === activeLink ? 'active-link' : ''}>{category.name}</span>
      </Link>
      {isExpanded && category.subcategories && (
        <ul className="list-unstyled">
          {category.subcategories.map((subcategory) => (
            <CategoryItem
              key={subcategory.id}
              category={subcategory}
              parentPath={`${parentPath}/${category.slug}`}
              fetchProducts={fetchProducts}
              categoryData={categoryData}
              activeLink={activeLink}
              setActiveLink={setActiveLink}
              handleClick={handleClick}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default CategoryWithSubcategories;
