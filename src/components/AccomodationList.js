import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useFilters } from "../hooks/useFilters";

// styles
import "./AccomodationList.css";

// components
import Modal from "./Modal";

const amenities = [
  { label: "Air Conditioning", value: "airConditioning" },
  { label: "Parking Space", value: "parkingSpace" },
  { label: "Pets", value: "pets" },
  { label: "Pool", value: "pool" },
  { label: "WiFi", value: "wifi" },
  { label: "TV", value: "tv" },
];

export default function AccomodationList({ accomodations }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAccomodation, setSelectedAccomodation] = useState(null);
  const { filters } = useFilters();
  const navigate = useNavigate();

  const openModal = (accomodation) => {
    setSelectedAccomodation(accomodation);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAccomodation(null);
  };

  const getMinMaxPrice = (pricelist) => {
    if (!pricelist || pricelist.length === 0) return { min: "N/A", max: "N/A" };
    const prices = pricelist.map((price) => price.pricePerNight);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  };

  const calculateTotalPrice = (pricelist, startDate, endDate) => {
    if (!pricelist || !startDate || !endDate) return "N/A";
    const start = new Date(startDate);
    const end = new Date(endDate);
    let totalPrice = 0;
  
    pricelist.forEach(({ intervalStart, intervalEnd, pricePerNight }) => {
      const intervalStartDate = new Date(intervalStart);
      const intervalEndDate = new Date(intervalEnd);
  
      // Adjust the interval end date to exclude it from the calculation
      const adjustedIntervalEndDate = new Date(intervalEndDate);
      adjustedIntervalEndDate.setDate(adjustedIntervalEndDate.getDate() - 1);
  
      if (start <= adjustedIntervalEndDate && end > intervalStartDate) {
        const effectiveStart = start > intervalStartDate ? start : intervalStartDate;
        const effectiveEnd = end <= intervalEndDate ? new Date(end - 1) : adjustedIntervalEndDate;
        const days = Math.ceil((effectiveEnd - effectiveStart) / (1000 * 60 * 60 * 24)) + 1;
        totalPrice += days * pricePerNight;
      }
    });
  
    return Math.round(totalPrice);
  };
  
  const handleBook = () => {
    const totalPrice = calculateTotalPrice(selectedAccomodation.pricelistInEuros, filters.startDate, filters.endDate);
    navigate('/booking-confirmation', {
      state: {
        name: selectedAccomodation.title,
        stayPeriod: `${filters.startDate} to ${filters.endDate}`,
        numberOfPeople: filters.capacity,
        totalPrice
      }
    });
  };

  if (accomodations.length === 0) {
    return <div className="error">No accomodations found.</div>;
  }

  return (
    <div className="accomodation-list">
      {accomodations.map((accomodation) => (
        <div
          key={accomodation.id}
          onClick={() => openModal(accomodation)}
          className="acard"
        >
          <h3>{accomodation.title}</h3>
          <img src={accomodation.image} alt={accomodation.title} />
          <p>Capacity: {accomodation.capacity} guests</p>
          {accomodation.beachDistanceInMeters && (
            <p>Beach distance: {accomodation.beachDistanceInMeters} m</p>
          )}
        </div>
      ))}
      {selectedAccomodation && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          accomodation={selectedAccomodation}
        >
          <form>
            <div className="modal-image">
              <img
                src={selectedAccomodation.image}
                alt={selectedAccomodation.title}
              />
            </div>
            <div className="modal-content">
              <div className="form-group">
                <label>Name</label>
                <p>{selectedAccomodation.title}</p>
              </div>
              <div className="form-group">
                <label>Capacity</label>
                <p>{`${selectedAccomodation.capacity} guests`}</p>
              </div>
              <div className="form-group">
                <label>Amenities</label>
                <ul>
                  {amenities
                    .filter(
                      (amenity) => selectedAccomodation.amenities[amenity.value]
                    )
                    .map((amenity) => (
                      <li key={amenity.value}>{amenity.label}</li>
                    ))}
                </ul>
              </div>
              <div className="form-group">
                <label>Beach Distance</label>
                <p>
                  {selectedAccomodation.beachDistanceInMeters
                    ? `${selectedAccomodation.beachDistanceInMeters} m`
                    : "N/A"}
                </p>
              </div>
              <div className="form-group">
                <label>Price</label>
                <p>
                  {filters.startDate && filters.endDate
                    ? `Total: €${calculateTotalPrice(
                        selectedAccomodation.pricelistInEuros,
                        filters.startDate,
                        filters.endDate
                      )}`
                    : `€${
                        getMinMaxPrice(selectedAccomodation.pricelistInEuros)
                          .min
                      } - €${
                        getMinMaxPrice(selectedAccomodation.pricelistInEuros)
                          .max
                      } per night`}
                </p>
                {!filters.startDate || !filters.endDate ? (
                  <p className="price-message">
                    Please select dates to see the exact price and book the
                    accommodation.
                  </p>
                ) : null}
              </div>
            </div>
            <div className="form-actions">
              <button
                type="button"
                className="close-button"
                onClick={closeModal}
              >
                Close
              </button>
              {filters.startDate && filters.endDate && filters.capacity && (
                <button type="button" className="book-button" onClick={handleBook}>Book</button>
              )}
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
