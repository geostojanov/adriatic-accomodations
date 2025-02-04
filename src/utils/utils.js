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



export { isPriceInRange, isDateAvailable };