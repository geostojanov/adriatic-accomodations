import React, { useState } from 'react';
import { useFilters } from '../hooks/useFilters';
import './Filters.css';

const amenities = [
  { label: "Air Conditioning", value: "airConditioning" },
  { label: "Parking Space", value: "parkingSpace" },
  { label: "Pets", value: "pets" },
  { label: "Pool", value: "pool" },
  { label: "WiFi", value: "wifi" },
  { label: "TV", value: "tv" }
];

export default function Filters() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { filters, 
          setMaxPrice, setCapacity, setStartDate, setEndDate, 
          addAmenity, removeAmenity, resetFilters, setApplied } = useFilters();

  const closeModal = () => setIsModalOpen(false);
  
  const handleAmenitiesChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
        addAmenity(value);
    } else {
        removeAmenity(value);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setApplied(true);
    closeModal();
  };
  
  return (
    <div className='filters-container'>
      <div className='filter-item'>
        <label htmlFor="start-date">Check-in:</label>
        <input 
          type="date" 
          id="start-date" 
          name="start-date"
          min="2025-01-01"
          max="2025-12-31"
          onChange={(e) => setStartDate(e.target.value)}
          value={filters.startDate} 
        />
      </div>
      <div className='filter-item'>
        <label htmlFor="end-date">Check-out:</label>
        <input 
          type="date" 
          id="end-date" 
          name="end-date"
          min="2025-01-01"
          max="2025-12-31"
          onChange={(e) => setEndDate(e.target.value)}
          value={filters.endDate}
        />
      </div>
      <div className='filter-item'>
        <label htmlFor="capacity">Guests:</label>
        <input 
          type="number"
          id="capacity"
          onChange={(e) => setCapacity(e.target.value)} 
          value={filters.capacity}
        />
      </div>
      <div className='filter-item'>
        <label>Amenities:</label>
        <div className="amenities-dropdown">
          <button className="btn">Select Amenities</button>
          <div className="amenities-dropdown-content">
            {amenities.map(item => (
              <div key={item.value}>
                <label>
                  <input
                    className="amenities-checkbox" 
                    type="checkbox" 
                    value={item.value}
                    checked={filters.selectedAmenities.includes(item.value)}
                    onChange={handleAmenitiesChange}
                  />
                  <span>{item.label}</span>  
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='filter-item'>
        <label htmlFor="max-price">Max Price:</label>
        <input 
          type="number"
          id="max-price"
          onChange={e => setMaxPrice(e.target.value)} 
          value={filters.maxPrice} 
        />
      </div>
      <div className='filter-item filter-buttons'>
        <label>&nbsp;</label>
        <button className='btn' onClick={resetFilters} disabled={!filters.applied}>Reset</button>
        <button className='btn' onClick={handleSubmit} disabled={!filters.startDate || !filters.endDate || filters.isInitial}>Search</button>
      </div>
    </div>
  );
}