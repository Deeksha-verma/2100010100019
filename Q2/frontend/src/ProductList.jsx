// src/components/ProductList.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchProducts } from '../services/api';
import ProductCard from './ProductCard';
import FilterSection from './FilterSection';

const Container = styled.div`
  margin: 20px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    company: '',
    minPrice: 0,
    maxPrice: 10000,
  });

  useEffect(() => {
    const getProducts = async () => {
      const products = await fetchProducts(
        filters.category,
        filters.company,
        filters.minPrice,
        filters.maxPrice
      );
      setProducts(products);
    };
    getProducts();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <Container>
      <h1>Top N Products</h1>
      <FilterSection filters={filters} handleFilterChange={handleFilterChange} />
      <ProductGrid>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductGrid>
    </Container>
  );
};

export default ProductList;
