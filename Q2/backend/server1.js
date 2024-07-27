export const fetchProducts = async (category, company, minPrice, maxPrice) => {
    
    const response = await fetch(
      `https://your-api-endpoint/products?category=${category}&company=${company}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    );
    const data = await response.json();
    return data;
  };