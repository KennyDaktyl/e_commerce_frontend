import React from 'react';

const Product = ({ product }) => {
  return (
    <div key={product.id}>
      {/* Render product details */}
      <p>{product.name}</p>
    </div>
  );
};

export default Product;
