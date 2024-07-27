// src/components/FilterSection.jsx
import React from 'react';
import styled from 'styled-components';

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const FilterLabel = styled.label`
  margin: 0 10px;
`;

const FilterSection = ({ filters, handleFilterChange }) => {
  return (
    <FilterContainer>
      <FilterLabel>
        Category:
        <select name="category" onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="Phone">Phone</option>
          <option value="Computer">Computer</option>
          <option value="TV">TV</option>
          <option value="Earphone">Earphone</option>
          <option value="Tablet">Tablet</option>
          <option value="Charger">Charger</option>
          <option value="Mouse">Mouse</option>
          <option value="Keypad">Keypad</option>
          <option value="Bluetooth">Bluetooth</option>
          <option value="Pendrive">Pendrive</option>
          <option value="Remote">Remote</option>
          <option value="Speaker">Speaker</option>
          <option value="Headset">Headset</option>
          <option value="Laptop">Laptop</option>
          <option value="PC">PC</option>
        </select>
      </FilterLabel>
      <FilterLabel>
        Company:
        <select name="company" onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="AMZ">AMZ</option>
          <option value="FLP">FLP</option>
          <option value="SNP">SNP</option>
          <option value="MYN">MYN</option>
          <option value="AZO">AZO</option>
        </select>
      </FilterLabel>
      <FilterLabel>
        Min Price:
        <input
          type="number"
          name="minPrice"
          value={filters.minPrice}
          onChange={handleFilterChange}
        />
      </FilterLabel>
      <FilterLabel>
        Max Price:
        <input
          type="number"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleFilterChange}
        />
      </FilterLabel>
    </FilterContainer>
  );
};

export default FilterSection;
