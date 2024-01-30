import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';

const CategoryWithSubcategories = ({ category, parentPath }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };


  return (
    <li className={`active col-12 m-0 p-0 mt-3 pl-2 has-subcategories`} key={category.id}>
      <Link
        to={`${parentPath}/${category.slug}/`}
        data-toggle='collapse'
        aria-expanded={isExpanded}
        className={`col-12 text-left ml-0 border-bottom collapsed ${category.subcategories ? 'dropdown-toggle' : ''}`}
        onClick={handleToggle}
      >
        <span>{category.name}</span>
      </Link>
      {isExpanded && category.subcategories && (
        <ul className="list-unstyled">
          {category.subcategories.map((subcategory) => (
            <CategoryWithSubcategories key={subcategory.id} category={subcategory} parentPath={`${parentPath}/${category.slug}`} />
          ))}
        </ul>
      )}
    </li>
  );
};

const CategoryWithoutSubcategories = ({ category, parentPath }) => {
  
  return (
    <li className={`active col-12 m-0 p-0 mt-3 pl-2`} key={category.id}>
      <Link
        to={`${parentPath}/${category.slug}/`}
        className={`col-12 text-left ml-0 border-bottom`}
      >
        <span>{category.name}</span>
      </Link>
    </li>
  );
};

const Categories = () => {
  const { slug } = useParams();
  const [categoryData, setCategoryData] = useState(null);

  // const location = useLocation();
  // const pathSegments = location.pathname.split('/').filter(segment => segment !== '');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/categories/${slug}/`);
        const data = await response.json();
        setCategoryData(data);
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchData();
  }, [slug]);

  if (!categoryData) {
    return <div className='container'>Loading...</div>;
  }

  const parentPath = categoryData.parent ? `${categoryData.parent.slug}` : '';

  return (
    <div className="container">
      <h2>{categoryData.name}</h2>
      <p>{categoryData.description}</p>
      <ul className='list-unstyled'>
        {categoryData.subcategories && categoryData.subcategories.map((category) =>
          category.parent && category.subcategories && category.subcategories.length > 0 ? (
            <CategoryWithSubcategories key={category.id} category={category} parentPath={parentPath} />
          ) : (
            category.parent && <CategoryWithoutSubcategories key={category.id} category={category} parentPath={parentPath} />
          )
        )}
      </ul>
    </div>
  );
};

export default Categories;