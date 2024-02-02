import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CategoryItem from './CategoryItem';
import CategoryWithProducts from './CategoryWithSubcategories';
import Product from './Product';


const ProductsList = () => {
  const [categoryData, setCategoryData] = useState(null);
  const [products, setProducts] = useState([]);
  const { slug } = useParams();
  const [activeLink, setActiveLink] = useState(null);

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

  const parentPath = categoryData.parent ? `/${categoryData.parent.slug}` : '';

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
              {categoryData.subcategories && categoryData.subcategories.map((category) => (
                category.parent && (
                  (category.subcategories && category.subcategories.length > 0) ? (
                    <CategoryItem
                      key={category.id}
                      category={category}
                      parentPath={parentPath}
                      fetchProducts={fetchProducts}
                      categoryData={categoryData}
                      activeLink={activeLink}
                      setActiveLink={setActiveLink}
                      handleClick={() => setActiveLink(category.slug)}
                    />
                  ) : (
                    <CategoryWithProducts
                      key={category.id}
                      category={category}
                      parentPath={parentPath}
                      fetchProducts={fetchProducts}
                      categoryData={categoryData}
                      activeLink={activeLink}
                      setActiveLink={setActiveLink}
                      handleClick={() => setActiveLink(category.slug)}
                    />
                  )
                )
              ))}
            </ul>
          </div>
          <div className="container__products col-9 d-flex justify-content-center">
            {products.map(product => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
