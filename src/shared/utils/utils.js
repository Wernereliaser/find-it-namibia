export function numberFormat(number) {
    return number.toLocaleString(navigator.language, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export const formatPrice = (price) => {
    const formattedPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'NAD'
    }).format(price);
    return formattedPrice;
  };