import React from 'react';
import { PRODUCTS } from '../constants';
import MagneticCarousel from './MagneticCarousel';

const Products: React.FC = () => {
  const productImages = PRODUCTS.map(product => ({ 
    src: product.imageUrl,
    highResSrc: product.imageUrl
  })).filter(img => Boolean(img.src));

  return (
    <section id="products" className="relative w-full bg-white overflow-hidden flex flex-col items-center justify-center py-20">
      <div className="w-full h-[600px] relative">
        <MagneticCarousel 
          images={productImages} 
        />
      </div>
    </section>
  );
};

export default Products;
