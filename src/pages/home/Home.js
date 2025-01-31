import { useFetch } from "../../hooks/useFetch";
import { useFilters } from "../../hooks/useFilters";
import { calculateTotalPrice } from "../../utils/utils";

// styles
import "./Home.css";

// components
import AccomodationList from "../../components/AccomodationList";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const { data, isPending, error } = useFetch(
    "https://api.adriatic.hr/test/accommodation"
  );

  const { filters } = useFilters();
  const [filteredData, setFilteredData] = useState([]);

  const isDateAvailable = (startDate, endDate, availableDates) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start > end) {
      return false;
    }
    return availableDates.some((interval) => {
      const intervalStart = new Date(interval.intervalStart);
      const intervalEnd = new Date(interval.intervalEnd);
      return start >= intervalStart && end < intervalEnd;
    });
  };

  const isPriceInRange = (startDate, endDate, pricelist, maxPrice) => {
    const totalPrice = calculateTotalPrice(pricelist, startDate, endDate);
    return totalPrice <= maxPrice;
  };

  const applyFilters = useCallback(() => {
    if (filters.applied && data) {
      let filtered = data;

      if (filters.capacity) {
        filtered = filtered.filter(
          (accomodation) => accomodation.capacity >= filters.capacity
        );
      }
      if (filters.maxPrice) {
        filtered = filtered.filter((accomodation) =>
          isPriceInRange(
            filters.startDate,
            filters.endDate,
            accomodation.pricelistInEuros,
            filters.maxPrice
          )
        );
      }
      if (filters.startDate && filters.endDate) {
        filtered = filtered.filter((accomodation) =>
          isDateAvailable(
            filters.startDate,
            filters.endDate,
            accomodation.availableDates
          )
        );
      }
      if (filters.selectedAmenities.length > 0) {
        filtered = filtered.filter((accomodation) =>
          filters.selectedAmenities.every(
            (amenity) => accomodation.amenities[amenity]
          )
        );
      }
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [filters, data]);

  useEffect(() => {
    applyFilters();
  }, [filters, data, applyFilters]);

  return (
    <div className="home">
      {error && <p>{error}</p>}
      {isPending && <p>Loading...</p>}
      {filteredData && <AccomodationList accomodations={filteredData} />}
    </div>
  );
}
