import React from 'react';
import { Link } from 'react-router-dom';

const CategoryWithProducts = ({ category, parentPath, fetchProducts, categoryData, activeLink, setActiveLink, handleClick }) => {
  const handleProductClick = async () => {
    fetchProducts(category.slug);
    handleClick();
  };

  return (
    <li className={`col-12 m-0 p-0 mt-3 pl-2 ${activeLink === category.slug ? 'active-link' : ''}`} key={category.id}>
      <Link
        to={`/${categoryData.slug}${parentPath}/${category.slug}/`}
        className={`col-12 text-left ml-0`}
        onClick={handleProductClick}
      >
        <span className={category.slug === activeLink ? 'active-link' : ''}>{category.name}</span><span>&nbsp;({category.get_products_count})</span>
      </Link>
    </li>
  );
};

export default CategoryWithProducts;
