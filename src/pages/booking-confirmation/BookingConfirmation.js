import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFilters } from '../../hooks/useFilters';

// styles
import './BookingConfirmation.css';

export default function BookingConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { resetFilters } = useFilters();
  const { name, stayPeriod, numberOfPeople, totalPrice } = location.state;

  const handleBackToList = () => {
    resetFilters();
    navigate('/');
  };

  return (
    <div className="booking-confirmation">
      <h2>You have successfully booked the accommodation {name}</h2>
      <p>Stay Period: {stayPeriod}</p>
      <p>Number of People: {numberOfPeople}</p>
      <p>Total Price: €{totalPrice}</p>
      <button onClick={handleBackToList}>Back to List</button>
    </div>
  );
}