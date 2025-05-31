export const formatPriceVND = (price: number | string): string => {
  const numberPrice = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(numberPrice)) {
    return '';
  }
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(numberPrice);
};

// New function using the formula:
// ((price / 1,000,000) * 26500) + 20% of the result => ((price / 1,000,000) * 26500) * 1.2
export const calculateDisplayedPrice = (price: number | string): number => {
  const numberPrice = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(numberPrice)) {
    return 0;
  }
  const basePrice = (numberPrice / 1000000) * 26000;
  const totalPrice = basePrice * 1.2;
  // Round the price to the nearest thousand
  return Math.round(totalPrice / 1000) * 1000;
};
