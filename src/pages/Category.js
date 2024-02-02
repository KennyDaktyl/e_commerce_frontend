import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const MenuItems = ({ category, parentPath, fetchProducts }) => {
  const hasSubcategories = category.subcategories && category.subcategories.length > 0;

  if (hasSubcategories) {
    return (
      <CategoryWithSubcategories
        category={category}
        parentPath={parentPath}
        fetchProducts={fetchProducts}
      />
    );
  } else {
    return (
      <CategoryWithProducts
        category={category}
        parentPath={parentPath}
        fetchProducts={fetchProducts}
      />
    );
  }
};

const CategoryWithSubcategories = ({ category, parentPath, fetchProducts }) => {
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
        className={`col-12 text-left ml-0 collapsed ${category.subcategories ? 'dropdown-toggle' : ''}`}
        onClick={handleToggle}
      >
        <span>{category.name}</span>
      </Link>
      {isExpanded && category.subcategories && (
        <ul className="list-unstyled">
          {category.subcategories.map((subcategory) => (
            <MenuItems
              key={subcategory.id}
              category={subcategory}
              parentPath={`${parentPath}/${category.slug}`}
              fetchProducts={fetchProducts}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

const CategoryWithProducts = ({ category, parentPath, fetchProducts }) => {
  const handleProductClick = async () => {
    fetchProducts(category.slug);
  };

  return (
    <li className={`active col-12 m-0 p-0 mt-3 pl-2`} key={category.id}>
      <Link
        to={`${parentPath}/${category.slug}/`}
        className={`col-12 text-left ml-0`}
        onClick={handleProductClick}
      >
        <span>{category.name}</span><span>&nbsp;({category.get_products_count})</span>
      </Link>
    </li>
  );
};


const Categories = () => {
  const [categoryData, setCategoryData] = useState(null);
  const [products, setProducts] = useState([]);
  const { slug } = useParams();


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
    return <div className="container">Loading...</div>;
  }

  const parentPath = categoryData.parent?.slug || '';

   const fetchProducts = async (categorySlug) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/categories/${categorySlug}/products/`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  if (!products) {
     return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid ">
      <div className="container">
        <div className="row justify-content-center">
          <h2>{categoryData.name}</h2>
          <p>{categoryData.description}</p>
          <div className='side-bar-nav col-3'>
            <ul className='list-unstyled'>
              {categoryData.subcategories && categoryData.subcategories.map((category) =>
                category.parent && category.subcategories && category.subcategories.length > 0 ? (
                  <CategoryWithSubcategories key={category.id} category={category} parentPath={parentPath} fetchProducts={fetchProducts} />
                ) : (
                  category.parent && <CategoryWithProducts key={category.id} category={category} parentPath={parentPath} fetchProducts={fetchProducts} />
                )
              )}
            </ul>
          </div>
          <div className="container__products col-9 d-flex justify-content-center">
            {products.map(product => (
              <div key={product.id}>
                {/* Render product details */}
                <p>{product.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
