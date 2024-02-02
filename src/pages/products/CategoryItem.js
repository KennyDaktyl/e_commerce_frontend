import React from 'react';
import CategoryWithSubcategories from './CategoryWithSubcategories';
import CategoryWithProducts from './CategoryWithProducts';

const MenuItems = ({ category, parentPath, fetchProducts, categoryData, activeLink, setActiveLink }) => {
  const hasSubcategories = category.subcategories && category.subcategories.length > 0;

  const handleClick = () => {
    setActiveLink(category.slug);
  };

  if (hasSubcategories) {
    return (
      <CategoryWithSubcategories
        category={category}
        parentPath={parentPath}
        fetchProducts={fetchProducts}
        categoryData={categoryData}
        activeLink={activeLink}
        setActiveLink={setActiveLink}
        handleClick={handleClick}
      />
    );
  } else {
    return (
      <CategoryWithProducts
        category={category}
        parentPath={parentPath}
        fetchProducts={fetchProducts}
        categoryData={categoryData}
        activeLink={activeLink}
        setActiveLink={setActiveLink}
        handleClick={handleClick}
      />
    );
  }
};

export default MenuItems;
